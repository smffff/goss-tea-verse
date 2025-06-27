import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface RateLimitResult {
  allowed: boolean;
  currentCount?: number;
  maxActions?: number;
  blockedReason?: string;
  resetTime?: Date;
  remainingActions?: number;
}

export class RateLimitService {
  private static readonly DEFAULT_LIMITS = {
    submission: { max: 5, windowMinutes: 60 },
    reaction: { max: 50, windowMinutes: 60 },
    comment: { max: 20, windowMinutes: 60 },
    vote: { max: 100, windowMinutes: 60 },
    search: { max: 30, windowMinutes: 60 }
  };

  public static async checkRateLimit(
    token: string,
    action: string,
    maxActions?: number,
    windowMinutes?: number
  ): Promise<RateLimitResult> {
    try {
      secureLog.info('🚦 Checking rate limit', { action, token: token.substring(0, 8) + '...' });

      // Get default limits if not provided
      const limits = this.DEFAULT_LIMITS[action as keyof typeof this.DEFAULT_LIMITS] || 
                    { max: maxActions || 10, windowMinutes: windowMinutes || 60 };

      // Server-side rate limit check
      const { data, error } = await supabase.rpc('check_rate_limit_ultimate', {
        p_token: token,
        p_action: action,
        p_max_actions: limits.max,
        p_window_minutes: limits.windowMinutes
      });

      if (error) {
        secureLog.error('Server rate limit check failed', error);
        // Fallback to client-side check
        return this.fallbackRateLimit(token, action, limits.max, limits.windowMinutes);
      }

      const result = {
        allowed: data?.allowed || false,
        currentCount: data?.current_count || 0,
        maxActions: data?.max_actions || limits.max,
        blockedReason: data?.blocked_reason,
        resetTime: data?.reset_time ? new Date(data.reset_time) : undefined,
        remainingActions: data?.remaining || 0
      };

      secureLog.info('✅ Rate limit check completed', { 
        allowed: result.allowed, 
        currentCount: result.currentCount,
        maxActions: result.maxActions 
      });

      return result;
    } catch (error) {
      secureLog.error('❌ Rate limit check failed', error);
      return {
        allowed: false,
        blockedReason: 'Rate limit service unavailable'
      };
    }
  }

  private static fallbackRateLimit(
    token: string,
    action: string,
    maxActions: number,
    windowMinutes: number
  ): RateLimitResult {
    try {
      const key = `rate_limit_${action}_${token}`;
      const now = Date.now();
      const windowMs = windowMinutes * 60 * 1000;
      const windowStart = Math.floor(now / windowMs) * windowMs;

      const stored = localStorage.getItem(key);
      let count = 0;
      let storedWindowStart = 0;

      if (stored) {
        const data = JSON.parse(stored);
        if (data.windowStart === windowStart) {
          count = data.count;
          storedWindowStart = data.windowStart;
        }
      }

      if (count >= maxActions) {
        return {
          allowed: false,
          currentCount: count,
          maxActions,
          blockedReason: 'Rate limit exceeded (client-side)',
          resetTime: new Date(windowStart + windowMs)
        };
      }

      // Update count
      localStorage.setItem(key, JSON.stringify({
        count: count + 1,
        windowStart
      }));

      return {
        allowed: true,
        currentCount: count + 1,
        maxActions,
        remainingActions: maxActions - (count + 1)
      };
    } catch (error) {
      secureLog.error('Fallback rate limit failed', error);
      return {
        allowed: false,
        blockedReason: 'Rate limit fallback error'
      };
    }
  }

  // Enhanced suspicious activity detection
  public static async detectSuspiciousActivity(token: string): Promise<boolean> {
    try {
      const key = `activity_${token}`;
      const now = Date.now();
      const activities = JSON.parse(localStorage.getItem(key) || '[]');

      // Add current activity
      activities.push(now);

      // Keep only last 100 activities
      const recentActivities = activities.slice(-100);

      // Check for rapid-fire patterns (more than 10 actions in 1 minute)
      const oneMinuteAgo = now - 60000;
      const recentCount = recentActivities.filter((time: number) => time > oneMinuteAgo).length;

      if (recentCount > 10) {
        secureLog.warn('🚨 Suspicious rapid-fire activity detected', { 
          token: token.substring(0, 8) + '...',
          recentCount 
        });
        return true;
      }

      // Update stored activities
      localStorage.setItem(key, JSON.stringify(recentActivities));
      return false;
    } catch (error) {
      secureLog.error('Suspicious activity detection failed', error);
      return false;
    }
  }
}
