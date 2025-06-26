import { supabase } from '../integrations/supabase/client';

/**
 * Rewards an early user with Tea tokens if eligible.
 * @param wallet_address The user's wallet address
 */
export async function rewardEarlyUser(wallet_address: string) {
  // Check if user already received early reward
  const { data: rewards, error: rewardError } = await supabase
    .from('token_rewards')
    .select('*')
    .eq('wallet_address', wallet_address)
    .eq('reason', 'early adopter');

  if (rewardError) throw rewardError;
  if (rewards && rewards.length > 0) return { alreadyRewarded: true };

  // Insert reward record
  const rewardAmount = 100; // Set your early adopter reward amount
  const { error: insertError } = await supabase
    .from('token_rewards')
    .insert({
      wallet_address,
      amount: rewardAmount,
      reason: 'early adopter',
      created_at: new Date().toISOString(),
    });
  if (insertError) throw insertError;

  // Update user's token balance
  const { error: updateError } = await supabase
    .from('users')
    .update({ token_balance: supabase.rpc('increment_token_balance', { wallet_address, amount: rewardAmount }) })
    .eq('wallet_address', wallet_address);
  if (updateError) throw updateError;

  return { rewarded: true, amount: rewardAmount };
} 