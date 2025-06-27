
import { secureLog } from '@/utils/secureLogging';

export interface TokenValidationResult {
  token: string;
  valid: boolean;
  warnings: string[];
  securityScore: number;
  suspicious: boolean;
}

export class TokenValidationService {
  private static readonly TOKEN_LENGTH = 43; // Base64URL encoded 32 bytes
  private static readonly TOKEN_PATTERN = /^[A-Za-z0-9_-]+$/;
  private static readonly SUSPICIOUS_PATTERNS = [
    /test/i, /debug/i, /admin/i, /root/i, /system/i, /demo/i
  ];

  public static generateSecureToken(): string {
    try {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    } catch (error) {
      secureLog.error('Failed to generate secure token', error);
      // Fallback token generation
      return 'fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    }
  }

  public static validateToken(token: string): TokenValidationResult {
    const warnings: string[] = [];
    let securityScore = 100;
    let suspicious = false;

    // Basic validation
    if (!token || token.length < 20) {
      return {
        token,
        valid: false,
        warnings: ['Token too short or missing'],
        securityScore: 0,
        suspicious: true
      };
    }

    // Length validation
    if (token.length !== this.TOKEN_LENGTH && !token.startsWith('fallback_')) {
      securityScore -= 20;
      warnings.push('Token length unexpected');
    }

    // Character validation
    if (!this.TOKEN_PATTERN.test(token)) {
      securityScore -= 30;
      warnings.push('Invalid characters in token');
    }

    // Suspicious pattern detection
    for (const pattern of this.SUSPICIOUS_PATTERNS) {
      if (pattern.test(token)) {
        securityScore -= 50;
        warnings.push('Suspicious token pattern detected');
        suspicious = true;
        break;
      }
    }

    // Check for obvious test/debug tokens
    if (token.includes('test') || token.includes('debug') || token.length < 10) {
      securityScore -= 40;
      warnings.push('Test or debug token detected');
      suspicious = true;
    }

    return {
      token,
      valid: securityScore >= 50,
      warnings,
      securityScore,
      suspicious
    };
  }

  public static getOrCreateSecureToken(): TokenValidationResult {
    try {
      let token = sessionStorage.getItem('ctea_anonymous_token');
      
      if (!token) {
        token = this.generateSecureToken();
        sessionStorage.setItem('ctea_anonymous_token', token);
        secureLog.info('🔑 Generated new secure token');
      }

      const validation = this.validateToken(token);
      
      // If token is invalid, generate a new one
      if (!validation.valid) {
        secureLog.warn('⚠️ Invalid token detected, generating new one', { warnings: validation.warnings });
        token = this.generateSecureToken();
        sessionStorage.setItem('ctea_anonymous_token', token);
        return this.validateToken(token);
      }

      return validation;
    } catch (error) {
      secureLog.error('Token management failed', error);
      const fallbackToken = this.generateSecureToken();
      return this.validateToken(fallbackToken);
    }
  }

  public static clearToken(): void {
    try {
      sessionStorage.removeItem('ctea_anonymous_token');
      localStorage.removeItem('ctea_anonymous_token'); // Clear any old tokens
      secureLog.info('🧹 Token cleared');
    } catch (error) {
      secureLog.error('Failed to clear token', error);
    }
  }
}
