
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface SecurityValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
  sanitized?: string;
  securityScore?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  currentCount?: number;
  maxActions?: number;
  blockedReason?: string;
  resetTime?: string;
  securityViolation?: boolean;
}

export class SecurityService {
  /**
   * Validates anonymous token using server-side validation
   */
  static async validateAnonymousToken(token: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('validate_anonymous_token_secure', { token });

      if (error) {
        secureLog.error('Token validation failed:', error);
        return false;
      }

      return data === true;
    } catch (error) {
      secureLog.error('Token validation error:', error);
      return false;
    }
  }

  /**
   * Checks rate limit using server-side validation
   */
  static async checkRateLimit(
    token: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 60
  ): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase
        .rpc('check_rate_limit_secure', {
          p_token: token,
          p_action: action,
          p_max_actions: maxActions,
          p_window_minutes: windowMinutes
        });

      if (error) {
        secureLog.error('Rate limit check failed:', error);
        return { allowed: false, blockedReason: 'Rate limit service unavailable' };
      }

      return data as RateLimitResult;
    } catch (error) {
      secureLog.error('Rate limit check error:', error);
      return { allowed: false, blockedReason: 'Rate limit service error' };
    }
  }

  /**
   * Validates content using server-side validation
   */
  static async validateContent(content: string, maxLength: number = 1000): Promise<SecurityValidationResult> {
    try {
      const { data, error } = await supabase
        .rpc('validate_content_server_side', {
          content,
          max_length: maxLength
        });

      if (error) {
        secureLog.error('Content validation failed:', error);
        return {
          valid: false,
          errors: ['Content validation service unavailable'],
          sanitized: content.replace(/[<>]/g, '') // Minimal fallback sanitization
        };
      }

      return {
        valid: data.valid,
        errors: data.errors || [],
        warnings: data.warnings || [],
        sanitized: data.sanitized,
        securityScore: data.security_score
      };
    } catch (error) {
      secureLog.error('Content validation error:', error);
      return {
        valid: false,
        errors: ['Content validation error'],
        sanitized: content.replace(/[<>]/g, '')
      };
    }
  }

  /**
   * Generates a secure anonymous token
   */
  static generateSecureToken(): string {
    try {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    } catch (error) {
      secureLog.error('Failed to generate secure token:', error);
      // Fallback token generation
      return 'fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    }
  }

  /**
   * Gets or creates a secure anonymous token
   */
  static async getOrCreateSecureToken(): Promise<string> {
    try {
      let token = sessionStorage.getItem('ctea_anonymous_token');
      
      if (!token) {
        token = this.generateSecureToken();
        sessionStorage.setItem('ctea_anonymous_token', token);
        secureLog.info('Generated new secure token');
      }

      // Validate the token
      const isValid = await this.validateAnonymousToken(token);
      
      if (!isValid) {
        secureLog.warn('Invalid token detected, generating new one');
        token = this.generateSecureToken();
        sessionStorage.setItem('ctea_anonymous_token', token);
      }

      return token;
    } catch (error) {
      secureLog.error('Token management failed:', error);
      return this.generateSecureToken();
    }
  }

  /**
   * Validates email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates URL format
   */
  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sanitizes content by removing HTML tags and encoding special characters
   */
  static sanitizeContent(content: string): string {
    return content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/`/g, '&#x60;');
  }
}
