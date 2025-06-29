
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import type { RateLimitResult } from './types';

export class RateLimitManagerService {
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
      if (this.isRateLimitResult(data)) {
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

  private static isRateLimitResult(data: any): data is RateLimitResult {
    return data && 
           typeof data === 'object' && 
           typeof data.allowed === 'boolean' &&
           typeof data.remaining === 'number' &&
           typeof data.resetTime === 'number';
  }
}
