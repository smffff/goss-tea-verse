
import { supabase } from '@/integrations/supabase/client'

export interface SecurityEvent {
  event_type: string
  details: Record<string, unknown>
  severity: 'low' | 'medium' | 'high' | 'critical'
  user_id?: string
  ip_address?: string
  user_agent?: string
}

export class SecurityEventService {
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      const { error } = await supabase.from('admin_audit_log').insert({
        admin_email: event.user_id || 'anonymous',
        action: event.event_type,
        details: event.details as any,
        ip_address: event.ip_address || 'unknown',
        user_agent: event.user_agent || 'unknown',
        target_table: 'security_log'
      })

      if (error) {
        console.error('Security event logging failed:', error)
      }
    } catch (error) {
      console.error('Security logging service error:', error)
    }
  }
}
