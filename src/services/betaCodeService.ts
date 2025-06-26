
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

      return data as BetaCodeValidationResult;
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

      return data as BetaCodeGenerationResult;
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
