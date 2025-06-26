
import { supabase } from '@/integrations/supabase/client'
import { SecureTokenManager, ContentSanitizer } from '@/utils/enhancedSecurityUtils'

export interface SecurityValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  maxActions: number;
  remaining?: number;
  resetTime?: string;
  blockedReason?: string;
  securityViolation?: boolean;
}

export class EnhancedSecurityService {
  /**
   * Server-side content validation with comprehensive security checks
   */
  static async validateContentSecurely(
    content: string,
    maxLength: number = 1000
  ): Promise<SecurityValidationResult> {
    try {
      const { data, error } = await supabase.rpc('validate_content_server_side', {
        content,
        max_length: maxLength
      });

      if (error) {
        console.error('Server-side validation error:', error);
        // Fallback to client-side validation
        const clientResult = ContentSanitizer.sanitizeContent(content);
        return {
          valid: clientResult.threats.length === 0,
          sanitized: clientResult.sanitized,
          threats: clientResult.threats,
          riskLevel: clientResult.riskLevel
        };
      }

      return {
        valid: data.valid,
        sanitized: data.sanitized,
        threats: data.errors || [],
        riskLevel: data.risk_level,
        securityScore: data.security_score
      };
    } catch (error) {
      console.error('Content validation service error:', error);
      // Fallback to client-side validation
      const clientResult = ContentSanitizer.sanitizeContent(content);
      return {
        valid: clientResult.threats.length === 0,
        sanitized: clientResult.sanitized,
        threats: clientResult.threats,
        riskLevel: clientResult.riskLevel
      };
    }
  }

  /**
   * Server-side rate limiting with enhanced threat detection
   */
  static async checkRateLimitSecurely(
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 60
  ): Promise<RateLimitResult> {
    try {
      const token = await SecureTokenManager.getOrCreateToken();
      
      const { data, error } = await supabase.rpc('check_rate_limit_server_side', {
        p_token: token,
        p_action: action,
        p_max_actions: maxActions,
        p_window_minutes: windowMinutes
      });

      if (error) {
        console.error('Server-side rate limit error:', error);
        return {
          allowed: true, // Fail open for availability
          currentCount: 0,
          maxActions
        };
      }

      return {
        allowed: data.allowed,
        currentCount: data.current_count || 0,
        maxActions: data.max_actions || maxActions,
        remaining: data.remaining,
        resetTime: data.reset_time,
        blockedReason: data.blocked_reason,
        securityViolation: data.security_violation
      };
    } catch (error) {
      console.error('Rate limit service error:', error);
      return {
        allowed: true, // Fail open for availability
        currentCount: 0,
        maxActions
      };
    }
  }

  /**
   * Comprehensive submission security check
   */
  static async validateSubmissionSecurity(
    content: string,
    evidenceUrls: string[] = [],
    action: string = 'submission'
  ): Promise<{
    contentValidation: SecurityValidationResult;
    rateLimitCheck: RateLimitResult;
    urlValidation: { valid: string[]; invalid: string[] };
    overallValid: boolean;
  }> {
    // Run all validations in parallel for better performance
    const [contentValidation, rateLimitCheck] = await Promise.all([
      this.validateContentSecurely(content),
      this.checkRateLimitSecurely(action, 3, 60) // Max 3 submissions per hour
    ]);

    // Validate URLs client-side (faster and sufficient for this use case)
    const validUrls = ContentSanitizer.validateUrls(evidenceUrls);
    const invalidUrls = evidenceUrls.filter(url => !validUrls.includes(url));

    const overallValid = 
      contentValidation.valid &&
      rateLimitCheck.allowed &&
      contentValidation.riskLevel !== 'critical';

    return {
      contentValidation,
      rateLimitCheck,
      urlValidation: { valid: validUrls, invalid: invalidUrls },
      overallValid
    };
  }

  /**
   * Rotate authentication token for enhanced security
   */
  static async rotateToken(): Promise<{ success: boolean; newToken?: string }> {
    try {
      const currentToken = await SecureTokenManager.getOrCreateToken();
      
      const { data, error } = await supabase.rpc('rotate_anonymous_token', {
        old_token: currentToken
      });

      if (error || !data.success) {
        console.error('Token rotation error:', error);
        return { success: false };
      }

      // Store the new token
      SecureTokenManager.clearToken();
      const newToken = await SecureTokenManager.getOrCreateToken();
      
      return { success: true, newToken };
    } catch (error) {
      console.error('Token rotation service error:', error);
      return { success: false };
    }
  }

  /**
   * Log security events for monitoring
   */
  static async logSecurityEvent(
    eventType: string,
    details: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'low'
  ): Promise<void> {
    try {
      const { error } = await supabase.from('security_audit_log').insert({
        event_type: eventType,
        details,
        created_at: new Date().toISOString()
      });

      if (error) {
        console.error('Security event logging failed:', error);
      }
    } catch (error) {
      console.error('Security logging service error:', error);
    }
  }
}
