
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface SecurityValidationResult {
  success: boolean;
  tokenValid: boolean;
  contentValid: boolean;
  rateLimitPassed: boolean;
  securityScore: number;
  errors: string[];
  warnings: string[];
  sanitizedContent?: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Core security service focused on essential validation functions
 */
export class SecurityServiceCore {
  /**
   * Validates a token using server-side security checks
   */
  static async validateToken(token: string): Promise<{ valid: boolean; securityScore: number }> {
    try {
      const { data, error } = await supabase.rpc('validate_token_enhanced', { token });

      if (error) {
        secureLog.error('Token validation failed:', error);
        return { valid: false, securityScore: 0 };
      }

      const result = data as any;
      return {
        valid: result?.valid || false,
        securityScore: result?.security_score || 0
      };
    } catch (error) {
      secureLog.error('Token validation error:', error);
      return { valid: false, securityScore: 0 };
    }
  }

  /**
   * Validates content using comprehensive server-side checks
   */
  static async validateContent(content: string, maxLength: number = 1000): Promise<any> {
    try {
      const { data, error } = await supabase.rpc('validate_content_server_side', {
        content,
        max_length: maxLength
      });

      if (error) {
        secureLog.error('Content validation failed:', error);
        return this.fallbackContentValidation(content, maxLength);
      }

      return data;
    } catch (error) {
      secureLog.error('Content validation error:', error);
      return this.fallbackContentValidation(content, maxLength);
    }
  }

  /**
   * Checks rate limits using enhanced server-side monitoring
   */
  static async checkRateLimit(
    token: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 60
  ): Promise<any> {
    try {
      const { data, error } = await supabase.rpc('check_rate_limit_ultimate', {
        p_token: token,
        p_action: action,
        p_max_actions: maxActions,
        p_window_minutes: windowMinutes
      });

      if (error) {
        secureLog.error('Rate limit check failed:', error);
        return { allowed: false, blockedReason: 'Rate limit service unavailable' };
      }

      return data;
    } catch (error) {
      secureLog.error('Rate limit error:', error);
      return { allowed: false, blockedReason: 'Rate limit service error' };
    }
  }

  /**
   * Comprehensive security validation for submissions
   */
  static async validateSubmissionSecurity(
    content: string,
    token: string,
    action: string = 'submission'
  ): Promise<SecurityValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let securityScore = 100;
    let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    try {
      // Token validation
      const tokenValidation = await this.validateToken(token);
      const tokenValid = tokenValidation.valid;
      
      if (!tokenValid) {
        errors.push('Invalid security token');
        securityScore -= 50;
        threatLevel = 'high';
      }

      // Content validation
      const contentValidation = await this.validateContent(content);
      const contentValid = contentValidation.valid;
      
      if (!contentValid) {
        errors.push(...(contentValidation.errors || ['Content validation failed']));
        securityScore = Math.min(securityScore, contentValidation.security_score || 0);
        
        if (contentValidation.risk_level === 'critical') {
          threatLevel = 'critical';
        } else if (contentValidation.risk_level === 'high' && threatLevel !== 'critical') {
          threatLevel = 'high';
        } else if (contentValidation.risk_level === 'medium' && threatLevel === 'low') {
          threatLevel = 'medium';
        }
      }

      // Rate limit validation
      const rateLimitResult = await this.checkRateLimit(token, action);
      const rateLimitPassed = rateLimitResult.allowed;
      
      if (!rateLimitPassed) {
        errors.push(rateLimitResult.blocked_reason || 'Rate limit exceeded');
        if (rateLimitResult.security_violation) {
          threatLevel = 'critical';
          securityScore = 0;
        }
      }

      return {
        success: errors.length === 0,
        tokenValid,
        contentValid,
        rateLimitPassed,
        securityScore,
        errors,
        warnings,
        sanitizedContent: contentValidation.sanitized,
        threatLevel
      };
    } catch (error) {
      secureLog.error('Security validation failed:', error);
      return {
        success: false,
        tokenValid: false,
        contentValid: false,
        rateLimitPassed: false,
        securityScore: 0,
        errors: ['Security validation service unavailable'],
        warnings: [],
        threatLevel: 'critical'
      };
    }
  }

  /**
   * Fallback content validation when server-side fails
   */
  private static fallbackContentValidation(content: string, maxLength: number): any {
    const errors: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    
    if (!content || content.trim().length === 0) {
      errors.push('Content cannot be empty');
      return { valid: false, errors, sanitized: '', risk_level: 'low', security_score: 0 };
    }
    
    if (content.length > maxLength) {
      errors.push(`Content exceeds maximum length of ${maxLength} characters`);
      riskLevel = 'high';
    }
    
    // Basic XSS detection
    if (/<script|javascript:|data:|vbscript:|on\w+\s*=/.test(content)) {
      errors.push('Content contains potentially dangerous elements');
      riskLevel = 'critical';
    }
    
    // Basic sanitization
    const sanitized = content
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '');
    
    return {
      valid: errors.length === 0,
      errors,
      sanitized,
      risk_level: riskLevel,
      security_score: errors.length === 0 ? 70 : 20
    };
  }
}
