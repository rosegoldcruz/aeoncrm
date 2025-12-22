// ═══════════════════════════════════════════════════════════════════════════════
// AEON Dial Auth Recovery
// Handle edge cases: orphaned users, removed from org, role changes, email changes
// ═══════════════════════════════════════════════════════════════════════════════

import { SupabaseClient, User } from "@supabase/supabase-js"
import type { AeonUser } from "./types"

export type RecoveryAction =
  | "none"
  | "create_user"
  | "reactivate_user"
  | "sync_email"
  | "assign_to_org"
  | "demote_to_agent"

export interface RecoveryResult {
  action: RecoveryAction
  success: boolean
  user?: AeonUser
  error?: string
}

/**
 * Diagnose and recover from auth state mismatches
 */
export async function diagnoseAndRecover(
  supabase: SupabaseClient,
  authUser: User
): Promise<RecoveryResult> {
  // 1. Check if user exists in public.users
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single()

  // Case A: Auth user exists, public.users missing
  if (fetchError?.code === "PGRST116" || !existingUser) {
    return await handleOrphanedAuthUser(supabase, authUser)
  }

  // Case B: User exists but is inactive (removed from org)
  if (existingUser && !existingUser.is_active) {
    return await handleInactiveUser(supabase, existingUser, authUser)
  }

  // Case C: Email mismatch (user changed email in auth)
  if (existingUser && existingUser.email !== authUser.email) {
    return await handleEmailChange(supabase, existingUser, authUser)
  }

  // Case D: User exists in users but org doesn't exist
  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .select("id")
    .eq("id", existingUser.org_id)
    .single()

  if (orgError || !org) {
    return await handleOrphanedUser(supabase, existingUser, authUser)
  }

  // No recovery needed
  return {
    action: "none",
    success: true,
    user: existingUser as AeonUser,
  }
}

/**
 * Handle: Auth user exists but no public.users record
 * Action: Create user record with safe defaults
 */
async function handleOrphanedAuthUser(
  supabase: SupabaseClient,
  authUser: User
): Promise<RecoveryResult> {
  // Check if user was invited to an org
  const invitedOrgId = authUser.user_metadata?.org_id

  if (invitedOrgId) {
    // Verify org exists
    const { data: org } = await supabase
      .from("organizations")
      .select("id")
      .eq("id", invitedOrgId)
      .single()

    if (org) {
      // Create user in invited org
      const { data: newUser, error } = await supabase
        .from("users")
        .insert({
          id: authUser.id,
          org_id: invitedOrgId,
          email: authUser.email!,
          full_name: authUser.user_metadata?.full_name || authUser.email?.split("@")[0],
          role: authUser.user_metadata?.role || "agent",
          is_active: true,
        })
        .select()
        .single()

      if (error) {
        return { action: "create_user", success: false, error: error.message }
      }

      return { action: "create_user", success: true, user: newUser as AeonUser }
    }
  }

  // No invite - create new org for user
  const orgName = `${authUser.email?.split("@")[0]}'s Organization`
  const { data: newOrg, error: orgError } = await supabase
    .from("organizations")
    .insert({
      name: orgName,
      slug: generateSlug(orgName),
      owner_id: authUser.id,
      settings: {},
    })
    .select()
    .single()

  if (orgError) {
    return { action: "assign_to_org", success: false, error: orgError.message }
  }

  const { data: newUser, error: userError } = await supabase
    .from("users")
    .insert({
      id: authUser.id,
      org_id: newOrg.id,
      email: authUser.email!,
      full_name: authUser.user_metadata?.full_name || authUser.email?.split("@")[0],
      role: "owner",
      is_active: true,
    })
    .select()
    .single()

  if (userError) {
    return { action: "create_user", success: false, error: userError.message }
  }

  return { action: "create_user", success: true, user: newUser as AeonUser }
}

/**
 * Handle: User was deactivated (removed from org)
 * Action: Keep inactive - user must be re-invited
 */
