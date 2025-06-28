import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import { SecureTokenService } from './secureTokenService';

export interface EnhancedSecurityValidation {
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

export interface EnhancedRateLimitResult {
  allowed: boolean;
  currentCount: number;
  maxActions: number;
  remaining: number;
  resetTime?: string;
  blockedReason?: string;
  securityViolation?: boolean;
  suspiciousActivity?: boolean;
}

export class EnhancedSecurityService {
  /**
   * Performs comprehensive security validation for submissions
   */
  static async validateSubmissionSecurity(
    content: string,
    evidenceUrls: string[] = [],
    action: string = 'submission'
  ): Promise<EnhancedSecurityValidation> {
    try {
      const errors: string[] = [];
      const warnings: string[] = [];
      let securityScore = 100;
      let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

      // Get secure token
      const token = await SecureTokenService.getOrCreateSecureToken();
      
      // Validate token security
      const tokenValidation = await this.validateTokenSecurity(token);
      if (!tokenValidation.valid) {
        errors.push('Invalid security token');
        securityScore -= 50;
        threatLevel = 'high';
      }

      // Check rate limit with enhanced monitoring
      const rateLimitResult = await this.checkEnhancedRateLimit(token, action, 5, 60);
      if (!rateLimitResult.allowed) {
        errors.push(rateLimitResult.blockedReason || 'Rate limit exceeded');
        if (rateLimitResult.securityViolation) {
          threatLevel = 'critical';
          securityScore = 0;
        }
      }

      // Validate content with comprehensive checks
      const contentValidation = await this.validateContentComprehensive(content, 1000);
      if (!contentValidation.valid) {
        errors.push(...contentValidation.errors);
        securityScore = Math.min(securityScore, contentValidation.securityScore || 0);
        
        if (contentValidation.risk_level === 'high' && threatLevel !== 'critical') {
          threatLevel = 'high';
        }
      }

      // Validate evidence URLs if provided
      if (evidenceUrls.length > 0) {
        const urlValidation = this.validateEvidenceUrls(evidenceUrls);
        if (urlValidation.suspicious.length > 0) {
          warnings.push(`Suspicious URLs detected: ${urlValidation.suspicious.length}`);
          securityScore -= 20;
        }
      }

      return {
        success: errors.length === 0,
        tokenValid: tokenValidation.valid,
        contentValid: contentValidation.valid,
        rateLimitPassed: rateLimitResult.allowed,
        securityScore,
        errors,
        warnings,
        sanitizedContent: contentValidation.sanitized,
        threatLevel
      };
    } catch (error) {
      secureLog.error('Enhanced security validation failed:', error);
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
   * Enhanced rate limiting with security monitoring
   */
  static async checkEnhancedRateLimit(
    token: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 60
  ): Promise<EnhancedRateLimitResult> {
    try {
      const { data, error } = await supabase
        .rpc('check_rate_limit_ultimate', {
          p_token: token,
          p_action: action,
          p_max_actions: maxActions,
          p_window_minutes: windowMinutes
        });

      if (error) {
        secureLog.error('Enhanced rate limit check failed:', error);
        return {
          allowed: false,
          currentCount: 0,
          maxActions,
          remaining: 0,
          blockedReason: 'Rate limit service unavailable',
          securityViolation: true
        };
      }

      const result = data as any;
      return {
        allowed: result.allowed || false,
        currentCount: result.current_count || 0,
        maxActions: result.max_actions || maxActions,
        remaining: result.remaining || 0,
        resetTime: result.reset_time,
        blockedReason: result.blocked_reason,
        securityViolation: result.security_violation || false,
        suspiciousActivity: result.suspicious_activity || false
      };
    } catch (error) {
      secureLog.error('Enhanced rate limit error:', error);
      return {
        allowed: false,
        currentCount: 0,
        maxActions,
        remaining: 0,
        blockedReason: 'Rate limit service error',
        securityViolation: true
      };
    }
  }

  /**
   * Validates token security using server-side validation
   */
  static async validateTokenSecurity(token: string): Promise<{ valid: boolean; securityScore: number }> {
    try {
      const { data, error } = await supabase
        .rpc('validate_token_enhanced', { token });

      if (error) {
        secureLog.error('Token security validation failed:', error);
        return { valid: false, securityScore: 0 };
      }

      const result = data as any;
      return {
        valid: result.valid || false,
        securityScore: result.security_score || 0
      };
    } catch (error) {
      secureLog.error('Token security validation error:', error);
      return { valid: false, securityScore: 0 };
    }
  }

  /**
   * Comprehensive content validation
   */
  static async validateContentComprehensive(content: string, maxLength: number = 1000): Promise<any> {
    try {
      const { data, error } = await supabase
        .rpc('validate_content_comprehensive', {
          content,
          max_length: maxLength
        });

      if (error) {
        secureLog.error('Content validation failed:', error);
        return {
          valid: false,
          errors: ['Content validation service unavailable'],
          sanitized: content.replace(/[<>]/g, ''),
          risk_level: 'high',
          securityScore: 0
        };
      }

      return data;
    } catch (error) {
      secureLog.error('Content validation error:', error);
      return {
        valid: false,
        errors: ['Content validation error'],
        sanitized: content.replace(/[<>]/g, ''),
        risk_level: 'high',
        securityScore: 0
      };
    }
  }

  /**
   * Validates evidence URLs for security threats
   */
  static validateEvidenceUrls(urls: string[]): { valid: string[]; suspicious: string[]; blocked: string[] } {
    const valid: string[] = [];
    const suspicious: string[] = [];
    const blocked: string[] = [];

    const suspiciousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /file:/i,
      /ftp:/i,
      /<script/i,
      /\.\./,
      /localhost/i,
      /127\.0\.0\.1/,
      /192\.168\./,
      /10\./,
      /172\.(1[6-9]|2[0-9]|3[01])\./
    ];

    const blockedDomains = [
      'malware.com',
      'phishing.com',
      'suspicious.site'
    ];

    for (const url of urls) {
      try {
        const urlObj = new URL(url);
        
        // Check for blocked domains
        if (blockedDomains.some(domain => urlObj.hostname.includes(domain))) {
          blocked.push(url);
          continue;
        }

        // Check for suspicious patterns
        const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(url));
        
        if (isSuspicious) {
          suspicious.push(url);
        } else {
          valid.push(url);
        }
      } catch {
        // Invalid URL format
        blocked.push(url);
      }
    }

    return { valid, suspicious, blocked };
  }

  /**
   * Logs security events with enhanced context
   */
  static async logSecurityEvent(
    eventType: string,
    details: Record<string, any>,
    severity: 'info' | 'warning' | 'error' | 'critical' = 'info'
  ): Promise<void> {
    try {
      await supabase.rpc('log_security_event_enhanced', {
        event_type: eventType,
        details: details,
        severity: severity
      });
    } catch (error) {
      secureLog.error('Failed to log security event:', error);
    }
  }
}
