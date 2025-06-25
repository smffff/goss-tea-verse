-- Security Hardening Migration for CTea Newsroom
-- This migration creates roles and implements comprehensive security measures

-- Create the security hardening function
CREATE OR REPLACE FUNCTION run_security_hardening_script()
RETURNS void AS $$
DECLARE
    r RECORD;
    function_count INTEGER := 0;
    revoked_count INTEGER := 0;
BEGIN
    -- STEP 1: Create Security Roles (if they don't exist)
    BEGIN
        CREATE ROLE app_admin NOINHERIT;
        RAISE NOTICE 'Created app_admin role';
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE 'app_admin role already exists';
    END;

    BEGIN
        CREATE ROLE human_moderator NOINHERIT;
        RAISE NOTICE 'Created human_moderator role';
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE 'human_moderator role already exists';
    END;

    BEGIN
        CREATE ROLE ai_moderator NOINHERIT;
        RAISE NOTICE 'Created ai_moderator role';
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE 'ai_moderator role already exists';
    END;

    BEGIN
        CREATE ROLE trusted_app NOINHERIT;
        RAISE NOTICE 'Created trusted_app role';
    EXCEPTION WHEN duplicate_object THEN
        RAISE NOTICE 'trusted_app role already exists';
    END;

    -- STEP 2: Set search_path for flagged functions
    FOR r IN
        SELECT
            n.nspname,
            p.proname,
            pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
          AND proname IN (
            'validate_admin_session_enhanced',
            'security_health_check',
            'validate_admin_session_ultimate',
            'log_rls_violation',
            'validate_unified_security',
            'secure_gossip_submission',
            'test_rls_enforcement',
            'validate_admin_session_secure',
            'comprehensive_security_health_check',
            'log_security_policy_violation',
            'validate_admin_session_with_timeout',
            'handle_new_user',
            'calculate_user_level',
            'award_xp',
            'award_tea_points',
            'validate_admin_access'
          )
    LOOP
        EXECUTE format(
            'ALTER FUNCTION %I.%I(%s) SET search_path = public;',
            r.nspname, r.proname, r.args
        );
        function_count := function_count + 1;
        RAISE NOTICE 'Updated search_path for: %.%(%).', r.nspname, r.proname, r.args;
    END LOOP;

    -- STEP 3: Revoke CREATE on schema public from PUBLIC
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;
    RAISE NOTICE 'Revoked CREATE privileges on public schema from PUBLIC';

    -- STEP 4: Revoke EXECUTE on all SECURITY DEFINER functions from PUBLIC
    FOR r IN
        SELECT
            n.nspname,
            p.proname,
            pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
          AND p.prosecdef = true
    LOOP
        EXECUTE format(
            'REVOKE EXECUTE ON FUNCTION %I.%I(%s) FROM PUBLIC;',
            r.nspname, r.proname, r.args
        );
        revoked_count := revoked_count + 1;
        RAISE NOTICE 'Revoked EXECUTE on: %.%(%).', r.nspname, r.proname, r.args;
    END LOOP;

    -- STEP 5: Grant specific privileges to roles
    -- Grant basic usage to all roles
    GRANT USAGE ON SCHEMA public TO app_admin, human_moderator, ai_moderator, trusted_app;
    
    -- Grant admin functions to app_admin
    GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_admin;
    
    -- Grant moderation functions to human and AI moderators
    FOR r IN
        SELECT
            n.nspname,
            p.proname,
            pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
          AND proname IN (
            'log_rls_violation',
            'log_security_policy_violation',
            'validate_unified_security',
            'secure_gossip_submission'
          )
    LOOP
        EXECUTE format(
            'GRANT EXECUTE ON FUNCTION %I.%I(%s) TO human_moderator, ai_moderator;',
            r.nspname, r.proname, r.args
        );
    END LOOP;

    -- Grant user management functions to trusted_app
    FOR r IN
        SELECT
            n.nspname,
            p.proname,
            pg_get_function_identity_arguments(p.oid) AS args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
          AND proname IN (
            'handle_new_user',
            'calculate_user_level',
            'award_xp',
            'award_tea_points'
          )
    LOOP
        EXECUTE format(
            'GRANT EXECUTE ON FUNCTION %I.%I(%s) TO trusted_app;',
            r.nspname, r.proname, r.args
        );
    END LOOP;

    -- STEP 6: Create audit log table for security events
    CREATE TABLE IF NOT EXISTS security_audit_log (
        id BIGSERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        function_name TEXT,
        role_name TEXT,
        details JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Grant access to audit log
    GRANT SELECT ON security_audit_log TO app_admin;
    GRANT INSERT ON security_audit_log TO human_moderator, ai_moderator;

    -- Log this security hardening execution
    INSERT INTO security_audit_log (event_type, details)
    VALUES (
        'security_hardening_executed',
        jsonb_build_object(
            'functions_updated', function_count,
            'privileges_revoked', revoked_count,
            'roles_created', 4
        )
    );

    RAISE NOTICE 'Security hardening completed: % functions updated, % privileges revoked', function_count, revoked_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permission to authenticated users (for the edge function)
GRANT EXECUTE ON FUNCTION run_security_hardening_script() TO authenticated;

-- Create a function to check security status
CREATE OR REPLACE FUNCTION get_security_status()
RETURNS TABLE(
    function_name TEXT,
    has_secure_search_path BOOLEAN,
    is_security_definer BOOLEAN,
    public_execute_revoked BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.proname::TEXT,
        CASE WHEN p.proconfig @> ARRAY['search_path=public'] THEN true ELSE false END,
        p.prosecdef,
        CASE WHEN NOT EXISTS (
            SELECT 1 FROM pg_proc_acl p2 
            WHERE p2.oid = p.oid 
            AND p2.aclcontains('{PUBLIC=EXECUTE}'::aclitem[])
        ) THEN true ELSE false END
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
    AND p.proname IN (
        'validate_admin_session_enhanced',
        'security_health_check',
        'validate_admin_session_ultimate',
        'log_rls_violation',
        'validate_unified_security',
        'secure_gossip_submission',
        'test_rls_enforcement',
        'validate_admin_session_secure',
        'comprehensive_security_health_check',
        'log_security_policy_violation',
        'validate_admin_session_with_timeout',
        'handle_new_user',
        'calculate_user_level',
        'award_xp',
        'award_tea_points',
        'validate_admin_access'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION get_security_status() TO authenticated; 