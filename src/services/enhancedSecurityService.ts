
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
      // Use existing validate_unified_security function
      const { data, error } = await supabase.rpc('validate_unified_security', {
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

      // Handle the response data safely with proper typing
      if (!data || typeof data !== 'object') {
        // Fallback to client-side validation
        const clientResult = ContentSanitizer.sanitizeContent(content);
        return {
          valid: clientResult.threats.length === 0,
          sanitized: clientResult.sanitized,
          threats: clientResult.threats,
          riskLevel: clientResult.riskLevel
        };
      }

      const result = data as any;
      return {
        valid: Boolean(result?.valid),
        sanitized: String(result?.sanitized || content),
        threats: Array.isArray(result?.errors) ? result.errors : [],
        riskLevel: (['low', 'medium', 'high', 'critical'].includes(result?.risk_level) ? result.risk_level : 'medium') as 'low' | 'medium' | 'high' | 'critical',
        securityScore: typeof result?.security_score === 'number' ? result.security_score : undefined
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
      
      // Use existing check_enhanced_rate_limit function
      const { data, error } = await supabase.rpc('check_enhanced_rate_limit', {
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

      // Handle the response data safely with proper typing
      if (!data || typeof data !== 'object') {
        return {
          allowed: true, // Fail open for availability
          currentCount: 0,
          maxActions
        };
      }

      const result = data as any;
      return {
        allowed: Boolean(result?.allowed !== false),
        currentCount: Number(result?.current_count) || 0,
        maxActions: Number(result?.max_actions) || maxActions,
        remaining: typeof result?.remaining === 'number' ? result.remaining : undefined,
        resetTime: typeof result?.reset_time === 'string' ? result.reset_time : undefined,
        blockedReason: typeof result?.blocked_reason === 'string' ? result.blocked_reason : undefined,
        securityViolation: typeof result?.security_violation === 'boolean' ? result.security_violation : undefined
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
      // For now, just generate a new token client-side
      // In production, this would call a proper server-side rotation function
      SecureTokenManager.clearToken();
      const newToken = await SecureTokenManager.getOrCreateToken();
      
      console.log('[Security] Token rotated for security');
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
      // Use admin_audit_log table which exists
      const { error } = await supabase.from('admin_audit_log').insert({
        admin_email: 'system',
        action: eventType,
        details: details as any,
        target_table: 'security_log',
        ip_address: 'unknown',
        user_agent: navigator.userAgent || 'unknown'
      });

      if (error) {
        console.error('Security event logging failed:', error);
      }
    } catch (error) {
      console.error('Security logging service error:', error);
    }
  }
}
