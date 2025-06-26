import { supabase } from '@/integrations/supabase/client';
import { secureLog, sanitizeForLogging } from '@/utils/securityUtils';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export class RateLimitService {
  private static readonly FALLBACK_LIMITS = {
    submission: { maxActions: 5, windowMinutes: 15 },
    comment: { maxActions: 10, windowMinutes: 5 },
    login: { maxActions: 3, windowMinutes: 15 },
    default: { maxActions: 10, windowMinutes: 10 }
  };

  public static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 15
  ): Promise<RateLimitResult> {
    try {
      // Get limits for specific action
      const limits = this.getActionLimits(action, maxActions, windowMinutes);
      
      // Check rate limit on server
      const { data: rateLimitData, error: rateLimitError } = await supabase.rpc(
        'check_rate_limit',
        {
          identifier_param: identifier,
          action_param: action,
          max_actions: limits.maxActions,
          window_minutes: limits.windowMinutes
        }
      );

      if (rateLimitError) {
        secureLog.error('Rate limit check error:', rateLimitError);
        // Fallback to client-side rate limiting
        return this.fallbackRateLimit(identifier, action, limits);
      }

      const result = rateLimitData as any;
      
      return {
        allowed: result.allowed || false,
        remaining: result.remaining || 0,
        resetTime: result.reset_time || Date.now() + (limits.windowMinutes * 60 * 1000),
        retryAfter: result.retry_after
      };
    } catch (error) {
      secureLog.error('Rate limit service error:', error);
      // Fallback to client-side rate limiting
      return this.fallbackRateLimit(identifier, action, { maxActions, windowMinutes });
    }
  }

  private static getActionLimits(action: string, maxActions: number, windowMinutes: number) {
    const actionLimits = this.FALLBACK_LIMITS[action as keyof typeof this.FALLBACK_LIMITS];
    return actionLimits || { maxActions, windowMinutes };
  }

  private static fallbackRateLimit(
    identifier: string,
    action: string,
    limits: { maxActions: number; windowMinutes: number }
  ): RateLimitResult {
    try {
      const key = `rate_limit_${action}_${identifier}`;
      const now = Date.now();
      const windowMs = limits.windowMinutes * 60 * 1000;
      
      // Get existing rate limit data
      const existingData = localStorage.getItem(key);
      let rateLimitData: { count: number; resetTime: number } = { count: 0, resetTime: now + windowMs };
      
      if (existingData) {
        try {
          const parsed = JSON.parse(existingData);
          if (parsed.resetTime > now) {
            rateLimitData = parsed;
          }
        } catch (parseError) {
          secureLog.error('Fallback rate limit error:', parseError);
        }
      }
      
      // Check if rate limit exceeded
      if (rateLimitData.count >= limits.maxActions) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: rateLimitData.resetTime,
          retryAfter: Math.ceil((rateLimitData.resetTime - now) / 1000)
        };
      }
      
      // Update count
      rateLimitData.count += 1;
      localStorage.setItem(key, JSON.stringify(rateLimitData));
      
      return {
        allowed: true,
        remaining: limits.maxActions - rateLimitData.count,
        resetTime: rateLimitData.resetTime
      };
    } catch (error) {
      secureLog.error('Fallback rate limit error:', error);
      
      // Emergency fallback - allow but log
      this.storeErrorReport(error, 'rate_limit_fallback_failure');
      
      return {
        allowed: true,
        remaining: limits.maxActions - 1,
        resetTime: Date.now() + (limits.windowMinutes * 60 * 1000)
      };
    }
  }

  // Store error reports for deployment fixes (development only)
  private static storeErrorReport(error: any, context: string) {
    if (process.env.NODE_ENV === 'development') {
      try {
        const errorReport = {
          timestamp: new Date().toISOString(),
          context,
          error: sanitizeForLogging(error),
          url: window.location.href
        };

        const existingReports = JSON.parse(localStorage.getItem('ctea_error_reports') || '[]');
        existingReports.push(errorReport);
        localStorage.setItem('ctea_error_reports', JSON.stringify(existingReports.slice(-20)));

        secureLog.info('🫖 CTea Error Report stored for deployment fix:', errorReport);
      } catch (reportError) {
        secureLog.error('Failed to store error report:', reportError);
      }
    }
  }
}
