import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import type { ContentValidationResult, RateLimitResult, ThreatLevel } from './security/types';

interface SecureSubmissionResult {
  success: boolean;
  submission_id?: string;
  error?: string;
}

interface SecureReactionResult {
  success: boolean;
  error?: string;
}

// Type guards for RPC responses
function isContentValidationResult(data: any): data is ContentValidationResult {
  return data && 
         typeof data === 'object' && 
         typeof data.valid === 'boolean' &&
         Array.isArray(data.errors) &&
         Array.isArray(data.warnings);
}

function isRateLimitResult(data: any): data is RateLimitResult {
  return data && 
         typeof data === 'object' && 
         typeof data.allowed === 'boolean' &&
         typeof data.remaining === 'number' &&
         typeof data.resetTime === 'number';
}

export class SecurityService {
  // Generate or get secure anonymous token
  static async getOrCreateSecureToken(): Promise<string> {
    try {
      // Check for existing token in session
      const existingToken = sessionStorage.getItem('ctea_secure_token');
      if (existingToken && existingToken.length > 16) {
        return existingToken;
      }

      // Generate new secure token
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      const token = btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      sessionStorage.setItem('ctea_secure_token', token);
      return token;
    } catch (error) {
      secureLog.error('Token generation failed:', error);
      // Fallback token
      const fallbackToken = 'fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      sessionStorage.setItem('ctea_secure_token', fallbackToken);
      return fallbackToken;
    }
  }

  // Validate content with proper type handling
  static async validateContent(content: string, maxLength = 2000): Promise<ContentValidationResult> {
    try {
      const { data, error } = await supabase.rpc('validate_unified_security', {
        p_content: content,
        p_max_length: maxLength
      });

      if (error) {
        secureLog.error('Content validation failed:', error);
        return {
          valid: false,
          errors: ['Validation service unavailable'],
          warnings: []
        };
      }

      // Type guard for the response
      if (isContentValidationResult(data)) {
        return data;
      }

      // Fallback validation - ensure proper return type
      const result: ContentValidationResult = {
        valid: content.length > 0 && content.length <= maxLength,
        sanitized: content.trim(),
        errors: content.length > maxLength ? ['Content too long'] : [],
        warnings: []
      };
      return result;
    } catch (error) {
      secureLog.error('Content validation error:', error);
      return {
        valid: false,
        errors: ['Validation failed'],
        warnings: []
      };
    }
  }

  // Rate limit check with proper type handling
  static async checkRateLimit(
    token: string, 
    action: string, 
    maxAttempts: number, 
    windowMinutes: number
  ): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase.rpc('check_enhanced_rate_limit', {
        p_token: token,
        p_action: action,
        p_max_actions: maxAttempts,
        p_window_minutes: windowMinutes
      });

      if (error) {
        secureLog.error('Rate limit check failed:', error);
        return {
          allowed: false,
          remaining: 0,
          resetTime: Date.now() + windowMinutes * 60 * 1000,
          blocked_reason: 'Service unavailable'
        };
      }

      // Type guard for the response
      if (isRateLimitResult(data)) {
        return data;
      }

      // Fallback - ensure proper return type
      return {
        allowed: true,
        remaining: maxAttempts - 1,
        resetTime: Date.now() + windowMinutes * 60 * 1000
      };
    } catch (error) {
      secureLog.error('Rate limit error:', error);
      return {
        allowed: false,
        remaining: 0,
        resetTime: Date.now() + windowMinutes * 60 * 1000,
        blocked_reason: 'System error'
      };
    }
  }

  // Validate submission security
  static async validateSubmissionSecurity(
    content: string, 
    action: string = 'submission'
  ): Promise<{
    success: boolean;
    errors: string[];
    sanitizedContent?: string;
  }> {
    try {
      const token = await this.getOrCreateSecureToken();
      
      // Validate content
      const contentValidation = await this.validateContent(content);
      if (!contentValidation.valid) {
        return {
          success: false,
          errors: contentValidation.errors
        };
      }

      // Check rate limit
      const rateLimitCheck = await this.checkRateLimit(token, action, 10, 60);
      if (!rateLimitCheck.allowed) {
        return {
          success: false,
          errors: [rateLimitCheck.blocked_reason || 'Rate limit exceeded']
        };
      }

      return {
        success: true,
        errors: [],
        sanitizedContent: contentValidation.sanitized
      };
    } catch (error) {
      secureLog.error('Submission security validation failed:', error);
      return {
        success: false,
        errors: ['Security validation failed']
      };
    }
  }

  // Create secure submission
  static async createSecureSubmission(content: string, category: string = 'general'): Promise<SecureSubmissionResult> {
    try {
      const token = await this.getOrCreateSecureToken();
      
      const { data, error } = await supabase.rpc('secure_submission_insert', {
        p_content: content,
        p_anonymous_token: token,
        p_category: category
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        submission_id: typeof data === 'object' && data && 'submission_id' in data 
          ? (data as any).submission_id 
          : undefined
      };
    } catch (error) {
      secureLog.error('Secure submission failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Submission failed'
      };
    }
  }

  // Create secure reaction
  static async createSecureReaction(
    submissionId: string, 
    reactionType: 'hot' | 'cold' | 'spicy'
  ): Promise<SecureReactionResult> {
    try {
      const token = await this.getOrCreateSecureToken();
      
      const { data, error } = await supabase.rpc('secure_reaction_insert', {
        p_submission_id: submissionId,
        p_reaction_type: reactionType,
        p_anonymous_token: token
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      secureLog.error('Secure reaction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Reaction failed'
      };
    }
  }

  // Log security event with proper threat level handling
  static async logSecurityEvent(
    eventType: string,
    details: Record<string, unknown>,
    threatLevel: ThreatLevel = 'low'
  ): Promise<void> {
    try {
      // Only log medium, high, or critical threats to avoid spam
      if (threatLevel === 'medium' || threatLevel === 'high' || threatLevel === 'critical') {
        await supabase.rpc('log_security_event', {
          event_type: eventType,
          details: details as any,
          severity: threatLevel
        });
      }
    } catch (error) {
      secureLog.error('Security event logging failed:', error);
    }
  }
}
