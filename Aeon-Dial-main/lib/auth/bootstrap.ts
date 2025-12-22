// ═══════════════════════════════════════════════════════════════════════════════
// AEON Dial User Bootstrap
// Runs after successful Supabase authentication to ensure user record exists
// ═══════════════════════════════════════════════════════════════════════════════

import { SupabaseClient, User } from "@supabase/supabase-js"
import type { AeonUser, Organization, AuditEventType } from "./types"

interface BootstrapResult {
  success: boolean
  user: AeonUser | null
  org: Organization | null
  isNewUser: boolean
  error?: string
}

/**
 * Bootstrap user record after Supabase auth
 * 
 * Rules:
 * - public.users.id MUST equal auth.users.id
 * - If no users row exists, create one
 * - First user in org becomes admin (owner if creating org)
 * - Logic is idempotent - safe to call multiple times
 */
export async function bootstrapUser(
  supabase: SupabaseClient,
  authUser: User
): Promise<BootstrapResult> {
  try {
    // 1. Check if user already exists in public.users
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select(`
        *,
        organization:organizations(*)
      `)
      .eq("id", authUser.id)
      .single()

    if (existingUser && !fetchError) {
      // User exists - return existing data
      return {
        success: true,
        user: existingUser as AeonUser,
        org: existingUser.organization as Organization,
        isNewUser: false,
      }
    }

    // 2. User doesn't exist - need to create
    // Check if this is from an invite (has org_id in metadata)
    const invitedOrgId = authUser.user_metadata?.org_id as string | undefined
    const invitedRole = authUser.user_metadata?.role as string | undefined

    let orgId: string
    let userRole: string
    let org: Organization

    if (invitedOrgId) {
      // User was invited to existing org
      const { data: existingOrg, error: orgError } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", invitedOrgId)
        .single()

      if (orgError || !existingOrg) {
        return {
          success: false,
          user: null,
          org: null,
          isNewUser: false,
          error: "Invited organization not found",
        }
      }

      orgId = invitedOrgId
      userRole = invitedRole || "agent"
      org = existingOrg as Organization
    } else {
      // New user - create new organization
      const orgName = authUser.user_metadata?.company_name || 
                      `${authUser.email?.split("@")[0]}'s Organization`
      const orgSlug = generateSlug(orgName)

      const { data: newOrg, error: createOrgError } = await supabase
        .from("organizations")
        .insert({
          name: orgName,
          slug: orgSlug,
          owner_id: authUser.id,
          settings: getDefaultOrgSettings(),
        })
        .select()
        .single()

      if (createOrgError || !newOrg) {
        return {
          success: false,
          user: null,
          org: null,
          isNewUser: false,
          error: `Failed to create organization: ${createOrgError?.message}`,
        }
      }

      orgId = newOrg.id
      userRole = "owner"
      org = newOrg as Organization
    }

    // 3. Create user record
    const { data: newUser, error: createUserError } = await supabase
      .from("users")
      .insert({
        id: authUser.id, // MUST match auth.users.id
        org_id: orgId,
        email: authUser.email!,
        full_name: authUser.user_metadata?.full_name || 
                   authUser.user_metadata?.name ||
                   authUser.email?.split("@")[0],
        role: userRole,
        is_active: true,
        avatar_url: authUser.user_metadata?.avatar_url || null,
      })
      .select()
      .single()

    if (createUserError || !newUser) {
      return {
        success: false,
        user: null,
        org: null,
        isNewUser: false,
        error: `Failed to create user: ${createUserError?.message}`,
      }
    }

    // 4. Emit user_created event
    await emitAuditEvent(supabase, {
      org_id: orgId,
      actor_id: authUser.id,
      event_type: "user_created",
      resource_type: "user",
      resource_id: authUser.id,
      metadata: {
        email: authUser.email,
        role: userRole,
        auth_provider: authUser.app_metadata?.provider || "email",
        is_first_user: userRole === "owner",
      },
    })

    // 5. Create initial action event
    await supabase.from("actions").insert({
      org_id: orgId,
      user_id: authUser.id,
      action_type: "user_created",
      entity_type: "user",
      entity_id: authUser.id,
      metadata: {
        email: authUser.email,
        provider: authUser.app_metadata?.provider || "email",
      },
    })

    return {
      success: true,
      user: newUser as AeonUser,
      org: org,
      isNewUser: true,
    }
  } catch (error) {
    return {
      success: false,
      user: null,
      org: null,
      isNewUser: false,
      error: error instanceof Error ? error.message : "Unknown error during bootstrap",
    }
  }
}

/**
 * Emit audit log event
 */
async function emitAuditEvent(
  supabase: SupabaseClient,
  event: {
    org_id: string
    actor_id: string
    event_type: AuditEventType
    resource_type: string
    resource_id: string | null
    metadata: Record<string, unknown>
  }
) {
  try {
    await supabase.from("audit_logs").insert({
      org_id: event.org_id,
      actor_id: event.actor_id,
      event_type: event.event_type,
      resource_type: event.resource_type,
      resource_id: event.resource_id,
      metadata: event.metadata,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    // Log but don't fail the bootstrap
    console.error("Failed to emit audit event:", error)
  }
}

/**
 * Generate URL-safe slug from name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 50) + "-" + Date.now().toString(36)
}

/**
 * Default organization settings
 */
function getDefaultOrgSettings(): Record<string, unknown> {
  return {
    timezone: "America/New_York",
    date_format: "MM/DD/YYYY",
    time_format: "12h",
    currency: "USD",
    features: {
      ai_calling: true,
      automations: true,
      compliance: true,
      analytics: true,
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  }
}
