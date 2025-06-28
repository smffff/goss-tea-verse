
-- Create tip_transactions table to track all tip submissions and verifications
CREATE TABLE public.tip_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  network TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  amount DECIMAL,
  transaction_hash TEXT,
  proof_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'expired')),
  verification_method TEXT DEFAULT 'manual' CHECK (verification_method IN ('manual', 'blockchain', 'email')),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better performance
CREATE INDEX idx_tip_transactions_user_email ON tip_transactions(user_email);
CREATE INDEX idx_tip_transactions_status ON tip_transactions(status);
CREATE INDEX idx_tip_transactions_network ON tip_transactions(network);
CREATE INDEX idx_tip_transactions_created_at ON tip_transactions(created_at);

-- Enable RLS
ALTER TABLE tip_transactions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own tip transactions
CREATE POLICY "Users can view own tip transactions" ON tip_transactions
  FOR SELECT USING (user_email = auth.email());

-- Allow public inserts for tip submissions (from email webhook)
CREATE POLICY "Allow tip transaction inserts" ON tip_transactions
  FOR INSERT WITH CHECK (true);

-- Only admins can update tip transactions
CREATE POLICY "Admins can update tip transactions" ON tip_transactions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_email = auth.email() 
      AND role IN ('admin', 'super_admin') 
      AND is_active = true
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_tip_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tip_transactions_updated_at
  BEFORE UPDATE ON tip_transactions
  FOR EACH ROW EXECUTE FUNCTION update_tip_transactions_updated_at();
