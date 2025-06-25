
-- Add AI rating fields to tea_submissions table
ALTER TABLE public.tea_submissions 
ADD COLUMN IF NOT EXISTS reaction text,
ADD COLUMN IF NOT EXISTS spiciness integer,
ADD COLUMN IF NOT EXISTS chaos integer,
ADD COLUMN IF NOT EXISTS relevance integer,
ADD COLUMN IF NOT EXISTS ai_rated boolean DEFAULT false;

-- Create indexes for performance on new AI rating fields
CREATE INDEX IF NOT EXISTS idx_tea_submissions_ai_rated ON public.tea_submissions(ai_rated);
CREATE INDEX IF NOT EXISTS idx_tea_submissions_spiciness ON public.tea_submissions(spiciness DESC);
CREATE INDEX IF NOT EXISTS idx_tea_submissions_chaos ON public.tea_submissions(chaos DESC);
CREATE INDEX IF NOT EXISTS idx_tea_submissions_relevance ON public.tea_submissions(relevance DESC);

-- Update the AI verification workflow function to handle the new rating system
CREATE OR REPLACE FUNCTION public.handle_ai_verification_workflow(
  p_submission_id uuid,
  p_ai_reaction text,
  p_spiciness integer DEFAULT NULL,
  p_chaos integer DEFAULT NULL,
  p_relevance integer DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Update submission with AI reaction, ratings and make it visible
  UPDATE public.tea_submissions 
  SET ai_reaction = p_ai_reaction,
      reaction = p_ai_reaction,
      spiciness = p_spiciness,
      chaos = p_chaos,
      relevance = p_relevance,
      ai_rated = true,
      visible = true,
      updated_at = now()
  WHERE id = p_submission_id;
  
  -- Log successful AI verification with ratings
  PERFORM public.log_security_event_enhanced('ai_verification_with_ratings_success', jsonb_build_object(
    'submission_id', p_submission_id,
    'ai_reaction_length', length(p_ai_reaction),
    'spiciness', p_spiciness,
    'chaos', p_chaos,
    'relevance', p_relevance
  ), 'info');
  
  RETURN jsonb_build_object(
    'success', true,
    'submission_id', p_submission_id,
    'message', 'AI verification with ratings completed successfully'
  );
END;
$$;

-- Update the get_tweetable_submissions function to include ratings
CREATE OR REPLACE FUNCTION public.get_tweetable_submissions(
  p_limit integer DEFAULT 10
) RETURNS TABLE (
  id uuid,
  content text,
  category text,
  ai_reaction text,
  reaction text,
  spiciness integer,
  chaos integer,
  relevance integer,
  evidence_urls text[],
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ts.id,
    ts.content,
    ts.category,
    ts.ai_reaction,
    ts.reaction,
    ts.spiciness,
    ts.chaos,
    ts.relevance,
    ts.evidence_urls,
    ts.created_at
  FROM public.tea_submissions ts
  WHERE ts.visible = true 
    AND ts.tweeted = false 
    AND ts.ai_rated = true
    AND ts.status = 'approved'
  ORDER BY ts.created_at ASC
  LIMIT p_limit;
END;
$$;
