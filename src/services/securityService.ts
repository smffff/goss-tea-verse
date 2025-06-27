
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface SecurityResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export class SecurityService {
  static async validateUserSession(): Promise<SecurityResult> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { 
        success: !!session, 
        data: session,
        message: session ? 'Valid session' : 'No active session'
      };
    } catch (error) {
      secureLog.error('Session validation error:', error);
      return { success: false, error: 'Session validation failed' };
    }
  }

  static async validateTokenSecurity(token: string): Promise<SecurityResult> {
    try {
      // Basic token validation
      if (!token || token.length < 10) {
        return { success: false, error: 'Invalid token format' };
      }

      // For now, just validate the token exists and has proper format
      return { success: true, message: 'Token is valid' };
    } catch (error) {
      secureLog.error('Token validation error:', error);
      return { success: false, error: 'Token validation failed' };
    }
  }

  static async validateCSRFToken(token: string): Promise<SecurityResult> {
    try {
      // Simple CSRF token validation
      const storedToken = sessionStorage.getItem('csrf_token');
      
      if (!storedToken || storedToken !== token) {
        return { success: false, error: 'Invalid CSRF token' };
      }

      return { success: true, message: 'CSRF token is valid' };
    } catch (error) {
      secureLog.error('CSRF validation error:', error);
      return { success: false, error: 'CSRF validation failed' };
    }
  }

  static generateCSRFToken(): string {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    sessionStorage.setItem('csrf_token', token);
    return token;
  }
}
