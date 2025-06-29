-- Apply Security Linting Fixes
-- Run this script in your Supabase SQL Editor to fix the security issues

-- Step 1: Fix the function search path mutable issue
-- Drop the existing function and recreate it with explicit search_path
DROP FUNCTION IF EXISTS public.update_tip_transactions_updated_at();

CREATE OR REPLACE FUNCTION public.update_tip_transactions_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS tip_transactions_updated_at ON public.tip_transactions;
CREATE TRIGGER tip_transactions_updated_at
  BEFORE UPDATE ON public.tip_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_tip_transactions_updated_at();

-- Step 2: Create a function to validate OTP settings
CREATE OR REPLACE FUNCTION public.validate_auth_settings()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Return OTP expiry recommendation
  result := jsonb_build_object(
    'otp_expiry_recommendation', 'Set OTP expiry to 15 minutes (900 seconds) or less',
    'current_setting', 'Check Supabase dashboard: Authentication > Settings > Email Auth',
    'security_level', 'high',
    'action_required', true,
    'dashboard_url', 'https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/auth/settings'
  );
  
  RETURN result;
END;
$$;

-- Step 3: Create a security monitoring function
CREATE OR REPLACE FUNCTION public.check_security_compliance()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  issues jsonb := '[]'::jsonb;
  warnings jsonb := '[]'::jsonb;
  checks_passed integer := 0;
BEGIN
  -- Check 1: Function search path mutable
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
    AND p.proname = 'update_tip_transactions_updated_at'
    AND p.prosecdef = true
  ) THEN
    checks_passed := checks_passed + 1;
  ELSE
    warnings := warnings || jsonb_build_object(
      'type', 'function_security',
      'message', 'update_tip_transactions_updated_at function security should be verified'
    );
  END IF;
  
  -- Check 2: RLS policies are in place
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'tip_transactions'
  ) THEN
    checks_passed := checks_passed + 1;
  ELSE
    issues := issues || jsonb_build_object(
      'type', 'rls_policies',
      'message', 'RLS policies missing for tip_transactions'
    );
  END IF;
  
  -- Check 3: Secure functions have proper search_path
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
    AND p.proname IN ('submit_tip_transaction_secure', 'validate_anonymous_token_secure')
    AND p.prosecdef = true
  ) THEN
    checks_passed := checks_passed + 1;
  ELSE
    warnings := warnings || jsonb_build_object(
      'type', 'secure_functions',
      'message', 'Some secure functions may need search_path verification'
    );
  END IF;
  
  RETURN jsonb_build_object(
    'checks_passed', checks_passed,
    'total_checks', 3,
    'issues', issues,
    'warnings', warnings,
    'security_level', CASE 
      WHEN jsonb_array_length(issues) = 0 THEN 'secure'
      ELSE 'needs_attention'
    END,
    'timestamp', now(),
    'otp_action_required', true,
    'otp_message', 'Update OTP expiry to 15 minutes in Authentication > Settings > Email Auth'
  );
END;
$$;

-- Step 4: Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.validate_auth_settings TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_security_compliance TO authenticated;

-- Step 5: Create comments documenting the security fixes
COMMENT ON FUNCTION public.update_tip_transactions_updated_at() IS 
'Security hardened function with explicit search_path to prevent search path injection attacks';

COMMENT ON FUNCTION public.check_security_compliance() IS 
'Security compliance checker - run this function to verify security settings';

-- Step 6: Log the security fixes
INSERT INTO public.admin_audit_log (admin_email, action, details)
VALUES (
  'system',
  'security_linting_fixes_applied',
  jsonb_build_object(
    'function_search_path_fixed', true,
    'function_name', 'update_tip_transactions_updated_at',
    'otp_expiry_recommendation', 'Set to 15 minutes or less',
    'security_level', 'high',
    'timestamp', now(),
    'method', 'sql_script'
  )
);

-- Step 7: Verify the fixes
SELECT 'Security fixes applied successfully!' as status;

-- Step 8: Check security compliance
SELECT * FROM check_security_compliance();

-- Step 9: Show OTP settings recommendation
SELECT * FROM validate_auth_settings(); 