import { EnhancedSecurityService } from './enhancedSecurityService';
import { SecurityMonitoringService } from './securityMonitoringService';
import { SecureTokenService } from './secureTokenService';
import { secureLog } from '@/utils/secureLogging';

export interface UnifiedSecurityResult {
  success: boolean;
  tokenValidation: { valid: boolean; token: string };
  contentValidation: { valid: boolean; sanitized: string; errors: string[] };
  rateLimitCheck: { allowed: boolean; blockedReason?: string };
  urlValidation: { valid: string[]; invalid: string[] };
  securityScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  warnings: string[];
}

export class UnifiedSecurityService {
  private static instance: UnifiedSecurityService;

  static getInstance(): UnifiedSecurityService {
    if (!this.instance) {
      this.instance = new UnifiedSecurityService();
    }
    return this.instance;
  }

  /**
   * Comprehensive security validation for all submission types
   */
  static async validateSubmissionSecurity(
    content: string,
    evidenceUrls: string[] = [],
    action: string = 'submission'
  ): Promise<UnifiedSecurityResult> {
    try {
      // Start security monitoring
      SecurityMonitoringService.startSecurityMonitoring();

      // Get or create secure token
      const token = await SecureTokenService.getOrCreateSecureToken();
      
      // Validate token security using enhanced fallback handling
      const tokenValidation = await this.validateTokenSecuritySafe(token);
      
      // Enhanced content validation with comprehensive fallback
      const contentValidation = await this.validateContentSafe(content, 1000);
      
      // Enhanced rate limiting with proper error handling
      const rateLimitCheck = await this.checkRateLimitSafe(token, action, 5, 60);
      
      // URL validation if evidence provided
      const urlValidation = evidenceUrls.length > 0 
        ? EnhancedSecurityService.validateEvidenceUrls(evidenceUrls)
        : { valid: [], suspicious: [], blocked: [] };

      // Calculate overall security score
      let securityScore = 100;
      const warnings: string[] = [];
      let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

      // Token validation impact
      if (!tokenValidation.valid) {
        securityScore -= 50;
        threatLevel = 'high';
        warnings.push('Token security validation failed');
      }

      // Content validation impact
      if (!contentValidation.valid) {
        securityScore = Math.min(securityScore, contentValidation.securityScore || 0);
        
        // Handle risk level mapping safely
        if (contentValidation.risk_level === 'high') {
          threatLevel = 'high';
        } else if (contentValidation.risk_level === 'medium' && threatLevel === 'low') {
          threatLevel = 'medium';
        }
      }

      // Rate limit impact
      if (!rateLimitCheck.allowed) {
        if (rateLimitCheck.securityViolation) {
          threatLevel = 'critical';
          securityScore = 0;
          warnings.push('Security violation detected in rate limiting');
        } else {
          securityScore -= 30;
          warnings.push('Rate limit exceeded');
        }
      }

      // URL validation impact
      if (urlValidation.suspicious.length > 0 || urlValidation.blocked.length > 0) {
        securityScore -= (urlValidation.suspicious.length * 10) + (urlValidation.blocked.length * 25);
        if (urlValidation.blocked.length > 0) {
          threatLevel = threatLevel === 'critical' ? 'critical' : 'high';
          warnings.push(`${urlValidation.blocked.length} blocked URLs detected`);
        }
        if (urlValidation.suspicious.length > 0) {
          warnings.push(`${urlValidation.suspicious.length} suspicious URLs detected`);
        }
      }

      // Log security assessment
      await this.logSecurityEventSafe('unified_security_assessment', {
        securityScore,
        threatLevel,
        warnings,
        tokenValid: tokenValidation.valid,
        contentValid: contentValidation.valid,
        rateLimitPassed: rateLimitCheck.allowed,
        urlsProcessed: evidenceUrls.length
      }, threatLevel === 'critical' ? 'critical' : threatLevel === 'high' ? 'error' : 'info');

      return {
        success: securityScore >= 50 && tokenValidation.valid && contentValidation.valid && rateLimitCheck.allowed,
        tokenValidation: { valid: tokenValidation.valid, token },
        contentValidation: {
          valid: contentValidation.valid,
          sanitized: contentValidation.sanitized || content,
          errors: contentValidation.errors || []
        },
        rateLimitCheck: {
          allowed: rateLimitCheck.allowed,
          blockedReason: rateLimitCheck.blockedReason
        },
        urlValidation: {
          valid: urlValidation.valid || [],
          invalid: [...(urlValidation.suspicious || []), ...(urlValidation.blocked || [])]
        },
        securityScore,
        threatLevel,
        warnings
      };
    } catch (error) {
      secureLog.error('Unified security validation failed:', error);
      
      // Log critical security failure
      await this.logSecurityEventSafe(
        'policy_violation',
        { error: error instanceof Error ? error.message : 'Unknown error' },
        'critical'
      );

      return {
        success: false,
        tokenValidation: { valid: false, token: '' },
        contentValidation: { valid: false, sanitized: content, errors: ['Security service unavailable'] },
        rateLimitCheck: { allowed: false, blockedReason: 'Security service unavailable' },
        urlValidation: { valid: [], invalid: evidenceUrls },
        securityScore: 0,
        threatLevel: 'critical',
        warnings: ['Critical security service failure']
      };
    }
  }

