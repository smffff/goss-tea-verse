
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
    try {
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
        // Use permissive fallback for better UX
        return this.fallbackRateLimit(token, action, maxActions);
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
    } catch (error) {
      console.error('Rate limit service error:', error);
      this.reportError('rate_limit_failure', error);
      return this.fallbackRateLimit(token, action, maxActions);
    }
  }

  private static fallbackRateLimit(token: string, action: string, maxActions: number): RateLimitResult {
    try {
      const key = `rate_limit_${token}_${action}`;
      const stored = localStorage.getItem(key);
      const now = Date.now();
      
      if (stored) {
        const data = JSON.parse(stored);
        const windowStart = now - (60 * 60 * 1000); // 1 hour window
        
        // Filter recent attempts
        const recentAttempts = (data.attempts || []).filter((time: number) => time > windowStart);
        
        if (recentAttempts.length >= maxActions) {
          return {
            allowed: false,
            currentCount: recentAttempts.length,
            maxActions,
            resetTime: new Date(recentAttempts[0] + (60 * 60 * 1000)),
            blockedReason: '🫖 CTea rate limit exceeded - please wait before spilling more tea!'
          };
        }
        
        // Update attempts
        recentAttempts.push(now);
        localStorage.setItem(key, JSON.stringify({ attempts: recentAttempts }));
        
        return {
          allowed: true,
          currentCount: recentAttempts.length,
          maxActions
        };
      }
      
      // First attempt
      localStorage.setItem(key, JSON.stringify({ attempts: [now] }));
      return {
        allowed: true,
        currentCount: 1,
        maxActions
      };
    } catch (error) {
      console.error('Fallback rate limit error:', error);
      // Be permissive if everything fails
      return {
        allowed: true,
        currentCount: 0,
        maxActions
      };
    }
  }

  private static reportError(type: string, error: any): void {
    try {
      const errorReport = {
        type,
        timestamp: new Date().toISOString(),
        error: error.message || 'Unknown error',
        stack: error.stack,
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      localStorage.setItem('ctea_error_report', JSON.stringify(errorReport));
      console.log('🫖 CTea Error Report stored for deployment fix:', errorReport);
    } catch (reportError) {
      console.error('Failed to store error report:', reportError);
    }
  }
}
