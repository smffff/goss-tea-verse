
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import type { ContentValidationResult } from './types';

export class ContentValidationService {
  static async validateContent(content: string, maxLength = 2000): Promise<ContentValidationResult> {
    try {
      // Use the correct RPC function name and parameters based on the available functions
      const { data, error } = await supabase.rpc('validate_content_server_side', {
        content: content,
        max_length: maxLength
      });

      if (error) {
        secureLog.error('Content validation failed:', error);
        return {
          valid: false,
          errors: ['Validation service unavailable'],
          warnings: []
        };
      }

      // Type guard for the response
      if (this.isContentValidationResult(data)) {
        return {
          valid: data.valid,
          sanitized: data.sanitized,
          errors: data.errors || [],
          warnings: data.warnings || []
        };
      }

      // Fallback validation - ensure proper return type
      const result: ContentValidationResult = {
        valid: content.length > 0 && content.length <= maxLength,
        sanitized: content.trim(),
        errors: content.length > maxLength ? ['Content too long'] : [],
        warnings: []
      };
      return result;
    } catch (error) {
      secureLog.error('Content validation error:', error);
      return {
        valid: false,
        errors: ['Validation failed'],
        warnings: []
      };
    }
  }

  private static isContentValidationResult(data: any): data is ContentValidationResult {
    return data && 
           typeof data === 'object' && 
           typeof data.valid === 'boolean' &&
           Array.isArray(data.errors) &&
           Array.isArray(data.warnings);
  }
}
