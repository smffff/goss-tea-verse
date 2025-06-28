
-- Security Phase 2: Enhanced Server-Side Functions
-- This migration adds the missing secure functions for submissions and reactions

-- Enhanced rate limiting function with security monitoring
CREATE OR REPLACE FUNCTION public.check_rate_limit_ultimate(
  p_token text,
  p_action text,
  p_max_actions integer DEFAULT 10,
  p_window_minutes integer DEFAULT 60
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count integer;
  window_start_time timestamp with time zone;
  token_validation jsonb;
  suspicious_activity boolean := false;
BEGIN
  -- Enhanced token validation
  token_validation := public.validate_token_enhanced(p_token);
  
  IF NOT (token_validation->>'valid')::boolean THEN
    PERFORM public.log_security_event('invalid_token_rate_limit', jsonb_build_object(
      'token_validation', token_validation,
      'action', p_action
    ));
    
    RETURN jsonb_build_object(
      'allowed', false,
      'blocked_reason', 'Invalid token',
      'security_violation', true
    );
  END IF;
  
  window_start_time := now() - (p_window_minutes || ' minutes')::interval;
  
  -- Clean up old records
  DELETE FROM public.rate_limits 
  WHERE window_start < (now() - interval '24 hours');
  
  -- Get current count
  SELECT COALESCE(action_count, 0) INTO current_count
  FROM public.rate_limits
  WHERE anonymous_token = p_token 
    AND action_type = p_action
    AND window_start >= window_start_time;
  
  -- Detect suspicious rapid-fire attempts
  IF current_count >= (p_max_actions * 0.8) THEN
    suspicious_activity := true;
    PERFORM public.log_security_event('suspicious_rate_limit_pattern', jsonb_build_object(
      'current_count', current_count,
      'max_actions', p_max_actions,
      'action', p_action,
      'token_security_score', token_validation->>'security_score'
    ));
  END IF;
  
  -- Check if limit exceeded
  IF current_count >= p_max_actions THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'current_count', current_count,
      'max_actions', p_max_actions,
      'reset_time', (window_start_time + (p_window_minutes || ' minutes')::interval),
      'blocked_reason', 'Rate limit exceeded',
      'security_violation', suspicious_activity
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
    'remaining', p_max_actions - (current_count + 1),
    'suspicious_activity', suspicious_activity
  );
END;
$$;

-- Enhanced security event logging function
CREATE OR REPLACE FUNCTION public.log_security_event_enhanced(
  event_type text,
  details jsonb DEFAULT '{}'::jsonb,
  severity text DEFAULT 'info'::text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_audit_log (
    admin_email,
    action,
    details,
    ip_address,
    user_agent,
    target_table
  ) VALUES (
    COALESCE(auth.jwt() ->> 'email', 'anonymous'),
    'security_event_enhanced',
    jsonb_build_object(
      'event_type', event_type,
      'severity', severity,
      'timestamp', now(),
      'client_info', jsonb_build_object(
        'user_agent', current_setting('request.headers', true)::json->>'user-agent',
        'ip_address', current_setting('request.headers', true)::json->>'x-forwarded-for'
      ),
      'details', details
    ),
    COALESCE(current_setting('request.headers', true)::json->>'x-forwarded-for', 'unknown'),
    COALESCE(current_setting('request.headers', true)::json->>'user-agent', 'unknown'),
    'security_log_enhanced'
  );
END;
$$;

-- Enhanced gamification rate limiting
CREATE OR REPLACE FUNCTION public.check_gamification_rate_limit(
  p_token text,
  p_action text,
  p_max_actions integer DEFAULT 10,
  p_window_minutes integer DEFAULT 60
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Use the enhanced rate limiting with gamification-specific logging
  RETURN public.check_rate_limit_ultimate(p_token, 'gamification_' || p_action, p_max_actions, p_window_minutes);
END;
$$;

-- Grant proper permissions
GRANT EXECUTE ON FUNCTION public.check_rate_limit_ultimate TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.log_security_event_enhanced TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_gamification_rate_limit TO authenticated, anon;

-- Log this security enhancement
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'security_phase2_functions_created',
  jsonb_build_object(
    'functions_created', 3,
    'security_level', 'enhanced',
    'phase', 2,
    'timestamp', now()
  )
);
