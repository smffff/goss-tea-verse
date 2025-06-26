
-- Create beta_codes table for managing access codes
CREATE TABLE public.beta_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  used boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  used_at timestamp with time zone,
  granted_by text, -- 'spill', 'bribe', 'manual', etc.
  user_token text, -- anonymous token of user who used it
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.beta_codes ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access for code validation
CREATE POLICY "Anyone can validate beta codes" 
  ON public.beta_codes 
  FOR SELECT 
  USING (true);

-- Policy to allow system updates when codes are used
CREATE POLICY "System can update beta codes" 
  ON public.beta_codes 
  FOR UPDATE 
  USING (true);

-- Insert some initial beta codes for testing
INSERT INTO public.beta_codes (code, granted_by) VALUES
  ('TEA2024', 'manual'),
  ('CTEA-BETA', 'manual'),
  ('SPILL-TEA', 'manual'),
  ('CRYPTO-TEA', 'manual'),
  ('GOSSIP-GATE', 'manual');

-- Create RPC function to validate and use beta codes
CREATE OR REPLACE FUNCTION public.validate_beta_code(
  p_code text,
  p_user_token text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  code_record record;
BEGIN
  -- Check if code exists and is not used
  SELECT * INTO code_record
  FROM public.beta_codes
  WHERE code = upper(trim(p_code))
  AND used = false;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Invalid or already used code'
    );
  END IF;
  
  -- Mark code as used if user_token provided
  IF p_user_token IS NOT NULL THEN
    UPDATE public.beta_codes
    SET 
      used = true,
      used_at = now(),
      user_token = p_user_token
    WHERE id = code_record.id;
  END IF;
  
  RETURN jsonb_build_object(
    'valid', true,
    'code', code_record.code,
    'granted_by', code_record.granted_by
  );
END;
$$;

-- Create RPC function to generate new beta code after tea spill
CREATE OR REPLACE FUNCTION public.generate_beta_code_for_spill(
  p_submission_id uuid,
  p_user_token text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  new_code text;
  code_exists boolean;
BEGIN
  -- Generate a unique code
  LOOP
    new_code := 'TEA-' || upper(substring(md5(random()::text), 1, 6));
    
    SELECT EXISTS(SELECT 1 FROM public.beta_codes WHERE code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  -- Insert the new code
  INSERT INTO public.beta_codes (code, granted_by, metadata)
  VALUES (
    new_code,
    'spill',
    jsonb_build_object(
      'submission_id', p_submission_id,
      'user_token', p_user_token
    )
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'code', new_code
  );
END;
$$;
