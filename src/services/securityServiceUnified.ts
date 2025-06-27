
import { ContentValidationService, SecurityValidationResult } from './security/contentValidationService';
import { RateLimitService, RateLimitResult } from './security/rateLimitService';
import { UrlValidationService, UrlValidationResult } from './security/urlValidationService';
import { TokenValidationService, TokenValidationResult } from './security/tokenValidationService';
import { SecurityEventService } from './securityEventService';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

interface ComprehensiveSecurityResult {
  overallValid: boolean;
  securityScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  contentValidation: SecurityValidationResult;
  urlValidation: UrlValidationResult;
  rateLimitCheck: RateLimitResult;
  tokenValidation: TokenValidationResult;
  threats: string[];
  recommendations: string[];
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
    urls: string[] = [],
    action: string = 'submission'
  ): Promise<ComprehensiveSecurityResult> {
    try {
      secureLog.info('🔐 Starting comprehensive security validation', { action, contentLength: content.length });

      // Generate secure token
      const tokenValidation = TokenValidationService.getOrCreateSecureToken();
      
      // Server-side rate limiting check
      const rateLimitCheck = await this.performServerSideRateLimit(tokenValidation.token, action);
      if (!rateLimitCheck.allowed) {
        return this.createSecurityResult(false, 0, 'critical', {
          valid: false,
          sanitized: '',
          threats: ['Rate limit exceeded'],
          riskLevel: 'critical',
          securityScore: 0
        }, { valid: [], invalid: [] }, rateLimitCheck, tokenValidation);
      }

      // Enhanced content validation
      const contentValidation = await ContentValidationService.validateContent(content, 2000);
      
      // URL validation
      const urlValidation = UrlValidationService.validateUrls(urls);
      
      // Calculate overall security score
      const overallScore = this.calculateSecurityScore(contentValidation, urlValidation, rateLimitCheck);
      const riskLevel = this.determineRiskLevel(overallScore, contentValidation.riskLevel);
      
      // Log security event for monitoring
      await this.logSecurityValidation(action, {
        securityScore: overallScore,
        riskLevel,
        threats: contentValidation.threats,
        contentLength: content.length,
        urlCount: urls.length
      });

      const result = this.createSecurityResult(
        overallScore >= 70 && contentValidation.valid && rateLimitCheck.allowed,
        overallScore,
        riskLevel,
        contentValidation,
        urlValidation,
        rateLimitCheck,
        tokenValidation
      );

      secureLog.info('✅ Security validation completed', { 
        overallValid: result.overallValid, 
        securityScore: result.securityScore,
        riskLevel: result.riskLevel 
      });

      return result;
    } catch (error) {
      secureLog.error('❌ Security validation failed', error);
      
      // Fallback security validation
      return this.createSecurityResult(false, 0, 'critical', {
        valid: false,
        sanitized: this.basicSanitize(content),
        threats: ['Security validation system error'],
        riskLevel: 'critical',
        securityScore: 0
      }, { valid: [], invalid: urls }, { allowed: false, blockedReason: 'System error' }, {
        token: TokenValidationService.generateSecureToken(),
        valid: false,
        warnings: ['System error during validation']
      });
    }
  }

  private static async performServerSideRateLimit(token: string, action: string): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase.rpc('check_rate_limit_ultimate', {
        p_token: token,
        p_action: action,
        p_max_actions: 10,
        p_window_minutes: 60
      });

      if (error) {
        secureLog.error('Server-side rate limiting failed', error);
        return { allowed: false, blockedReason: 'Rate limit check failed' };
      }

      return {
        allowed: data?.allowed || false,
        currentCount: data?.current_count || 0,
        maxActions: data?.max_actions || 10,
        blockedReason: data?.blocked_reason
      };
    } catch (error) {
      secureLog.error('Rate limit service error', error);
      return { allowed: false, blockedReason: 'Rate limit service unavailable' };
    }
  }

  private static calculateSecurityScore(
    contentValidation: SecurityValidationResult,
    urlValidation: UrlValidationResult,
    rateLimitCheck: RateLimitResult
  ): number {
    let score = 100;
    
    // Content validation impact
    score -= (100 - contentValidation.securityScore);
    
    // URL validation impact
    if (urlValidation.invalid.length > 0) {
      score -= urlValidation.invalid.length * 10;
    }
    
    // Rate limiting impact
    if (!rateLimitCheck.allowed) {
      score -= 50;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  private static determineRiskLevel(score: number, contentRisk: 'low' | 'medium' | 'high' | 'critical'): 'low' | 'medium' | 'high' | 'critical' {
    if (contentRisk === 'critical' || score < 30) return 'critical';
    if (contentRisk === 'high' || score < 50) return 'high';
    if (contentRisk === 'medium' || score < 70) return 'medium';
    return 'low';
  }

  private static createSecurityResult(
    valid: boolean,
    score: number,
    riskLevel: 'low' | 'medium' | 'high' | 'critical',
    contentValidation: SecurityValidationResult,
    urlValidation: UrlValidationResult,
    rateLimitCheck: RateLimitResult,
    tokenValidation: TokenValidationResult
  ): ComprehensiveSecurityResult {
    const threats = [
      ...contentValidation.threats,
      ...(urlValidation.invalid.length > 0 ? ['Invalid URLs detected'] : []),
      ...(!rateLimitCheck.allowed ? [rateLimitCheck.blockedReason || 'Rate limit exceeded'] : [])
    ];

    const recommendations = [];
    if (!contentValidation.valid) recommendations.push('Review and sanitize content');
    if (urlValidation.invalid.length > 0) recommendations.push('Provide valid HTTPS URLs');
    if (!rateLimitCheck.allowed) recommendations.push('Wait before submitting again');

    return {
      overallValid: valid,
      securityScore: score,
      riskLevel,
      contentValidation,
      urlValidation,
      rateLimitCheck,
      tokenValidation,
      threats,
      recommendations
    };
  }

  private static async logSecurityValidation(action: string, details: any): Promise<void> {
    try {
      await SecurityEventService.logSecurityEvent({
        event_type: 'security_validation',
        details: {
          action,
          ...details,
          timestamp: new Date().toISOString()
        },
        severity: details.riskLevel === 'critical' ? 'critical' : 
                 details.riskLevel === 'high' ? 'high' : 'low'
      });
    } catch (error) {
      secureLog.error('Failed to log security event', error);
    }
  }

  private static basicSanitize(content: string): string {
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');
  }

  // Enhanced session validation
  public static async validateUserSession(): Promise<{
    valid: boolean;
    user: any;
    session: any;
    securityScore: number;
    threats: string[];
  }> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        return {
          valid: false,
          user: null,
          session: null,
          securityScore: 0,
          threats: ['No valid session']
        };
      }

      // Validate session age
      const sessionAge = Date.now() - new Date(session.refresh_token).getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxAge) {
        return {
          valid: false,
          user: null,
          session: null,
          securityScore: 30,
          threats: ['Session expired']
        };
      }

      return {
        valid: true,
        user: session.user,
        session,
        securityScore: 100,
        threats: []
      };
    } catch (error) {
      secureLog.error('Session validation failed', error);
      return {
        valid: false,
        user: null,
        session: null,
        securityScore: 0,
        threats: ['Session validation error']
      };
    }
  }
}
