
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import type { TeaTransaction, WalletBalance } from '@/types/teaTokens';

export class TeaTokenService {
  static async awardTokens(
    walletAddress: string,
    action: 'spill' | 'tip' | 'flag' | 'upvote' | 'downvote' | 'reward' | 'penalty',
    amount: number,
    spillId?: string,
    metadata?: Record<string, any>
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('tea_transactions')
        .insert({
          wallet_address: walletAddress,
          action,
          amount,
          spill_id: spillId,
          status: 'confirmed',
          metadata: metadata || {}
        })
        .select()
        .single();

      if (error) {
        secureLog.error('Token award failed:', error);
        return false;
      }

      // Update wallet balance
      await this.updateWalletBalance(walletAddress, amount, action);
      
      return true;
    } catch (error) {
      secureLog.error('Token service error:', error);
      return false;
    }
  }

  static async getBalance(walletAddress: string): Promise<WalletBalance | null> {
    try {
      const { data, error } = await supabase
        .from('wallet_balances')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (error && error.code !== 'PGRST116') {
        secureLog.error('Balance fetch failed:', error);
        return null;
      }

      if (!data) return null;

      // Ensure all required properties are present
      return {
        wallet_address: data.wallet_address,
        tea_balance: data.tea_balance,
        total_earned: data.total_earned,
        total_spent: data.total_spent,
        created_at: data.created_at,
        updated_at: data.updated_at,
        last_transaction_at: data.last_transaction_at,
        total_transactions: 0, // Default value
        spills_posted: 0,      // Default value
        tips_given: 0,         // Default value
        rewards_received: 0    // Default value
      };
    } catch (error) {
      secureLog.error('Balance service error:', error);
      return null;
    }
  }

  static async getTransactions(walletAddress: string, limit: number = 50): Promise<TeaTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('tea_transactions')
        .select('*')
        .eq('wallet_address', walletAddress)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        secureLog.error('Transactions fetch failed:', error);
        return [];
      }

      // Transform the data to match TeaTransaction interface
      return (data || []).map(item => ({
        id: item.id.toString(),
        wallet_address: item.wallet_address,
        action: item.action as TeaTransaction['action'],
        amount: item.amount,
        spill_id: item.spill_id,
        status: item.status as 'pending' | 'confirmed' | 'failed',
        metadata: (item.metadata as Record<string, unknown>) || {},
        created_at: item.created_at
      }));
    } catch (error) {
      secureLog.error('Transactions service error:', error);
      return [];
    }
  }

  private static async updateWalletBalance(
    walletAddress: string,
    amount: number,
    action: string
  ): Promise<void> {
    try {
      const { data: existing } = await supabase
        .from('wallet_balances')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (existing) {
        await supabase
          .from('wallet_balances')
          .update({
            tea_balance: existing.tea_balance + amount,
            total_earned: amount > 0 ? existing.total_earned + amount : existing.total_earned,
            total_spent: amount < 0 ? existing.total_spent + Math.abs(amount) : existing.total_spent,
            last_transaction_at: new Date().toISOString()
          })
          .eq('wallet_address', walletAddress);
      } else {
        await supabase
          .from('wallet_balances')
          .insert({
            wallet_address: walletAddress,
            tea_balance: amount,
            total_earned: amount > 0 ? amount : 0,
            total_spent: amount < 0 ? Math.abs(amount) : 0
          });
      }
    } catch (error) {
      secureLog.error('Balance update failed:', error);
    }
  }
}
