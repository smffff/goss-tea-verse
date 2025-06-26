
import { supabase } from '../integrations/supabase/client'
import type { TeaTransaction, WalletBalance } from '../types/teaTokens'

export class TeaTokenService {
  static async getWalletBalance(address: string): Promise<WalletBalance | null> {
    if (!address) return null

    try {
      // Get wallet balance
      const { data: balanceData, error: balanceError } = await supabase
        .from('wallet_balances')
        .select('*')
        .eq('wallet_address', address)
        .single()

      if (balanceError && balanceError.code !== 'PGRST116') {
        console.error('Error fetching balance:', balanceError)
        throw balanceError
      }

      // Get transaction stats
      const { data: transactionData, error: transactionError } = await supabase
        .from('tea_transactions')
        .select('action, amount')
        .eq('wallet_address', address)

      if (transactionError) {
        console.error('Error fetching transaction stats:', transactionError)
      }

      // Calculate stats
      const totalTransactions = transactionData?.length || 0
      const spillsPosted = transactionData?.filter(t => t.action === 'spill').length || 0
      const tipsGiven = transactionData?.filter(t => t.action === 'tip' && t.amount < 0).length || 0
      const rewardsReceived = transactionData?.filter(t => t.action === 'reward').length || 0

      return {
        wallet_address: address,
        tea_balance: balanceData?.tea_balance || 0,
        total_earned: balanceData?.total_earned || 0,
        total_spent: balanceData?.total_spent || 0,
        last_transaction_at: balanceData?.last_transaction_at,
        total_transactions: totalTransactions,
        spills_posted: spillsPosted,
        tips_given: tipsGiven,
        rewards_received: rewardsReceived
      }
    } catch (error: unknown) {
      console.error('Error fetching balance:', error)
      throw error
    }
  }

  static async getTransactions(address: string, limit: number = 20): Promise<TeaTransaction[]> {
    if (!address) return []

    try {
      const { data, error } = await supabase
        .from('tea_transactions')
        .select('*')
        .eq('wallet_address', address)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching transactions:', error)
        throw error
      }

      // Map to TeaTransaction format
      return (data || []).map(t => ({
        id: parseInt(t.id.toString()),
        wallet_address: address,
        action: t.action as TeaTransaction['action'],
        amount: t.amount,
        spill_id: t.spill_id,
        recipient_wallet: t.recipient_wallet,
        transaction_hash: t.transaction_hash,
        block_number: t.block_number,
        status: t.status as TeaTransaction['status'],
        metadata: (t.metadata && typeof t.metadata === 'object') ? t.metadata as Record<string, unknown> : {},
        created_at: t.created_at
      }))
    } catch (error: unknown) {
      console.error('Error fetching transactions:', error)
      throw error
    }
  }

  static async awardTokens(
    walletAddress: string,
    action: TeaTransaction['action'],
    amount: number,
    spillId?: string,
    metadata?: Record<string, unknown>
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Call the database function to award tokens
      const { data, error } = await supabase.rpc('award_tea_tokens', {
        p_wallet_address: walletAddress,
        p_action: action,
        p_amount: amount,
        p_spill_id: spillId,
        p_metadata: metadata || {}
      })

      if (error) {
        console.error('Error awarding tokens:', error)
        return { success: false, error: error.message }
      }

      const result = data as any
      if (!result?.success) {
        console.error('Token award failed:', result?.error)
        return { success: false, error: result?.error || 'Unknown error occurred' }
      }

      return { success: true, data: result }
    } catch (error: unknown) {
      console.error('Error awarding tokens:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }
}
