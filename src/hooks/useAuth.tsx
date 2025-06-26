
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/components/WalletProvider';
import { upsertUserProfile, getUserProfile } from '@/lib/api/user';
import { rewardEarlyUser, getWalletBalance } from '@/lib/api/rewards';

interface WalletUser {
  id: string;
  wallet_address: string;
  token_balance: number;
  email?: string;
  anonymous_token?: string;
  verification_level?: string;
  is_verified?: boolean;
  email_confirmed_at?: string | null;
  last_sign_in_at?: string | null;
  user_metadata?: any;
  app_metadata?: any;
}

interface AuthSession {
  user: WalletUser | null;
  access_token?: string;
}

interface AuthContextType {
  user: WalletUser | null;
  session: AuthSession | null;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  disconnect: () => void;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  refreshBalance: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('🔐 AuthProvider initializing...');
  
  const { wallet, disconnectWallet } = useWallet();
  const [user, setUser] = useState<WalletUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  console.log('👛 Wallet state in AuthProvider:', { 
    address: wallet.address, 
    isConnected: wallet.isConnected,
    chainId: wallet.chainId 
  });

  // Enhanced admin/moderator check based on verification level
  const isAdmin = user?.verification_level === 'admin';
  const isModerator = user?.verification_level === 'moderator' || isAdmin;

  console.log('🛡️ Role check:', { isAdmin, isModerator, verificationLevel: user?.verification_level });

  // Refresh wallet balance
  const refreshBalance = useCallback(async () => {
    if (!wallet.address || !wallet.isConnected) {
      console.log('⚠️ Cannot refresh balance - wallet not connected');
      return;
    }

    try {
      console.log('💰 Refreshing balance for:', wallet.address);
      const balance = await getWalletBalance(wallet.address);
      setUser(prev => prev ? {
        ...prev,
        token_balance: balance.tea_balance
      } : null);
      console.log('✅ Balance refreshed:', balance.tea_balance);
    } catch (error) {
      console.error('❌ Failed to refresh balance:', error);
    }
  }, [wallet.address, wallet.isConnected]);

  // Mock sign in/up functions for compatibility
  const signIn = useCallback(async (email: string, password: string) => {
    console.log('📧 Sign in attempt for:', email);
    // This would normally handle email/password auth
    // For now, just return success for wallet-based auth
    return { data: { user: user }, error: null };
  }, [user]);

  const signUp = useCallback(async (email: string, password: string) => {
    console.log('📝 Sign up attempt for:', email);
    // This would normally handle email/password registration
    // For now, just return success for wallet-based auth
    return { data: { user: user }, error: null };
  }, [user]);

  // Handle wallet connection and user sync
  useEffect(() => {
    let mounted = true;

    const syncWalletUser = async () => {
      if (!wallet.isConnected || !wallet.address) {
        console.log('⚠️ Wallet not connected, skipping sync');
        return;
      }
      
      console.log('🔄 Syncing wallet user for:', wallet.address);
      setLoading(true);
      
      try {
        // Get existing anonymous token from localStorage if available
        const existingToken = localStorage.getItem('ctea-anonymous-token');
        console.log('🎫 Existing token found:', !!existingToken);
        
        // Upsert user profile
        console.log('👤 Upserting user profile...');
        const profile = await upsertUserProfile({ 
          wallet_address: wallet.address,
          anonymous_token: existingToken || undefined
        });

        if (!mounted) return;

        console.log('👤 Profile upserted:', profile);

        // Get current balance
        console.log('💰 Getting wallet balance...');
        const balance = await getWalletBalance(wallet.address);

        if (!mounted) return;

        console.log('💰 Balance retrieved:', balance);

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

        console.log('✅ User data created:', userData);
        setUser(userData);
        setSession({ user: userData });

        // Award early user reward. The new `rewardEarlyUser` function handles
        // the check internally to prevent duplicate rewards.
        try {
          console.log('🎁 Checking early user reward...');
          const rewardResult = await rewardEarlyUser(wallet.address);

          if (mounted && rewardResult.rewarded) {
            console.log('🎉 Early user reward granted!', rewardResult.amount);
            toast({
              title: "Welcome Bonus! 🎉",
              description: `You've received ${rewardResult.amount} $TEA tokens for being an early adopter!`,
            });
            // Refresh balance to show the new reward
            await refreshBalance();
          } else {
            console.log('ℹ️ Early user reward already claimed or not applicable');
          }
        } catch (rewardError: any) {
          console.warn('⚠️ Could not process early user reward:', rewardError.message);
        }

      } catch (error: any) {
        if (!mounted) return;
        
        console.error('❌ Auth sync error:', error);
        toast({
          title: 'Connection Error',
          description: error.message || 'Failed to sync wallet data',
          variant: 'destructive',
        });
        setUser(null);
        setSession(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (wallet.isConnected && wallet.address && !user) {
      console.log('🔄 Triggering wallet sync...');
      syncWalletUser();
    }

    return () => {
      mounted = false;
    };
  }, [wallet.isConnected, wallet.address, user, toast, refreshBalance]);

  // Handle wallet disconnection
  useEffect(() => {
    if (!wallet.isConnected) {
      console.log('👛 Wallet disconnected, clearing user state');
      setUser(null);
      setSession(null);
    }
  }, [wallet.isConnected]);

  // Disconnect handler
  const disconnect = useCallback(() => {
    console.log('🔌 Disconnecting wallet...');
    disconnectWallet();
    setUser(null);
    setSession(null);
  }, [disconnectWallet]);

  // Sign out handler (same as disconnect for wallet auth)
  const signOut = useCallback(() => {
    console.log('👋 Signing out...');
    disconnect();
  }, [disconnect]);

  const value: AuthContextType = {
    user,
    session,
    loading,
    isAdmin,
    isModerator,
    disconnect,
    signOut,
    signIn,
    signUp,
    refreshBalance,
  };

  console.log('🔐 AuthProvider rendering with value:', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading, 
    isAdmin, 
    isModerator,
    userWallet: user?.wallet_address
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
