# CTea Newsroom Security Roles & Permissions

## Overview

CTea Newsroom implements a comprehensive role-based security system with four distinct roles designed for different levels of access and responsibility.

## Security Roles

### 🔐 `app_admin`
**Purpose:** Full administrative access to the application
**Use Case:** Site administrators, developers, system operators

**Permissions:**
- Execute ALL functions in the public schema
- Read from security audit log
- Full database access for maintenance and debugging
- Can manage other roles and permissions

**Functions Accessible:**
- All security validation functions
- All user management functions
- All moderation functions
- All administrative functions

---

### 👥 `human_moderator`
**Purpose:** Human content moderation and community management
**Use Case:** Community managers, content moderators, support staff

**Permissions:**
- Execute moderation-specific functions
- Insert into security audit log
- Read from security audit log
- Limited to content moderation operations

**Functions Accessible:**
- `log_rls_violation()`
- `log_security_policy_violation()`
- `validate_unified_security()`
- `secure_gossip_submission()`

---

### 🤖 `ai_moderator`
**Purpose:** AI-powered content moderation and automated responses
**Use Case:** AI agents, automated moderation bots, ML systems

**Permissions:**
- Execute moderation-specific functions
- Insert into security audit log
- Read from security audit log
- Limited to automated moderation operations

**Functions Accessible:**
- `log_rls_violation()`
- `log_security_policy_violation()`
- `validate_unified_security()`
- `secure_gossip_submission()`

---

### 🔒 `trusted_app`
**Purpose:** Trusted application components and background processes
**Use Case:** Background jobs, scheduled tasks, internal services

**Permissions:**
- Execute user management functions
- Limited to specific application operations
- No access to security or moderation functions

**Functions Accessible:**
- `handle_new_user()`
- `calculate_user_level()`
- `award_xp()`
- `award_tea_points()`

---

## Security Features

### 🔍 Audit Logging
All security events are logged in the `security_audit_log` table:
- Function executions
- Security violations
- Role changes
- System hardening events

### 🛡️ Function Security
- All flagged functions have `search_path = public` set
- `SECURITY DEFINER` functions have `PUBLIC` execute privileges revoked
- Role-specific access controls implemented

### 🔄 Automated Hardening
- Weekly automated security hardening via GitHub Actions
- Manual trigger capability for immediate response
- Continuous monitoring and alerting

---

## Usage Examples

### For Human Moderators
```sql
-- Log a security violation
SELECT log_rls_violation('user_id', 'violation_type', 'details');

-- Validate security for a submission
SELECT validate_unified_security('submission_data');
```

### For AI Moderators
```sql
-- Automated content moderation
SELECT secure_gossip_submission('content', 'user_id', 'ai_analysis');

-- Log policy violations
SELECT log_security_policy_violation('violation_type', 'details');
```

### For Trusted App
```sql
-- Handle new user registration
SELECT handle_new_user('user_id', 'user_data');

-- Award points to users
SELECT award_tea_points('user_id', 100, 'reason');
```

---

## Monitoring & Maintenance

### Check Security Status
```sql
-- View security status of all functions
SELECT * FROM get_security_status();

-- Check recent security events
SELECT * FROM security_audit_log 
ORDER BY created_at DESC 
LIMIT 10;
```

### Manual Security Hardening
```sql
-- Run security hardening manually
SELECT run_security_hardening_script();
```

### Role Management
```sql
-- Grant role to user (example)
GRANT human_moderator TO username;

-- Revoke role from user
REVOKE human_moderator FROM username;
```

---

## Best Practices

1. **Principle of Least Privilege:** Only grant necessary permissions
2. **Regular Audits:** Review role assignments monthly
3. **Monitor Logs:** Check security audit log regularly
4. **Automated Hardening:** Let the system run weekly hardening
5. **Incident Response:** Use audit logs for security investigations

---

## Emergency Procedures

### Security Breach Response
1. Immediately run security hardening: `SELECT run_security_hardening_script();`
2. Review audit logs for suspicious activity
3. Revoke and regenerate compromised credentials
4. Update role assignments if necessary

### Role Compromise
1. Revoke the compromised role from all users
2. Create new role with different name
3. Reassign users to new role
4. Update application code to use new role

---

## Contact

For security-related issues or questions about role management, contact the system administrator or create an issue in the project repository. 