
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from '@/components/WalletProvider';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import type { WalletUser, AuthSession, AuthContextType } from '@/types/auth';

const UnifiedAuthContext = createContext<AuthContextType | undefined>(undefined);

export const useUnifiedAuth = () => {
  const context = useContext(UnifiedAuthContext);
  if (!context) {
    throw new Error('useUnifiedAuth must be used within UnifiedAuthProvider');
  }
  return context;
};

export const UnifiedAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { wallet, disconnectWallet } = useWallet();
  const [user, setUser] = useState<WalletUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.verification_level === 'admin' || user?.app_metadata?.role === 'admin';
  const isModerator = user?.verification_level === 'moderator' || isAdmin;

  // Secure session validation
  const validateSession = async (currentSession: AuthSession | null) => {
    if (!currentSession?.user) return null;
    
    try {
      const { data: { user: validatedUser }, error } = await supabase.auth.getUser();
      
      if (error || !validatedUser) {
        secureLog.warn('Session validation failed:', error);
        return null;
      }
      
      return currentSession;
    } catch (error) {
      secureLog.error('Session validation error:', error);
      return null;
    }
  };

  // Wallet sync with proper error handling
  const syncWalletUser = async (walletAddress: string) => {
    try {
      setLoading(true);
      
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (profile) {
        const walletUser: WalletUser = {
          id: profile.id,
          wallet_address: profile.wallet_address,
          token_balance: profile.token_balance || 0,
          email: profile.email,
          anonymous_token: profile.anonymous_token,
          verification_level: profile.verification_level,
          is_verified: profile.is_verified,
        };

        setUser(walletUser);
        setSession({ user: walletUser });
      }
    } catch (error) {
      secureLog.error('Wallet sync failed:', error);
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle wallet connection
  useEffect(() => {
    if (wallet.isConnected && wallet.address && !user) {
      syncWalletUser(wallet.address);
    } else if (!wallet.isConnected) {
      setUser(null);
      setSession(null);
      setLoading(false);
    }
  }, [wallet.isConnected, wallet.address, user]);

  // Auth state monitoring with session validation
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        if (event === 'SIGNED_IN' && supabaseSession) {
          const validatedSession = await validateSession({ user: supabaseSession.user as WalletUser });
          setSession(validatedSession);
          setUser(validatedSession?.user || null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      disconnectWallet();
      setUser(null);
      setSession(null);
    } catch (error) {
      secureLog.error('Sign out error:', error);
    }
  };

  const disconnect = () => {
    disconnectWallet();
    setUser(null);
    setSession(null);
  };

  const refreshBalance = async () => {
    if (!user?.wallet_address) return;
    await syncWalletUser(user.wallet_address);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      return { success: true, user: data.user };
    } catch (error) {
      secureLog.error('Sign in failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign in failed' 
      };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;
      
      return { success: true, user: data.user };
    } catch (error) {
      secureLog.error('Sign up failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign up failed' 
      };
    }
  };

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

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
};
