-- ═══════════════════════════════════════════════════════════════════════════════
-- AEON Dial Row Level Security Policies
-- All access scoped by org_id using Supabase Auth (auth.uid())
-- ═══════════════════════════════════════════════════════════════════════════════

-- Helper function: Get current user's org_id
CREATE OR REPLACE FUNCTION public.get_user_org_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT org_id FROM public.users WHERE id = auth.uid()
$$;

-- Helper function: Get current user's role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.users WHERE id = auth.uid()
$$;

-- Helper function: Check if user is admin or owner
CREATE OR REPLACE FUNCTION public.is_admin_or_owner()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role IN ('admin', 'owner') FROM public.users WHERE id = auth.uid()
$$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- USERS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read all users in their org
CREATE POLICY "users_select_own_org" ON public.users
  FOR SELECT
  USING (org_id = public.get_user_org_id());

-- Users can update their own profile
CREATE POLICY "users_update_self" ON public.users
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Admins/owners can insert new users in their org
CREATE POLICY "users_insert_admin" ON public.users
  FOR INSERT
  WITH CHECK (
    org_id = public.get_user_org_id() 
    AND public.is_admin_or_owner()
  );

-- Admins/owners can update any user in their org
CREATE POLICY "users_update_admin" ON public.users
  FOR UPDATE
  USING (
    org_id = public.get_user_org_id() 
    AND public.is_admin_or_owner()
  );

-- Admins/owners can delete users in their org (soft delete preferred)
CREATE POLICY "users_delete_admin" ON public.users
  FOR DELETE
  USING (
    org_id = public.get_user_org_id() 
    AND public.is_admin_or_owner()
    AND id != auth.uid() -- Cannot delete self
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- ORGANIZATIONS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Users can read their own org
CREATE POLICY "organizations_select_own" ON public.organizations
  FOR SELECT
  USING (id = public.get_user_org_id());

-- Only owners can update org settings
CREATE POLICY "organizations_update_owner" ON public.organizations
  FOR UPDATE
  USING (
    id = public.get_user_org_id() 
    AND public.get_user_role() = 'owner'
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- LEADS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Admins/managers can see all leads in org
-- Agents can only see assigned leads
CREATE POLICY "leads_select" ON public.leads
  FOR SELECT
  USING (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR public.get_user_role() = 'manager'
      OR assigned_to = auth.uid()
    )
  );

-- Admins/managers can insert leads
CREATE POLICY "leads_insert" ON public.leads
  FOR INSERT
  WITH CHECK (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR public.get_user_role() = 'manager'
    )
  );

-- Admins/managers can update any lead, agents only assigned
CREATE POLICY "leads_update" ON public.leads
  FOR UPDATE
  USING (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR public.get_user_role() = 'manager'
      OR assigned_to = auth.uid()
    )
  );

-- Only admins can delete leads
CREATE POLICY "leads_delete" ON public.leads
  FOR DELETE
  USING (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- OPPORTUNITIES TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Same pattern as leads
CREATE POLICY "opportunities_select" ON public.opportunities
  FOR SELECT
  USING (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR public.get_user_role() = 'manager'
      OR assigned_to = auth.uid()
    )
  );

CREATE POLICY "opportunities_insert" ON public.opportunities
  FOR INSERT
  WITH CHECK (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR public.get_user_role() = 'manager'
    )
  );

CREATE POLICY "opportunities_update" ON public.opportunities
  FOR UPDATE
  USING (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR public.get_user_role() = 'manager'
      OR assigned_to = auth.uid()
    )
  );

CREATE POLICY "opportunities_delete" ON public.opportunities
  FOR DELETE
  USING (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- APPOINTMENTS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- All users can see appointments in their org
CREATE POLICY "appointments_select" ON public.appointments
  FOR SELECT
  USING (org_id = public.get_user_org_id());

-- All users can create appointments
CREATE POLICY "appointments_insert" ON public.appointments
  FOR INSERT
  WITH CHECK (org_id = public.get_user_org_id());

-- Users can update their own appointments, admins can update all
CREATE POLICY "appointments_update" ON public.appointments
  FOR UPDATE
  USING (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR created_by = auth.uid()
      OR assigned_to = auth.uid()
    )
  );

-- Admins can delete, users can delete their own
CREATE POLICY "appointments_delete" ON public.appointments
  FOR DELETE
  USING (
    org_id = public.get_user_org_id()
    AND (
      public.is_admin_or_owner()
      OR created_by = auth.uid()
    )
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- CAMPAIGNS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- All users can view campaigns
CREATE POLICY "campaigns_select" ON public.campaigns
  FOR SELECT
  USING (org_id = public.get_user_org_id());

-- Only admins can manage campaigns
CREATE POLICY "campaigns_insert" ON public.campaigns
  FOR INSERT
  WITH CHECK (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

CREATE POLICY "campaigns_update" ON public.campaigns
  FOR UPDATE
  USING (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

CREATE POLICY "campaigns_delete" ON public.campaigns
  FOR DELETE
  USING (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- ACTIONS TABLE (System Events)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;

-- All users can view actions in their org
CREATE POLICY "actions_select" ON public.actions
  FOR SELECT
  USING (org_id = public.get_user_org_id());

-- System and users can insert actions
CREATE POLICY "actions_insert" ON public.actions
  FOR INSERT
  WITH CHECK (org_id = public.get_user_org_id());

-- Actions are immutable - no updates
-- Actions are immutable - no deletes

-- ═══════════════════════════════════════════════════════════════════════════════
-- AUTOMATIONS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;

-- All users can view automations
CREATE POLICY "automations_select" ON public.automations
  FOR SELECT
  USING (org_id = public.get_user_org_id());

-- Only admins can manage automations
CREATE POLICY "automations_insert" ON public.automations
  FOR INSERT
  WITH CHECK (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

CREATE POLICY "automations_update" ON public.automations
  FOR UPDATE
  USING (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

CREATE POLICY "automations_delete" ON public.automations
  FOR DELETE
  USING (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- AUTOMATION_RUNS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.automation_runs ENABLE ROW LEVEL SECURITY;

-- All users can view automation runs
CREATE POLICY "automation_runs_select" ON public.automation_runs
  FOR SELECT
  USING (org_id = public.get_user_org_id());

-- System inserts automation runs
CREATE POLICY "automation_runs_insert" ON public.automation_runs
  FOR INSERT
  WITH CHECK (org_id = public.get_user_org_id());

-- Runs are immutable

-- ═══════════════════════════════════════════════════════════════════════════════
-- AUDIT_LOGS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "audit_logs_select" ON public.audit_logs
  FOR SELECT
  USING (
    org_id = public.get_user_org_id()
    AND public.is_admin_or_owner()
  );

-- System can insert audit logs
CREATE POLICY "audit_logs_insert" ON public.audit_logs
  FOR INSERT
  WITH CHECK (org_id = public.get_user_org_id());

-- Audit logs are immutable - no updates, no deletes

-- ═══════════════════════════════════════════════════════════════════════════════
-- GRANT EXECUTE ON HELPER FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

GRANT EXECUTE ON FUNCTION public.get_user_org_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_or_owner() TO authenticated;
