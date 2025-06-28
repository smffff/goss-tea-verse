
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
      
      // Validate token security
      const tokenValidation = await EnhancedSecurityService.validateTokenSecurity(token);
      
      // Enhanced content validation
      const contentValidation = await EnhancedSecurityService.validateContentComprehensive(content, 1000);
      
      // Enhanced rate limiting
      const rateLimitCheck = await EnhancedSecurityService.checkEnhancedRateLimit(token, action, 5, 60);
      
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
        
        // Handle risk level mapping - only check for available types
        if (contentValidation.risk_level === 'high') {
          threatLevel = 'high';
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
      await EnhancedSecurityService.logSecurityEvent('unified_security_assessment', {
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
      await SecurityMonitoringService.logSecurityEvent(
        'policy_violation',
        'critical',
        'Unified security service completely failed',
        { error: error instanceof Error ? error.message : 'Unknown error' }
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
