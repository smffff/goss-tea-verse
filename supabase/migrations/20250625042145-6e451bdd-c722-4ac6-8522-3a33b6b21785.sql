
-- Create feedback_submissions table
CREATE TABLE public.feedback_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'general', 'error')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  email TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  user_agent TEXT,
  url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for feedback submissions
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback
CREATE POLICY "Anyone can submit feedback" 
  ON public.feedback_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Only admins can view feedback
CREATE POLICY "Admins can view all feedback" 
  ON public.feedback_submissions 
  FOR SELECT 
  USING (public.is_admin_secure());

-- Only admins can update feedback
CREATE POLICY "Admins can update feedback" 
  ON public.feedback_submissions 
  FOR UPDATE 
  USING (public.is_admin_secure());
