
import { supabase } from '@/integrations/supabase/client';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

export interface BetaCode {
  id: string;
  code: string;
  used_count: number;
  max_uses: number;
  expires_at: string | null;
  is_evergreen: boolean;
  created_by: string | null;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface SpillSubmission {
  id: string;
  content: string;
  media_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  beta_code_id?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

class BetaCodeService {
  // Validate a beta access code
  async validateCode(code: string): Promise<{ valid: boolean; message: string; codeData?: BetaCode }> {
    try {
      // Check if admin mode is enabled (for development)
      if (process.env.NODE_ENV === 'development' && localStorage.getItem('ADMIN_MODE') === 'true') {
        return { valid: true, message: 'Admin mode override' };
      }

      // Check if it's a test code
      if (BRAND_CONFIG.beta.testCodes.includes(code)) {
        return { valid: true, message: 'Test code accepted' };
      }

      // Query the database for the code
      const { data: codeData, error } = await supabase
        .from('beta_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (error || !codeData) {
        return { valid: false, message: 'Invalid or expired code' };
      }

      // Check if code has expired
      if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
        return { valid: false, message: 'Code has expired' };
      }

      // Check usage limit (unless evergreen)
      if (!codeData.is_evergreen && codeData.used_count >= codeData.max_uses) {
        return { valid: false, message: 'Code usage limit reached' };
      }

      // Increment usage count
      await supabase
        .from('beta_codes')
        .update({ used_count: codeData.used_count + 1 })
        .eq('id', codeData.id);

      return { 
        valid: true, 
        message: 'Access granted! Welcome to CTea Newsroom 🫖',
        codeData 
      };

    } catch (error) {
      console.error('Code validation error:', error);
      return { valid: false, message: 'Validation failed. Please try again.' };
    }
  }

  // Submit tea for approval
  async submitTea(content: string, mediaUrl?: string): Promise<{ success: boolean; message: string; submissionId?: string }> {
    try {
      const { data, error } = await supabase
        .from('spill_submissions')
        .insert({
          content,
          media_url: mediaUrl,
          status: 'pending',
          metadata: {
            submitted_at: new Date().toISOString(),
            ip_hash: this.hashIP(this.getClientIP())
          }
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: 'Tea submitted! Our AI overlords are reviewing your spill. Check back soon! ☕',
        submissionId: data.id
      };

    } catch (error) {
      console.error('Tea submission error:', error);
      return {
        success: false,
        message: 'Failed to submit tea. The gossip gods are angry. Try again! 🔥'
      };
    }
  }

  // Process bribe (simulated for beta)
  async processBribe(amount: number, wallet?: string): Promise<{ success: boolean; message: string; code?: string }> {
    try {
      // For beta, generate a temporary code
      const tempCode = `BRIBE-${Date.now().toString(36).toUpperCase()}`;
      
      // In production, this would verify an actual on-chain transaction
      const { data, error } = await supabase
        .from('beta_codes')
        .insert({
          code: tempCode,
          used_count: 0,
          max_uses: 1,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          is_evergreen: false,
          metadata: {
            type: 'bribe',
            amount,
            wallet,
            created_at: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: `Bribe accepted! Your temporary code: ${tempCode} 💰`,
        code: tempCode
      };

    } catch (error) {
      console.error('Bribe processing error:', error);
      return {
        success: false,
        message: 'Bribe failed. Even corruption has standards. 💸'
      };
    }
  }

  // Get submission status
  async getSubmissionStatus(submissionId: string): Promise<SpillSubmission | null> {
    try {
      const { data, error } = await supabase
        .from('spill_submissions')
        .select('*')
        .eq('id', submissionId)
        .single();

      return error ? null : data;
    } catch (error) {
      console.error('Error fetching submission status:', error);
      return null;
    }
  }

  // Generate beta access after spill approval
  async generateBetaAccess(submissionId: string): Promise<string> {
    const code = `SPILL-${Date.now().toString(36).toUpperCase()}`;
    
    const { error } = await supabase
      .from('beta_codes')
      .insert({
        code,
        used_count: 0,
        max_uses: 1,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        is_evergreen: false,
        metadata: {
          type: 'spill_approval',
          submission_id: submissionId
        }
      });

    if (error) throw error;
    return code;
  }

  // Utility methods
  private getClientIP(): string {
    // In a real app, this would get the actual client IP
    return 'unknown';
  }

  private hashIP(ip: string): string {
    // Simple hash for privacy (in production, use proper hashing)
    return btoa(ip).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
  }
}

export const betaCodeService = new BetaCodeService();
