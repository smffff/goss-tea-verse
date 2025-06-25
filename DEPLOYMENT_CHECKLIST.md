# 🚀 Final Deployment Checklist

## ✅ What's Already Ready
- [x] SQL Migration: `20250101000000_security_hardening.sql`
- [x] Edge Function: `harden_security/index.ts`
- [x] GitHub Workflow: `.github/workflows/harden-security.yml`
- [x] Deployment Guide: `SECURITY_DEPLOYMENT_GUIDE.md`

## 🔧 Final Steps to Complete

### 1. Setup Environment Variables
```bash
# Copy the template and update with your actual values
cp env.template .env.local

# Edit .env.local and add your actual service role key
# Get it from: https://supabase.com/dashboard/project/ctea-newsroom/settings/api
```

### 2. Install Supabase CLI (Choose One Method)

**Option A: Using Homebrew (Recommended)**
```bash
# Install Homebrew first if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Supabase CLI
brew install supabase/tap/supabase
```

**Option B: Manual Download**
```bash
# Download and install manually
curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_darwin_amd64.tar.gz | tar -xz
sudo mv supabase /usr/local/bin/supabase
```

### 3. Deploy Edge Function
```bash
# Once CLI is installed
supabase functions deploy harden_security
```

### 4. Test the Deployment
```bash
# Test your Edge Function
curl -X POST https://ctea-newsroom.functions.supabase.co/harden_security \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### 5. Setup GitHub Secret
1. Go to: https://github.com/stephane-ctea/goss-tea-verse/settings/secrets/actions
2. Click "New repository secret"
3. Name: `HARDEN_SECURITY_ENDPOINT`
4. Value: `https://ctea-newsroom.functions.supabase.co/harden_security`

### 6. Test GitHub Workflow
1. Go to: https://github.com/stephane-ctea/goss-tea-verse/actions
2. Click "Weekly Security Hardening"
3. Click "Run workflow" → "Run workflow"

## 🧪 Verification Commands

### Check Security Status
```sql
-- Run in Supabase Dashboard SQL Editor
SELECT * FROM get_security_status();
```

### View Security Audit Log
```sql
-- Run in Supabase Dashboard SQL Editor
SELECT * FROM security_audit_log ORDER BY created_at DESC LIMIT 10;
```

### Test Edge Function
```bash
curl -X POST https://ctea-newsroom.functions.supabase.co/harden_security
```

## 🎯 Expected Results

✅ **Edge Function Response:**
```json
{
  "success": true,
  "message": "Security hardening completed successfully",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

✅ **GitHub Action:** Completes without errors

✅ **Security Status:** Shows all functions as secure

✅ **Audit Log:** Shows recent security events

## 🆘 If You Get Stuck

1. **CLI Installation Issues:** Use the Supabase Dashboard to deploy functions manually
2. **Environment Variables:** Double-check your service role key
3. **Function Errors:** Check the Supabase Dashboard → Logs
4. **GitHub Action Fails:** Verify the secret endpoint URL

## 📞 Quick Help

- **Supabase Dashboard:** https://supabase.com/dashboard/project/ctea-newsroom
- **GitHub Repository:** https://github.com/stephane-ctea/goss-tea-verse
- **Deployment Guide:** `SECURITY_DEPLOYMENT_GUIDE.md`

---

**🎉 Once completed, you'll have automated security hardening running every Sunday at 3 AM UTC!** 