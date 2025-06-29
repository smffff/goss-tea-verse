
import { secureLog } from '@/utils/secureLogging';

export class SecureTokenService {
  private static readonly TOKEN_LENGTH = 32;
  private static readonly STORAGE_KEY = 'ctea_anonymous_token';

  public static generateSecureToken(): string {
    const array = new Uint8Array(this.TOKEN_LENGTH);
    crypto.getRandomValues(array);
    
    // Convert to base64url format
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  public static validateToken(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false;
    }

    // Check length (base64url encoded 32 bytes should be ~43 chars)
    if (token.length < 40 || token.length > 50) {
      return false;
    }

    // Check format (base64url)
    if (!/^[A-Za-z0-9_-]+$/.test(token)) {
      return false;
    }

    // Check for suspicious patterns
    if (/^(test|debug|admin|demo)/i.test(token)) {
      secureLog.warn('Suspicious token pattern detected', { tokenPrefix: token.substring(0, 8) });
      return false;
    }

    return true;
  }

  public static getOrCreateToken(): string {
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      
      if (stored && this.validateToken(stored)) {
        return stored;
      }

      const newToken = this.generateSecureToken();
      sessionStorage.setItem(this.STORAGE_KEY, newToken);
      
      secureLog.info('New anonymous token generated');
      return newToken;
    } catch (error) {
      secureLog.error('Token generation failed', error);
      // Fallback to crypto-based generation
      return this.generateSecureToken();
    }
  }

  public static clearToken(): void {
    try {
      sessionStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      secureLog.warn('Failed to clear token', error);
    }
  }
}
