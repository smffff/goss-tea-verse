# 🔒 CTea Security Hardening Deployment Guide

## 🎯 Overview

Your security hardening system is **95% ready**! This guide will help you complete the final deployment steps to get your automated security enforcement live.

## 📋 Current Status

✅ **SQL Migration**: `20250101000000_security_hardening.sql` - Ready  
✅ **Edge Function**: `harden_security/index.ts` - Ready  
✅ **GitHub Workflow**: `.github/workflows/harden-security.yml` - Ready  
✅ **Deployment Script**: `scripts/deploy-security.sh` - Ready  

## 🚀 Quick Deployment (Recommended)

Run the automated deployment script:

```bash
./scripts/deploy-security.sh
```

This script will:
- Install Supabase CLI if needed
- Check/setup environment variables
- Deploy the Edge Function
- Test the deployment
- Guide you through GitHub Secrets setup

## 🔧 Manual Deployment Steps

If you prefer manual deployment, follow these steps:

### 1. Install Supabase CLI

**macOS (with Homebrew):**
```bash
brew install supabase/tap/supabase
```

**Linux:**
```bash
curl -fsSL https://supabase.com/install.sh | sh
```

**Windows:**
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### 2. Setup Environment Variables

Create `.env.local` in your project root:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Replace with your actual values from Supabase Dashboard
```

**To get these values:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and service_role key

### 3. Deploy Edge Function

```bash
supabase functions deploy harden_security
```

### 4. Test the Deployment

```bash
curl -X POST https://your-project-ref.functions.supabase.co/harden_security \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

Expected response:
```json
{
  "success": true,
  "message": "Security hardening completed successfully",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 5. Setup GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"**
4. Add:
   - **Name**: `HARDEN_SECURITY_ENDPOINT`
   - **Value**: `https://your-project-ref.functions.supabase.co/harden_security`

## 🧪 Testing Your Setup

### Test Edge Function
```bash
curl -X POST https://your-project-ref.functions.supabase.co/harden_security
```

### Test GitHub Workflow
1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **"Weekly Security Hardening"** workflow
4. Click **"Run workflow"** → **"Run workflow"**

### Check Security Status
In your Supabase Dashboard SQL Editor:
```sql
SELECT * FROM get_security_status();
```

### View Security Audit Log
```sql
SELECT * FROM security_audit_log ORDER BY created_at DESC LIMIT 10;
```

## 🔍 Troubleshooting

### Edge Function Deployment Fails
```bash
# Check Supabase CLI version
supabase --version

# Check project status
supabase status

# Try with verbose output
supabase functions deploy harden_security --debug
```

### Function Returns Error
Common issues:
1. **Missing environment variables** - Check `.env.local`
2. **Invalid service role key** - Regenerate in Supabase Dashboard
3. **Database migration not applied** - Run `supabase db push`

### GitHub Action Fails
1. Check the **Actions** tab for error details
2. Verify the `HARDEN_SECURITY_ENDPOINT` secret is set correctly
3. Ensure the endpoint URL is accessible

## 📊 Monitoring

### Security Audit Log
The system automatically logs all security events:
```sql
-- View recent security events
SELECT 
  event_type,
  function_name,
  details,
  created_at
FROM security_audit_log 
ORDER BY created_at DESC;
```

### Security Status Dashboard
```sql
-- Check overall security status
SELECT * FROM get_security_status();
```

### GitHub Actions Logs
- Go to **Actions** tab in your repository
- Click on the **"Weekly Security Hardening"** workflow
- View run history and logs

## 🔄 Automation Schedule

Your security hardening runs:
- **Automatically**: Every Sunday at 3 AM UTC
- **On Push**: When security-related files change
- **Manually**: Via GitHub Actions UI

## 🛡️ What Gets Hardened

The system automatically:
1. **Creates Security Roles**: `app_admin`, `human_moderator`, `ai_moderator`, `trusted_app`
2. **Revokes Public Privileges**: Removes dangerous public access
3. **Sets Secure Search Paths**: Prevents search path attacks
4. **Grants Specific Permissions**: Role-based access control
5. **Logs Security Events**: Complete audit trail

## 📞 Support

If you encounter issues:

1. **Check the logs** in Supabase Dashboard → Logs
2. **Review GitHub Actions** for workflow errors
3. **Test manually** using the curl commands above
4. **Check environment variables** are correctly set

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Edge Function returns `{"success": true}`
- ✅ GitHub Action completes without errors
- ✅ Security audit log shows recent entries
- ✅ `get_security_status()` shows secure functions

---

**🚀 You're now ready for production-grade security automation!** 