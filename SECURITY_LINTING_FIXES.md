# Security Linting Fixes

This document addresses the two security warnings identified by Supabase's security linter:

## Issues Identified

### 1. Function Search Path Mutable
- **Issue**: Function `public.update_tip_transactions_updated_at` has a mutable search path
- **Risk**: Potential for search path injection attacks
- **Severity**: WARN

### 2. Auth OTP Long Expiry
- **Issue**: OTP expiry exceeds recommended threshold (more than 1 hour)
- **Risk**: Increased window for OTP-based attacks
- **Severity**: WARN

## Fixes Applied

### 1. Function Search Path Fix ✅

**Migration**: `20250628020000_fix_security_linting_issues.sql`

The function has been updated with:
- `SECURITY DEFINER` attribute
- Explicit `SET search_path = public`
- Proper security hardening

```sql
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
```

### 2. OTP Expiry Fix ⚠️

**Manual Action Required**: Update OTP expiry in Supabase dashboard

**Recommended Setting**: 15 minutes (900 seconds) or less

**Steps**:
1. Go to Supabase Dashboard
2. Navigate to Authentication > Settings > Email Auth
3. Set "OTP Expiry" to 900 seconds (15 minutes)
4. Save changes

## Security Monitoring

### New Functions Created

1. **`check_security_compliance()`**
   - Monitors security settings
   - Returns compliance status
   - Identifies potential issues

2. **`validate_auth_settings()`**
   - Validates authentication configuration
   - Provides OTP expiry recommendations

### Usage

```sql
-- Check overall security compliance
SELECT * FROM check_security_compliance();

-- Validate auth settings
SELECT * FROM validate_auth_settings();
```

## Implementation Steps

### 1. Apply Database Migration
```bash
supabase db push
```

### 2. Update OTP Settings
```bash
./scripts/fix-otp-expiry.sh
```

### 3. Verify Fixes
```sql
-- Check security compliance
SELECT * FROM check_security_compliance();

-- Verify function security
SELECT proname, prosecdef, proconfig 
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.proname = 'update_tip_transactions_updated_at';
```

## Security Benefits

### Function Search Path Fix
- ✅ Prevents search path injection attacks
- ✅ Ensures consistent schema resolution
- ✅ Improves function security posture

### OTP Expiry Fix
- ✅ Reduces attack window for OTP-based attacks
- ✅ Follows security best practices
- ✅ Complies with Supabase recommendations

## Monitoring and Maintenance

### Regular Security Checks
Run the security compliance function regularly:
```sql
SELECT * FROM check_security_compliance();
```

### Audit Logging
All security fixes are logged in `admin_audit_log` table:
```sql
SELECT * FROM admin_audit_log 
WHERE action LIKE '%security%' 
ORDER BY created_at DESC;
```

## References

- [Supabase Security Linting Documentation](https://supabase.com/docs/guides/database/database-linter)
- [Supabase Production Security Guide](https://supabase.com/docs/guides/platform/going-into-prod#security)
- [PostgreSQL Security Best Practices](https://www.postgresql.org/docs/current/security.html)

## Status

- ✅ Function search path mutable: **FIXED**
- ⚠️ Auth OTP long expiry: **MANUAL ACTION REQUIRED**

Both issues will be resolved once the OTP settings are updated in the Supabase dashboard. 