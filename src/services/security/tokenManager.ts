
import { secureLog } from '@/utils/secureLogging';

export class TokenManagerService {
  static async getOrCreateSecureToken(): Promise<string> {
    try {
      // Check for existing token in session
      const existingToken = sessionStorage.getItem('ctea_secure_token');
      if (existingToken && existingToken.length > 16) {
        return existingToken;
      }

      // Generate new secure token
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      const token = btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      sessionStorage.setItem('ctea_secure_token', token);
      return token;
    } catch (error) {
      secureLog.error('Token generation failed:', error);
      // Fallback token
      const fallbackToken = 'fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      sessionStorage.setItem('ctea_secure_token', fallbackToken);
      return fallbackToken;
    }
  }
}
