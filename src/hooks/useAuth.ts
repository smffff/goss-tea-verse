
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface ExtendedUser extends User {
  token_balance?: number;
  verification_level?: string;
  wallet_address?: string;
}

export interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  refreshBalance?: () => Promise<void>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Sign in failed' };
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

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Sign up failed' };
    }
  };

  const refreshBalance = async () => {
    // Placeholder for balance refresh logic
    console.log('Refreshing balance...');
  };

  // Simple admin check - in production, this would check user roles
  const isAdmin = user?.email === 'admin@ctea.com' || user?.email === 'stephanie@taskbytask.net';
  const isModerator = isAdmin || user?.email?.includes('mod@');

  return {
    user,
    loading,
    isAdmin,
    isModerator,
    refreshBalance,
    signOut,
    signIn,
    signUp
  };
};
