
-- Critical Security Fixes: Missing Functions and Policy Cleanup
-- This migration implements the missing security functions and cleans up conflicting RLS policies

-- Step 1: Create missing validate_token_enhanced function
CREATE OR REPLACE FUNCTION public.validate_token_enhanced(token text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  validation_result jsonb;
  security_score integer := 100;
  warnings text[] := '{}';
BEGIN
  -- Basic format validation
  IF token IS NULL OR length(token) < 32 THEN
    RETURN jsonb_build_object(
      'valid', false,
      'security_score', 0,
      'errors', ARRAY['Token too short or null'],
      'suspicious', true
    );
  END IF;
  
  -- Character validation
  IF NOT (token ~ '^[A-Za-z0-9_-]+$') THEN
    security_score := security_score - 30;
    warnings := array_append(warnings, 'Invalid characters detected');
  END IF;
  
  -- Length validation (enhanced)
  IF length(token) > 128 THEN
    security_score := security_score - 20;
    warnings := array_append(warnings, 'Token unusually long');
  END IF;
  
  -- Pattern analysis for suspicious tokens
  IF token ~* '(test|debug|admin|root|system)' THEN
    security_score := security_score - 50;
    warnings := array_append(warnings, 'Suspicious token pattern detected');
  END IF;
  
  RETURN jsonb_build_object(
    'valid', security_score >= 50,
    'security_score', security_score,
    'warnings', warnings,
    'suspicious', security_score < 70
  );
END;
$$;

-- Step 2: Create comprehensive content validation function
CREATE OR REPLACE FUNCTION public.validate_content_comprehensive(content text, max_length integer DEFAULT 1000)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  errors text[] := '{}';
  warnings text[] := '{}';
  risk_level text := 'low';
  sanitized_content text;
  threat_patterns text[] := '{}';
  security_score integer := 100;
BEGIN
  -- Basic validation
  IF content IS NULL OR trim(content) = '' THEN
    errors := array_append(errors, 'Content cannot be empty');
    RETURN jsonb_build_object(
      'valid', false,
      'errors', errors,
      'sanitized', '',
      'risk_level', 'low',
      'security_score', 0,
      'threat_patterns', threat_patterns
    );
  END IF;
  
  IF length(content) > max_length THEN
    errors := array_append(errors, format('Content exceeds maximum length of %s characters', max_length));
    risk_level := 'high';
    security_score := security_score - 30;
  END IF;
  
  -- Comprehensive XSS Detection
  IF content ~* '(<script[^>]*>.*?</script>|javascript:|data:text/html|vbscript:|on\w+\s*=|<iframe[^>]*>|<object[^>]*>|<embed[^>]*>|<link[^>]*>|<style[^>]*>|<meta[^>]*>|expression\s*\(|@import|<base[^>]*>|eval\s*\(|setTimeout\s*\(|setInterval\s*\()' THEN
    errors := array_append(errors, 'Content contains XSS attack vectors');
    threat_patterns := array_append(threat_patterns, 'xss_attack');
    risk_level := 'high';
    security_score := 0;
  END IF;
  
  -- Enhanced SQL Injection Detection
  IF content ~* '(union\s+(all\s+)?select|drop\s+table|insert\s+into|delete\s+from|update\s+\w+\s+set|alter\s+table|create\s+table|--\s*$|/\*.*?\*/|\b(exec|execute)\s*\(|xp_cmdshell|sp_executesql|information_schema|sys\.|pg_|dbms_)' THEN
    errors := array_append(errors, 'Content contains SQL injection patterns');
    threat_patterns := array_append(threat_patterns, 'sql_injection');
    IF risk_level != 'high' THEN
      risk_level := 'high';
      security_score := security_score - 50;
    END IF;
  END IF;
  
  -- Command injection detection
  IF content ~* '(\||&|;|`|\$\(|\$\{|<\(|>\(|\\x|%0a|%0d|\n|\r)' THEN
    errors := array_append(errors, 'Content contains command injection patterns');
    threat_patterns := array_append(threat_patterns, 'command_injection');
    IF risk_level = 'low' THEN
      risk_level := 'medium';
      security_score := security_score - 25;
    END IF;
  END IF;
  
  -- Path traversal detection
  IF content ~* '(\.\.|%2e%2e|%252e|%c0%ae|%c1%9c)' THEN
    errors := array_append(errors, 'Content contains path traversal patterns');
    threat_patterns := array_append(threat_patterns, 'path_traversal');
    IF risk_level = 'low' THEN
      risk_level := 'medium';
      security_score := security_score - 20;
    END IF;
  END IF;
  
  -- Protocol-based attacks
  IF content ~* '(file://|ftp://|gopher://|ldap://|dict://|sftp://|telnet://|ssh://)' THEN
    errors := array_append(errors, 'Content contains suspicious protocols');
    threat_patterns := array_append(threat_patterns, 'protocol_attack');
    IF risk_level = 'low' THEN
      risk_level := 'medium';
      security_score := security_score - 15;
    END IF;
  END IF;
  
  -- Comprehensive content sanitization
  sanitized_content := content;
  sanitized_content := regexp_replace(sanitized_content, '<[^>]*>', '', 'g');
  sanitized_content := replace(sanitized_content, '&', '&amp;');
  sanitized_content := replace(sanitized_content, '<', '&lt;');
  sanitized_content := replace(sanitized_content, '>', '&gt;');
  sanitized_content := replace(sanitized_content, '"', '&quot;');
  sanitized_content := replace(sanitized_content, '''', '&#x27;');
  sanitized_content := replace(sanitized_content, '`', '&#x60;');
  sanitized_content := replace(sanitized_content, '=', '&#x3D;');
  sanitized_content := replace(sanitized_content, '/', '&#x2F;');
  
  -- Remove malicious protocols
  sanitized_content := regexp_replace(sanitized_content, '(javascript|data|vbscript):', '', 'gi');
  
  RETURN jsonb_build_object(
    'valid', array_length(errors, 1) IS NULL,
    'errors', errors,
    'warnings', warnings,
    'risk_level', risk_level,
    'sanitized', sanitized_content,
    'threat_patterns', threat_patterns,
    'security_score', security_score
  );
END;
$$;

-- Step 3: Clean up conflicting RLS policies on tea_submissions
DROP POLICY IF EXISTS "tea_submissions_public_read" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_secure_insert" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_insert_policy" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_select_policy" ON public.tea_submissions;

-- Create unified secure policies for tea_submissions
CREATE POLICY "tea_submissions_unified_read" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "tea_submissions_unified_insert" 
  ON public.tea_submissions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_secure(anonymous_token) AND
    content IS NOT NULL AND
    length(trim(content)) >= 3 AND
    length(content) <= 1000 AND
    category IN ('general', 'celebrity', 'business', 'politics', 'tech', 'sports')
  );

-- Step 4: Clean up conflicting RLS policies on user_reactions
DROP POLICY IF EXISTS "user_reactions_public_read" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_secure_insert" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_secure_update" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_insert_policy" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_select_policy" ON public.user_reactions;

-- Create unified secure policies for user_reactions
CREATE POLICY "user_reactions_unified_read" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "user_reactions_unified_insert" 
  ON public.user_reactions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_secure(anonymous_token) AND
    reaction_type IN ('hot', 'cold', 'spicy')
  );

CREATE POLICY "user_reactions_unified_update" 
  ON public.user_reactions 
  FOR UPDATE 
  USING (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_secure(anonymous_token)
  )
  WITH CHECK (
    reaction_type IN ('hot', 'cold', 'spicy')
  );

-- Step 5: Grant proper permissions
GRANT EXECUTE ON FUNCTION public.validate_token_enhanced TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.validate_content_comprehensive TO authenticated, anon;

-- Step 6: Create security health check function
CREATE OR REPLACE FUNCTION public.security_health_check()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  policy_conflicts integer;
  missing_functions text[] := '{}';
  security_score integer := 100;
  issues text[] := '{}';
BEGIN
  -- Check for policy conflicts
  SELECT COUNT(*) INTO policy_conflicts
  FROM pg_policies 
  WHERE schemaname = 'public' 
    AND tablename IN ('tea_submissions', 'user_reactions', 'admin_audit_log')
  GROUP BY tablename 
  HAVING COUNT(*) > 3;
  
  IF policy_conflicts > 0 THEN
    security_score := security_score - 30;
    issues := array_append(issues, format('Policy conflicts detected: %s tables affected', policy_conflicts));
  END IF;
  
  -- Check for missing critical functions
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'validate_token_enhanced') THEN
    missing_functions := array_append(missing_functions, 'validate_token_enhanced');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'validate_content_comprehensive') THEN
    missing_functions := array_append(missing_functions, 'validate_content_comprehensive');
  END IF;
  
  IF array_length(missing_functions, 1) > 0 THEN
    security_score := security_score - 50;
    issues := array_append(issues, format('Missing critical functions: %s', array_to_string(missing_functions, ', ')));
  END IF;
  
  RETURN jsonb_build_object(
    'security_score', security_score,
    'policy_conflicts', policy_conflicts,
    'missing_functions', missing_functions,
    'issues', issues,
    'status', CASE 
      WHEN security_score >= 90 THEN 'excellent'
      WHEN security_score >= 70 THEN 'good'
      WHEN security_score >= 50 THEN 'needs_attention'
      ELSE 'critical'
    END,
    'last_check', now()
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.security_health_check TO authenticated;

-- Log this critical security fix
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'critical_security_fixes_applied',
  jsonb_build_object(
    'functions_created', 3,
    'policies_cleaned', 8,
    'security_level', 'hardened',
    'timestamp', now(),
    'phase', 'critical_cleanup'
  )
);
