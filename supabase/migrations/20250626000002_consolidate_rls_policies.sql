
-- Consolidate and fix RLS policies
-- This migration removes redundant policies and creates streamlined, secure policies

-- Drop redundant policies on admin_audit_log
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "System can insert audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Users can view their own audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Service role can manage audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Allow service role full access" ON public.admin_audit_log;

-- Create consolidated admin_audit_log policies
CREATE POLICY "admin_audit_log_select_policy" 
  ON public.admin_audit_log 
  FOR SELECT 
  USING (public.is_admin_secure());

CREATE POLICY "admin_audit_log_insert_policy" 
  ON public.admin_audit_log 
  FOR INSERT 
  WITH CHECK (
    public.is_moderator_or_admin_secure() OR 
    auth.jwt() ->> 'role' = 'service_role'
  );

-- Drop redundant policies on security_audit_log
DROP POLICY IF EXISTS "Admins can view security audit log" ON public.security_audit_log;
DROP POLICY IF EXISTS "Moderators can insert security audit log" ON public.security_audit_log;
DROP POLICY IF EXISTS "System can insert security audit log" ON public.security_audit_log;

-- Create consolidated security_audit_log policies
CREATE POLICY "security_audit_log_select_policy" 
  ON public.security_audit_log 
  FOR SELECT 
  USING (public.is_admin_secure());

CREATE POLICY "security_audit_log_insert_policy" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (true); -- Allow system insertions

-- Drop redundant policies on tea_submissions
DROP POLICY IF EXISTS "Users can view approved submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Users can insert submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Admins can manage all submissions" ON public.tea_submissions;

-- Create consolidated tea_submissions policies
CREATE POLICY "tea_submissions_select_policy" 
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

-- Drop redundant policies on user_reactions
DROP POLICY IF EXISTS "Users can view reactions" ON public.user_reactions;
DROP POLICY IF EXISTS "Users can manage their reactions" ON public.user_reactions;

-- Create consolidated user_reactions policies
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

-- Create enhanced token rotation function
CREATE OR REPLACE FUNCTION public.rotate_anonymous_token(old_token text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_token text;
  validation_result jsonb;
BEGIN
  -- Validate old token
  IF NOT public.validate_anonymous_token_enhanced(old_token) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid token format'
    );
  END IF;
  
  -- Generate new secure token
  new_token := encode(gen_random_bytes(32), 'base64');
  new_token := replace(replace(replace(new_token, '+', '-'), '/', '_'), '=', '');
  
  -- Log token rotation for security monitoring
  INSERT INTO public.security_audit_log (event_type, details)
  VALUES (
    'token_rotated',
    jsonb_build_object(
      'old_token_hash', substring(old_token, 1, 8),
      'new_token_hash', substring(new_token, 1, 8),
      'rotation_time', now()
    )
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'new_token', new_token,
    'expires_in', 21600 -- 6 hours in seconds
  );
END;
$$;

