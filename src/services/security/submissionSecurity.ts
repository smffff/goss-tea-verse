
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import { ContentValidationService } from './contentValidation';
import { RateLimitManagerService } from './rateLimitManager';
import { TokenManagerService } from './tokenManager';

interface SecureSubmissionResult {
  success: boolean;
  submission_id?: string;
  error?: string;
}

interface SecureReactionResult {
  success: boolean;
  error?: string;
}

export class SubmissionSecurityService {
  static async validateSubmissionSecurity(
    content: string, 
    action: string = 'submission'
  ): Promise<{
    success: boolean;
    errors: string[];
    sanitizedContent?: string;
  }> {
    try {
      const token = await TokenManagerService.getOrCreateSecureToken();
      
      // Validate content
      const contentValidation = await ContentValidationService.validateContent(content);
      if (!contentValidation.valid) {
        return {
          success: false,
          errors: contentValidation.errors
        };
      }

      // Check rate limit
      const rateLimitCheck = await RateLimitManagerService.checkRateLimit(token, action, 10, 60);
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

  static async createSecureSubmission(content: string, category: string = 'general'): Promise<SecureSubmissionResult> {
    try {
      const token = await TokenManagerService.getOrCreateSecureToken();
      
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

  static async createSecureReaction(
    submissionId: string, 
    reactionType: 'hot' | 'cold' | 'spicy'
  ): Promise<SecureReactionResult> {
    try {
      const token = await TokenManagerService.getOrCreateSecureToken();
      
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
}
