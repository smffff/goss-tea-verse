
import { useCallback } from 'react';
import type { WalletUser } from '@/types/auth';

export const useAuthActions = (
  user: WalletUser | null,
  disconnectWallet: () => void,
  setUser: (user: WalletUser | null) => void,
  setSession: (session: any) => void
) => {
  // Mock sign in/up functions for compatibility
  const signIn = useCallback(async (email: string, password: string) => {
    console.log('📧 [AuthActions] Sign in attempt for:', email);
    // This would normally handle email/password auth
    // For now, just return success for wallet-based auth
    return { data: { user: user }, error: null };
  }, [user]);

  const signUp = useCallback(async (email: string, password: string) => {
    console.log('📝 [AuthActions] Sign up attempt for:', email);
    // This would normally handle email/password registration
    // For now, just return success for wallet-based auth
    return { data: { user: user }, error: null };
  }, [user]);

  // Disconnect handler
  const disconnect = useCallback(() => {
    console.log('🔌 [AuthActions] Disconnecting wallet...');
    disconnectWallet();
    setUser(null);
    setSession(null);
  }, [disconnectWallet, setUser, setSession]);

  // Sign out handler (same as disconnect for wallet auth)
  const signOut = useCallback(() => {
    console.log('👋 [AuthActions] Signing out...');
    disconnect();
  }, [disconnect]);

  return {
    signIn,
    signUp,
    disconnect,
    signOut
  };
};
