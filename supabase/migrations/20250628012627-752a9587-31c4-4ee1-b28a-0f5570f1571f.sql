
-- Comprehensive Security Fixes Migration - Phase 1
-- This migration fixes critical RLS policy conflicts and security gaps

-- Step 1: Drop all conflicting RLS policies
DROP POLICY IF EXISTS "tea_submissions_public_read" ON public.tea_submissions;
DROP POLICY IF EXISTS "tea_submissions_secure_insert" ON public.tea_submissions;
DROP POLICY IF EXISTS "user_reactions_public_read" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_secure_insert" ON public.user_reactions;
DROP POLICY IF EXISTS "user_reactions_secure_update" ON public.user_reactions;
DROP POLICY IF EXISTS "Allow tip transaction inserts" ON public.tip_transactions;
DROP POLICY IF EXISTS "Users can view own tip transactions" ON public.tip_transactions;
DROP POLICY IF EXISTS "Admins can update tip transactions" ON public.tip_transactions;

-- Step 2: Create unified, secure RLS policies for tea_submissions
CREATE POLICY "tea_submissions_read_approved" 
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
    category IN ('general', 'celebrity', 'business', 'politics', 'tech', 'sports') AND
    (evidence_urls IS NULL OR array_length(evidence_urls, 1) <= 5)
  );

-- Step 3: Create unified, secure RLS policies for user_reactions
CREATE POLICY "user_reactions_read_public" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "user_reactions_secure_insert" 
  ON public.user_reactions 
  FOR INSERT 
  WITH CHECK (
    anonymous_token IS NOT NULL AND 
    public.validate_anonymous_token_enhanced(anonymous_token) AND
    reaction_type IN ('hot', 'cold', 'spicy') AND
    submission_id IS NOT NULL
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

-- Step 4: Create secure RLS policies for tip_transactions with proper validation
CREATE POLICY "tip_transactions_user_read" 
  ON public.tip_transactions
  FOR SELECT 
  USING (user_email = auth.email());

CREATE POLICY "tip_transactions_secure_insert" 
  ON public.tip_transactions
  FOR INSERT 
  WITH CHECK (
    user_email IS NOT NULL AND
    user_email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' AND
    network IS NOT NULL AND
    network IN ('ethereum', 'bitcoin', 'solana', 'polygon', 'bsc', 'avalanche') AND
    wallet_address IS NOT NULL AND
    length(wallet_address) >= 26 AND
    length(wallet_address) <= 62 AND
    (amount IS NULL OR (amount > 0 AND amount <= 1000000)) AND
    (transaction_hash IS NULL OR length(transaction_hash) >= 32) AND
    status IN ('pending', 'verified', 'rejected', 'expired') AND
    verification_method IN ('manual', 'blockchain', 'email')
  );

CREATE POLICY "tip_transactions_admin_update" 
  ON public.tip_transactions
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_email = auth.email() 
      AND role IN ('admin', 'super_admin') 
      AND is_active = true
    )
  );

-- Step 5: Create secure server-side functions for tip verification
CREATE OR REPLACE FUNCTION public.submit_tip_transaction_secure(
  p_user_email text,
  p_network text,
  p_wallet_address text,
  p_amount decimal DEFAULT NULL,
  p_transaction_hash text DEFAULT NULL,
  p_proof_image_url text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_tip_id uuid;
  validation_errors text[] := '{}';
BEGIN
  -- Validate email format
  IF p_user_email IS NULL OR NOT (p_user_email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
    validation_errors := array_append(validation_errors, 'Invalid email format');
  END IF;
  
  -- Validate network
  IF p_network IS NULL OR NOT (p_network IN ('ethereum', 'bitcoin', 'solana', 'polygon', 'bsc', 'avalanche')) THEN
    validation_errors := array_append(validation_errors, 'Invalid or unsupported network');
  END IF;
  
  -- Validate wallet address
  IF p_wallet_address IS NULL OR length(p_wallet_address) < 26 OR length(p_wallet_address) > 62 THEN
    validation_errors := array_append(validation_errors, 'Invalid wallet address format');
  END IF;
  
  -- Validate amount if provided
  IF p_amount IS NOT NULL AND (p_amount <= 0 OR p_amount > 1000000) THEN
    validation_errors := array_append(validation_errors, 'Amount must be between 0 and 1,000,000');
  END IF;
  
  -- Validate transaction hash if provided
  IF p_transaction_hash IS NOT NULL AND length(p_transaction_hash) < 32 THEN
    validation_errors := array_append(validation_errors, 'Transaction hash too short');
  END IF;
  
  -- Return validation errors if any
  IF array_length(validation_errors, 1) > 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'errors', validation_errors
    );
  END IF;
  
  -- Insert the tip transaction
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
    'has_amount', p_amount IS NOT NULL,
    'has_transaction_hash', p_transaction_hash IS NOT NULL
  ));
  
  RETURN jsonb_build_object(
    'success', true,
    'tip_id', new_tip_id
  );
END;
$$;

-- Step 6: Create enhanced anonymous token validation function
CREATE OR REPLACE FUNCTION public.validate_anonymous_token_secure(token text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
BEGIN
  -- Enhanced validation with stricter checks
  IF token IS NULL OR length(token) < 32 THEN
    RETURN false;
  END IF;
  
  -- Check for proper base64url format
  IF NOT (token ~ '^[A-Za-z0-9_-]+$') THEN
    RETURN false;
  END IF;
  
  -- Length validation (should be reasonable for base64url encoded data)
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

-- Step 7: Grant proper permissions
GRANT EXECUTE ON FUNCTION public.submit_tip_transaction_secure TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_anonymous_token_secure TO authenticated;

-- Step 8: Log this security hardening
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'comprehensive_security_fixes_phase1',
  jsonb_build_object(
    'policies_recreated', 8,
    'functions_created', 2,
    'security_level', 'hardened',
    'phase', 1,
    'timestamp', now()
  )
);
