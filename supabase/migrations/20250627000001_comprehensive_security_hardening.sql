
-- Comprehensive Security Hardening Migration
-- This migration implements critical security fixes for CTea

-- Step 1: Clean up all conflicting RLS policies
DROP POLICY IF EXISTS "tea_submissions_access_policy" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_insert_policy" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_update_policy" ON public.tea_submissions;
DROP POLICY IF EXISTS "user_reactions_select_policy" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_insert_policy" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_update_policy" ON public.user_reactions;
DROP POLICY IF EXISTS "security_audit_log_access_policy" ON public.security_audit_log;
DROP POLICY IF EXISTS "admin_audit_log_access_policy" ON public.admin_audit_log;

-- Step 2: Create secure, non-conflicting RLS policies for tea_submissions
CREATE POLICY "tea_submissions_public_read" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "tea_submissions_secure_insert" 
  ON public.tea_submissions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_enhanced(anonymous_token) AND
    public.validate_content_secure(content, 1000)->>'valid' = 'true'
  );

CREATE POLICY "tea_submissions_admin_manage" 
  ON public.tea_submissions 
  FOR ALL
  USING (public.is_admin_secure())
  WITH CHECK (public.is_admin_secure());

-- Step 3: Create secure policies for user_reactions
CREATE POLICY "user_reactions_public_read" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "user_reactions_secure_insert" 
  ON public.user_reactions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_enhanced(anonymous_token)
  );

-- Step 4: Secure admin tables
CREATE POLICY "admin_audit_log_admin_only" 
  ON public.admin_audit_log 
  FOR ALL
  USING (public.is_admin_secure())
  WITH CHECK (public.is_admin_secure());

CREATE POLICY "security_audit_log_admin_only" 
  ON public.security_audit_log 
  FOR ALL
  USING (public.is_admin_secure())
  WITH CHECK (true);

-- Step 5: Create enhanced security functions
CREATE OR REPLACE FUNCTION public.secure_submission_insert(
  p_content text,
  p_anonymous_token text,
  p_category text DEFAULT 'general'
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  validation_result jsonb;
  rate_limit_result jsonb;
  new_submission_id uuid;
BEGIN
  -- Validate token
  IF NOT public.validate_anonymous_token_enhanced(p_anonymous_token) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid authentication token'
    );
  END IF;
  
  -- Check rate limit
  rate_limit_result := public.check_rate_limit_ultimate(p_anonymous_token, 'submission', 5, 60);
  
  IF NOT (rate_limit_result->>'allowed')::boolean THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Rate limit exceeded',
      'details', rate_limit_result
    );
  END IF;
  
  -- Validate content
  validation_result := public.validate_content_server_side(p_content, 1000);
  
  IF NOT (validation_result->>'valid')::boolean THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Content validation failed',
      'details', validation_result->'errors'
    );
  END IF;
  
  -- Insert submission with sanitized content
  INSERT INTO public.tea_submissions (
    content,
    anonymous_token,
    category,
    status
  ) VALUES (
    validation_result->>'sanitized',
    p_anonymous_token,
    p_category,
    CASE 
      WHEN validation_result->>'risk_level' = 'critical' THEN 'flagged'
      WHEN validation_result->>'risk_level' = 'high' THEN 'pending'
      ELSE 'approved'
    END
  ) RETURNING id INTO new_submission_id;
  
  -- Log successful submission
  PERFORM public.log_security_event('secure_submission_created', jsonb_build_object(
    'submission_id', new_submission_id,
    'risk_level', validation_result->>'risk_level'
  ), 'info');
  
  RETURN jsonb_build_object(
    'success', true,
    'submission_id', new_submission_id,
    'status', CASE 
      WHEN validation_result->>'risk_level' = 'critical' THEN 'flagged'
      WHEN validation_result->>'risk_level' = 'high' THEN 'pending'
      ELSE 'approved'
    END
  );
END;
$$;

-- Step 6: Create secure reaction function
CREATE OR REPLACE FUNCTION public.secure_reaction_insert(
  p_submission_id uuid,
  p_anonymous_token text,
  p_reaction_type text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rate_limit_result jsonb;
BEGIN
  -- Validate token
  IF NOT public.validate_anonymous_token_enhanced(p_anonymous_token) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid authentication token'
    );
  END IF;
  
  -- Validate reaction type
  IF p_reaction_type NOT IN ('hot', 'cold', 'spicy') THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid reaction type'
    );
  END IF;
  
  -- Check rate limit
  rate_limit_result := public.check_rate_limit_ultimate(p_anonymous_token, 'reaction', 20, 15);
  
  IF NOT (rate_limit_result->>'allowed')::boolean THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Rate limit exceeded'
    );
  END IF;
  
  -- Insert or update reaction
  INSERT INTO public.user_reactions (submission_id, anonymous_token, reaction_type)
  VALUES (p_submission_id, p_anonymous_token, p_reaction_type)
  ON CONFLICT (submission_id, anonymous_token) 
  DO UPDATE SET reaction_type = EXCLUDED.reaction_type;
  
  RETURN jsonb_build_object('success', true);
END;
$$;

-- Step 7: Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.secure_submission_insert TO authenticated;
GRANT EXECUTE ON FUNCTION public.secure_reaction_insert TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit_ultimate TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_content_server_side TO authenticated;

-- Step 8: Log this security hardening
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'comprehensive_security_hardening_applied',
  jsonb_build_object(
    'policies_fixed', 8,
    'functions_created', 2,
    'security_level', 'hardened',
    'timestamp', now(),
    'version', '1.0'
  )
);
