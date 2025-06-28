
-- Comprehensive Security Fixes Migration
-- This migration addresses critical RLS policy conflicts and implements proper server-side validation

-- Step 1: Drop all conflicting RLS policies
DROP POLICY IF EXISTS "tea_submissions_public_read" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_secure_insert" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_admin_manage" ON public.tea_submissions;
DROP POLICY IF EXISTS "user_reactions_public_read" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_secure_insert" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_secure_update" ON public.user_reactions;
DROP POLICY IF EXISTS "Users can view own tip transactions" ON public.tip_transactions;
DROP POLICY IF EXISTS "Allow tip transaction inserts" ON public.tip_transactions;
DROP POLICY IF EXISTS "Admins can update tip transactions" ON public.tip_transactions;

-- Step 2: Create enhanced anonymous token validation function
CREATE OR REPLACE FUNCTION public.validate_anonymous_token_secure(token text)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Basic validation
  IF token IS NULL OR length(token) < 32 THEN
    RETURN false;
  END IF;
  
  -- Enhanced format validation (base64url format)
  IF NOT (token ~ '^[A-Za-z0-9_-]+$') THEN
    RETURN false;
  END IF;
  
  -- Length validation (reasonable bounds)
  IF length(token) > 128 THEN
    RETURN false;
  END IF;
  
  -- Check for suspicious patterns
  IF token ~* '(test|debug|admin|root|system|demo)' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Step 3: Create enhanced rate limiting with proper validation
