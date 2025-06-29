
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { secureLog } from '@/utils/secureLogging';

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

// Password strength validation
const validatePasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Session timeout (30 minutes of inactivity)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        secureLog.info('Session timeout - logging out user');
        signOut();
      }, 30 * 60 * 1000); // 30 minutes
    };

    if (user) {
      resetTimeout();
      
      // Reset timeout on user activity
      const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      const handleActivity = () => resetTimeout();
      
      activityEvents.forEach(event => {
        document.addEventListener(event, handleActivity, true);
      });
      
      return () => {
        clearTimeout(timeoutId);
        activityEvents.forEach(event => {
          document.removeEventListener(event, handleActivity, true);
        });
      };
    }
  }, [user]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        secureLog.error('Session retrieval error', error);
      }
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        secureLog.info('Auth state changed', { event });
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      secureLog.info('User signed out');
    } catch (error) {
      secureLog.error('Sign out error', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Input validation
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      });

      if (error) {
        secureLog.warn('Sign in failed', { email, error: error.message });
        return { success: false, error: error.message };
      }

      secureLog.info('User signed in successfully', { email });
      return { success: true };
    } catch (error) {
      secureLog.error('Sign in error', error);
      return { success: false, error: 'Sign in failed' };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Input validation
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Password strength validation
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        return { 
          success: false, 
          error: passwordValidation.errors.join('. ') 
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        secureLog.warn('Sign up failed', { email, error: error.message });
        return { success: false, error: error.message };
      }

      secureLog.info('User signed up successfully', { email });
      return { success: true };
    } catch (error) {
      secureLog.error('Sign up error', error);
      return { success: false, error: 'Sign up failed' };
    }
  };

  const refreshBalance = async () => {
    // Placeholder for balance refresh logic
    secureLog.info('Refreshing balance...');
  };

  // Simple admin check - in production, this would check user roles from database
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
