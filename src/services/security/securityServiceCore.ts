
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import {
  SecurityValidationResult,
  TokenValidationResult,
  ContentValidationResult,
  RateLimitResult,
  FallbackValidationResult
} from './types';

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

      // Safe type checking with proper validation
      if (data && typeof data === 'object' && !Array.isArray(data) && data !== null) {
        const result = data as Record<string, any>;
        if ('valid' in result) {
          const tokenResult = result as TokenValidationResult;
          return {
            valid: tokenResult.valid || false,
            securityScore: tokenResult.security_score || 0
          };
        }
      }

      return { valid: false, securityScore: 0 };
    } catch (error) {
      secureLog.error('Token validation error:', error);
      return { valid: false, securityScore: 0 };
    }
  }

  /**
   * Validates content using comprehensive server-side checks
   */
  static async validateContent(content: string, maxLength: number = 1000): Promise<ContentValidationResult> {
    try {
      const { data, error } = await supabase.rpc('validate_content_server_side', {
        content,
        max_length: maxLength
      });

      if (error) {
        secureLog.error('Content validation failed:', error);
        return this.fallbackContentValidation(content, maxLength);
      }

      // Safe type checking with proper validation
      if (data && typeof data === 'object' && !Array.isArray(data) && data !== null) {
        const result = data as Record<string, any>;
        if ('valid' in result) {
          return result as ContentValidationResult;
        }
      }

      return this.fallbackContentValidation(content, maxLength);
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
  ): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase.rpc('check_rate_limit_ultimate', {
        p_token: token,
        p_action: action,
        p_max_actions: maxActions,
        p_window_minutes: windowMinutes
      });

      if (error) {
        secureLog.error('Rate limit check failed:', error);
        return { allowed: false, blocked_reason: 'Rate limit service unavailable' };
      }

      // Safe type checking with proper validation
      if (data && typeof data === 'object' && !Array.isArray(data) && data !== null) {
        const result = data as Record<string, any>;
        if ('allowed' in result) {
          return result as RateLimitResult;
        }
      }

      return { allowed: false, blocked_reason: 'Invalid rate limit response' };
    } catch (error) {
      secureLog.error('Rate limit error:', error);
      return { allowed: false, blocked_reason: 'Rate limit service error' };
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

    // Helper for type safety
    const validRiskLevels = ['low', 'medium', 'high', 'critical'] as const;
    type RiskLevel = typeof validRiskLevels[number];
    function toRiskLevel(val: any): RiskLevel {
      return validRiskLevels.includes(val) ? val : 'low';
    }

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
        
        // Handle threat level escalation based on risk level
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const riskLevel = contentValidation.risk_level;
=======
        const riskLevel = toRiskLevel(contentValidation.risk_level);
>>>>>>> Stashed changes
=======
        const riskLevel = toRiskLevel(contentValidation.risk_level);
>>>>>>> Stashed changes
=======
        const riskLevel = toRiskLevel(contentValidation.risk_level);
>>>>>>> Stashed changes
=======
        const riskLevel = toRiskLevel(contentValidation.risk_level);
>>>>>>> Stashed changes
=======
        const riskLevel = toRiskLevel(contentValidation.risk_level);
>>>>>>> Stashed changes
        if (riskLevel === 'critical') {
          threatLevel = 'critical';
        } else if (riskLevel === 'high' && threatLevel !== 'critical') {
          threatLevel = 'high';
        } else if (riskLevel === 'medium' && (threatLevel === 'low' || threatLevel === 'medium')) {
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
  private static fallbackContentValidation(content: string, maxLength: number): FallbackValidationResult {
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
