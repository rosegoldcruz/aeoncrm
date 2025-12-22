// ═══════════════════════════════════════════════════════════════════════════════
// AEON Dial Auth Context
// Canonical auth-aware API pattern - NEVER trust client-provided org_id
// ═══════════════════════════════════════════════════════════════════════════════

import { createClient } from "@/lib/supabase/server"
import { bootstrapUser } from "./bootstrap"
import type { AeonUser, Organization, AuthContext, Permission, ROLE_PERMISSIONS, UserRole } from "./types"

export type AuthResult = 
  | { success: true; context: AuthContext }
  | { success: false; error: string; code: "UNAUTHENTICATED" | "USER_NOT_FOUND" | "ORG_NOT_FOUND" | "USER_INACTIVE" | "BOOTSTRAP_FAILED" | "FORBIDDEN" }

/**
 * Get authenticated user context
 * 
 * CRITICAL: This is the ONLY way to get org_id in the API layer
 * NEVER accept org_id from client request body or params
 */
export async function getAuthContext(): Promise<AuthResult> {
  const supabase = await createClient()

  // 1. Get authenticated user from Supabase Auth
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

  if (authError || !authUser) {
    return {
      success: false,
      error: "Not authenticated",
      code: "UNAUTHENTICATED",
    }
  }

  // 2. Get or create user record (idempotent bootstrap)
  const bootstrapResult = await bootstrapUser(supabase, authUser)

  if (!bootstrapResult.success || !bootstrapResult.user || !bootstrapResult.org) {
    return {
      success: false,
      error: bootstrapResult.error || "Failed to bootstrap user",
      code: "BOOTSTRAP_FAILED",
    }
  }

  // 3. Verify user is active
  if (!bootstrapResult.user.is_active) {
    return {
      success: false,
      error: "User account is deactivated",
      code: "USER_INACTIVE",
    }
  }

  // 4. Build permission set based on role
  const permissions = getRolePermissions(bootstrapResult.user.role as UserRole)

  return {
    success: true,
    context: {
      user: bootstrapResult.user,
      org: bootstrapResult.org,
      permissions,
    },
  }
}

/**
 * Require authentication - throws if not authenticated
 * Use in API routes and server actions
 */
export async function requireAuth(): Promise<AuthContext> {
  const result = await getAuthContext()

  if (!result.success) {
    throw new AuthError(result.error, result.code)
  }

  return result.context
}

/**
 * Check if user has permission for action
 */
export function hasPermission(
  context: AuthContext,
  resource: string,
  action: "create" | "read" | "update" | "delete"
): boolean {
  // Owner/admin with wildcard has all permissions
  const wildcardPerm = context.permissions.find(p => p.resource === "*")
  if (wildcardPerm && wildcardPerm.actions.includes(action)) {
    return true
  }

  // Check specific resource permission
  const resourcePerm = context.permissions.find(p => p.resource === resource)
  return resourcePerm?.actions.includes(action) ?? false
}

/**
 * Require specific permission - throws if not authorized
 */
export function requirePermission(
  context: AuthContext,
  resource: string,
  action: "create" | "read" | "update" | "delete"
): void {
  if (!hasPermission(context, resource, action)) {
    throw new AuthError(
      `Not authorized to ${action} ${resource}`,
      "FORBIDDEN"
    )
  }
}

/**
 * Get permissions for role
 */
function getRolePermissions(role: UserRole): Permission[] {
  const rolePermissions: Record<UserRole, Permission[]> = {
    owner: [
      { resource: "*", actions: ["create", "read", "update", "delete"] },
    ],
    admin: [
      { resource: "users", actions: ["create", "read", "update", "delete"] },
      { resource: "leads", actions: ["create", "read", "update", "delete"] },
      { resource: "opportunities", actions: ["create", "read", "update", "delete"] },
      { resource: "campaigns", actions: ["create", "read", "update", "delete"] },
      { resource: "automations", actions: ["create", "read", "update", "delete"] },
      { resource: "appointments", actions: ["create", "read", "update", "delete"] },
      { resource: "audit_logs", actions: ["read"] },
      { resource: "settings", actions: ["read", "update"] },
    ],
    manager: [
      { resource: "users", actions: ["read"] },
      { resource: "leads", actions: ["create", "read", "update"] },
      { resource: "opportunities", actions: ["create", "read", "update"] },
      { resource: "campaigns", actions: ["read"] },
      { resource: "automations", actions: ["read"] },
      { resource: "appointments", actions: ["create", "read", "update", "delete"] },
    ],
    agent: [
      { resource: "leads", actions: ["read", "update"] },
      { resource: "opportunities", actions: ["read", "update"] },
      { resource: "appointments", actions: ["create", "read", "update"] },
    ],
  }

  return rolePermissions[role] || []
}

/**
 * Custom auth error class
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message)
    this.name = "AuthError"
  }
}
