
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import { SecureTokenService } from './secureTokenService';

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
   * Validates anonymous token using existing server-side validation
   */
  static async validateAnonymousToken(token: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('validate_anonymous_token_enhanced', { token });

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
   * Checks rate limit using existing server-side validation
   */
  static async checkRateLimit(
    token: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 60
  ): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase
        .rpc('secure_rate_limit_advanced', {
          p_token: token,
          p_action: action,
          p_max_actions: maxActions,
          p_window_minutes: windowMinutes
        });

      if (error) {
        secureLog.error('Rate limit check failed:', error);
        return { allowed: false, blockedReason: 'Rate limit service unavailable' };
      }

      // Cast the response to our expected format
      const result = data as unknown as RateLimitResult;
      return result;
    } catch (error) {
      secureLog.error('Rate limit check error:', error);
      return { allowed: false, blockedReason: 'Rate limit service error' };
    }
  }

  /**
   * Validates content using existing server-side validation
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

      // Cast the response properly
      const result = data as any;
      return {
        valid: result.valid || false,
        errors: result.errors || [],
        warnings: result.warnings || [],
        sanitized: result.sanitized || content,
        securityScore: result.security_score || 0
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
   * Gets or creates a secure anonymous token using the new secure token service
   */
  static async getOrCreateSecureToken(): Promise<string> {
    return await SecureTokenService.getOrCreateSecureToken();
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
   * Validates wallet address format for different networks
   */
  static validateWalletAddress(address: string, network: string): boolean {
    if (!address || address.length < 26 || address.length > 62) {
      return false;
    }

    switch (network.toLowerCase()) {
      case 'ethereum':
      case 'polygon':
      case 'bsc':
      case 'avalanche':
        return /^0x[a-fA-F0-9]{40}$/.test(address);
      case 'bitcoin':
        return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(address);
      case 'solana':
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
      default:
        return true; // Allow unknown networks but validate length
    }
  }

  /**
   * Validates transaction hash format
   */
  static validateTransactionHash(hash: string, network: string): boolean {
    if (!hash || hash.length < 32) {
      return false;
    }

    switch (network.toLowerCase()) {
      case 'ethereum':
      case 'polygon':
      case 'bsc':
      case 'avalanche':
        return /^0x[a-fA-F0-9]{64}$/.test(hash);
      case 'bitcoin':
        return /^[a-fA-F0-9]{64}$/.test(hash);
      case 'solana':
        return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(hash);
      default:
        return hash.length >= 32; // Basic length check for unknown networks
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
