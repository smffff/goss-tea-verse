
import { supabase } from '@/integrations/supabase/client';

export interface RateLimitResult {
  allowed: boolean;
  current_count: number;
  max_actions: number;
  remaining: number;
  reset_time: Date;
  blocked_reason?: string;
}

export class RateLimitService {
  static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions = 10,
    windowMinutes = 5
  ): Promise<RateLimitResult> {
    try {
      const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);
      
      // Get current rate limit entries
      const { data, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('anonymous_token', identifier)
        .eq('action_type', action)
        .gte('window_start', windowStart.toISOString());

      if (error) throw error;

      const currentCount = data?.length || 0;
      const allowed = currentCount < maxActions;
      const remaining = Math.max(0, maxActions - currentCount);
      const resetTime = new Date(Date.now() + windowMinutes * 60 * 1000);

      // If allowed, record this action
      if (allowed) {
        await supabase.from('rate_limits').insert({
          anonymous_token: identifier,
          action_type: action,
          window_start: new Date().toISOString()
        });
      }

      const result: RateLimitResult = {
        allowed,
        current_count: currentCount,
        max_actions: maxActions,
        remaining,
        reset_time: resetTime
      };

      if (!allowed) {
        result.blocked_reason = `Rate limit exceeded: ${currentCount}/${maxActions} actions in ${windowMinutes} minutes`;
      }

      return result;
    } catch (error) {
      console.error('Rate limit check failed:', error);
      
      // Return permissive result on error to avoid blocking users
      return {
        allowed: true,
        current_count: 0,
        max_actions: maxActions,
        remaining: maxActions,
        reset_time: new Date(Date.now() + windowMinutes * 60 * 1000)
      };
    }
  }

  static async recordAction(identifier: string, action: string): Promise<void> {
    try {
      await supabase.from('rate_limits').insert({
        anonymous_token: identifier,
        action_type: action,
        window_start: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to record rate limit action:', error);
    }
  }

  static async cleanupExpiredEntries(): Promise<void> {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      await supabase
        .from('rate_limits')
        .delete()
        .lt('window_start', oneDayAgo.toISOString());
    } catch (error) {
      console.error('Failed to cleanup expired rate limit entries:', error);
    }
  }
}
