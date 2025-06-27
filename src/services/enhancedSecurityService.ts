
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

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
      // Use server-side validation for enhanced security
      const { data: validationResult, error } = await supabase
        .rpc('validate_content_server_side', {
          content: content,
          max_length: 1000
        });

      if (error) {
        secureLog.error('Server-side validation failed, using fallback', error);
        return this.fallbackValidation(content);
      }

      const result = validationResult as any;

      return {
        success: result?.valid || false,
        threats: result?.errors || [],
        sanitized: result?.sanitized || content,
        securityScore: result?.security_score || 0,
        riskLevel: result?.risk_level || 'critical'
      };

    } catch (error) {
      secureLog.error('Enhanced security validation failed', error);
      return this.fallbackValidation(content);
    }
  }

  private static fallbackValidation(content: string): SecurityValidationResult {
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

    return {
      success: threats.length === 0,
      threats,
      sanitized,
      securityScore,
      riskLevel
    };
  }

  static async logSecurityEvent(
    eventType: string,
    details: Record<string, any>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<void> {
    try {
      await supabase.rpc('log_security_event', {
        event_type: eventType,
        details: details
      });

      secureLog.info('Security event logged', { eventType, severity });
    } catch (error) {
      secureLog.error('Failed to log security event', error);
    }
  }
}
