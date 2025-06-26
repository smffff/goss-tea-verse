
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
  // Check if code is a test code (always valid)
  private isTestCode(code: string): boolean {
    return BRAND_CONFIG.beta.testCodes.includes(code.toUpperCase());
  }

  // Check if admin mode is enabled
  private isAdminMode(): boolean {
    return process.env.NODE_ENV === 'development' && localStorage.getItem('ADMIN_MODE') === 'true';
  }

  // Validate a beta access code
  async validateCode(code: string, markAsUsed: boolean = false): Promise<{ valid: boolean; error?: string; code?: string }> {
    try {
      const upperCode = code.toUpperCase();

      // Check admin mode first (development only)
      if (this.isAdminMode()) {
        return { valid: true, code: upperCode };
      }

      // Check if it's a test code (always valid, no usage tracking)
      if (this.isTestCode(upperCode)) {
        // For test codes, store in localStorage for demo tracking
        if (markAsUsed) {
          localStorage.setItem('ctea-beta-access', 'granted');
          localStorage.setItem('ctea-beta-code', upperCode);
          localStorage.setItem('ctea-demo-mode', 'false'); // Real beta access
        }
        return { valid: true, code: upperCode };
      }

      // Query the database for the code
      const { data: codeData, error } = await supabase
        .from('beta_codes')
        .select('*')
        .eq('code', upperCode)
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

        // Store real beta access
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', upperCode);
        localStorage.setItem('ctea-demo-mode', 'false');
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

  // Enable demo mode without beta code
  enableDemoMode(): void {
    localStorage.setItem('ctea-beta-access', 'granted');
    localStorage.setItem('ctea-demo-mode', 'true');
    localStorage.setItem('ctea-beta-code', 'DEMO-MODE');
  }

  // Check if user is in demo mode
  isDemoMode(): boolean {
    return localStorage.getItem('ctea-demo-mode') === 'true';
  }

  // Check if user has beta access (demo or real)
  hasBetaAccess(): boolean {
    return localStorage.getItem('ctea-beta-access') === 'granted';
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

  // Create shareable demo link
  createDemoLink(source: string = 'direct'): string {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      demo: 'true',
      source,
      timestamp: Date.now().toString()
    });
    return `${baseUrl}?${params.toString()}`;
  }

  // Check if URL has demo parameters
  checkDemoParams(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('demo') === 'true';
  }

  // Generate a user token for tracking
  private generateUserToken(): string {
    return crypto.randomUUID();
  }

  // Clear all beta access data
  clearAccess(): void {
    localStorage.removeItem('ctea-beta-access');
    localStorage.removeItem('ctea-demo-mode');
    localStorage.removeItem('ctea-beta-code');
  }
}

export const betaCodeService = new BetaCodeService();
