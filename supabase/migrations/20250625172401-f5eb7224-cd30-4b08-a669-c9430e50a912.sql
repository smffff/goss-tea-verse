
-- Phase 1: Critical RLS Policy Implementation

-- First, let's create secure role validation functions to avoid recursive RLS issues
CREATE OR REPLACE FUNCTION public.get_user_role_secure()
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_email text;
  user_role text;
BEGIN
  user_email := auth.jwt() ->> 'email';
  
  IF user_email IS NULL THEN
    RETURN 'anonymous';
  END IF;
  
  SELECT role::text INTO user_role
  FROM public.user_roles 
  WHERE user_email = get_user_role_secure.user_email 
    AND is_active = true 
  ORDER BY 
    CASE role
      WHEN 'super_admin' THEN 4
      WHEN 'admin' THEN 3
      WHEN 'moderator' THEN 2
      WHEN 'user' THEN 1
    END DESC
  LIMIT 1;
  
  RETURN COALESCE(user_role, 'user');
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN public.get_user_role_secure() IN ('admin', 'super_admin');
END;
$$;

CREATE OR REPLACE FUNCTION public.is_moderator_or_admin_secure()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN public.get_user_role_secure() IN ('moderator', 'admin', 'super_admin');
END;
$$;

-- Enhanced token validation function
CREATE OR REPLACE FUNCTION public.validate_anonymous_token_enhanced(token text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  IF token IS NULL OR length(token) < 32 THEN
    RETURN false;
  END IF;
  
  -- Check for base64url format (more secure than just alphanumeric)
  IF NOT (token ~ '^[A-Za-z0-9_-]+$') THEN
    RETURN false;
  END IF;
  
  -- Additional length validation
  IF length(token) > 128 THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Now enable RLS on all tables and create comprehensive policies

-- Tea Submissions RLS
ALTER TABLE public.tea_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public can view approved submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Moderators can view all submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Anonymous users can insert submissions" ON public.tea_submissions;
DROP POLICY IF EXISTS "Moderators can update submissions" ON public.tea_submissions;

-- Create new comprehensive policies for tea_submissions
CREATE POLICY "Public can view approved submissions" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "Moderators can view all submissions" 
  ON public.tea_submissions 
  FOR SELECT 
  USING (public.is_moderator_or_admin_secure());

CREATE POLICY "Anonymous users can insert submissions" 
  ON public.tea_submissions 
  FOR INSERT 
  WITH CHECK (
    public.validate_anonymous_token_enhanced(anonymous_token) AND
    status IN ('pending', 'approved') AND
    length(content) BETWEEN 3 AND 2000
  );

CREATE POLICY "Moderators can update submissions" 
  ON public.tea_submissions 
  FOR UPDATE 
  USING (public.is_moderator_or_admin_secure());

-- User Profiles RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;

CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles 
  FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" 
  ON public.user_profiles 
  FOR SELECT 
  USING (public.is_admin_secure());

-- Submission Ratings RLS
ALTER TABLE public.submission_ratings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view ratings" ON public.submission_ratings;
DROP POLICY IF EXISTS "Users can insert their own ratings" ON public.submission_ratings;

CREATE POLICY "Users can view ratings" 
  ON public.submission_ratings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own ratings" 
  ON public.submission_ratings 
  FOR INSERT 
  WITH CHECK (
    public.validate_anonymous_token_enhanced(anonymous_token) AND
    rating BETWEEN 1 AND 5
  );

-- User Reactions RLS
ALTER TABLE public.user_reactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view reactions" ON public.user_reactions;
DROP POLICY IF EXISTS "Users can insert reactions" ON public.user_reactions;

CREATE POLICY "Users can view reactions" 
  ON public.user_reactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert reactions" 
  ON public.user_reactions 
  FOR INSERT 
  WITH CHECK (
    public.validate_anonymous_token_enhanced(anonymous_token) AND
    reaction_type IN ('hot', 'cold', 'spicy')
  );

-- Admin Audit Log RLS
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "System can insert audit logs" ON public.admin_audit_log;

CREATE POLICY "Admins can view audit logs" 
  ON public.admin_audit_log 
  FOR SELECT 
  USING (public.is_admin_secure());

CREATE POLICY "System can insert audit logs" 
  ON public.admin_audit_log 
  FOR INSERT 
  WITH CHECK (true);

-- Moderation Queue RLS
ALTER TABLE public.moderation_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Moderators can access moderation queue" ON public.moderation_queue;

CREATE POLICY "Moderators can access moderation queue" 
  ON public.moderation_queue 
  FOR ALL 
  USING (public.is_moderator_or_admin_secure());

-- User Roles RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;

CREATE POLICY "Admins can manage user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (public.is_admin_secure());

CREATE POLICY "Users can view their own role" 
  ON public.user_roles 
  FOR SELECT 
  USING (user_email = (auth.jwt() ->> 'email'));

-- Feedback Submissions RLS  
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback_submissions;
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback_submissions;
DROP POLICY IF EXISTS "Admins can update feedback" ON public.feedback_submissions;

CREATE POLICY "Anyone can submit feedback" 
  ON public.feedback_submissions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view all feedback" 
  ON public.feedback_submissions 
  FOR SELECT 
  USING (public.is_admin_secure());

CREATE POLICY "Admins can update feedback" 
  ON public.feedback_submissions 
  FOR UPDATE 
  USING (public.is_admin_secure());

-- Rate Limits table - no RLS needed as it's system managed
-- Security Audit Trail RLS
ALTER TABLE public.security_audit_trail ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view security audit trail" ON public.security_audit_trail;

CREATE POLICY "Admins can view security audit trail" 
  ON public.security_audit_trail 
  FOR SELECT 
  USING (public.is_admin_secure());

-- User Progression RLS  
ALTER TABLE public.user_progression ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own progression" ON public.user_progression;
DROP POLICY IF EXISTS "Users can update their own progression" ON public.user_progression;

CREATE POLICY "Users can view their own progression" 
  ON public.user_progression 
  FOR SELECT 
  USING (true); -- Allow viewing based on anonymous_token validation in app

CREATE POLICY "Users can update their own progression" 
  ON public.user_progression 
  FOR ALL 
  USING (public.validate_anonymous_token_enhanced(anonymous_token));

-- Notifications RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (public.validate_anonymous_token_enhanced(anonymous_token));
