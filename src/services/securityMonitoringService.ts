
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';

export interface SecurityEvent {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, any>;
  timestamp: string;
  user_context?: string;
}

export class SecurityMonitoringService {
  private static eventQueue: SecurityEvent[] = [];
  private static isProcessing = false;

  static async logSecurityEvent(
    type: string,
    details: Record<string, any>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<void> {
    try {
      const event: SecurityEvent = {
        type,
        severity,
        details,
        timestamp: new Date().toISOString(),
        user_context: this.getUserContext()
      };

      this.eventQueue.push(event);
      
      secureLog.info('Security event queued', { type, severity });

      // Process queue if not already processing
      if (!this.isProcessing) {
        await this.processEventQueue();
      }
    } catch (error) {
      secureLog.error('Failed to log security event', error);
    }
  }

  private static async processEventQueue(): Promise<void> {
    if (this.eventQueue.length === 0 || this.isProcessing) return;

    this.isProcessing = true;

    try {
      const events = [...this.eventQueue];
      this.eventQueue = [];

      const { error } = await supabase
        .from('security_audit_trail')
        .insert(
          events.map(event => ({
            event_type: event.type,
            severity: event.severity,
            details: event.details,
            user_context: event.user_context,
            ip_address: 'client-side',
            user_agent: navigator.userAgent,
            session_id: sessionStorage.getItem('session_id') || 'anonymous'
          }))
        );

      if (error) throw error;

      secureLog.info('Security events processed', { count: events.length });
    } catch (error) {
      secureLog.error('Failed to process security events', error);
      // Re-queue events on failure
      this.eventQueue.unshift(...this.eventQueue);
    } finally {
      this.isProcessing = false;
    }
  }

  private static getUserContext(): string {
    try {
      const accessLevel = localStorage.getItem('ctea-access-level') || 'guest';
      const betaCode = localStorage.getItem('ctea-beta-code');
      
      return JSON.stringify({
        accessLevel,
        hasBetaCode: !!betaCode,
        timestamp: Date.now()
      });
    } catch {
      return 'unknown';
    }
  }

  static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions = 10,
    windowMinutes = 5
  ): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
    try {
      const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);
      
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

      if (!allowed) {
        await this.logSecurityEvent('rate_limit_exceeded', {
          identifier,
          action,
          currentCount,
          maxActions,
          windowMinutes
        }, 'medium');
      }

      return { allowed, remaining, resetTime };
    } catch (error) {
      secureLog.error('Rate limit check failed', error);
      return { allowed: true, remaining: maxActions, resetTime: new Date() };
    }
  }
}
