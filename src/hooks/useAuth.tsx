import React, { createContext, useContext, useEffect } from 'react';
import { useWallet } from '@/components/WalletProvider';
import { useAuthState } from '@/hooks/useAuthState';
import { useWalletSync } from '@/hooks/useWalletSync';
import { useAuthActions } from '@/hooks/useAuthActions';
import type { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (process.env.NODE_ENV === "development") {
    console.info('🔐 [AuthProvider] Initializing...');
  }
  
  const { wallet, disconnectWallet } = useWallet();
  const { 
    user, 
    setUser, 
    session, 
    setSession, 
    loading, 
    setLoading, 
    isAdmin, 
    isModerator, 
    refreshBalance 
  } = useAuthState();
  
  const { syncWalletUser } = useWalletSync();
  const { signIn, signUp, disconnect, signOut } = useAuthActions(
    user, 
    disconnectWallet, 
    setUser, 
    setSession
  );

  if (process.env.NODE_ENV === "development") {
    console.info('👛 [AuthProvider] Wallet state:', {
      isConnected: !!wallet,
      address: wallet?.address,
      chainId: wallet?.chainId
    });
  }

  // Handle wallet connection and user sync
  useEffect(() => {
    let mounted = true;

    if (wallet.isConnected && wallet.address && !user) {
      if (process.env.NODE_ENV === "development") {
        console.info('🔄 [AuthProvider] Triggering wallet sync...');
      }
      syncWalletUser(wallet.address, setUser, setSession, setLoading, refreshBalance);
    }

    return () => {
      mounted = false;
    };
  }, [wallet.isConnected, wallet.address, user, syncWalletUser, setUser, setSession, setLoading, refreshBalance]);

  // Handle wallet disconnection
  useEffect(() => {
    if (!wallet.isConnected) {
      if (process.env.NODE_ENV === "development") {
        console.info('👛 [AuthProvider] Wallet disconnected, clearing user state');
      }
      setUser(null);
      setSession(null);
    }
  }, [wallet.isConnected, setUser, setSession]);

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

  if (process.env.NODE_ENV === "development") {
    console.info('🔐 [AuthProvider] Rendering with value:', {
      user,
      wallet,
      isConnected: !!wallet,
      isLoading
    });
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
