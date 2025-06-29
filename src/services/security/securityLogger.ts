
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import type { ThreatLevel } from './types';

export class SecurityLoggerService {
  static async logSecurityEvent(
    eventType: string,
    details: Record<string, unknown>,
    threatLevel: ThreatLevel = 'low'
  ): Promise<void> {
    try {
      // Only log medium, high, or critical threats to avoid spam
      if (threatLevel === 'medium' || threatLevel === 'high' || threatLevel === 'critical') {
        await supabase.rpc('log_security_event', {
          event_type: eventType,
          details: JSON.stringify(details),
          severity: threatLevel
        });
      }
    } catch (error) {
      secureLog.error('Security event logging failed:', error);
    }
  }
}
