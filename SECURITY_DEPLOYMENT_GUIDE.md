# 🔒 CTea Security Deployment Guide

## Overview
This guide walks you through completing the Supabase security deployment for the CTea Newsroom application.

## ✅ What's Already Complete

- ✅ Supabase CLI installed and configured
- ✅ Edge Function `harden_security` deployed to project `luubdvuuxvtkheyhzepm`
- ✅ Project linked locally for CLI/database operations
- ✅ Security SQL script prepared (`scripts/apply-security-sql.sql`)
- ✅ GitHub Actions workflow created (`.github/workflows/harden-security.yml`)

## 🚀 Immediate Next Steps

### Step 1: Apply Security SQL Script

1. **Open Supabase Dashboard**
   - Go to [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project: `luubdvuuxvtkheyhzepm`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Apply the Security Script**
   - Copy the entire contents of `scripts/apply-security-sql.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

4. **Verify Execution**
   - You should see success messages for:
     - Role creation (app_admin, human_moderator, ai_moderator, trusted_app)
     - Function search_path updates
     - Privilege revocations
     - Audit log creation

### Step 2: Test the Edge Function

Run this command to test the deployed edge function:

```bash
curl -X POST https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Security hardening completed successfully",
  "timestamp": "2024-01-XX..."
}
```

### Step 3: Set Up GitHub Actions Secret

1. **Go to GitHub Repository Settings**
   - Navigate to your GitHub repository
   - Click "Settings" tab
   - Click "Secrets and variables" → "Actions"

2. **Add the Secret**
   - Click "New repository secret"
   - Name: `HARDEN_SECURITY_ENDPOINT`
   - Value: `https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security`
   - Click "Add secret"

### Step 4: Monitor Security Status

Run these SQL queries in the Supabase Dashboard to monitor security:

```sql
-- Check security status of all functions
SELECT * FROM get_security_status();

-- View recent security audit logs
SELECT * FROM security_audit_log ORDER BY created_at DESC LIMIT 10;

-- Check role permissions
SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin
FROM pg_roles 
WHERE rolname IN ('app_admin', 'human_moderator', 'ai_moderator', 'trusted_app');
```

## 🔧 Automated Testing

Use the provided test script to verify everything is working:

```bash
chmod +x scripts/test-security-deployment.sh
./scripts/test-security-deployment.sh
```

## 📊 What This Security Setup Provides

### **4 Security Roles Created:**
- **`app_admin`**: Full administrative access
- **`human_moderator`**: Content moderation capabilities
- **`ai_moderator`**: AI-powered moderation functions
- **`trusted_app`**: Application-level user management

### **Security Hardening Applied:**
- ✅ Revoked `CREATE` privileges on public schema from `PUBLIC`
- ✅ Revoked `EXECUTE` on all security definer functions from `PUBLIC`
- ✅ Set secure `search_path` for flagged functions
- ✅ Created audit logging system
- ✅ Implemented role-based access control

### **Automated Security:**
- ✅ Weekly security hardening via GitHub Actions
- ✅ Manual trigger capability for immediate hardening
- ✅ Failure notifications via GitHub Issues
- ✅ Audit trail for compliance

## 🚨 Monitoring & Maintenance

### **Weekly Checks:**
1. Review GitHub Actions workflow runs
2. Check security audit logs in Supabase
3. Verify edge function health

### **Monthly Reviews:**
1. Review role permissions
2. Audit function security settings
3. Update security policies as needed

### **Security Audit Commands:**
```bash
# Test edge function health
curl -s https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security

# Check security status (via Supabase CLI)
supabase db function call get_security_status --project-ref luubdvuuxvtkheyhzepm

# View audit logs
supabase db query "SELECT * FROM security_audit_log ORDER BY created_at DESC LIMIT 5" --project-ref luubdvuuxvtkheyhzepm
```

## 🔗 Related Files

- `scripts/apply-security-sql.sql` - Security hardening SQL script
- `scripts/test-security-deployment.sh` - Deployment verification script
- `supabase/functions/harden_security/index.ts` - Edge function implementation
- `.github/workflows/harden-security.yml` - Automated security workflow

## 🎯 Success Criteria

Your security deployment is complete when:

1. ✅ SQL script executes without errors
2. ✅ Edge function returns success response
3. ✅ GitHub Actions secret is configured
4. ✅ Weekly automation is scheduled
5. ✅ Security audit logs are being generated
6. ✅ All 4 security roles are created and configured

## 🆘 Troubleshooting

### **Edge Function Returns 503:**
- Function may not be deployed: `supabase functions deploy harden_security`
- Check function logs in Supabase Dashboard

### **SQL Script Errors:**
- Ensure you're running as a superuser in Supabase
- Check for existing roles/functions that may conflict

### **GitHub Actions Failures:**
- Verify the secret endpoint URL is correct
- Check that the edge function is accessible
- Review workflow logs for specific error messages

---

**🎉 Congratulations!** Your CTea Newsroom backend is now secured and ready for production deployment. 