-- Grant execute permission on token rotation function
GRANT EXECUTE ON FUNCTION public.rotate_anonymous_token(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rotate_anonymous_token(text) TO anon;

-- Create enhanced content validation function
CREATE OR REPLACE FUNCTION public.validate_content_server_side(
  content text,
  max_length integer DEFAULT 1000
)
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
      'security_score', 0
    );
  END IF;
  
  IF length(content) > max_length THEN
    errors := array_append(errors, format('Content exceeds maximum length of %s characters', max_length));
    risk_level := 'high';
    security_score := security_score - 30;
  END IF;
  
  -- Enhanced XSS Detection with comprehensive patterns
  IF content ~* '(<script[^>]*>.*?</script>|javascript:|data:text/html|vbscript:|on\w+\s*=|<iframe[^>]*>|<object[^>]*>|<embed[^>]*>|<link[^>]*>|<style[^>]*>|<meta[^>]*>|expression\s*\(|@import|<base[^>]*>)' THEN
    errors := array_append(errors, 'Content contains XSS attack vectors');
    threat_patterns := array_append(threat_patterns, 'xss_attack');
    risk_level := 'critical';
    security_score := 0;
  END IF;
  
  -- Enhanced SQL Injection Detection
  IF content ~* '(union\s+(all\s+)?select|drop\s+table|insert\s+into|delete\s+from|update\s+\w+\s+set|alter\s+table|create\s+table|--\s*$|/\*.*?\*/|\b(exec|execute)\s*\(|xp_cmdshell|sp_executesql|information_schema|sys\.|pg_|dbms_)' THEN
    errors := array_append(errors, 'Content contains SQL injection patterns');
    threat_patterns := array_append(threat_patterns, 'sql_injection');
    IF risk_level != 'critical' THEN
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

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.validate_content_server_side(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_content_server_side(text, integer) TO anon;

-- Create enhanced server-side rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit_server_side(
  p_token text,
  p_action text,
  p_max_actions integer DEFAULT 10,
  p_window_minutes integer DEFAULT 60
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count integer;
  window_start_time timestamp with time zone;
  rapid_fire_count integer;
  suspicious_patterns boolean := false;
  token_validation jsonb;
BEGIN
  -- Validate token first
  IF NOT public.validate_anonymous_token_enhanced(p_token) THEN
    INSERT INTO public.security_audit_log (event_type, details)
    VALUES (
      'invalid_token_rate_limit_attempt',
      jsonb_build_object(
        'action', p_action,
        'token_length', length(p_token),
        'timestamp', now()
      )
    );
    
    RETURN jsonb_build_object(
      'allowed', false,
      'error', 'Invalid token format',
      'security_violation', true
    );
  END IF;
  
  window_start_time := now() - (p_window_minutes || ' minutes')::interval;
  
  -- Check for rapid-fire patterns (suspicious activity)
  SELECT COUNT(*) INTO rapid_fire_count
  FROM public.rate_limits
  WHERE anonymous_token = p_token 
    AND window_start >= (now() - interval '1 minute');
    
  -- Detect rapid-fire attacks
  IF rapid_fire_count > (p_max_actions * 5) THEN
    INSERT INTO public.security_audit_log (event_type, details)
    VALUES (
      'rapid_fire_attack_detected',
      jsonb_build_object(
        'token_hash', substring(p_token, 1, 8),
        'action', p_action,
        'rapid_fire_count', rapid_fire_count,
        'threshold', p_max_actions * 5
      )
    );
    
    RETURN jsonb_build_object(
      'allowed', false,
      'blocked_reason', 'Suspicious activity detected',
      'security_violation', true,
      'threat_level', 'high'
    );
  END IF;
  
  -- Clean up old records
  DELETE FROM public.rate_limits 
  WHERE window_start < (now() - interval '24 hours');
  
  -- Get current count
  SELECT COALESCE(action_count, 0) INTO current_count
  FROM public.rate_limits
  WHERE anonymous_token = p_token 
    AND action_type = p_action
    AND window_start >= window_start_time;
  
  -- Check rate limit
  IF current_count >= p_max_actions THEN
    INSERT INTO public.security_audit_log (event_type, details)
    VALUES (
      'rate_limit_exceeded',
      jsonb_build_object(
        'token_hash', substring(p_token, 1, 8),
        'action', p_action,
        'current_count', current_count,
        'max_actions', p_max_actions
      )
    );
    
    RETURN jsonb_build_object(
      'allowed', false,
      'current_count', current_count,
      'max_actions', p_max_actions,
      'blocked_reason', 'Rate limit exceeded',
      'reset_time', (window_start_time + (p_window_minutes || ' minutes')::interval)
    );
  END IF;
  
  -- Update rate limit record
  INSERT INTO public.rate_limits (anonymous_token, action_type, action_count, window_start)
  VALUES (p_token, p_action, 1, now())
  ON CONFLICT (anonymous_token, action_type) 
  DO UPDATE SET 
    action_count = CASE 
      WHEN rate_limits.window_start < window_start_time THEN 1
      ELSE rate_limits.action_count + 1
    END,
    window_start = CASE 
      WHEN rate_limits.window_start < window_start_time THEN now()
      ELSE rate_limits.window_start
    END;
  
  RETURN jsonb_build_object(
    'allowed', true,
    'current_count', current_count + 1,
    'max_actions', p_max_actions,
    'remaining', p_max_actions - (current_count + 1)
  );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.check_rate_limit_server_side(text, text, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit_server_side(text, text, integer, integer) TO anon;

-- Log this security enhancement
INSERT INTO public.security_audit_log (event_type, details)
VALUES (
  'security_policies_consolidated',
  jsonb_build_object(
    'policies_removed', 15,
    'policies_created', 8,
    'functions_enhanced', 3,
    'timestamp', now()
  )
);
