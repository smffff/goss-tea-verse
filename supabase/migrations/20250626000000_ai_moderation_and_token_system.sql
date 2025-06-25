-- AI Moderation and Token Incentive System Migration
-- This migration implements the complete AI moderation and $TEA token mechanics

-- ========================================
-- 1. MODERATION LOG TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.moderation_log (
    id BIGSERIAL PRIMARY KEY,
    spill_id UUID NOT NULL REFERENCES public.tea_submissions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    wallet_address TEXT,
    status TEXT NOT NULL CHECK (status IN ('clean', 'flagged', 'escalated')),
    score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
    reason TEXT NOT NULL,
    flagged_categories TEXT[],
    category_scores JSONB,
    ai_model TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Indexes for performance
    CONSTRAINT idx_moderation_log_spill_id UNIQUE (spill_id),
    CONSTRAINT idx_moderation_log_status_created_at UNIQUE (status, created_at)
);

CREATE INDEX IF NOT EXISTS idx_moderation_log_status ON public.moderation_log(status);
CREATE INDEX IF NOT EXISTS idx_moderation_log_score ON public.moderation_log(score DESC);
CREATE INDEX IF NOT EXISTS idx_moderation_log_created_at ON public.moderation_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_moderation_log_user_id ON public.moderation_log(user_id);

-- ========================================
-- 2. TEA TRANSACTIONS TABLE
-- ========================================

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

CREATE INDEX IF NOT EXISTS idx_tea_transactions_wallet ON public.tea_transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_action ON public.tea_transactions(action);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_spill_id ON public.tea_transactions(spill_id);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_created_at ON public.tea_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tea_transactions_status ON public.tea_transactions(status);

