
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/components/WalletProvider';
import { upsertUserProfile, getUserProfile } from '@/lib/api/user';
import { rewardEarlyUser, getWalletBalance } from '@/lib/api/rewards';

interface WalletUser {
  wallet_address: string;
  token_balance: number;
  anonymous_token?: string;
  verification_level?: string;
  is_verified?: boolean;
}

interface AuthContextType {
  user: WalletUser | null;
  loading: boolean;
  disconnect: () => void;
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
  const { wallet, disconnectWallet } = useWallet();
  const [user, setUser] = useState<WalletUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [processingReward, setProcessingReward] = useState(false);
  const { toast } = useToast();

  // Refresh wallet balance
  const refreshBalance = useCallback(async () => {
    if (!wallet.address || !wallet.isConnected) return;

    try {
      const balance = await getWalletBalance(wallet.address);
      setUser(prev => prev ? {
        ...prev,
        token_balance: balance.tea_balance
      } : null);
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, [wallet.address, wallet.isConnected]);

  // Handle wallet connection and user sync
  useEffect(() => {
    let mounted = true;

    const syncWalletUser = async () => {
      if (!wallet.isConnected || !wallet.address) return;
      
      setLoading(true);
      
      try {
        // Get existing anonymous token from localStorage if available
        const existingToken = localStorage.getItem('ctea-anonymous-token');
        
        // Upsert user profile
        const profile = await upsertUserProfile({ 
          wallet_address: wallet.address,
          anonymous_token: existingToken || undefined
        });

        if (!mounted) return;

        // Get current balance
        const balance = await getWalletBalance(wallet.address);

        if (!mounted) return;

        const userData: WalletUser = {
          wallet_address: profile.wallet_address,
          token_balance: balance.tea_balance,
          anonymous_token: profile.anonymous_token,
          verification_level: profile.verification_level,
          is_verified: profile.is_verified
        };

        setUser(userData);

        // Award early user reward (only once per wallet)
        if (!processingReward) {
          setProcessingReward(true);
          
          try {
            const rewardResult = await rewardEarlyUser(wallet.address);
            
            if (!mounted) return;

            if (rewardResult.rewarded) {
              toast({
                title: "Welcome Bonus! 🎉",
                description: `You've received ${rewardResult.amount} $TEA tokens as an early adopter reward!`,
              });

              // Update balance after reward
              userData.token_balance = rewardResult.new_balance || balance.tea_balance + rewardResult.amount;
              setUser({...userData});
            }
          } catch (rewardError) {
            console.warn('Reward error (likely already rewarded):', rewardError);
          } finally {
            setProcessingReward(false);
          }
        }

      } catch (error: any) {
        if (!mounted) return;
        
        console.error('Auth sync error:', error);
        toast({
          title: 'Connection Error',
          description: error.message || 'Failed to sync wallet data',
          variant: 'destructive',
        });
        setUser(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (wallet.isConnected && wallet.address && !user) {
      syncWalletUser();
    }

    return () => {
      mounted = false;
    };
  }, [wallet.isConnected, wallet.address, user, processingReward, toast]);

  // Handle wallet disconnection
  useEffect(() => {
    if (!wallet.isConnected) {
      setUser(null);
      setProcessingReward(false);
    }
  }, [wallet.isConnected]);

  // Disconnect handler
  const disconnect = useCallback(() => {
    disconnectWallet();
    setUser(null);
    setProcessingReward(false);
  }, [disconnectWallet]);

  const value: AuthContextType = {
    user,
    loading,
    disconnect,
    refreshBalance,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
