// ═══════════════════════════════════════════════════════════════════════════════
// AEON Dial Auth Types
// ═══════════════════════════════════════════════════════════════════════════════

export type UserRole = "owner" | "admin" | "manager" | "agent"

export interface AeonUser {
  id: string // Matches auth.users.id
  org_id: string
  email: string
  full_name: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  owner_id: string
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface AuthContext {
  user: AeonUser
  org: Organization
  permissions: Permission[]
}

export interface Permission {
  resource: string
  actions: ("create" | "read" | "update" | "delete")[]
}

// Role-based permission matrix
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
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
    { resource: "leads", actions: ["read", "update"] }, // Only assigned leads
    { resource: "opportunities", actions: ["read", "update"] }, // Only assigned
    { resource: "appointments", actions: ["create", "read", "update"] },
  ],
}

// Audit log event types
export type AuditEventType =
  | "user_created"
  | "user_updated"
  | "user_deleted"
  | "user_login"
  | "user_logout"
  | "lead_created"
  | "lead_updated"
  | "lead_deleted"
  | "opportunity_created"
  | "opportunity_updated"
  | "opportunity_deleted"
  | "campaign_created"
  | "campaign_updated"
  | "automation_triggered"
  | "settings_updated"
  | "role_changed"
  | "org_settings_updated"

export interface AuditLogEntry {
  id?: string
  org_id: string
  actor_id: string
  event_type: AuditEventType
  resource_type: string
  resource_id: string | null
  metadata: Record<string, unknown>
  ip_address?: string
  user_agent?: string
  created_at?: string
}