-- ========================================
-- 3. WALLET BALANCES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.wallet_balances (
    wallet_address TEXT PRIMARY KEY,
    tea_balance INTEGER NOT NULL DEFAULT 0,
    total_earned INTEGER NOT NULL DEFAULT 0,
    total_spent INTEGER NOT NULL DEFAULT 0,
    last_transaction_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_balances_tea_balance ON public.wallet_balances(tea_balance DESC);
CREATE INDEX IF NOT EXISTS idx_wallet_balances_total_earned ON public.wallet_balances(total_earned DESC);

-- ========================================
-- 4. AI MODERATION RPC FUNCTION
-- ========================================

CREATE OR REPLACE FUNCTION public.ai_moderate_spill(
    p_content TEXT,
    p_spill_id UUID,
    p_user_id UUID DEFAULT NULL,
    p_wallet_address TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
    v_edge_function_url TEXT;
    v_response JSONB;
BEGIN
    -- Get the edge function URL
    v_edge_function_url := current_setting('app.settings.edge_function_url', true) || '/ai_moderate_spill';
    
    IF v_edge_function_url IS NULL THEN
        v_edge_function_url := 'https://your-project.supabase.co/functions/v1/ai_moderate_spill';
    END IF;

    -- Call the edge function
    SELECT content::JSONB INTO v_response
    FROM http((
        'POST',
        v_edge_function_url,
        ARRAY[
            http_header('Content-Type', 'application/json'),
            http_header('Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true))
        ],
        'application/json',
        json_build_object(
            'content', p_content,
            'spill_id', p_spill_id,
            'user_id', p_user_id,
            'wallet_address', p_wallet_address
        )::TEXT
    ));

    -- Return the response
    RETURN v_response;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM,
            'mod_status', 'escalated',
            'score', 1.0,
            'reason', 'RPC function error'
        );
END;
$$;

-- ========================================
-- 5. TOKEN REWARD FUNCTIONS
-- ========================================

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
    v_result JSONB;
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

-- ========================================
-- 6. AUTOMATIC REWARD TRIGGERS
-- ========================================

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
            COALESCE(NEW.wallet_address, 'anonymous'),
            'spill',
            5, -- 5 TEA tokens for approved spill
            NEW.id,
            json_build_object('content_length', length(NEW.content))
        );
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_spill_rewards
    AFTER UPDATE ON public.tea_submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_spill_rewards();

-- ========================================
-- 7. WALLET BALANCE VIEW
-- ========================================

CREATE OR REPLACE VIEW public.wallet_balance_summary AS
SELECT 
    wb.wallet_address,
    wb.tea_balance,
    wb.total_earned,
    wb.total_spent,
    wb.last_transaction_at,
    COUNT(tt.id) as total_transactions,
    COUNT(CASE WHEN tt.action = 'spill' THEN 1 END) as spills_posted,
    COUNT(CASE WHEN tt.action = 'tip' THEN 1 END) as tips_given,
    COUNT(CASE WHEN tt.action = 'reward' THEN 1 END) as rewards_received
FROM public.wallet_balances wb
LEFT JOIN public.tea_transactions tt ON wb.wallet_address = tt.wallet_address
GROUP BY wb.wallet_address, wb.tea_balance, wb.total_earned, wb.total_spent, wb.last_transaction_at;

-- ========================================
-- 8. RLS POLICIES
-- ========================================

-- Moderation Log RLS
ALTER TABLE public.moderation_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Moderators can view moderation logs" 
    ON public.moderation_log 
    FOR SELECT 
    USING (public.is_moderator_or_admin_secure());

CREATE POLICY "System can insert moderation logs" 
    ON public.moderation_log 
    FOR INSERT 
    WITH CHECK (true);

-- Tea Transactions RLS
ALTER TABLE public.tea_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions" 
    ON public.tea_transactions 
    FOR SELECT 
    USING (
        wallet_address = COALESCE(
            (SELECT wallet_address FROM public.user_profiles WHERE user_id = auth.uid()),
            'anonymous'
        )
    );

CREATE POLICY "System can insert transactions" 
    ON public.tea_transactions 
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Admins can view all transactions" 
    ON public.tea_transactions 
    FOR SELECT 
    USING (public.is_admin_secure());

-- Wallet Balances RLS
ALTER TABLE public.wallet_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own balance" 
    ON public.wallet_balances 
    FOR SELECT 
    USING (
        wallet_address = COALESCE(
            (SELECT wallet_address FROM public.user_profiles WHERE user_id = auth.uid()),
            'anonymous'
        )
    );

CREATE POLICY "System can update balances" 
    ON public.wallet_balances 
    FOR ALL 
    WITH CHECK (true);

CREATE POLICY "Admins can view all balances" 
    ON public.wallet_balances 
    FOR SELECT 
    USING (public.is_admin_secure());

-- ========================================
-- 9. GRANT PERMISSIONS
-- ========================================

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.ai_moderate_spill(TEXT, UUID, UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.award_tea_tokens(TEXT, TEXT, INTEGER, UUID, JSONB) TO authenticated;

-- Grant table permissions
GRANT SELECT ON public.moderation_log TO authenticated;
GRANT INSERT ON public.moderation_log TO authenticated;

GRANT SELECT ON public.tea_transactions TO authenticated;
GRANT INSERT ON public.tea_transactions TO authenticated;

GRANT SELECT ON public.wallet_balances TO authenticated;
GRANT INSERT, UPDATE ON public.wallet_balances TO authenticated;

GRANT SELECT ON public.wallet_balance_summary TO authenticated;

-- ========================================
-- 10. AUDIT LOGGING
-- ========================================

-- Log this migration
INSERT INTO public.admin_audit_log (
    action,
    table_name,
    record_id,
    details
) VALUES (
    'migration_executed',
    'system',
    NULL,
    json_build_object(
        'migration', '20250626000000_ai_moderation_and_token_system',
        'features_added', ARRAY['AI Moderation', 'Token Incentives', 'Wallet Balances'],
        'tables_created', ARRAY['moderation_log', 'tea_transactions', 'wallet_balances'],
        'functions_created', ARRAY['ai_moderate_spill', 'award_tea_tokens', 'handle_spill_rewards']
    )
); 