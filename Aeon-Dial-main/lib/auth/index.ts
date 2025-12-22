// ═══════════════════════════════════════════════════════════════════════════════
// AEON Dial Auth - Public API
// ═══════════════════════════════════════════════════════════════════════════════

// Core auth context
export {
  getAuthContext,
  requireAuth,
  hasPermission,
  requirePermission,
  AuthError,
  type AuthResult,
} from "./context"

// User bootstrap
export { bootstrapUser } from "./bootstrap"

// Recovery utilities
export {
  diagnoseAndRecover,
  handleRoleChange,
  type RecoveryAction,
  type RecoveryResult,
} from "./recovery"

// Types
export type {
  AeonUser,
  Organization,
  AuthContext,
  Permission,
  UserRole,
  AuditEventType,
  AuditLogEntry,
} from "./types"

export { ROLE_PERMISSIONS } from "./types"
