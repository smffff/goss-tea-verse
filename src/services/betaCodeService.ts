
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';

interface BetaCodeResult {
  success: boolean;
  code?: string;
  error?: string;
}

class BetaCodeService {
  async generateCodeForSpill(spillId: string): Promise<BetaCodeResult> {
    try {
      const code = this.generateRandomCode();
      
      const { error } = await supabase
        .from('beta_codes')
        .insert({
          code,
          granted_by: 'system_spill',
          metadata: { spill_id: spillId, generated_at: new Date().toISOString() }
        });

      if (error) {
        throw error;
      }

      return { success: true, code };
    } catch (error) {
      secureLog.error('Beta code generation failed', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  private generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async validateCode(code: string, userToken?: string): Promise<BetaCodeResult> {
    try {
      const { data, error } = await supabase
        .from('beta_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('used', false)
        .single();

      if (error || !data) {
        return { success: false, error: 'Invalid or expired code' };
      }

      // Mark code as used
      await supabase
        .from('beta_codes')
        .update({ 
          used: true, 
          used_at: new Date().toISOString(),
          user_token: userToken 
        })
        .eq('id', data.id);

      return { success: true, code: data.code };
    } catch (error) {
      secureLog.error('Beta code validation failed', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Validation failed' 
      };
    }
  }
}

export const betaCodeService = new BetaCodeService();
