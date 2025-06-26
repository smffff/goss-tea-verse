
-- Create tea_transactions table for tracking all TEA token transactions
CREATE TABLE IF NOT EXISTS public.tea_transactions (
    id BIGSERIAL PRIMARY KEY,
    wallet_address TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('spill', 'tip', 'flag', 'upvote', 'downvote', 'reward', 'penalty')),
    amount INTEGER NOT NULL DEFAULT 0,
    spill_id UUID REFERENCES public.tea_submissions(id) ON DELETE SET NULL,
    recipient_wallet TEXT,
    transaction_hash TEXT,
    block_number BIGINT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wallet_balances table for tracking user balances
CREATE TABLE IF NOT EXISTS public.wallet_balances (
    wallet_address TEXT PRIMARY KEY,
    tea_balance INTEGER NOT NULL DEFAULT 0,
    total_earned INTEGER NOT NULL DEFAULT 0,
    total_spent INTEGER NOT NULL DEFAULT 0,
    last_transaction_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tea_transactions_wallet ON public.tea_transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_action ON public.tea_transactions(action);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_spill_id ON public.tea_transactions(spill_id);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_created_at ON public.tea_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_status ON public.tea_transactions(status);

CREATE INDEX IF NOT EXISTS idx_wallet_balances_tea_balance ON public.wallet_balances(tea_balance DESC);
CREATE INDEX IF NOT EXISTS idx_wallet_balances_total_earned ON public.wallet_balances(total_earned DESC);

-- Create function to award TEA tokens
CREATE OR REPLACE FUNCTION public.award_tea_tokens(
    p_wallet_address TEXT,
    p_action TEXT,
    p_amount INTEGER,
    p_spill_id UUID DEFAULT NULL,
    p_metadata JSONB DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_transaction_id BIGINT;
    v_new_balance INTEGER;
BEGIN
    -- Insert transaction record
    INSERT INTO public.tea_transactions (
        wallet_address,
        action,
        amount,
        spill_id,
        metadata,
        status
    ) VALUES (
        p_wallet_address,
        p_action,
        p_amount,
        p_spill_id,
        p_metadata,
        'confirmed'
    ) RETURNING id INTO v_transaction_id;

    -- Update or create wallet balance
    INSERT INTO public.wallet_balances (
        wallet_address,
        tea_balance,
        total_earned,
        total_spent,
        last_transaction_at
    ) VALUES (
        p_wallet_address,
        p_amount,
        CASE WHEN p_amount > 0 THEN p_amount ELSE 0 END,
        CASE WHEN p_amount < 0 THEN ABS(p_amount) ELSE 0 END,
        NOW()
    )
    ON CONFLICT (wallet_address) DO UPDATE SET
        tea_balance = wallet_balances.tea_balance + p_amount,
        total_earned = wallet_balances.total_earned + CASE WHEN p_amount > 0 THEN p_amount ELSE 0 END,
        total_spent = wallet_balances.total_spent + CASE WHEN p_amount < 0 THEN ABS(p_amount) ELSE 0 END,
        last_transaction_at = NOW(),
        updated_at = NOW();

    -- Get updated balance
    SELECT tea_balance INTO v_new_balance
    FROM public.wallet_balances
    WHERE wallet_address = p_wallet_address;

    RETURN json_build_object(
        'success', true,
        'transaction_id', v_transaction_id,
        'new_balance', v_new_balance,
        'amount_awarded', p_amount,
        'action', p_action
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$;

-- Create trigger to automatically award tokens for approved spills
CREATE OR REPLACE FUNCTION public.handle_spill_rewards()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Award tokens for new approved spills
    IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
        PERFORM public.award_tea_tokens(
            COALESCE(NEW.anonymous_token, 'anonymous'),
            'spill',
            5, -- 5 TEA tokens for approved spill
            NEW.id,
            json_build_object('content_length', length(NEW.content))
        );
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_spill_rewards ON public.tea_submissions;
CREATE TRIGGER trigger_spill_rewards
    AFTER UPDATE ON public.tea_submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_spill_rewards();

-- Add wallet_address column to user_profiles if it doesn't exist
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS wallet_address TEXT;

-- Enable RLS on new tables
ALTER TABLE public.tea_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_balances ENABLE ROW LEVEL SECURITY;

-- RLS policies for tea_transactions
CREATE POLICY "Users can view their own transactions" 
    ON public.tea_transactions 
    FOR SELECT 
    USING (
        wallet_address = COALESCE(
            (SELECT wallet_address FROM public.user_profiles WHERE anonymous_token = current_setting('request.headers')::json->>'x-anonymous-token'),
            current_setting('request.headers')::json->>'x-anonymous-token'
        )
    );

CREATE POLICY "System can insert transactions" 
    ON public.tea_transactions 
    FOR INSERT 
    WITH CHECK (true);

-- RLS policies for wallet_balances
CREATE POLICY "Users can view their own balance" 
    ON public.wallet_balances 
    FOR SELECT 
    USING (
        wallet_address = COALESCE(
            (SELECT wallet_address FROM public.user_profiles WHERE anonymous_token = current_setting('request.headers')::json->>'x-anonymous-token'),
            current_setting('request.headers')::json->>'x-anonymous-token'
        )
    );

CREATE POLICY "System can update balances" 
    ON public.wallet_balances 
    FOR ALL 
    WITH CHECK (true);

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.award_tea_tokens(TEXT, TEXT, INTEGER, UUID, JSONB) TO authenticated;
GRANT SELECT ON public.tea_transactions TO authenticated;
GRANT INSERT ON public.tea_transactions TO authenticated;
GRANT SELECT ON public.wallet_balances TO authenticated;
GRANT INSERT, UPDATE ON public.wallet_balances TO authenticated;