  /**
   * Safe token validation with enhanced fallback
   */
  private static async validateTokenSecuritySafe(token: string): Promise<{ valid: boolean; securityScore?: number }> {
    try {
      return await EnhancedSecurityService.validateTokenSecurity(token);
    } catch (error) {
      secureLog.warn('Token validation failed, using enhanced fallback', error);
      // Enhanced fallback validation
      const isBasicValid = token && token.length >= 32 && /^[A-Za-z0-9_-]+$/.test(token);
      const hasSecureLength = token.length >= 40 && token.length <= 128;
      const hasSecurePattern = !/[<>'"&=()]/.test(token);
      
      const securityScore = isBasicValid ? (hasSecureLength && hasSecurePattern ? 70 : 50) : 0;
      
      return {
        valid: isBasicValid && securityScore >= 50,
        securityScore
      };
    }
  }

  /**
   * Safe content validation with comprehensive fallback
   */
  private static async validateContentSafe(content: string, maxLength: number): Promise<any> {
    try {
      return await EnhancedSecurityService.validateContentComprehensive(content, maxLength);
    } catch (error) {
      secureLog.warn('Content validation failed, using comprehensive fallback', error);
      
      // Comprehensive fallback validation
      const basicValid = content && content.trim().length >= 3 && content.length <= maxLength;
      const hasXSS = /<script|javascript:|data:|vbscript:|on\w+\s*=/.test(content);
      const hasSQLi = /(union\s+select|drop\s+table|insert\s+into|delete\s+from|--|\/\*)/i.test(content);
      
      let riskLevel = 'low';
      let securityScore = basicValid ? 80 : 0;
      
      if (hasXSS) {
        riskLevel = 'critical';
        securityScore = 0;
      } else if (hasSQLi) {
        riskLevel = 'high';
        securityScore = 20;
      }
      
      // Enhanced sanitization
      const sanitized = content
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/data:/gi, '')
        .replace(/vbscript:/gi, '');
      
      return {
        valid: basicValid && !hasXSS,
        sanitized,
        errors: basicValid ? [] : ['Content validation service unavailable'],
        risk_level: riskLevel,
        securityScore
      };
    }
  }

  /**
   * Safe rate limit check with fallback
   */
  private static async checkRateLimitSafe(
    token: string, 
    action: string, 
    maxActions: number, 
    windowMinutes: number
  ): Promise<any> {
    try {
      return await EnhancedSecurityService.checkEnhancedRateLimit(token, action, maxActions, windowMinutes);
    } catch (error) {
      secureLog.warn('Rate limit check failed, using fallback', error);
      
      // Simple client-side fallback with security awareness
      const key = `rate_limit_${token}_${action}`;
      const stored = sessionStorage.getItem(key);
      
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();
        const windowMs = windowMinutes * 60 * 1000;
        
        if (now - data.timestamp < windowMs && data.count >= maxActions) {
          return {
            allowed: false,
            blockedReason: 'Rate limit exceeded (fallback)',
            securityViolation: data.count > maxActions * 2 // Detect abuse
          };
        }
        
        if (now - data.timestamp < windowMs) {
          data.count++;
        } else {
          data.count = 1;
          data.timestamp = now;
        }
        
        sessionStorage.setItem(key, JSON.stringify(data));
      } else {
        sessionStorage.setItem(key, JSON.stringify({ count: 1, timestamp: Date.now() }));
      }
      
      return { allowed: true };
    }
  }

  /**
   * Safe security event logging
   */
  private static async logSecurityEventSafe(
    eventType: string,
    details: Record<string, any>,
    severity: 'info' | 'warning' | 'error' | 'critical' = 'info'
  ): Promise<void> {
    try {
      await SecurityMonitoringService.logSecurityEvent(eventType, severity, eventType, details);
    } catch (error) {
      // Fallback to console logging
      console.error(`[SECURITY-${severity.toUpperCase()}] ${eventType}:`, details);
    }
  }

  /**
   * Quick security check for simple operations
   */
  static async quickSecurityCheck(token: string, action: string): Promise<boolean> {
    try {
      const tokenValidation = await EnhancedSecurityService.validateTokenSecurity(token);
      const rateLimitCheck = await EnhancedSecurityService.checkEnhancedRateLimit(token, action);
      
      return tokenValidation.valid && rateLimitCheck.allowed;
    } catch (error) {
      secureLog.error('Quick security check failed:', error);
      return false;
    }
  }

  /**
   * Get current security metrics
   */
  static async getSecurityMetrics() {
    return await SecurityMonitoringService.getSecurityMetrics();
  }
}
