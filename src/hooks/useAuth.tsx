import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/components/WalletProvider';
import { upsertUserProfile } from '@/lib/api/user';
import { rewardEarlyUser } from '@/lib/api/rewards';

interface WalletUser {
  wallet_address: string;
  token_balance: number;
}

interface AuthContextType {
  user: WalletUser | null;
  loading: boolean;
  disconnect: () => void;
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
  const [hasRewarded, setHasRewarded] = useState(false);
  const { toast } = useToast();

  // Effect: On wallet connect, upsert user and reward if new
  useEffect(() => {
    const handleWalletConnect = async () => {
      if (wallet.isConnected && wallet.address && !user && !hasRewarded) {
        setLoading(true);
        try {
          // Upsert user profile
          const profile = await upsertUserProfile({ wallet_address: wallet.address });
          if (!profile) throw new Error('Failed to upsert user profile');
          // Reward early user (only once)
          await rewardEarlyUser(wallet.address);
          setHasRewarded(true);
          setUser({ wallet_address: profile.wallet_address, token_balance: profile.token_balance });
        } catch (error: any) {
          toast({
            title: 'Auth Error',
            description: error.message || 'Failed to authenticate wallet',
            variant: 'destructive',
          });
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else if (wallet.isConnected && wallet.address && user && !hasRewarded) {
        // If user is already set but not rewarded, try to reward
        try {
          await rewardEarlyUser(wallet.address);
          setHasRewarded(true);
        } catch {}
      }
    };
    handleWalletConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.isConnected, wallet.address]);

  // Effect: On wallet disconnect, clear user
  useEffect(() => {
    if (!wallet.isConnected) {
      setUser(null);
      setHasRewarded(false);
    }
  }, [wallet.isConnected]);

  // Disconnect handler
  const disconnect = useCallback(() => {
    disconnectWallet();
    setUser(null);
    setHasRewarded(false);
  }, [disconnectWallet]);

  const value: AuthContextType = {
    user,
    loading,
    disconnect,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
