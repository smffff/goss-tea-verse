
import { supabase } from '@/integrations/supabase/client';

export interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  maxActions: number;
  resetTime?: Date;
  blockedReason?: string;
  securityViolation?: boolean;
}

export class RateLimitService {
  public static async checkRateLimit(
    token: string,
    action: string,
    maxActions: number = 5,
    windowMinutes: number = 60
  ): Promise<RateLimitResult> {
    const { data: rateLimitResult, error: rateLimitError } = await supabase.rpc(
      'check_rate_limit_ultimate',
      { 
        p_token: token, 
        p_action: action, 
        p_max_actions: maxActions, 
        p_window_minutes: windowMinutes 
      }
    );

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      throw new Error('Rate limit check failed');
    }
    
    const rateLimitData = rateLimitResult as any;
    
    return {
      allowed: rateLimitData?.allowed || false,
      currentCount: rateLimitData?.current_count || 0,
      maxActions: rateLimitData?.max_actions || maxActions,
      resetTime: rateLimitData?.reset_time ? new Date(rateLimitData.reset_time) : undefined,
      blockedReason: rateLimitData?.blocked_reason,
      securityViolation: rateLimitData?.security_violation || false
    };
  }
}
