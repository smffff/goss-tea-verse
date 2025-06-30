
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface AnonymousAuthResult {
  success: boolean;
  error?: string;
  user?: any;
}

export const createAnonymousUser = async (username: string): Promise<AnonymousAuthResult> => {
  try {
    // Generate a unique anonymous token
    const anonymousToken = `anon_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    // Create user profile in our database
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{
        anonymous_token: anonymousToken,
        username: username,
        verification_level: 'anonymous',
        is_verified: false
      }])
      .select('id, username, anonymous_token, verification_level, is_verified')
      .single();

    if (error) {
      secureLog.error('Anonymous user creation failed:', error);
      return { success: false, error: error.message };
    }

    if (!data) {
      secureLog.error('No data returned from anonymous user creation');
      return { success: false, error: 'Failed to create user profile' };
    }

    // Store in local storage for session persistence
    localStorage.setItem('ctea_anonymous_user', JSON.stringify({
      id: data.id,
      username: data.username,
      anonymous_token: data.anonymous_token,
      verification_level: data.verification_level
    }));

    return { success: true, user: data };
  } catch (error) {
    secureLog.error('Anonymous auth error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Anonymous signup failed'
    };
  }
};

export const getAnonymousUser = () => {
  try {
    const stored = localStorage.getItem('ctea_anonymous_user');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    secureLog.error('Failed to get anonymous user:', error);
    return null;
  }
};

export const clearAnonymousUser = () => {
  localStorage.removeItem('ctea_anonymous_user');
};
