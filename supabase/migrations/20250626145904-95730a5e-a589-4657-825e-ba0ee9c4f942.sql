
-- Insert admin role for stephanie@cteanews.com (with required assigned_by value)
INSERT INTO public.user_roles (user_email, role, is_active, assigned_by) 
VALUES ('stephanie@cteanews.com', 'admin', true, 'system') 
ON CONFLICT (user_email, role) 
DO UPDATE SET is_active = true;

-- Also add as moderator role as backup
INSERT INTO public.user_roles (user_email, role, is_active, assigned_by) 
VALUES ('stephanie@cteanews.com', 'moderator', true, 'system') 
ON CONFLICT (user_email, role) 
DO UPDATE SET is_active = true;
