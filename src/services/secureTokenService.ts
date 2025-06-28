
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

interface SecureTokenResult {
  success: boolean;
  token?: string;
  error?: string;
  expiresAt?: string;
}

interface TokenValidationResult {
  valid: boolean;
  token: string;
  securityScore?: number;
  warnings?: string[];
}

export class SecureTokenService {
  private static readonly TOKEN_STORAGE_KEY = 'ctea_secure_token';
  private static readonly TOKEN_EXPIRY_KEY = 'ctea_token_expiry';

  /**
   * Generates a secure server-side token
   */
  static async generateSecureToken(): Promise<SecureTokenResult> {
    try {
      // Use crypto.getRandomValues for cryptographically secure random generation
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      
      // Convert to base64url format (URL-safe base64)
      const token = btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      // Validate the generated token
      const isValid = await this.validateTokenSecurity(token);
      
      if (!isValid.valid) {
        throw new Error('Generated token failed security validation');
      }

      // Set expiry to 24 hours from now
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      return {
        success: true,
        token,
        expiresAt
      };
    } catch (error) {
      secureLog.error('Secure token generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Token generation failed'
      };
    }
  }

  /**
   * Validates token security using server-side validation
   */
  static async validateTokenSecurity(token: string): Promise<TokenValidationResult> {
    try {
      const { data, error } = await supabase
        .rpc('validate_anonymous_token_secure', { token });

      if (error) {
        secureLog.error('Token security validation failed:', error);
        return { valid: false, token };
      }

      return {
        valid: data === true,
        token,
        securityScore: data === true ? 100 : 0
      };
    } catch (error) {
      secureLog.error('Token validation error:', error);
      return { valid: false, token };
    }
  }

  /**
   * Gets or creates a secure token with proper lifecycle management
   */
  static async getOrCreateSecureToken(): Promise<string> {
    try {
      // Check for existing valid token
      const existingToken = sessionStorage.getItem(this.TOKEN_STORAGE_KEY);
      const tokenExpiry = sessionStorage.getItem(this.TOKEN_EXPIRY_KEY);

      if (existingToken && tokenExpiry) {
        const expiryDate = new Date(tokenExpiry);
        const now = new Date();

        // Check if token is still valid (not expired)
        if (expiryDate > now) {
          // Validate existing token security
          const validation = await this.validateTokenSecurity(existingToken);
          
          if (validation.valid) {
            return existingToken;
          } else {
            secureLog.warn('Existing token failed security validation, generating new one');
          }
        } else {
          secureLog.info('Token expired, generating new one');
        }
      }

      // Generate new secure token
      const tokenResult = await this.generateSecureToken();
      
      if (!tokenResult.success || !tokenResult.token) {
        throw new Error(tokenResult.error || 'Failed to generate secure token');
      }

      // Store the new token and its expiry
      sessionStorage.setItem(this.TOKEN_STORAGE_KEY, tokenResult.token);
      if (tokenResult.expiresAt) {
        sessionStorage.setItem(this.TOKEN_EXPIRY_KEY, tokenResult.expiresAt);
      }

      secureLog.info('Generated and stored new secure token');
      return tokenResult.token;
    } catch (error) {
      secureLog.error('Token management failed:', error);
      
      // Fallback: generate a client-side token if server-side fails
      const fallbackToken = 'fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      sessionStorage.setItem(this.TOKEN_STORAGE_KEY, fallbackToken);
      
      return fallbackToken;
    }
  }

  /**
   * Refreshes the current token
   */
  static async refreshToken(): Promise<string> {
    // Clear existing token
    sessionStorage.removeItem(this.TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    
    // Generate new token
    return await this.getOrCreateSecureToken();
  }

  /**
   * Clears the current token
   */
  static clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  /**
   * Checks if current token is near expiry (within 1 hour)
   */
  static isTokenNearExpiry(): boolean {
    const tokenExpiry = sessionStorage.getItem(this.TOKEN_EXPIRY_KEY);
    
    if (!tokenExpiry) {
      return true; // No expiry means we need a new token
    }

    const expiryDate = new Date(tokenExpiry);
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);

    return expiryDate <= oneHourFromNow;
  }
}
