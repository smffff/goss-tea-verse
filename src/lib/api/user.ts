import { supabase } from '../integrations/supabase/client';

/**
 * Upserts a user profile by wallet address.
 * @param param0 Object with wallet_address
 */
export async function upsertUserProfile({ wallet_address }: { wallet_address: string }) {
  const { data, error } = await supabase
    .from('users')
    .upsert({
      wallet_address,
      updated_at: new Date().toISOString(),
    }, { onConflict: ['wallet_address'] })
    .select();
  if (error) throw error;
  return data?.[0] || null;
} 