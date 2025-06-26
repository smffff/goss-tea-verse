
import { supabase } from '@/integrations/supabase/client';

/**
 * Rewards an early user with Tea tokens if eligible.
 * Uses the existing tea_transactions and wallet_balances tables.
 */
export async function rewardEarlyUser(wallet_address: string) {
  try {
    // Check if user already received early reward using tea_transactions
    const { data: existingReward } = await supabase
      .from('tea_transactions')
      .select('*')
      .eq('wallet_address', wallet_address)
      .eq('action', 'reward')
      .eq('metadata->reason', 'early_adopter')
      .maybeSingle();

    if (existingReward) {
      return { alreadyRewarded: true, amount: existingReward.amount };
    }

    // Use the award_tea_tokens function which handles both transaction and balance updates
    const rewardAmount = 100;
    const { data: result, error } = await supabase.rpc('award_tea_tokens', {
      p_wallet_address: wallet_address,
      p_action: 'reward',
      p_amount: rewardAmount,
      p_metadata: { reason: 'early_adopter', welcome_bonus: true }
    });

    if (error) {
      console.error('Error awarding early user tokens:', error);
      throw error;
    }

    if (result && result.success) {
      return { 
        rewarded: true, 
        amount: rewardAmount,
        new_balance: result.new_balance,
        transaction_id: result.transaction_id
      };
    } else {
      throw new Error(result?.error || 'Failed to award tokens');
    }
  } catch (error) {
    console.error('Error in rewardEarlyUser:', error);
    throw error;
  }
}

/**
 * Gets wallet balance from wallet_balances table
 */
export async function getWalletBalance(wallet_address: string) {
  const { data, error } = await supabase
    .from('wallet_balances')
    .select('*')
    .eq('wallet_address', wallet_address)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data || { 
    wallet_address, 
    tea_balance: 0, 
    total_earned: 0, 
    total_spent: 0 
  };
}

/**
 * Gets recent transactions for a wallet
 */
export async function getWalletTransactions(wallet_address: string, limit = 10) {
  const { data, error } = await supabase
    .from('tea_transactions')
    .select('*')
    .eq('wallet_address', wallet_address)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
