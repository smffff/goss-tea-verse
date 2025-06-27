
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';

interface BetaCodeResult {
  success: boolean;
  code?: string;
  error?: string;
}

class BetaCodeService {
  private testCodes = ['BETA2024', 'TESTCODE', 'CTEA1337', 'ALPHA123'];

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
      // In development, accept test codes
      if (process.env.NODE_ENV === 'development' && this.testCodes.includes(code.toUpperCase())) {
        return { success: true, code: code.toUpperCase() };
      }

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

  // Add missing methods
  getTestCodes(): string[] {
    return [...this.testCodes];
  }

  isDemoMode(): boolean {
    return localStorage.getItem('ctea-demo-mode') === 'true';
  }

  checkDemoParams(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('demo') === 'true';
  }

  enableDemoMode(): void {
    localStorage.setItem('ctea-demo-mode', 'true');
    localStorage.setItem('ctea-access-level', 'beta');
  }

  clearAccess(): void {
    localStorage.removeItem('ctea-beta-access');
    localStorage.removeItem('ctea-demo-mode');
    localStorage.removeItem('ctea-beta-code');
    localStorage.removeItem('ctea-access-level');
  }
}

export const betaCodeService = new BetaCodeService();
