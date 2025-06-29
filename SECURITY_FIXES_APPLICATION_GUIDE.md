# Security Fixes Application Guide

This guide will help you apply the security fixes for the two linting issues identified by Supabase.

## 🔍 Issues to Fix

1. **Function Search Path Mutable** - `update_tip_transactions_updated_at` function
2. **Auth OTP Long Expiry** - OTP expiry exceeds 1-hour recommendation

## 🚀 Quick Fix Method

### Option 1: SQL Script (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm
   - Navigate to **SQL Editor**

2. **Run the Security Fix Script**
   - Copy the contents of `scripts/apply-security-fixes.sql`
   - Paste into the SQL Editor
   - Click **Run**

3. **Verify the Fixes**
   - The script will automatically run verification queries
   - Check the results to confirm both issues are resolved

### Option 2: Manual Steps

#### Step 1: Fix Function Search Path

Run this SQL in your Supabase SQL Editor:

```sql
-- Fix the function search path mutable issue
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
```

#### Step 2: Fix OTP Expiry Settings

1. **Go to Authentication Settings**
   - Dashboard: https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/auth/settings
   - Click on **Email Auth** tab

2. **Update OTP Expiry**
   - Find **OTP Expiry** setting
   - Change to **900 seconds (15 minutes)** or less
   - Click **Save**

## ✅ Verification Steps

### 1. Check Function Security

```sql
-- Verify function has SECURITY DEFINER and proper search_path
SELECT 
  proname,
  prosecdef,
  proconfig
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.proname = 'update_tip_transactions_updated_at';
```

**Expected Result:**
- `prosecdef` should be `true`
- `proconfig` should contain search_path setting

### 2. Check Security Compliance

```sql
-- Run the security compliance checker
SELECT * FROM check_security_compliance();
```

**Expected Result:**
- `checks_passed` should be 3
- `security_level` should be "secure"
- `otp_action_required` should be true (until you update OTP settings)

### 3. Verify OTP Settings

```sql
-- Get OTP settings recommendation
SELECT * FROM validate_auth_settings();
```

## 🔧 Troubleshooting

### If Function Fix Fails

```sql
-- Check if function exists
SELECT proname FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.proname = 'update_tip_transactions_updated_at';

-- If it doesn't exist, check the original migration
SELECT * FROM supabase_migrations.schema_migrations 
WHERE name LIKE '%tip_transactions%' 
ORDER BY version DESC;
```

### If OTP Settings Can't Be Changed

1. **Check User Permissions**
   - Ensure you have admin access to the project
   - Contact project owner if needed

2. **Alternative Method**
   - Use Supabase CLI: `supabase auth config --otp-expiry 900`
   - Or contact Supabase support

## 📊 Expected Results

After applying both fixes:

### Security Compliance Check
```json
{
  "checks_passed": 3,
  "total_checks": 3,
  "issues": [],
  "warnings": [],
  "security_level": "secure",
  "timestamp": "2025-06-29T...",
  "otp_action_required": false
}
```

### Function Security
```json
{
  "proname": "update_tip_transactions_updated_at",
  "prosecdef": true,
  "proconfig": ["search_path=public"]
}
```

## 🎯 Next Steps

1. **Apply the fixes** using one of the methods above
2. **Verify the results** using the verification queries
3. **Run security linter again** to confirm issues are resolved
4. **Monitor security compliance** regularly using `check_security_compliance()`

## 📞 Support

If you encounter any issues:

1. **Check the logs** in Supabase dashboard
2. **Review the migration files** in `supabase/migrations/`
3. **Run verification queries** to identify specific problems
4. **Contact support** with specific error messages

## 🔒 Security Benefits

- **Function Search Path Fix**: Prevents search path injection attacks
- **OTP Expiry Fix**: Reduces attack window for OTP-based attacks
- **Monitoring**: Continuous security compliance checking
- **Audit Trail**: All changes logged in `admin_audit_log` 