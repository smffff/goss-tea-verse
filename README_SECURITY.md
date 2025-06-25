# 🔐 CTea Newsroom Security System

A comprehensive PostgreSQL security hardening system for CTea Newsroom, featuring automated role-based access control, audit logging, and continuous security monitoring.

## 🚀 Quick Start

### 1. Deploy the Security System
```bash
# Make the deployment script executable
chmod +x scripts/deploy-security.sh

# Run the deployment
./scripts/deploy-security.sh
```

### 2. Set Up GitHub Secrets
Add this secret to your GitHub repository:
- **Name:** `HARDEN_SECURITY_ENDPOINT`
- **Value:** Your Supabase Edge Function URL (provided by the deployment script)

### 3. Test the System
```bash
# Test the security hardening function
curl -X POST https://your-project.functions.supabase.co/harden_security

# Check security status in Supabase dashboard
SELECT * FROM get_security_status();
```

## 🏗️ Architecture

### Components
- **Supabase Edge Function:** `harden_security` - Automated security hardening
- **PostgreSQL Functions:** Security hardening and monitoring functions
- **GitHub Actions:** Weekly automated security checks
- **Role-Based Access Control:** Four distinct security roles
- **Audit Logging:** Comprehensive security event tracking

### Security Roles
1. **`app_admin`** - Full administrative access
2. **`human_moderator`** - Human content moderation
3. **`ai_moderator`** - AI-powered moderation
4. **`trusted_app`** - Trusted application processes

## 📁 File Structure

```
├── supabase/
│   ├── functions/
│   │   └── harden_security/
│   │       └── index.ts                 # Edge function
│   └── migrations/
│       └── 20250101000000_security_hardening.sql  # Security setup
├── .github/
│   └── workflows/
│       └── harden-security.yml          # Automated hardening
├── scripts/
│   └── deploy-security.sh               # Deployment script
└── docs/
    └── SECURITY_ROLES.md                # Role documentation
```

## 🔧 Configuration

### Environment Variables
Set these in your Supabase project:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for admin access

### GitHub Secrets
- `HARDEN_SECURITY_ENDPOINT` - Your Edge Function URL

## 📊 Monitoring

### Security Status Dashboard
```sql
-- Check all function security status
SELECT * FROM get_security_status();

-- View recent security events
SELECT * FROM security_audit_log 
ORDER BY created_at DESC 
LIMIT 10;
```

### Automated Monitoring
- **Weekly:** GitHub Actions runs security hardening
- **On Push:** Security hardening runs when migrations change
- **Manual:** Trigger hardening anytime via GitHub Actions

## 🛡️ Security Features

### Function Hardening
- ✅ Sets `search_path = public` on all flagged functions
- ✅ Revokes `PUBLIC` execute privileges on `SECURITY DEFINER` functions
- ✅ Implements role-based access control
- ✅ Creates comprehensive audit logging

### Automated Protection
- 🔄 Weekly automated security hardening
- 📝 Complete audit trail of security events
- 🚨 Failure notifications via GitHub Issues
- 🔍 Continuous security status monitoring

## 🚨 Emergency Procedures

### Security Breach Response
1. **Immediate Action:**
   ```sql
   SELECT run_security_hardening_script();
   ```

2. **Investigation:**
   ```sql
   SELECT * FROM security_audit_log 
   WHERE created_at > NOW() - INTERVAL '1 hour'
   ORDER BY created_at DESC;
   ```

3. **Recovery:**
   - Review and update role assignments
   - Regenerate compromised credentials
   - Update application access controls

### Manual Hardening
```bash
# Trigger security hardening manually
curl -X POST https://your-project.functions.supabase.co/harden_security

# Or via GitHub Actions (if configured)
# Go to Actions → Weekly Security Hardening → Run workflow
```

## 📈 Maintenance

### Regular Tasks
- **Monthly:** Review role assignments and permissions
- **Weekly:** Check security audit logs for anomalies
- **Daily:** Monitor security status dashboard
- **On Updates:** Run security hardening after schema changes

### Health Checks
```sql
-- Check if all functions are properly secured
SELECT 
    function_name,
    has_secure_search_path,
    is_security_definer,
    public_execute_revoked
FROM get_security_status()
WHERE NOT (has_secure_search_path AND public_execute_revoked);
```

## 🔍 Troubleshooting

### Common Issues

**Function deployment fails:**
```bash
# Check Supabase CLI installation
npm install -g supabase

# Verify project connection
supabase status
```

**GitHub Actions fails:**
- Verify `HARDEN_SECURITY_ENDPOINT` secret is set correctly
- Check Supabase Edge Function logs
- Ensure service role key has proper permissions

**Security hardening doesn't work:**
```sql
-- Check function permissions
SELECT proname, prosecdef, proconfig 
FROM pg_proc p 
JOIN pg_namespace n ON p.pronamespace = n.oid 
WHERE n.nspname = 'public' 
AND proname IN ('run_security_hardening_script');
```

## 📚 Documentation

- [Security Roles & Permissions](docs/SECURITY_ROLES.md) - Detailed role documentation
- [Supabase Security Best Practices](https://supabase.com/docs/guides/security) - Official Supabase security guide
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html) - PostgreSQL security documentation

## 🤝 Contributing

1. Follow security best practices
2. Test changes in development environment
3. Update documentation for any role or permission changes
4. Run security hardening after any schema modifications

## 📞 Support

For security-related issues:
1. Check the audit logs first
2. Review the troubleshooting section
3. Create an issue in the repository
4. Contact the system administrator

---

**🔐 Security is everyone's responsibility. Stay vigilant and keep your CTea Newsroom secure!** 