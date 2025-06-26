
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type TeaTransaction = Database['public']['Tables']['tea_transactions']['Row'];

/**
 * Rewards an early user with Tea tokens if eligible and returns the result.
 * This prevents duplicate rewards by checking the `tea_transactions` table.
 *
 * @param wallet_address The user's wallet address.
 * @returns An object indicating if the user was rewarded and the amount.
 */
export async function rewardEarlyUser(
  wallet_address: string
): Promise<{ rewarded: boolean; amount?: number }> {
  if (!wallet_address) {
    throw new Error('Missing wallet address');
  }

  // Step 1: Check if user already claimed the early user reward
  const { data: existing, error: checkError } = await supabase
    .from('tea_transactions')
    .select('id')
    .eq('wallet_address', wallet_address)
    .eq('action', 'early_user_reward')
    .maybeSingle();

  if (checkError) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error checking for existing reward:', checkError);
    throw checkError;
  }

  if (existing) {
    return { rewarded: false }; // Already rewarded
  }

  const rewardAmount = 100;

  // Step 2: Insert the new reward record
  const { error: insertError } = await supabase.from('tea_transactions').insert({
    wallet_address,
    action: 'early_user_reward',
    amount: rewardAmount,
    status: 'confirmed',
    metadata: {
      reward_type: 'early_user',
      description: 'Welcome bonus for early adopters'
    }
  });

  if (insertError) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error inserting reward:', insertError);
    throw insertError;
  }

  // Step 3: Upsert the user's wallet balance
  // First, get the current balance to increment it.
  const { data: balanceRow, error: balanceError } = await supabase
    .from('wallet_balances')
    .select('tea_balance, total_earned')
    .eq('wallet_address', wallet_address)
    .maybeSingle();

  if (balanceError) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error fetching balance for update:', balanceError);
    throw balanceError;
  }

  const currentBalance = (balanceRow?.tea_balance || 0) as number;

  const { error: updateError } = await supabase.from('wallet_balances').upsert({
    wallet_address,
    tea_balance: currentBalance + rewardAmount,
    total_earned: (balanceRow?.total_earned || 0) + rewardAmount,
    last_transaction_at: new Date().toISOString(),
  });

  if (updateError) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error upserting wallet balance:', updateError);
    throw updateError;
  }

  return { rewarded: true, amount: rewardAmount };
}

/**
 * Gets wallet balance from the `wallet_balances` table.
 * This is adapted for the new schema with a `tea_balance` column.
 */
export async function getWalletBalance(wallet_address: string) {
  const { data, error } = await supabase
    .from('wallet_balances')
    .select('tea_balance')
    .eq('wallet_address', wallet_address)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 means no row was found, which is not an error here.
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error fetching wallet balance:', error);
    throw error;
  }

  // Return a compatible structure for useAuth hook
  return {
    wallet_address,
    tea_balance: data?.tea_balance || 0,
  };
}

/**
 * Gets recent transactions for a wallet from the `tea_transactions` table.
 */
export async function getWalletTransactions(
  wallet_address: string,
  limit = 10
): Promise<TeaTransaction[]> {
  const { data, error } = await supabase
    .from('tea_transactions')
    .select('*')
    .eq('wallet_address', wallet_address)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error fetching wallet transactions:', error);
    throw error;
  }

  return data || [];
}
