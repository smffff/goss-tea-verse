
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface RateLimitResult {
  allowed: boolean;
  blocked_reason?: string;
  remaining_requests?: number;
  reset_time?: number;
  limit?: number;
}

export interface SecurityValidationResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export class UnifiedSecurityService {
  private static rateLimitCache = new Map<string, { count: number; resetTime: number }>();

  static async checkRateLimit(
    identifier: string,
    action: string,
    limit: number = 10,
    windowMs: number = 60000
  ): Promise<RateLimitResult> {
    try {
      const now = Date.now();
      const key = `${identifier}:${action}`;
      const cached = this.rateLimitCache.get(key);

      if (cached && now < cached.resetTime) {
        if (cached.count >= limit) {
          return {
            allowed: false,
            blocked_reason: 'Rate limit exceeded',
            remaining_requests: 0,
            reset_time: cached.resetTime,
            limit
          };
        }
        
        cached.count++;
        return {
          allowed: true,
          remaining_requests: limit - cached.count,
          reset_time: cached.resetTime,
          limit
        };
      }

      // Reset or create new entry
      this.rateLimitCache.set(key, {
        count: 1,
        resetTime: now + windowMs
      });

      return {
        allowed: true,
        remaining_requests: limit - 1,
        reset_time: now + windowMs,
        limit
      };
    } catch (error) {
      secureLog.error('Rate limit check failed:', error);
      return {
        allowed: false,
        blocked_reason: 'Rate limit check failed'
      };
    }
  }

  static async validateSecureSubmission(
    content: string,
    userId: string,
    additionalData?: Record<string, any>
  ): Promise<SecurityValidationResult> {
    try {
      // Check rate limiting
      const rateLimitResult = await this.checkRateLimit(userId, 'submission', 5, 300000); // 5 per 5 minutes
      
      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: rateLimitResult.blocked_reason || 'Rate limit exceeded'
        };
      }

      // Content validation
      if (!content || content.trim().length < 10) {
        return {
          success: false,
          error: 'Content too short'
        };
      }

      if (content.length > 2000) {
        return {
          success: false,
          error: 'Content too long'
        };
      }

      // Basic profanity/spam detection
      const suspiciousPatterns = [
        /(.)\1{10,}/g, // Repeated characters
        /https?:\/\/[^\s]+/gi, // URLs (could be spam)
      ];

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(content)) {
          secureLog.warn('Suspicious content detected', { userId, pattern: pattern.source });
        }
      }

      return {
        success: true,
        message: 'Submission validated successfully'
      };
    } catch (error) {
      secureLog.error('Secure submission validation failed:', error);
      return {
        success: false,
        error: 'Validation failed'
      };
    }
  }

  static async validateSecureReaction(
    submissionId: string,
    userId: string,
    reactionType: string
  ): Promise<SecurityValidationResult> {
    try {
      // Check rate limiting for reactions
      const rateLimitResult = await this.checkRateLimit(userId, 'reaction', 30, 60000); // 30 per minute
      
      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: rateLimitResult.blocked_reason || 'Rate limit exceeded'
        };
      }

      // Validate reaction type
      const allowedReactions = ['hot', 'cold', 'spicy'];
      if (!allowedReactions.includes(reactionType)) {
        return {
          success: false,
          error: 'Invalid reaction type'
        };
      }

      // Validate submission exists
      const { data: submission, error } = await supabase
        .from('tea_submissions')
        .select('id')
        .eq('id', submissionId)
        .single();

      if (error || !submission) {
        return {
          success: false,
          error: 'Submission not found'
        };
      }

      return {
        success: true,
        message: 'Reaction validated successfully'
      };
    } catch (error) {
      secureLog.error('Secure reaction validation failed:', error);
      return {
        success: false,
        error: 'Validation failed'
      };
    }
  }

  static clearRateLimit(identifier: string, action?: string) {
    if (action) {
      this.rateLimitCache.delete(`${identifier}:${action}`);
    } else {
      // Clear all entries for the identifier
      for (const key of this.rateLimitCache.keys()) {
        if (key.startsWith(`${identifier}:`)) {
          this.rateLimitCache.delete(key);
        }
      }
    }
  }
}
