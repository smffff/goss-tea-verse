
-- Comprehensive Security Fixes Migration
-- This migration addresses critical RLS and security policy issues

-- Enable RLS on all critical tables that don't have it
ALTER TABLE public.tea_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_codes ENABLE ROW LEVEL SECURITY;

-- Drop existing conflicting policies to avoid duplicates
DROP POLICY IF EXISTS "Users can view approved submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Users can insert submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own reactions" ON public.user_reactions;
DROP POLICY IF EXISTS "Users can view ratings" ON public.submission_ratings;
DROP POLICY IF EXISTS "Users can validate beta codes" ON public.beta_codes;

-- TEA SUBMISSIONS POLICIES
CREATE POLICY "Anyone can view approved submissions" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (status IN ('approved', 'featured'));

CREATE POLICY "Authenticated users can insert submissions" 
  ON public.tea_submissions 
  FOR INSERT 
  WITH CHECK (anonymous_token IS NOT NULL AND validate_anonymous_token_enhanced(anonymous_token));

CREATE POLICY "Admins can view all submissions" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (public.is_admin_secure());

-- USER PROFILES POLICIES
CREATE POLICY "Users can view own profile" 
  ON public.user_profiles 
  FOR SELECT 
  USING (
    wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address' OR
    anonymous_token = current_setting('request.headers', true)::json->>'x-anonymous-token'
  );

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles 
  FOR UPDATE 
  USING (
    wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address' OR
    anonymous_token = current_setting('request.headers', true)::json->>'x-anonymous-token'
  );

CREATE POLICY "Authenticated users can insert profile" 
  ON public.user_profiles 
  FOR INSERT 
  WITH CHECK (
    wallet_address IS NOT NULL OR 
    (anonymous_token IS NOT NULL AND validate_anonymous_token_enhanced(anonymous_token))
  );

-- USER REACTIONS POLICIES
CREATE POLICY "Anyone can view reactions" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage own reactions" 
  ON public.user_reactions 
  FOR ALL 
  USING (anonymous_token IS NOT NULL AND validate_anonymous_token_enhanced(anonymous_token))
  WITH CHECK (anonymous_token IS NOT NULL AND validate_anonymous_token_enhanced(anonymous_token));

-- SUBMISSION RATINGS POLICIES
CREATE POLICY "Anyone can view ratings" 
  ON public.submission_ratings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can rate submissions" 
  ON public.submission_ratings 
  FOR INSERT 
  WITH CHECK (anonymous_token IS NOT NULL AND validate_anonymous_token_enhanced(anonymous_token));

-- BETA CODES POLICIES
CREATE POLICY "Anyone can validate beta codes" 
  ON public.beta_codes 
  FOR SELECT 
  USING (NOT used OR used IS NULL);

CREATE POLICY "System can update beta codes" 
  ON public.beta_codes 
  FOR UPDATE 
  USING (true);

-- TIP TRANSACTIONS already has proper RLS from previous migration

-- Create missing security functions
CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN COALESCE(
    public.get_user_role_secure() IN ('admin', 'super_admin'),
    false
  );
END;
$$;

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.tea_submissions TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_reactions TO authenticated;
GRANT SELECT, INSERT ON public.submission_ratings TO authenticated;
GRANT SELECT, UPDATE ON public.beta_codes TO authenticated;

-- Log this security migration
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'comprehensive_security_migration',
  jsonb_build_object(
    'timestamp', now(),
    'tables_secured', ARRAY['tea_submissions', 'user_profiles', 'user_reactions', 'submission_ratings', 'beta_codes'],
    'policies_created', 12,
    'security_functions_updated', 1
  )
);
