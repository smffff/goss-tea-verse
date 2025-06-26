
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
    const { data: contentResult, error: contentError } = await supabase.rpc(
      'validate_content_ultimate',
      { content, max_length: maxLength }
    );

    if (contentError) {
      console.error('Content validation error:', contentError);
      throw new Error('Content validation failed');
    }
    
    const validationData = contentResult as any;
    
    return {
      valid: validationData?.valid || false,
      sanitized: validationData?.sanitized || content,
      threats: validationData?.errors || [],
      riskLevel: validationData?.risk_level || 'low',
      securityScore: validationData?.security_score || 0
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
}
