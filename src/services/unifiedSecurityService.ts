
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface RateLimitResult {
  allowed: boolean;
  blocked_reason?: string;
  remaining_requests?: number;
  reset_time?: number;
  limit?: number;
}

export interface SecurityValidationResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export interface SubmissionSecurityResult {
  success: boolean;
  rateLimitCheck: RateLimitResult;
  contentValidation: {
    valid: boolean;
    sanitized: string;
    threats: string[];
  };
  urlValidation: {
    valid: string[];
    invalid: string[];
  };
}

export class UnifiedSecurityService {
  private static rateLimitCache = new Map<string, { count: number; resetTime: number }>();

  static async checkRateLimit(
    identifier: string,
    action: string,
    limit: number = 10,
    windowMs: number = 60000
  ): Promise<RateLimitResult> {
    try {
      const now = Date.now();
      const key = `${identifier}:${action}`;
      const cached = this.rateLimitCache.get(key);

      if (cached && now < cached.resetTime) {
        if (cached.count >= limit) {
          return {
            allowed: false,
            blocked_reason: 'Rate limit exceeded',
            remaining_requests: 0,
            reset_time: cached.resetTime,
            limit
          };
        }
        
        cached.count++;
        return {
          allowed: true,
          remaining_requests: limit - cached.count,
          reset_time: cached.resetTime,
          limit
        };
      }

      // Reset or create new entry
      this.rateLimitCache.set(key, {
        count: 1,
        resetTime: now + windowMs
      });

      return {
        allowed: true,
        remaining_requests: limit - 1,
        reset_time: now + windowMs,
        limit
      };
    } catch (error) {
      secureLog.error('Rate limit check failed:', error);
      return {
        allowed: false,
        blocked_reason: 'Rate limit check failed'
      };
    }
  }

  static async validateSubmissionSecurity(
    content: string,
    urls: string[],
    action: string = 'submission'
  ): Promise<SubmissionSecurityResult> {
    try {
      const userId = localStorage.getItem('ctea_anonymous_token') || 'anonymous';
      
      // Check rate limiting
      const rateLimitResult = await this.checkRateLimit(userId, action, 5, 300000);
      
      // Content validation
      const contentValidation = this.validateContent(content);
      
      // URL validation
      const urlValidation = this.validateUrls(urls);

      return {
        success: rateLimitResult.allowed && contentValidation.valid,
        rateLimitCheck: rateLimitResult,
        contentValidation,
        urlValidation
      };
    } catch (error) {
      secureLog.error('Submission security validation failed:', error);
      return {
        success: false,
        rateLimitCheck: { allowed: false, blocked_reason: 'Validation failed' },
        contentValidation: { valid: false, sanitized: content, threats: ['Validation error'] },
        urlValidation: { valid: [], invalid: urls }
      };
    }
  }

  private static validateContent(content: string) {
    const threats: string[] = [];
    let sanitized = content.trim();

    // Basic content validation
    if (!sanitized || sanitized.length < 3) {
      threats.push('Content too short');
    }

    if (sanitized.length > 2000) {
      threats.push('Content too long');
    }

    // Basic XSS prevention
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi
    ];

    for (const pattern of xssPatterns) {
      if (pattern.test(sanitized)) {
        threats.push('Potential XSS detected');
        sanitized = sanitized.replace(pattern, '');
      }
    }

    return {
      valid: threats.length === 0,
      sanitized,
      threats
    };
  }

  private static validateUrls(urls: string[]) {
    const valid: string[] = [];
    const invalid: string[] = [];

    for (const url of urls) {
      if (!url.trim()) continue;
      
      try {
        new URL(url);
        valid.push(url);
      } catch {
        invalid.push(url);
      }
    }

    return { valid, invalid };
  }

  static clearRateLimit(identifier: string, action?: string) {
    if (action) {
      this.rateLimitCache.delete(`${identifier}:${action}`);
    } else {
      // Clear all entries for the identifier
      for (const key of this.rateLimitCache.keys()) {
        if (key.startsWith(`${identifier}:`)) {
          this.rateLimitCache.delete(key);
        }
      }
    }
  }
}
