
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { upsertUserProfile } from '@/lib/api/user';
import { rewardEarlyUser, getWalletBalance } from '@/lib/api/rewards';
import type { WalletUser } from '@/types/auth';

export const useWalletSync = () => {
  const { toast } = useToast();

  const syncWalletUser = useCallback(async (
    walletAddress: string,
    setUser: (user: WalletUser | null) => void,
    setSession: (session: any) => void,
    setLoading: (loading: boolean) => void,
    refreshBalance: () => Promise<void>
  ) => {
    console.log('🔄 [WalletSync] Starting sync for:', walletAddress);
    setLoading(true);
    
    try {
      // Get existing anonymous token from localStorage if available
      const existingToken = localStorage.getItem('ctea-anonymous-token');
      console.log('🎫 [WalletSync] Existing token found:', !!existingToken);
      
      // Upsert user profile
      console.log('👤 [WalletSync] Upserting user profile...');
      const profile = await upsertUserProfile({ 
        wallet_address: walletAddress,
        anonymous_token: existingToken || undefined
      });

      console.log('👤 [WalletSync] Profile upserted:', profile);

      // Get current balance
      console.log('💰 [WalletSync] Getting wallet balance...');
      const balance = await getWalletBalance(walletAddress);

      console.log('💰 [WalletSync] Balance retrieved:', balance);

      const userData: WalletUser = {
        id: profile.wallet_address,
        wallet_address: profile.wallet_address,
        token_balance: balance.tea_balance,
        anonymous_token: profile.anonymous_token,
        verification_level: profile.verification_level,
        is_verified: profile.is_verified,
        email_confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        user_metadata: {},
        app_metadata: {}
      };

      console.log('✅ [WalletSync] User data created:', userData);
      setUser(userData);
      setSession({ user: userData });

      // Award early user reward
      try {
        console.log('🎁 [WalletSync] Checking early user reward...');
        const rewardResult = await rewardEarlyUser(walletAddress);

        if (rewardResult.rewarded) {
          console.log('🎉 [WalletSync] Early user reward granted!', rewardResult.amount);
          toast({
            title: "Welcome Bonus! 🎉",
            description: `You've received ${rewardResult.amount} $TEA tokens for being an early adopter!`,
          });
          // Refresh balance to show the new reward
          await refreshBalance();
        } else {
          console.log('ℹ️ [WalletSync] Early user reward already claimed or not applicable');
        }
      } catch (rewardError: any) {
        console.warn('⚠️ [WalletSync] Could not process early user reward:', rewardError.message);
      }

    } catch (error: any) {
      console.error('❌ [WalletSync] Auth sync error:', error);
      toast({
        title: 'Connection Error',
        description: error.message || 'Failed to sync wallet data',
        variant: 'destructive',
      });
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { syncWalletUser };
};
