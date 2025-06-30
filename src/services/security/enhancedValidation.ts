
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface ValidationResult {
  valid: boolean;
  sanitized: string;
  errors: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  blocked?: boolean;
  reason?: string;
}

interface ValidationResponse {
  valid: boolean;
  sanitized: string;
  errors: string[];
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  security_score: number;
}

interface RateLimitResponse {
  allowed: boolean;
  remaining: number;
  reset_time: string;
  blocked_reason?: string;
  error?: string;
}

export class EnhancedValidationService {
  // Server-side content validation using the enhanced SQL function
  static async validateContent(content: string, maxLength: number = 1000): Promise<ValidationResult> {
    try {
      const { data, error } = await supabase.rpc('validate_content_server_side', {
        content,
        max_length: maxLength
      });

      if (error) {
        secureLog.error('Server-side validation failed:', error);
        return this.fallbackValidation(content, maxLength);
      }

      const response = data as ValidationResponse;

      return {
        valid: response.valid,
        sanitized: response.sanitized,
        errors: response.errors || [],
        riskLevel: response.risk_level || 'medium',
        securityScore: response.security_score || 50
      };
    } catch (error) {
      secureLog.error('Content validation error:', error);
      return this.fallbackValidation(content, maxLength);
    }
  }

  // Enhanced rate limiting with server-side enforcement
  static async checkRateLimit(
    token: string, 
    action: string, 
    maxAttempts: number = 10, 
    windowMinutes: number = 15
  ): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase.rpc('check_rate_limit_ultimate', {
        p_token: token,
        p_action: action,
        p_max_actions: maxAttempts,
        p_window_minutes: windowMinutes
      });

      if (error) {
        secureLog.error('Server rate limit check failed:', error);
        return this.fallbackRateLimit(token, action, maxAttempts, windowMinutes);
      }

      const response = data as RateLimitResponse;

      return {
        allowed: response.allowed,
        remaining: response.remaining || 0,
        resetTime: response.reset_time ? new Date(response.reset_time).getTime() : Date.now() + (windowMinutes * 60 * 1000),
        blocked: !response.allowed,
        reason: response.blocked_reason || response.error
      };
    } catch (error) {
      secureLog.error('Rate limit service error:', error);
      return this.fallbackRateLimit(token, action, maxAttempts, windowMinutes);
    }
  }

  // Token validation with enhanced security checks
  static validateToken(token: string): boolean {
    if (!token || token.length < 32) {
      return false;
    }

    // Check for base64url format
    if (!/^[A-Za-z0-9_-]+$/.test(token)) {
      return false;
    }

    // Length validation
    if (token.length > 128) {
      return false;
    }

    // Check for suspicious patterns
    if (/test|debug|admin|root|system|demo/i.test(token)) {
      secureLog.security('Suspicious token pattern detected', { tokenPrefix: token.substring(0, 8) });
      return false;
    }

    return true;
  }

  // Fallback validation for when server is unavailable
  private static fallbackValidation(content: string, maxLength: number): ValidationResult {
    const errors: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let securityScore = 100;

    if (!content || content.trim().length === 0) {
      return {
        valid: false,
        sanitized: '',
        errors: ['Content cannot be empty'],
        riskLevel: 'low',
        securityScore: 0
      };
    }

    if (content.length > maxLength) {
      errors.push(`Content too long (max ${maxLength} characters)`);
      securityScore -= 30;
      riskLevel = 'high';
    }

    // Basic XSS detection
    if (/<script|javascript:|data:|vbscript:|on\w+\s*=/i.test(content)) {
      errors.push('Content contains potentially dangerous elements');
      riskLevel = 'critical';
      securityScore = 0;
    }

    // Basic sanitization
    const sanitized = content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/`/g, '&#x60;');

    return {
      valid: errors.length === 0,
      sanitized,
      errors,
      riskLevel,
      securityScore
    };
  }

  // Fallback rate limiting
  private static fallbackRateLimit(
    token: string, 
    action: string, 
    maxAttempts: number, 
    windowMinutes: number
  ): RateLimitResult {
    const key = `rate_limit_${token.substring(0, 8)}_${action}`;
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    
    try {
      const stored = localStorage.getItem(key);
      
      if (stored) {
        const data = JSON.parse(stored);
        if (now - data.timestamp < windowMs && data.count >= maxAttempts) {
          return {
            allowed: false,
            remaining: 0,
            resetTime: data.timestamp + windowMs,
            blocked: true,
            reason: 'Rate limit exceeded (fallback)'
          };
        }
        
        if (now - data.timestamp < windowMs) {
          data.count++;
        } else {
          data.count = 1;
          data.timestamp = now;
        }
        
        localStorage.setItem(key, JSON.stringify(data));
        
        return {
          allowed: true,
          remaining: maxAttempts - data.count,
          resetTime: data.timestamp + windowMs
        };
      } else {
        localStorage.setItem(key, JSON.stringify({ count: 1, timestamp: now }));
        return {
          allowed: true,
          remaining: maxAttempts - 1,
          resetTime: now + windowMs
        };
      }
    } catch (error) {
      secureLog.error('Fallback rate limit error:', error);
      return {
        allowed: true,
        remaining: maxAttempts,
        resetTime: now + windowMs
      };
    }
  }
}
