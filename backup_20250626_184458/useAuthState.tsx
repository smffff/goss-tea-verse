
import { useState, useCallback } from 'react';
import { getWalletBalance } from '@/lib/api/rewards';
import type { WalletUser, AuthSession } from '@/types/auth';

export const useAuthState = () => {
  const [user, setUser] = useState<WalletUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(false);

  console.log('🔐 [AuthState] Current state:', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading,
    userWallet: user?.wallet_address
  });

  // Enhanced admin/moderator check based on verification level
  const isAdmin = user?.verification_level === 'admin';
  const isModerator = user?.verification_level === 'moderator' || isAdmin;

  console.log('🛡️ [AuthState] Role check:', { isAdmin, isModerator, verificationLevel: user?.verification_level });

  // Refresh wallet balance
  const refreshBalance = useCallback(async () => {
    if (!user?.wallet_address) {
      console.log('⚠️ [AuthState] Cannot refresh balance - no wallet address');
      return;
    }

    try {
      console.log('💰 [AuthState] Refreshing balance for:', user.wallet_address);
      const balance = await getWalletBalance(user.wallet_address);
      setUser(prev => prev ? {
        ...prev,
        token_balance: balance.tea_balance
      } : null);
      console.log('✅ [AuthState] Balance refreshed:', balance.tea_balance);
    } catch (error) {
      console.error('❌ [AuthState] Failed to refresh balance:', error);
    }
  }, [user?.wallet_address]);

  return {
    user,
    setUser,
    session,
    setSession,
    loading,
    setLoading,
    isAdmin,
    isModerator,
    refreshBalance
  };
};
