
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  blocked?: boolean;
  reason?: string;
}

export class SecureRateLimitService {
  private static cache = new Map<string, { count: number; resetTime: number }>();

  static async checkRateLimit(
    identifier: string,
    action: string,
    maxAttempts: number = 10,
    windowMinutes: number = 15
  ): Promise<RateLimitResult> {
    try {
      // Use existing server-side rate limiting function
      const { data: rateLimitResult, error } = await supabase
        .rpc('check_rate_limit_server', {
          p_token: identifier,
          p_action: action,
          p_max_actions: maxAttempts,
          p_window_minutes: windowMinutes
        });

      if (error) {
        secureLog.error('Server rate limit check failed, using fallback', error);
        return this.fallbackRateLimit(identifier, action, maxAttempts, windowMinutes);
      }

      // Type cast the result safely
      const result = rateLimitResult as any;

      return {
        allowed: result?.allowed || false,
        remaining: result?.remaining || 0,
        resetTime: result?.reset_time ? new Date(result.reset_time).getTime() : Date.now() + (windowMinutes * 60 * 1000),
        blocked: !result?.allowed,
        reason: result?.blocked_reason
      };
    } catch (error) {
      secureLog.error('Rate limit service error', error);
      return this.fallbackRateLimit(identifier, action, maxAttempts, windowMinutes);
    }
  }

  private static fallbackRateLimit(
    identifier: string,
    action: string,
    maxAttempts: number,
    windowMinutes: number
  ): RateLimitResult {
    const key = `${identifier}:${action}`;
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    
    const cached = this.cache.get(key);
    
    if (cached && now < cached.resetTime) {
      if (cached.count >= maxAttempts) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: cached.resetTime,
          blocked: true,
          reason: 'Rate limit exceeded (fallback)'
        };
      }
      
      cached.count++;
      return {
        allowed: true,
        remaining: maxAttempts - cached.count,
        resetTime: cached.resetTime
      };
    }

    // Reset or create new entry
    this.cache.set(key, {
      count: 1,
      resetTime: now + windowMs
    });

    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetTime: now + windowMs
    };
  }

  static clearRateLimit(identifier: string, action?: string): void {
    if (action) {
      this.cache.delete(`${identifier}:${action}`);
    } else {
      // Clear all entries for the identifier
      for (const key of this.cache.keys()) {
        if (key.startsWith(`${identifier}:`)) {
          this.cache.delete(key);
        }
      }
    }
  }
}
