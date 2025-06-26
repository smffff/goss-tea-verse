
import { supabase } from '@/integrations/supabase/client';
import { getOrCreateSecureToken } from '@/utils/enhancedSecurityUtils';

export interface BetaCodeValidationResult {
  valid: boolean;
  error?: string;
  code?: string;
  granted_by?: string;
}

export interface BetaCodeGenerationResult {
  success: boolean;
  code?: string;
  error?: string;
}

// Type guard functions for safe type casting
function isBetaCodeValidationResult(data: any): data is BetaCodeValidationResult {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.valid === 'boolean' &&
    (data.error === undefined || typeof data.error === 'string') &&
    (data.code === undefined || typeof data.code === 'string') &&
    (data.granted_by === undefined || typeof data.granted_by === 'string')
  );
}

function isBetaCodeGenerationResult(data: any): data is BetaCodeGenerationResult {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.success === 'boolean' &&
    (data.code === undefined || typeof data.code === 'string') &&
    (data.error === undefined || typeof data.error === 'string')
  );
}

export class BetaCodeService {
  static async validateCode(code: string, useCode: boolean = false): Promise<BetaCodeValidationResult> {
    try {
      const userToken = useCode ? getOrCreateSecureToken() : null;
      
      const { data, error } = await supabase.rpc('validate_beta_code', {
        p_code: code.trim(),
        p_user_token: userToken
      });

      if (error) {
        console.error('Beta code validation error:', error);
        return {
          valid: false,
          error: 'Validation failed. Please try again.'
        };
      }

      // Safe type casting with validation
      if (!isBetaCodeValidationResult(data)) {
        console.error('Invalid response format from validate_beta_code:', data);
        return {
          valid: false,
          error: 'Invalid server response format.'
        };
      }

      return data;
    } catch (error) {
      console.error('Beta code service error:', error);
      return {
        valid: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static async generateCodeForSpill(submissionId: string): Promise<BetaCodeGenerationResult> {
    try {
      const userToken = getOrCreateSecureToken();
      
      const { data, error } = await supabase.rpc('generate_beta_code_for_spill', {
        p_submission_id: submissionId,
        p_user_token: userToken
      });

      if (error) {
        console.error('Beta code generation error:', error);
        return {
          success: false,
          error: 'Failed to generate access code.'
        };
      }

      // Safe type casting with validation
      if (!isBetaCodeGenerationResult(data)) {
        console.error('Invalid response format from generate_beta_code_for_spill:', data);
        return {
          success: false,
          error: 'Invalid server response format.'
        };
      }

      return data;
    } catch (error) {
      console.error('Beta code generation service error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  static getTestCodes(): string[] {
    return ['TEA2024', 'CTEA-BETA', 'SPILL-TEA', 'CRYPTO-TEA', 'GOSSIP-GATE'];
  }
}
