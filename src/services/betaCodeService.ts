
import { supabase } from '@/integrations/supabase/client';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

export interface BetaCode {
  id: string;
  code: string;
  used: boolean;
  created_at: string;
  used_at: string | null;
  granted_by: string | null;
  user_token: string | null;
  metadata?: Record<string, any>;
}

class BetaCodeService {
  // Validate a beta access code
  async validateCode(code: string, markAsUsed: boolean = false): Promise<{ valid: boolean; error?: string; code?: string }> {
    try {
      // Check if admin mode is enabled (for development)
      if (process.env.NODE_ENV === 'development' && localStorage.getItem('ADMIN_MODE') === 'true') {
        return { valid: true, code };
      }

      // Check if it's a test code
      if (BRAND_CONFIG.beta.testCodes.includes(code)) {
        return { valid: true, code };
      }

      // Query the database for the code
      const { data: codeData, error } = await supabase
        .from('beta_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('used', false)
        .single();

      if (error || !codeData) {
        return { valid: false, error: 'Invalid or already used code' };
      }

      // Mark code as used if requested
      if (markAsUsed) {
        const { error: updateError } = await supabase
          .from('beta_codes')
          .update({ 
            used: true, 
            used_at: new Date().toISOString(),
            user_token: this.generateUserToken()
          })
          .eq('id', codeData.id);

        if (updateError) {
          console.error('Failed to mark code as used:', updateError);
        }
      }

      return { 
        valid: true, 
        code: codeData.code
      };

    } catch (error) {
      console.error('Code validation error:', error);
      return { valid: false, error: 'Validation failed. Please try again.' };
    }
  }

  // Generate beta access after spill approval
  async generateCodeForSpill(submissionId: string): Promise<{ success: boolean; code?: string; error?: string }> {
    try {
      const code = `TEA-${Date.now().toString(36).toUpperCase()}`;
      
      const { error } = await supabase
        .from('beta_codes')
        .insert({
          code,
          used: false,
          granted_by: 'spill',
          metadata: {
            type: 'spill_approval',
            submission_id: submissionId,
            created_at: new Date().toISOString()
          }
        });

      if (error) {
        console.error('Failed to generate beta code:', error);
        return { success: false, error: 'Failed to generate access code' };
      }

      return { success: true, code };
    } catch (error) {
      console.error('Code generation error:', error);
      return { success: false, error: 'Code generation failed' };
    }
  }

  // Get test codes for development
  getTestCodes(): string[] {
    return BRAND_CONFIG.beta.testCodes;
  }

  // Generate a user token for tracking
  private generateUserToken(): string {
    return crypto.randomUUID();
  }
}

export const betaCodeService = new BetaCodeService();
