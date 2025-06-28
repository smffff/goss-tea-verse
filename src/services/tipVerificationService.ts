
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

export interface TipTransaction {
  id: string;
  user_email: string;
  network: string;
  wallet_address: string;
  amount?: number;
  transaction_hash?: string;
  proof_image_url?: string;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  verification_method: 'manual' | 'blockchain' | 'email';
  verified_at?: string;
  verified_by?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  metadata?: Record<string, any>;
}

export class TipVerificationService {
  static async submitTipProof(tipData: {
    userEmail: string;
    network: string;
    walletAddress: string;
    amount?: number;
    transactionHash?: string;
    proofImageUrl?: string;
  }): Promise<{ success: boolean; tipId?: string; error?: string }> {
    try {
      // Validate inputs
      if (!tipData.userEmail || !tipData.network || !tipData.walletAddress) {
        return { success: false, error: 'Missing required fields' };
      }

      // Insert directly into the table since we don't have the RPC function yet
      const { data, error } = await supabase
        .from('tip_transactions')
        .insert({
          user_email: tipData.userEmail,
          network: tipData.network,
          wallet_address: tipData.walletAddress,
          amount: tipData.amount,
          transaction_hash: tipData.transactionHash,
          proof_image_url: tipData.proofImageUrl,
          status: 'pending',
          verification_method: 'manual'
        })
        .select('id')
        .single();

      if (error) {
        secureLog.error('Failed to submit tip proof:', error);
        return { success: false, error: error.message };
      }

      return { success: true, tipId: data.id };
    } catch (error) {
      secureLog.error('Tip proof submission error:', error);
      return { success: false, error: 'Failed to submit tip proof' };
    }
  }

  static async getTipTransactions(userEmail?: string): Promise<TipTransaction[]> {
    try {
      let query = supabase
        .from('tip_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (userEmail) {
        query = query.eq('user_email', userEmail);
      }

      const { data, error } = await query;

      if (error) {
        secureLog.error('Failed to fetch tip transactions:', error);
        return [];
      }

      // Cast the data to our interface type to resolve TypeScript issues
      return (data || []) as TipTransaction[];
    } catch (error) {
      secureLog.error('Get tip transactions error:', error);
      return [];
    }
  }

  static async verifyTip(
    tipId: string,
    verifiedBy: string,
    status: 'verified' | 'rejected',
    rejectionReason?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = {
        status,
        verified_by: verifiedBy,
        verified_at: new Date().toISOString(),
      };

      if (status === 'rejected' && rejectionReason) {
        updateData.rejection_reason = rejectionReason;
      }

      const { error } = await supabase
        .from('tip_transactions')
        .update(updateData)
        .eq('id', tipId);

      if (error) {
        secureLog.error('Failed to verify tip:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      secureLog.error('Tip verification error:', error);
      return { success: false, error: 'Failed to verify tip' };
    }
  }

  static async getPendingTips(): Promise<TipTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('tip_transactions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (error) {
        secureLog.error('Failed to fetch pending tips:', error);
        return [];
      }

      // Cast the data to our interface type to resolve TypeScript issues
      return (data || []) as TipTransaction[];
    } catch (error) {
      secureLog.error('Get pending tips error:', error);
      return [];
    }
  }
}
