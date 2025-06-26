
import { supabase } from '@/integrations/supabase/client'

export interface RateLimitResult {
  allowed: boolean
  current_count: number
  max_actions: number
  remaining: number
  reset_time: string | null
  blocked_reason: string | null
}

export class RateLimitService {
  static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 15
  ): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase.rpc('check_enhanced_rate_limit', {
        p_token: identifier,
        p_action: action,
        p_max_actions: maxActions,
        p_window_minutes: windowMinutes
      })

      if (error) {
        console.error('Rate limit check error:', error)
        return {
          allowed: true,
          current_count: 0,
          max_actions: maxActions,
          remaining: maxActions,
          reset_time: null,
          blocked_reason: null
        }
      }

      const result = data as unknown as RateLimitResult | null
      if (!result) {
        return {
          allowed: true,
          current_count: 0,
          max_actions: maxActions,
          remaining: maxActions,
          reset_time: null,
          blocked_reason: null
        }
      }

      return result
    } catch (error) {
      console.error('Rate limiting service error:', error)
      return {
        allowed: true,
        current_count: 0,
        max_actions: maxActions,
        remaining: maxActions,
        reset_time: null,
        blocked_reason: null
      }
    }
  }
}
