
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
      // Use tea_points_transactions to calculate balance
      const { data, error } = await supabase
        .from('tea_points_transactions')
        .select('*')
        .eq('anonymous_token', address)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching balance:', error)
        toast({
          title: "Balance Error",
          description: "Failed to fetch wallet balance",
          variant: "destructive"
        })
        return
      }

      // Calculate balance from transactions
      const totalEarned = data?.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0) || 0
      const totalSpent = data?.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0) || 0
      const teaBalance = totalEarned - totalSpent

      const balanceData: WalletBalance = {
        wallet_address: address,
        tea_balance: teaBalance,
        total_earned: totalEarned,
        total_spent: totalSpent,
        total_transactions: data?.length || 0,
        spills_posted: data?.filter(t => t.transaction_type === 'spill').length || 0,
        tips_given: data?.filter(t => t.transaction_type === 'tip' && t.amount < 0).length || 0,
        rewards_received: data?.filter(t => t.transaction_type === 'reward').length || 0,
        last_transaction_at: data?.[0]?.created_at
      }

      setBalance(balanceData)
    } catch (error: unknown) {
      console.error('Error fetching balance:', error)
    }
  }, [toast])

  const getTransactions = useCallback(async (address: string, limit: number = 20): Promise<void> => {
    if (!address) return

    try {
      const { data, error } = await supabase
        .from('tea_points_transactions')
        .select('*')
        .eq('anonymous_token', address)
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

      // Map tea_points_transactions to TeaTransaction format
      const mappedTransactions: TeaTransaction[] = (data || []).map(t => ({
        id: parseInt(t.id),
        wallet_address: address,
        action: t.transaction_type as TeaTransaction['action'],
        amount: t.amount,
        status: 'confirmed' as const,
        metadata: t.metadata || {},
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
      // Use tea_points_transactions table directly
      const { data, error } = await supabase
        .from('tea_points_transactions')
        .insert({
          anonymous_token: walletAddress,
          transaction_type: action,
          amount: amount,
          description: `${action} reward`,
          metadata: {
            ...metadata,
            spill_id: spillId
          }
        })
        .select()
        .single()

      if (error) {
        console.error('Error awarding tokens:', error)
        toast({
          title: "Token Award Failed",
          description: "Failed to award tokens. Please try again.",
          variant: "destructive"
        })
        return false
      }

      // Update local balance
      if (balance) {
        setBalance(prev => prev ? {
          ...prev,
          tea_balance: prev.tea_balance + amount,
          total_earned: prev.total_earned + (amount > 0 ? amount : 0),
          total_spent: prev.total_spent + (amount < 0 ? Math.abs(amount) : 0),
          last_transaction_at: new Date().toISOString()
        } : null)
      }

      // Add to transactions
      const newTransaction: TeaTransaction = {
        id: parseInt(data.id),
        wallet_address: walletAddress,
        action,
        amount,
        status: 'confirmed',
        metadata: metadata || {},
        created_at: data.created_at
      }

      setTransactions(prev => [newTransaction, ...prev])

      toast({
        title: "Tokens Awarded!",
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
      await getBalance(walletAddress)
      await getTransactions(walletAddress)
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