async function handleInactiveUser(
  supabase: SupabaseClient,
  existingUser: AeonUser,
  authUser: User
): Promise<RecoveryResult> {
  // Check if user has been re-invited (metadata updated)
  const reinvitedOrgId = authUser.user_metadata?.reinvite_org_id

  if (reinvitedOrgId && reinvitedOrgId === existingUser.org_id) {
    // Reactivate user
    const { data: reactivatedUser, error } = await supabase
      .from("users")
      .update({
        is_active: true,
        role: authUser.user_metadata?.role || "agent",
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingUser.id)
      .select()
      .single()

    if (error) {
      return { action: "reactivate_user", success: false, error: error.message }
    }

    // Clear reinvite metadata
    await supabase.auth.updateUser({
      data: { reinvite_org_id: null },
    })

    return { action: "reactivate_user", success: true, user: reactivatedUser as AeonUser }
  }

  // User remains inactive - must be explicitly re-invited
  return {
    action: "none",
    success: false,
    error: "User account is deactivated. Contact your organization admin.",
  }
}

/**
 * Handle: Email changed in auth but not synced to users table
 * Action: Sync email to users table
 */
async function handleEmailChange(
  supabase: SupabaseClient,
  existingUser: AeonUser,
  authUser: User
): Promise<RecoveryResult> {
  const { data: updatedUser, error } = await supabase
    .from("users")
    .update({
      email: authUser.email!,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existingUser.id)
    .select()
    .single()

  if (error) {
    return { action: "sync_email", success: false, error: error.message }
  }

  // Log email change in audit
  await supabase.from("audit_logs").insert({
    org_id: existingUser.org_id,
    actor_id: existingUser.id,
    event_type: "user_updated",
    resource_type: "user",
    resource_id: existingUser.id,
    metadata: {
      field: "email",
      old_value: existingUser.email,
      new_value: authUser.email,
    },
  })

  return { action: "sync_email", success: true, user: updatedUser as AeonUser }
}

/**
 * Handle: User exists but their org was deleted
 * Action: Create new org and make user owner
 */
async function handleOrphanedUser(
  supabase: SupabaseClient,
  existingUser: AeonUser,
  authUser: User
): Promise<RecoveryResult> {
  // Create new org for orphaned user
  const orgName = `${authUser.email?.split("@")[0]}'s Organization`
  const { data: newOrg, error: orgError } = await supabase
    .from("organizations")
    .insert({
      name: orgName,
      slug: generateSlug(orgName),
      owner_id: authUser.id,
      settings: {},
    })
    .select()
    .single()

  if (orgError) {
    return { action: "assign_to_org", success: false, error: orgError.message }
  }

  // Update user to new org
  const { data: updatedUser, error: userError } = await supabase
    .from("users")
    .update({
      org_id: newOrg.id,
      role: "owner",
      is_active: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existingUser.id)
    .select()
    .single()

  if (userError) {
    return { action: "assign_to_org", success: false, error: userError.message }
  }

  return { action: "assign_to_org", success: true, user: updatedUser as AeonUser }
}

/**
 * Handle role changes (e.g., admin demoted)
 * Called when role is updated via admin action
 */
export async function handleRoleChange(
  supabase: SupabaseClient,
  userId: string,
  newRole: string,
  actorId: string
): Promise<RecoveryResult> {
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single()

  if (fetchError || !user) {
    return { action: "none", success: false, error: "User not found" }
  }

  const oldRole = user.role

  const { data: updatedUser, error: updateError } = await supabase
    .from("users")
    .update({
      role: newRole,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single()

  if (updateError) {
    return { action: "demote_to_agent", success: false, error: updateError.message }
  }

  // Audit the role change
  await supabase.from("audit_logs").insert({
    org_id: user.org_id,
    actor_id: actorId,
    event_type: "role_changed",
    resource_type: "user",
    resource_id: userId,
    metadata: {
      old_role: oldRole,
      new_role: newRole,
    },
  })

  return { action: "demote_to_agent", success: true, user: updatedUser as AeonUser }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 50) + "-" + Date.now().toString(36)
}
