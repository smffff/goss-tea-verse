
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../integrations/supabase/client'
import { useToast } from './use-toast'

interface TeaTransaction {
  id: number
  wallet_address: string
  action: 'spill' | 'tip' | 'flag' | 'upvote' | 'downvote' | 'reward' | 'penalty'
  amount: number
  spill_id?: string
  recipient_wallet?: string
  transaction_hash?: string
  block_number?: number
  status: 'pending' | 'confirmed' | 'failed'
  metadata?: Record<string, unknown>
  created_at: string
}

interface WalletBalance {
  wallet_address: string
  tea_balance: number
  total_earned: number
  total_spent: number
  last_transaction_at?: string
  total_transactions: number
  spills_posted: number
  tips_given: number
  rewards_received: number
}

interface UseTeaTokensReturn {
  balance: WalletBalance | null
  transactions: TeaTransaction[]
  isLoading: boolean
  awardTokens: (walletAddress: string, action: TeaTransaction['action'], amount: number, spillId?: string, metadata?: Record<string, unknown>) => Promise<boolean>
  getBalance: (walletAddress: string) => Promise<void>
  getTransactions: (walletAddress: string, limit?: number) => Promise<void>
  refreshBalance: () => Promise<void>
}

export function useTeaTokens(walletAddress?: string): UseTeaTokensReturn {
  const [balance, setBalance] = useState<WalletBalance | null>(null)
  const [transactions, setTransactions] = useState<TeaTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getBalance = useCallback(async (address: string): Promise<void> => {
    if (!address) return

    try {
      // Get wallet balance
      const { data: balanceData, error: balanceError } = await supabase
        .from('wallet_balances')
        .select('*')
        .eq('wallet_address', address)
        .single()

      if (balanceError && balanceError.code !== 'PGRST116') {
        console.error('Error fetching balance:', balanceError)
        toast({
          title: "Balance Error",
          description: "Failed to fetch wallet balance",
          variant: "destructive"
        })
        return
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

      const balanceRecord: WalletBalance = {
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

      setBalance(balanceRecord)
    } catch (error: unknown) {
      console.error('Error fetching balance:', error)
    }
  }, [toast])

  const getTransactions = useCallback(async (address: string, limit: number = 20): Promise<void> => {
    if (!address) return

    try {
      const { data, error } = await supabase
        .from('tea_transactions')
        .select('*')
        .eq('wallet_address', address)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching transactions:', error)
        toast({
          title: "Transaction Error",
          description: "Failed to fetch transaction history",
          variant: "destructive"
        })
        return
      }

      // Map to TeaTransaction format
      const mappedTransactions: TeaTransaction[] = (data || []).map(t => ({
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

      setTransactions(mappedTransactions)
    } catch (error: unknown) {
      console.error('Error fetching transactions:', error)
    }
  }, [toast])

  const awardTokens = useCallback(async (
    walletAddress: string,
    action: TeaTransaction['action'],
    amount: number,
    spillId?: string,
    metadata?: Record<string, unknown>
  ): Promise<boolean> => {
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
        toast({
          title: "Token Award Failed",
          description: "Failed to award tokens. Please try again.",
          variant: "destructive"
        })
        return false
      }

      const result = data as any
      if (!result?.success) {
        console.error('Token award failed:', result?.error)
        toast({
          title: "Token Award Failed",
          description: result?.error || "Unknown error occurred",
          variant: "destructive"
        })
        return false
      }

      // Update local balance if we have one
      if (balance && balance.wallet_address === walletAddress) {
        setBalance(prev => prev ? {
          ...prev,
          tea_balance: result.new_balance,
          total_earned: prev.total_earned + (amount > 0 ? amount : 0),
          total_spent: prev.total_spent + (amount < 0 ? Math.abs(amount) : 0),
          last_transaction_at: new Date().toISOString()
        } : null)
      }

      // Add to transactions
      const newTransaction: TeaTransaction = {
        id: result.transaction_id,
        wallet_address: walletAddress,
        action,
        amount,
        spill_id: spillId,
        status: 'confirmed',
        metadata: metadata || {},
        created_at: new Date().toISOString()
      }

      setTransactions(prev => [newTransaction, ...prev])

      toast({
        title: "Tokens Awarded! 💎",
        description: `You earned ${amount} $TEA tokens for ${action}!`,
        variant: "default"
      })

      return true
    } catch (error: unknown) {
      console.error('Error awarding tokens:', error)
      toast({
        title: "Token Award Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
      return false
    }
  }, [balance, toast])

  const refreshBalance = useCallback(async () => {
    if (walletAddress) {
      await Promise.all([
        getBalance(walletAddress),
        getTransactions(walletAddress)
      ])
    }
  }, [walletAddress, getBalance, getTransactions])

  // Load initial data
  useEffect(() => {
    if (walletAddress) {
      setIsLoading(true)
      Promise.all([
        getBalance(walletAddress),
        getTransactions(walletAddress)
      ]).finally(() => setIsLoading(false))
    }
  }, [walletAddress, getBalance, getTransactions])

  return {
    balance,
    transactions,
    isLoading,
    awardTokens,
    getBalance,
    getTransactions,
    refreshBalance
  }
}
