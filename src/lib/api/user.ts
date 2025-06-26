
import { supabase } from '@/integrations/supabase/client';

/**
 * Upserts a user profile by wallet address, linking it to anonymous token if provided.
 * Uses the existing user_profiles table schema.
 */
export async function upsertUserProfile({ 
  wallet_address, 
  anonymous_token 
}: { 
  wallet_address: string; 
  anonymous_token?: string; 
}) {
  try {
    // Check if profile already exists with this wallet
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('wallet_address', wallet_address)
      .single();

    if (existingProfile) {
      return existingProfile;
    }

    // Create new profile or update existing anonymous profile
    const profileData = {
      wallet_address,
      verification_level: 'wallet_connected',
      is_verified: true,
      updated_at: new Date().toISOString(),
      ...(anonymous_token && { anonymous_token })
    };

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profileData, { onConflict: 'wallet_address' })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error upserting user profile:', error);
    throw error;
  }
}

/**
 * Gets user profile by wallet address
 */
export async function getUserProfile(wallet_address: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('wallet_address', wallet_address)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data;
}

/**
 * Links anonymous token to wallet address
 */
export async function linkAnonymousToWallet(anonymous_token: string, wallet_address: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ wallet_address })
    .eq('anonymous_token', anonymous_token)
    .select()
    .single();

  if (error) throw error;
  return data;
}
