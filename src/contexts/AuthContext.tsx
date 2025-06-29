import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

interface User {
  id: string;
  email: string;
  role?: string;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  signInAnonymously: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          secureLog.error('Error getting initial session:', error);
        } else if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: session.user.user_metadata?.role,
          });
        }
      } catch (error) {
        secureLog.error('Failed to get initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        secureLog.info('Auth state changed:', { event, userId: session?.user?.id });
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: session.user.user_metadata?.role,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        secureLog.error('Sign in error:', error);
        return { success: false, error: error.message };
      }

      secureLog.info('User signed in successfully');
      return { success: true };
    } catch (error) {
      secureLog.error('Sign in failed:', error);
      return { success: false, error: 'Sign in failed' };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        secureLog.error('Sign up error:', error);
        return { success: false, error: error.message };
      }

      secureLog.info('User signed up successfully');
      return { success: true };
    } catch (error) {
      secureLog.error('Sign up failed:', error);
      return { success: false, error: 'Sign up failed' };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        secureLog.error('Sign out error:', error);
      } else {
        secureLog.info('User signed out successfully');
      }
    } catch (error) {
      secureLog.error('Sign out failed:', error);
    }
  };

  const signInAnonymously = async () => {
    try {
      // Generate a random anonymous token
      const anonymousToken = btoa(Math.random().toString(36) + Date.now().toString(36));
      
      setUser({
        id: `anon_${Date.now()}`,
        email: 'anonymous@ctea.local',
        isAnonymous: true,
      });

      secureLog.info('Anonymous user signed in');
      return { success: true };
    } catch (error) {
      secureLog.error('Anonymous sign in failed:', error);
      return { success: false, error: 'Anonymous sign in failed' };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        secureLog.error('Password reset error:', error);
        return { success: false, error: error.message };
      }

      secureLog.info('Password reset email sent');
      return { success: true };
    } catch (error) {
      secureLog.error('Password reset failed:', error);
      return { success: false, error: 'Password reset failed' };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInAnonymously,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 