
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';

export interface UnifiedSecurityResult {
  success: boolean;
  data?: any;
  error?: string;
  securityViolation?: boolean;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export class SecurityServiceUnified {
  private static instance: SecurityServiceUnified;

  public static getInstance(): SecurityServiceUnified {
    if (!SecurityServiceUnified.instance) {
      SecurityServiceUnified.instance = new SecurityServiceUnified();
    }
    return SecurityServiceUnified.instance;
  }

  // Main submission security validation
  public static async validateSubmissionSecurity(
    content: string,
    urls: string[] = [],
    action: string = 'submission'
  ): Promise<UnifiedSecurityResult> {
    try {
      // Get secure token
      const token = this.getOrCreateSecureToken();
      if (!token) {
        return {
          success: false,
          error: 'Authentication required',
          securityViolation: true,
          riskLevel: 'high'
        };
      }

      // Use server-side validation function
      const { data, error } = await supabase.rpc('secure_submission_insert', {
        p_content: content,
        p_anonymous_token: token,
        p_category: 'general'
      });

      if (error) {
        secureLog.error('Submission security validation failed:', error);
        return {
          success: false,
          error: 'Security validation failed',
          securityViolation: true,
          riskLevel: 'high'
        };
      }

      return {
        success: data?.success || false,
        data: data,
        error: data?.error,
        riskLevel: 'low'
      };
    } catch (error) {
      secureLog.error('Security validation error:', error);
      return {
        success: false,
        error: 'Security system error',
        securityViolation: true,
        riskLevel: 'critical'
      };
    }
  }

  // Secure reaction submission
  public static async submitReaction(
    submissionId: string,
    reactionType: 'hot' | 'cold' | 'spicy'
  ): Promise<UnifiedSecurityResult> {
    try {
      const token = this.getOrCreateSecureToken();
      if (!token) {
        return {
          success: false,
          error: 'Authentication required',
          securityViolation: true
        };
      }

      const { data, error } = await supabase.rpc('secure_reaction_insert', {
        p_submission_id: submissionId,
        p_anonymous_token: token,
        p_reaction_type: reactionType
      });

      if (error) {
        secureLog.error('Reaction submission failed:', error);
        return {
          success: false,
          error: 'Failed to submit reaction'
        };
      }

      return {
        success: data?.success || false,
        error: data?.error,
        riskLevel: 'low'
      };
    } catch (error) {
      secureLog.error('Reaction security error:', error);
      return {
        success: false,
        error: 'Security system error',
        securityViolation: true
      };
    }
  }

  // Enhanced token management
  private static getOrCreateSecureToken(): string | null {
    try {
      let token = sessionStorage.getItem('ctea_anonymous_token');
      
      if (!token || !this.validateToken(token)) {
        token = this.generateSecureToken();
        sessionStorage.setItem('ctea_anonymous_token', token);
        secureLog.info('Generated new secure token');
      }

      return token;
    } catch (error) {
      secureLog.error('Token management failed:', error);
      return null;
    }
  }

  private static generateSecureToken(): string {
    try {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    } catch (error) {
      secureLog.error('Token generation failed:', error);
      return 'fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    }
  }

  private static validateToken(token: string): boolean {
    if (!token || token.length < 32) return false;
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /test/i, /debug/i, /admin/i, /root/i, /system/i, /demo/i
    ];
    
    return !suspiciousPatterns.some(pattern => pattern.test(token));
  }

  // Content sanitization
  public static sanitizeContent(content: string): string {
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');
  }

  // URL validation
  public static validateUrls(urls: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    for (const url of urls) {
      if (!url?.trim()) continue;
      
      try {
        const urlObj = new URL(url);
        if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
          valid.push(url);
        } else {
          invalid.push(url);
        }
      } catch {
        invalid.push(url);
      }
    }

    return { valid, invalid };
  }
}

// Export convenience functions
export const validateSubmissionSecurity = SecurityServiceUnified.validateSubmissionSecurity;
export const submitSecureReaction = SecurityServiceUnified.submitReaction;
export const sanitizeContent = SecurityServiceUnified.sanitizeContent;
