
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
      
      // Get user profile with wallet balance - using separate queries for better type safety
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Get wallet balance separately
      const { data: balanceData, error: balanceError } = await supabase
        .from('wallet_balances')
        .select('tea_balance')
        .eq('wallet_address', walletAddress)
        .maybeSingle();

      if (profile) {
        const walletUser: WalletUser = {
          id: profile.id,
          wallet_address: profile.wallet_address || walletAddress,
          token_balance: balanceData?.tea_balance || 0,
          email: undefined, // Profile doesn't store email directly
          anonymous_token: profile.anonymous_token,
          verification_level: profile.verification_level,
          is_verified: profile.is_verified,
        };

        setUser(walletUser);
        setSession({ user: walletUser });
      } else {
        // Create new profile if none exists
        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert([{
            wallet_address: walletAddress,
            verification_level: 'wallet_connected'
          }])
          .select('*')
          .single();

        if (createError) {
          throw createError;
        }

        if (newProfile) {
          const walletUser: WalletUser = {
            id: newProfile.id,
            wallet_address: newProfile.wallet_address || walletAddress,
            token_balance: 0,
            anonymous_token: newProfile.anonymous_token,
            verification_level: newProfile.verification_level,
            is_verified: newProfile.is_verified,
          };

          setUser(walletUser);
          setSession({ user: walletUser });
        }
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
        if (event === 'SIGNED_IN' && supabaseSession?.user) {
          // Convert Supabase User to WalletUser
          const walletUser: WalletUser = {
            id: supabaseSession.user.id,
            wallet_address: supabaseSession.user.user_metadata?.wallet_address || '',
            token_balance: 0,
            email: supabaseSession.user.email,
            anonymous_token: supabaseSession.user.user_metadata?.anonymous_token,
            verification_level: supabaseSession.user.user_metadata?.verification_level || 'email_verified',
            is_verified: supabaseSession.user.email_confirmed_at !== null,
            email_confirmed_at: supabaseSession.user.email_confirmed_at,
            last_sign_in_at: supabaseSession.user.last_sign_in_at,
            user_metadata: supabaseSession.user.user_metadata,
            app_metadata: supabaseSession.user.app_metadata,
          };

          const validatedSession = await validateSession({ user: walletUser });
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
      
      if (data.user) {
        const walletUser: WalletUser = {
          id: data.user.id,
          wallet_address: data.user.user_metadata?.wallet_address || '',
          token_balance: 0,
          email: data.user.email,
          anonymous_token: data.user.user_metadata?.anonymous_token,
          verification_level: data.user.user_metadata?.verification_level || 'email_verified',
          is_verified: data.user.email_confirmed_at !== null,
        };

        return { success: true, user: walletUser };
      }
      
      return { success: false, error: 'No user data returned' };
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
      
      if (data.user) {
        const walletUser: WalletUser = {
          id: data.user.id,
          wallet_address: data.user.user_metadata?.wallet_address || '',
          token_balance: 0,
          email: data.user.email,
          anonymous_token: data.user.user_metadata?.anonymous_token,
          verification_level: 'email_pending',
          is_verified: false,
        };

        return { success: true, user: walletUser };
      }
      
      return { success: false, error: 'No user data returned' };
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