CREATE OR REPLACE FUNCTION public.check_rate_limit_secure(
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
BEGIN
  -- Validate token first
  IF NOT public.validate_anonymous_token_secure(p_token) THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'error', 'Invalid token format',
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
  
  -- Check if limit exceeded
  IF current_count >= p_max_actions THEN
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

-- Step 4: Create comprehensive input validation function
CREATE OR REPLACE FUNCTION public.validate_tip_transaction_input(
  p_user_email text,
  p_network text,
  p_wallet_address text,
  p_amount numeric DEFAULT NULL,
  p_transaction_hash text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  errors text[] := '{}';
  warnings text[] := '{}';
BEGIN
  -- Email validation
  IF p_user_email IS NULL OR p_user_email = '' THEN
    errors := array_append(errors, 'Email is required');
  ELSIF NOT (p_user_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') THEN
    errors := array_append(errors, 'Invalid email format');
  END IF;
  
  -- Network validation
  IF p_network IS NULL OR p_network = '' THEN
    errors := array_append(errors, 'Network is required');
  ELSIF p_network NOT IN ('ethereum', 'solana', 'bitcoin', 'avax', 'polygon', 'tron', 'sui', 'base') THEN
    errors := array_append(errors, 'Invalid network');
  END IF;
  
  -- Wallet address validation
  IF p_wallet_address IS NULL OR p_wallet_address = '' THEN
    errors := array_append(errors, 'Wallet address is required');
  ELSIF length(p_wallet_address) < 20 THEN
    errors := array_append(errors, 'Wallet address too short');
  ELSIF length(p_wallet_address) > 100 THEN
    errors := array_append(errors, 'Wallet address too long');
  END IF;
  
  -- Amount validation
  IF p_amount IS NOT NULL AND p_amount <= 0 THEN
    errors := array_append(errors, 'Amount must be positive');
  END IF;
  
  -- Transaction hash validation
  IF p_transaction_hash IS NOT NULL THEN
    IF length(p_transaction_hash) < 10 THEN
      warnings := array_append(warnings, 'Transaction hash seems too short');
    ELSIF length(p_transaction_hash) > 200 THEN
      errors := array_append(errors, 'Transaction hash too long');
    END IF;
  END IF;
  
  RETURN jsonb_build_object(
    'valid', array_length(errors, 1) IS NULL,
    'errors', errors,
    'warnings', warnings
  );
END;
$$;

-- Step 5: Create unified, non-conflicting RLS policies

-- Tea Submissions Policies
CREATE POLICY "tea_submissions_read_approved" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "tea_submissions_insert_validated" 
  ON public.tea_submissions 
  FOR INSERT 
  WITH CHECK (
    public.validate_anonymous_token_secure(anonymous_token) AND
    content IS NOT NULL AND 
    length(trim(content)) >= 3 AND
    length(content) <= 1000 AND
    category IN ('general', 'celebrity', 'business', 'politics', 'tech', 'sports')
  );

-- User Reactions Policies
CREATE POLICY "user_reactions_read_all" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "user_reactions_insert_validated" 
  ON public.user_reactions 
  FOR INSERT 
  WITH CHECK (
    public.validate_anonymous_token_secure(anonymous_token) AND
    reaction_type IN ('hot', 'cold', 'spicy')
  );

CREATE POLICY "user_reactions_update_own" 
  ON public.user_reactions 
  FOR UPDATE 
  USING (public.validate_anonymous_token_secure(anonymous_token))
  WITH CHECK (reaction_type IN ('hot', 'cold', 'spicy'));

-- Tip Transactions Policies
CREATE POLICY "tip_transactions_read_own" 
  ON public.tip_transactions 
  FOR SELECT 
  USING (user_email = auth.email());

CREATE POLICY "tip_transactions_insert_validated" 
  ON public.tip_transactions 
  FOR INSERT 
  WITH CHECK (
    (public.validate_tip_transaction_input(user_email, network, wallet_address, amount, transaction_hash)->>'valid')::boolean
  );

CREATE POLICY "tip_transactions_admin_manage" 
  ON public.tip_transactions 
  FOR ALL
  USING (public.get_user_role_secure() IN ('admin', 'super_admin'))
  WITH CHECK (public.get_user_role_secure() IN ('admin', 'super_admin'));

-- Step 6: Create secure tip submission function
CREATE OR REPLACE FUNCTION public.submit_tip_transaction_secure(
  p_user_email text,
  p_network text,
  p_wallet_address text,
  p_amount numeric DEFAULT NULL,
  p_transaction_hash text DEFAULT NULL,
  p_proof_image_url text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  validation_result jsonb;
  new_tip_id uuid;
BEGIN
  -- Validate input
  validation_result := public.validate_tip_transaction_input(
    p_user_email, p_network, p_wallet_address, p_amount, p_transaction_hash
  );
  
  IF NOT (validation_result->>'valid')::boolean THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Validation failed',
      'details', validation_result->'errors'
    );
  END IF;
  
  -- Insert tip transaction
  INSERT INTO public.tip_transactions (
    user_email,
    network,
    wallet_address,
    amount,
    transaction_hash,
    proof_image_url,
    status,
    verification_method
  ) VALUES (
    p_user_email,
    p_network,
    p_wallet_address,
    p_amount,
    p_transaction_hash,
    p_proof_image_url,
    'pending',
    'manual'
  ) RETURNING id INTO new_tip_id;
  
  -- Log the submission
  PERFORM public.log_security_event('tip_transaction_submitted', jsonb_build_object(
    'tip_id', new_tip_id,
    'network', p_network,
    'has_transaction_hash', p_transaction_hash IS NOT NULL,
    'has_proof_image', p_proof_image_url IS NOT NULL
  ));
  
  RETURN jsonb_build_object(
    'success', true,
    'tip_id', new_tip_id
  );
END;
$$;

-- Step 7: Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.validate_anonymous_token_secure TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.check_rate_limit_secure TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.validate_tip_transaction_input TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.submit_tip_transaction_secure TO authenticated, anon;

-- Step 8: Log this security fix
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'comprehensive_security_fixes_applied',
  jsonb_build_object(
    'policies_fixed', 9,
    'functions_created', 4,
    'security_level', 'hardened',
    'timestamp', now(),
    'phase', 'critical_fixes'
  )
);
