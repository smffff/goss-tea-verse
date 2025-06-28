import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import { SecurityServiceCore } from './securityServiceCore';
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
  urlValidation?: {
    valid: string[];
    suspicious: string[];
    blocked: string[];
  };
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

export class UnifiedSecurityService {
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
      
      // Use core security service for validation
      const validationResult = await SecurityServiceCore.validateSubmissionSecurity(
        content,
        token,
        action
      );

      // Validate evidence URLs if provided
      const urlValidation = this.validateEvidenceUrls(evidenceUrls);
      if (urlValidation.suspicious.length > 0) {
        warnings.push(`Suspicious URLs detected: ${urlValidation.suspicious.length}`);
        securityScore -= 20;
      }
      if (urlValidation.blocked.length > 0) {
        errors.push(`Blocked URLs detected: ${urlValidation.blocked.length}`);
        securityScore -= 30;
        threatLevel = 'high';
      }

      return {
        success: validationResult.success && errors.length === 0,
        tokenValid: validationResult.tokenValid,
        contentValid: validationResult.contentValid,
        rateLimitPassed: validationResult.rateLimitPassed,
        securityScore: Math.min(validationResult.securityScore, securityScore),
        errors: [...validationResult.errors, ...errors],
        warnings: [...validationResult.warnings, ...warnings],
        sanitizedContent: validationResult.sanitizedContent,
        threatLevel: validationResult.threatLevel === 'critical' ? 'critical' : threatLevel,
        urlValidation
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
    return await SecurityServiceCore.checkRateLimit(token, action, maxActions, windowMinutes);
  }

  /**
   * Validates token security using server-side validation
   */
  static async validateTokenSecurity(token: string): Promise<{ valid: boolean; securityScore: number }> {
    return await SecurityServiceCore.validateToken(token);
  }

  /**
   * Comprehensive content validation
   */
  static async validateContentComprehensive(content: string, maxLength: number = 1000): Promise<any> {
    return await SecurityServiceCore.validateContent(content, maxLength);
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
    eventType: 'policy_violation' | 'xss' | 'sql_injection' | 'rate_limit' | 'token_validation',
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

  /**
   * Enhanced validation for submissions with fallback protection
   */
  static async validateSubmissionSecurityEnhanced(
    content: string,
    evidenceUrls: string[] = [],
    action: string = 'submission'
  ): Promise<EnhancedSecurityValidation> {
    try {
      // Get secure token first
      const token = await SecureTokenService.getOrCreateSecureToken();
      
      // Use core service for main validation
      const coreValidation = await SecurityServiceCore.validateSubmissionSecurity(
        content,
        token,
        action
      );

      // Add URL validation
      const urlValidation = this.validateEvidenceUrls(evidenceUrls);
      
      // Log security events with proper typing
      if (!coreValidation.success) {
        const eventType: 'policy_violation' | 'xss' | 'sql_injection' | 'rate_limit' | 'token_validation' = 
          coreValidation.threatLevel === 'critical' ? 'policy_violation' : 'rate_limit';
        
        await this.logSecurityEvent(eventType, {
          content_length: content.length,
          threat_level: coreValidation.threatLevel,
          errors: coreValidation.errors
        }, 'warning');
      }

      return {
        success: coreValidation.success && urlValidation.blocked.length === 0,
        tokenValid: coreValidation.tokenValid,
        contentValid: coreValidation.contentValid,
        rateLimitPassed: coreValidation.rateLimitPassed,
        securityScore: coreValidation.securityScore,
        errors: coreValidation.errors,
        warnings: coreValidation.warnings,
        sanitizedContent: coreValidation.sanitizedContent,
        threatLevel: coreValidation.threatLevel,
        urlValidation
      };
    } catch (error) {
      secureLog.error('Unified security validation failed:', error);
      
      // Log the error with proper event type
      await this.logSecurityEvent('policy_violation', {
        error: error instanceof Error ? error.message : 'Unknown error',
        content_length: content.length
      }, 'error');

      return {
        success: false,
        tokenValid: false,
        contentValid: false,
        rateLimitPassed: false,
        securityScore: 0,
        errors: ['Security validation service error'],
        warnings: [],
        threatLevel: 'critical'
      };
    }
  }

  /**
   * Gets or creates a secure token
   */
  static async getOrCreateSecureToken(): Promise<string> {
    return await SecureTokenService.getOrCreateSecureToken();
  }
}
