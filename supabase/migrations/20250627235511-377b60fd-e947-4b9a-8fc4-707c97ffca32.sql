
-- Critical Security Fixes Migration (Fixed)
-- This migration implements comprehensive security hardening for CTea

-- Step 1: Create the missing secure functions that are being called in the code
CREATE OR REPLACE FUNCTION public.secure_submission_insert(
  p_content text,
  p_anonymous_token text,
  p_category text DEFAULT 'general',
  p_evidence_urls text[] DEFAULT NULL
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
    evidence_urls,
    status,
    has_evidence,
    reactions,
    average_rating,
    rating_count,
    verification_score
  ) VALUES (
    validation_result->>'sanitized',
    p_anonymous_token,
    p_category,
    p_evidence_urls,
    CASE 
      WHEN validation_result->>'risk_level' = 'critical' THEN 'flagged'
      WHEN validation_result->>'risk_level' = 'high' THEN 'pending'
      ELSE 'approved'
    END,
    p_evidence_urls IS NOT NULL AND array_length(p_evidence_urls, 1) > 0,
    jsonb_build_object('hot', 0, 'cold', 0, 'spicy', 0),
    0,
    0,
    CASE validation_result->>'security_score'
      WHEN NULL THEN 50
      ELSE (validation_result->>'security_score')::integer
    END
  ) RETURNING id INTO new_submission_id;
  
  -- Log successful submission using existing function
  PERFORM public.log_security_event('secure_submission_created', jsonb_build_object(
    'submission_id', new_submission_id,
    'risk_level', validation_result->>'risk_level'
  ));
  
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

-- Step 2: Create secure reaction insert function
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

-- Step 3: Fix overly permissive RLS policies
DROP POLICY IF EXISTS "user_reactions_public_read" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_secure_insert" ON public.user_reactions;

CREATE POLICY "user_reactions_public_read" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "user_reactions_secure_insert" 
  ON public.user_reactions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_enhanced(anonymous_token) AND
    reaction_type IN ('hot', 'cold', 'spicy')
  );

CREATE POLICY "user_reactions_secure_update" 
  ON public.user_reactions 
  FOR UPDATE 
  USING (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_enhanced(anonymous_token)
  )
  WITH CHECK (
    reaction_type IN ('hot', 'cold', 'spicy')
  );

-- Step 4: Tighten tea_submissions policies
DROP POLICY IF EXISTS "tea_submissions_public_read" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_secure_insert" ON public.tea_submissions;

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
    content IS NOT NULL AND
    length(trim(content)) >= 3 AND
    length(content) <= 1000 AND
    category IN ('general', 'celebrity', 'business', 'politics', 'tech', 'sports')
  );

-- Step 5: Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.secure_submission_insert TO authenticated;
GRANT EXECUTE ON FUNCTION public.secure_reaction_insert TO authenticated;

-- Step 6: Log this security hardening
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'critical_security_fixes_applied',
  jsonb_build_object(
    'functions_created', 2,
    'policies_tightened', 4,
    'security_level', 'hardened',
    'timestamp', now(),
    'version', '2.0'
  )
);
