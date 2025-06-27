
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface BetaCodeResult {
  success: boolean;
  message?: string;
  code?: string;
  error?: string;
}

export class BetaCodeService {
  static async validateCode(code: string): Promise<BetaCodeResult> {
    try {
      const { data, error } = await supabase
        .from('beta_codes')
        .select('*')
        .eq('code', code)
        .eq('used', false)
        .single();

      if (error || !data) {
        return {
          success: false,
          message: 'Invalid or expired beta code'
        };
      }

      // Mark code as used
      await supabase
        .from('beta_codes')
        .update({ 
          used: true, 
          used_at: new Date().toISOString(),
          user_token: localStorage.getItem('ctea_anonymous_token') || 'anonymous'
        })
        .eq('id', data.id);

      return {
        success: true,
        message: 'Beta access granted!',
        code: data.code
      };
    } catch (error) {
      secureLog.error('Beta code validation error:', error);
      return {
        success: false,
        message: 'Validation service unavailable'
      };
    }
  }

  static async generateCodeForSpill(spillId: string): Promise<BetaCodeResult> {
    try {
      const code = Array.from(crypto.getRandomValues(new Uint8Array(4)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();

      const { data, error } = await supabase
        .from('beta_codes')
        .insert({
          code: `SPILL-${code}`,
          granted_by: 'system',
          metadata: { 
            spill_id: spillId,
            generated_for: 'spill_submission'
          }
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        code: data.code,
        message: 'Beta code generated successfully'
      };
    } catch (error) {
      secureLog.error('Beta code generation error:', error);
      return {
        success: false,
        message: 'Failed to generate beta code'
      };
    }
  }
}

export const betaCodeService = BetaCodeService;
