
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';
import type { TeaTransaction, WalletBalance } from '@/types/teaTokens';

export class TeaTokenService {
  static async awardTokens(
    walletAddress: string,
    action: 'spill' | 'tip' | 'flag' | 'upvote' | 'downvote' | 'reward' | 'penalty',
    amount: number,
    spillId?: string,
    metadata?: Record<string, unknown>
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
          metadata
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

      return data || null;
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

      return data || [];
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
            total_transactions: existing.total_transactions + 1,
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
            total_spent: amount < 0 ? Math.abs(amount) : 0,
            total_transactions: 1
          });
      }
    } catch (error) {
      secureLog.error('Balance update failed:', error);
    }
  }
}
