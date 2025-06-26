
-- Add identity_visibility column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN identity_visibility text DEFAULT 'anon' CHECK (identity_visibility IN ('anon', 'public'));

-- Create a function to check if user is admin or moderator
CREATE OR REPLACE FUNCTION public.is_admin_or_moderator(user_wallet text)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE wallet_address = user_wallet 
    AND verification_level IN ('admin', 'moderator')
  );
END;
$$;

-- Create RLS policy for identity_visibility updates (admin/moderator only)
CREATE POLICY "Admin and moderators can update identity visibility"
ON public.user_profiles
FOR UPDATE
USING (
  auth.jwt() IS NOT NULL AND 
  public.is_admin_or_moderator(auth.jwt() ->> 'wallet_address')
)
WITH CHECK (
  auth.jwt() IS NOT NULL AND 
  public.is_admin_or_moderator(auth.jwt() ->> 'wallet_address')
);

-- Allow users to view their own profiles
CREATE POLICY "Users can view their own profiles"
ON public.user_profiles
FOR SELECT
USING (
  wallet_address = auth.jwt() ->> 'wallet_address' OR
  public.is_admin_or_moderator(auth.jwt() ->> 'wallet_address')
);
