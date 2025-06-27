
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';

export interface SecurityValidationResult {
  success: boolean;
  threats: string[];
  sanitized: string;
  securityScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  error?: string;
}

export class EnhancedSecurityService {
  private static readonly THREAT_PATTERNS = [
    // XSS patterns
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    
    // SQL injection patterns
    /union\s+select/gi,
    /drop\s+table/gi,
    /delete\s+from/gi,
    
    // Path traversal
    /\.\.\//g,
    /\.\.[\\/]/g,
    
    // Command injection
    /;\s*rm\s/gi,
    /;\s*cat\s/gi,
    /;\s*ls\s/gi,
  ];

  static async validateContent(content: string): Promise<SecurityValidationResult> {
    try {
      const threats: string[] = [];
      let securityScore = 100;
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

      // Check for malicious patterns
      for (const pattern of this.THREAT_PATTERNS) {
        if (pattern.test(content)) {
          threats.push(`Potential security threat detected: ${pattern.toString()}`);
          securityScore -= 25;
        }
      }

      // Determine risk level
      if (securityScore < 25) {
        riskLevel = 'critical';
      } else if (securityScore < 50) {
        riskLevel = 'high';
      } else if (securityScore < 75) {
        riskLevel = 'medium';
      }

      // Sanitize content
      const sanitized = content
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();

      const result: SecurityValidationResult = {
        success: threats.length === 0,
        threats,
        sanitized,
        securityScore,
        riskLevel
      };

      if (threats.length > 0) {
        secureLog.warn('Security threats detected in content', {
          threatCount: threats.length,
          riskLevel,
          securityScore
        });
      }

      return result;

    } catch (error) {
      secureLog.error('Enhanced security validation failed', error);
      return {
        success: false,
        threats: ['Security validation service unavailable'],
        sanitized: content.replace(/[<>]/g, ''),
        securityScore: 0,
        riskLevel: 'critical',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async logSecurityEvent(
    eventType: string,
    details: Record<string, any>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<void> {
    try {
      await supabase.from('security_audit_trail').insert({
        event_type: eventType,
        details,
        severity,
        ip_address: 'unknown', // Client-side can't determine real IP
        user_agent: navigator.userAgent,
        session_id: sessionStorage.getItem('session_id') || 'anonymous'
      });

      secureLog.info('Security event logged', { eventType, severity });
    } catch (error) {
      secureLog.error('Failed to log security event', error);
    }
  }
}
