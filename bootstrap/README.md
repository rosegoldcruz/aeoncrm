# AEON Bootstrap

A deterministic convergence engine that forces the system into a known-good state.

## What This Is

- **NOT** a seed file
- **NOT** a migration
- **NOT** a test script

The bootstrap **IS** a convergence engine that guarantees system integrity.

## Usage

```bash
# Run full bootstrap
pnpm bootstrap

# Run specific checks only
pnpm bootstrap:check

# Run with verbose output
pnpm bootstrap --verbose

# Dry run (no changes)
pnpm bootstrap --dry-run
```

## Guarantees

Every run guarantees:

1. **Auth Alignment** - Supabase Auth configured correctly
2. **Schema Integrity** - Required tables, columns, constraints exist
3. **RLS Enforcement** - Row Level Security policies in place
4. **System Users & Orgs** - No orphaned users, system entities exist
5. **Automation Spine** - Actions table, triggers, hooks alive
6. **Health Verification** - End-to-end data flow works

## Environment

Requires `.env` with:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Principle

> If prod explodes, don't debug — re-bootstrap.
