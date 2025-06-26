
-- Fix Security Policy Conflicts Migration
-- This migration resolves RLS policy conflicts and security issues

-- Step 1: Drop all conflicting policies to start clean
DROP POLICY IF EXISTS "Admins can view security audit log" ON public.security_audit_log;
DROP POLICY IF EXISTS "Moderators can insert security audit log" ON public.security_audit_log;
DROP POLICY IF EXISTS "System can insert security audit log" ON public.security_audit_log;
DROP POLICY IF EXISTS "admin_audit_log_unified_policy" ON public.admin_audit_log;
DROP POLICY IF EXISTS "tea_submissions_unified_select" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_unified_insert" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_unified_update" ON public.tea_submissions;
DROP POLICY IF EXISTS "user_reactions_unified_select" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_unified_insert" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_unified_update" ON public.user_reactions;

-- Step 2: Enable RLS on security_audit_log table if not enabled
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Step 3: Create single, non-conflicting policies for security_audit_log
CREATE POLICY "security_audit_log_access_policy" 
  ON public.security_audit_log 
  FOR ALL
  USING (public.is_admin_secure())
  WITH CHECK (true);

-- Step 4: Create single, non-conflicting policies for admin_audit_log
CREATE POLICY "admin_audit_log_access_policy" 
  ON public.admin_audit_log 
  FOR ALL
  USING (public.is_admin_secure())
  WITH CHECK (public.is_moderator_or_admin_secure());

-- Step 5: Create single, non-conflicting policies for tea_submissions
CREATE POLICY "tea_submissions_access_policy" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (status = 'approved' OR public.is_moderator_or_admin_secure());

CREATE POLICY "tea_submissions_insert_policy" 
  ON public.tea_submissions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_enhanced(anonymous_token)
  );

CREATE POLICY "tea_submissions_update_policy" 
  ON public.tea_submissions 
  FOR UPDATE 
  USING (public.is_moderator_or_admin_secure())
  WITH CHECK (public.is_moderator_or_admin_secure());

-- Step 6: Create single, non-conflicting policies for user_reactions
CREATE POLICY "user_reactions_select_policy" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "user_reactions_insert_policy" 
  ON public.user_reactions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_enhanced(anonymous_token)
  );

CREATE POLICY "user_reactions_update_policy" 
  ON public.user_reactions 
  FOR UPDATE 
  USING (
    anonymous_token = current_setting('request.jwt.claims', true)::json->>'anonymous_token' OR
    public.is_moderator_or_admin_secure()
  );

-- Step 7: Grant appropriate permissions
GRANT SELECT ON public.security_audit_log TO authenticated;
GRANT INSERT ON public.security_audit_log TO authenticated;
GRANT SELECT ON public.admin_audit_log TO authenticated;
GRANT INSERT ON public.admin_audit_log TO authenticated;

-- Step 8: Create enhanced is_admin_secure function if it doesn't exist
CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.get_user_role_secure() IN ('admin', 'super_admin');
END;
$$;

-- Step 9: Log this security fix
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'security_policy_conflicts_resolved',
  jsonb_build_object(
    'policies_fixed', 8,
    'tables_secured', 4,
    'security_level', 'enhanced',
    'timestamp', now()
  )
);
