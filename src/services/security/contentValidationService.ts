
import { supabase } from '@/integrations/supabase/client';

export interface SecurityValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
}

export class ContentValidationService {
  public static async validateContent(content: string, maxLength: number = 1000): Promise<SecurityValidationResult> {
    try {
      const { data: contentResult, error: contentError } = await supabase.rpc(
        'validate_content_ultimate',
        { content, max_length: maxLength }
      );

      if (contentError) {
        console.error('Content validation error:', contentError);
        // Fallback to client-side validation
        return this.fallbackValidation(content);
      }
      
      const validationData = contentResult as any;
      
      return {
        valid: validationData?.valid || false,
        sanitized: validationData?.sanitized || this.sanitizeContent(content),
        threats: validationData?.errors || [],
        riskLevel: validationData?.risk_level || 'low',
        securityScore: validationData?.security_score || 0
      };
    } catch (error) {
      console.error('Content validation service error:', error);
      // Report error and use fallback
      this.reportError('content_validation_failure', error);
      return this.fallbackValidation(content);
    }
  }

  private static fallbackValidation(content: string): SecurityValidationResult {
    const sanitized = this.sanitizeContent(content);
    const threats: string[] = [];
    
    // Basic threat detection
    if (content !== sanitized) {
      threats.push('Potentially dangerous content detected');
    }
    
    // Check for excessive length
    if (content.length > 1000) {
      threats.push('Content exceeds maximum length');
    }
    
    return {
      valid: threats.length === 0,
      sanitized,
      threats,
      riskLevel: threats.length > 0 ? 'medium' : 'low',
      securityScore: threats.length === 0 ? 100 : 50
    };
  }

  public static sanitizeContent(content: string): string {
    if (!content) return '';
    
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  private static reportError(type: string, error: any): void {
    try {
      // Store error for reporting
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
