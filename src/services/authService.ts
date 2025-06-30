
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: any;
}

export const authenticateUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      secureLog.error('Authentication failed:', error);
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error) {
    secureLog.error('Authentication error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
  }
};

export const createUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `https://cteanews.com/auth/callback`,
        data: {
          email_confirm: true
        }
      }
    });

    if (error) {
      secureLog.error('User creation failed:', error);
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error) {
    secureLog.error('User creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'User creation failed'
    };
  }
};

export const sendPasswordReset = async (email: string): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://cteanews.com/auth/reset-password`,
    });

    if (error) {
      secureLog.error('Password reset failed:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    secureLog.error('Password reset error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Password reset failed'
    };
  }
};
