-- Fix Security Audit Log RLS
-- This migration enables RLS on the security_audit_log table and creates appropriate policies

-- Enable RLS on security_audit_log table
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Admins can view security audit log" ON public.security_audit_log;
DROP POLICY IF EXISTS "Moderators can insert security audit log" ON public.security_audit_log;
DROP POLICY IF EXISTS "System can insert security audit log" ON public.security_audit_log;

-- Create comprehensive policies for security_audit_log
CREATE POLICY "Admins can view security audit log" 
  ON public.security_audit_log 
  FOR SELECT 
  USING (public.is_admin_secure());

CREATE POLICY "Moderators can insert security audit log" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (public.is_moderator_or_admin_secure());

CREATE POLICY "System can insert security audit log" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (true);

-- Grant appropriate permissions
GRANT SELECT ON public.security_audit_log TO authenticated;
GRANT INSERT ON public.security_audit_log TO authenticated;

-- Log this security fix
INSERT INTO public.security_audit_log (event_type, function_name, details)
VALUES (
  'rls_enabled_on_security_audit_log',
  'migration',
  jsonb_build_object(
    'table', 'security_audit_log',
    'policies_created', 3,
    'timestamp', now()
  )
); 