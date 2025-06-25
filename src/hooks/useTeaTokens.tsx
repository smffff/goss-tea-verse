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
  metadata?: Record<string, any>
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
  awardTokens: (walletAddress: string, action: string, amount: number, spillId?: string, metadata?: Record<string, any>) => Promise<boolean>
  getBalance: (walletAddress: string) => Promise<void>
  getTransactions: (walletAddress: string, limit?: number) => Promise<void>
  refreshBalance: () => Promise<void>
}

export function useTeaTokens(walletAddress?: string): UseTeaTokensReturn {
  const [balance, setBalance] = useState<WalletBalance | null>(null)
  const [transactions, setTransactions] = useState<TeaTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getBalance = useCallback(async (address: string) => {
    if (!address) return

    try {
      const { data, error } = await supabase
        .from('wallet_balance_summary')
        .select('*')
        .eq('wallet_address', address)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No balance found, create one
          setBalance({
            wallet_address: address,
            tea_balance: 0,
            total_earned: 0,
            total_spent: 0,
            total_transactions: 0,
            spills_posted: 0,
            tips_given: 0,
            rewards_received: 0
          })
        } else {
          console.error('Error fetching balance:', error)
          toast({
            title: "Balance Error",
            description: "Failed to fetch wallet balance",
            variant: "destructive"
          })
        }
      } else {
        setBalance(data)
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }, [toast])

  const getTransactions = useCallback(async (address: string, limit: number = 20) => {
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
      } else {
        setTransactions(data || [])
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }, [toast])

  const awardTokens = useCallback(async (
    walletAddress: string,
    action: string,
    amount: number,
    spillId?: string,
    metadata?: Record<string, any>
  ): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('award_tea_tokens', {
        p_wallet_address: walletAddress,
        p_action: action,
        p_amount: amount,
        p_spill_id: spillId,
        p_metadata: metadata
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

      if (data.success) {
        // Update local balance
        if (balance) {
          setBalance(prev => prev ? {
            ...prev,
            tea_balance: data.new_balance,
            total_earned: prev.total_earned + (amount > 0 ? amount : 0),
            total_spent: prev.total_spent + (amount < 0 ? Math.abs(amount) : 0),
            last_transaction_at: new Date().toISOString()
          } : null)
        }

        // Add to transactions
        const newTransaction: TeaTransaction = {
          id: data.transaction_id,
          wallet_address: walletAddress,
          action: action as any,
          amount,
          spill_id: spillId,
          status: 'confirmed',
          metadata,
          created_at: new Date().toISOString()
        }

        setTransactions(prev => [newTransaction, ...prev])

        toast({
          title: "Tokens Awarded!",
          description: `You earned ${amount} $TEA tokens for ${action}!`,
          variant: "default"
        })

        return true
      } else {
        toast({
          title: "Token Award Failed",
          description: data.error || "Failed to award tokens",
          variant: "destructive"
        })
        return false
      }
    } catch (error) {
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