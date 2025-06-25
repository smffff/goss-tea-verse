
-- Create user profiles table for additional user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create enum for user roles if not exists
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('user', 'moderator', 'admin', 'super_admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Update user_roles table to ensure it's properly configured
ALTER TABLE public.user_roles 
  ALTER COLUMN role TYPE public.user_role USING role::public.user_role;

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_email, role, assigned_by)
  VALUES (NEW.email, 'user', 'system')
  ON CONFLICT (user_email, role) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create enhanced function to check admin access
CREATE OR REPLACE FUNCTION public.validate_admin_access()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_email text;
  user_role text;
  session_valid boolean := false;
BEGIN
  user_email := auth.jwt() ->> 'email';
  
  IF user_email IS NULL THEN
    RETURN jsonb_build_object(
      'valid', false,
      'is_admin', false,
      'requires_auth', true,
      'error', 'No session found'
    );
  END IF;
  
  -- Check if user exists and has valid session
  SELECT EXISTS(
    SELECT 1 FROM auth.users 
    WHERE email = user_email 
    AND email_confirmed_at IS NOT NULL
  ) INTO session_valid;
  
  IF NOT session_valid THEN
    RETURN jsonb_build_object(
      'valid', false,
      'is_admin', false,
      'requires_auth', true,
      'error', 'Invalid session'
    );
  END IF;
  
  -- Get user role
  user_role := public.get_user_role_secure();
  
  -- Check for admin privileges
  IF user_role NOT IN ('admin', 'super_admin') THEN
    RETURN jsonb_build_object(
      'valid', false,
      'is_admin', false,
      'requires_auth', false,
      'error', 'Insufficient privileges',
      'user_role', user_role
    );
  END IF;
  
  RETURN jsonb_build_object(
    'valid', true,
    'is_admin', true,
    'user_email', user_email,
    'user_role', user_role,
    'requires_auth', false
  );
END;
$$;
