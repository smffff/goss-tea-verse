
import { supabase } from '@/integrations/supabase/client';

interface SecurityValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
}

interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  maxActions: number;
  resetTime?: Date;
  blockedReason?: string;
  securityViolation?: boolean;
}

interface ComprehensiveSecurityResult {
  overallValid: boolean;
  contentValidation: SecurityValidationResult;
  urlValidation: {
    valid: string[];
    invalid: string[];
  };
  rateLimitCheck: RateLimitResult;
  tokenValidation: {
    valid: boolean;
    token: string;
  };
}

export class SecurityServiceUnified {
  private static instance: SecurityServiceUnified;

  public static getInstance(): SecurityServiceUnified {
    if (!SecurityServiceUnified.instance) {
      SecurityServiceUnified.instance = new SecurityServiceUnified();
    }
    return SecurityServiceUnified.instance;
  }

  public static async validateSubmissionSecurity(
    content: string,
    urls: string[],
    action: string = 'submission'
  ): Promise<ComprehensiveSecurityResult> {
    const instance = this.getInstance();
    
    // Server-side content validation using the new unified function
    const { data: contentResult, error: contentError } = await supabase.rpc(
      'validate_content_ultimate_secure',
      { content, max_length: 1000 }
    );

    if (contentError) {
      console.error('Content validation error:', contentError);
      throw new Error('Content validation failed');
    }
    
    const contentValidation: SecurityValidationResult = {
      valid: contentResult.valid,
      sanitized: contentResult.sanitized,
      threats: contentResult.errors || [],
      riskLevel: contentResult.risk_level,
      securityScore: contentResult.security_score
    };

    // URL validation
    const urlValidation = instance.validateUrls(urls);
    
    // Token validation and generation
    const tokenValidation = instance.getOrCreateSecureToken();
    
    // Server-side rate limit check
    const { data: rateLimitResult, error: rateLimitError } = await supabase.rpc(
      'check_rate_limit_unified',
      { 
        p_token: tokenValidation.token, 
        p_action: action, 
        p_max_actions: 5, 
        p_window_minutes: 60 
      }
    );

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      throw new Error('Rate limit check failed');
    }
    
    const rateLimitCheck: RateLimitResult = {
      allowed: rateLimitResult.allowed,
      currentCount: rateLimitResult.current_count,
      maxActions: rateLimitResult.max_actions,
      resetTime: rateLimitResult.reset_time ? new Date(rateLimitResult.reset_time) : undefined,
      blockedReason: rateLimitResult.blocked_reason,
      securityViolation: rateLimitResult.security_violation
    };
    
    return {
      overallValid: contentValidation.valid && urlValidation.invalid.length === 0 && rateLimitCheck.allowed,
      contentValidation,
      urlValidation,
      rateLimitCheck,
      tokenValidation
    };
  }

  public validateUrls(urls: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    for (const url of urls) {
      if (!url?.trim()) continue;
      
      try {
        const urlObj = new URL(url);
        // Only allow https and http protocols
        if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
          // Additional security check for suspicious domains
          if (!this.isSuspiciousDomain(urlObj.hostname)) {
            valid.push(url);
          } else {
            invalid.push(url);
          }
        } else {
          invalid.push(url);
        }
      } catch {
        invalid.push(url);
      }
    }

    return { valid, invalid };
  }

  private isSuspiciousDomain(hostname: string): boolean {
    const suspiciousPatterns = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '192.168.',
      '10.',
      '172.',
      'bit.ly',
      'tinyurl.com',
      't.co'
    ];

    return suspiciousPatterns.some(pattern => 
      hostname.includes(pattern) || hostname.startsWith(pattern)
    );
  }

  public getOrCreateSecureToken(): { valid: boolean; token: string } {
    let token = sessionStorage.getItem('anonymous_token');
    
    if (!token || !this.validateToken(token)) {
      token = this.generateSecureToken();
      sessionStorage.setItem('anonymous_token', token);
    }
    
    return { valid: true, token };
  }

  private generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private validateToken(token: string): boolean {
    if (!token || token.length < 32 || token.length > 128) return false;
    return /^[A-Za-z0-9_-]+$/.test(token);
  }

  // Enhanced content sanitization for client-side use
  public sanitizeContent(content: string): string {
    if (!content) return '';
    
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
}

// Export convenience functions for backward compatibility
export const performSubmissionSecurityCheck = SecurityServiceUnified.validateSubmissionSecurity;
export const sanitizeContent = (content: string) => SecurityServiceUnified.getInstance().sanitizeContent(content);
export const validateUrls = (urls: string[]) => SecurityServiceUnified.getInstance().validateUrls(urls);
export const getOrCreateSecureToken = () => SecurityServiceUnified.getInstance().getOrCreateSecureToken();
