
-- Add username column to user_profiles if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='user_profiles' AND column_name='username') THEN
        ALTER TABLE public.user_profiles ADD COLUMN username text;
    END IF;
END $$;

-- Create index for username lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);

-- Add constraint to ensure username uniqueness when not null
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'user_profiles_username_unique' 
                   AND table_name = 'user_profiles') THEN
        ALTER TABLE public.user_profiles 
        ADD CONSTRAINT user_profiles_username_unique UNIQUE (username);
    END IF;
END $$;
