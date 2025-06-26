
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

    // Award tokens directly using table operations
    const rewardAmount = 100;
    
    // Insert transaction record
    const transactionResult = await supabase
      .from('tea_transactions')
      .insert({
        wallet_address,
        action: 'reward',
        amount: rewardAmount,
        status: 'confirmed',
        metadata: { reason: 'early_adopter', welcome_bonus: true }
      })
      .select()
      .single();

    if (transactionResult.error) {
      console.error('Error creating transaction:', transactionResult.error);
      throw transactionResult.error;
    }

    // Update or create wallet balance
    const balanceResult = await supabase
      .from('wallet_balances')
      .upsert({
        wallet_address,
        tea_balance: rewardAmount,
        total_earned: rewardAmount,
        total_spent: 0,
        last_transaction_at: new Date().toISOString()
      }, {
        onConflict: 'wallet_address'
      })
      .select()
      .single();

    if (balanceResult.error) {
      console.error('Error updating balance:', balanceResult.error);
      throw balanceResult.error;
    }

    return { 
      rewarded: true, 
      amount: rewardAmount,
      new_balance: balanceResult.data?.tea_balance || rewardAmount,
      transaction_id: transactionResult.data?.id
    };
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
