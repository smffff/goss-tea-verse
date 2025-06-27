import { useState, useEffect, useCallback } from 'react'
import { useToast } from './use-toast'
import { TeaTokenService } from '../services/teaTokenService'
import type { TeaTransaction, WalletBalance, UseTeaTokensReturn } from '../types/teaTokens'
import { secureLog } from '@/utils/secureLogging'

export const useTeaTokens = (walletAddress?: string): UseTeaTokensReturn => {
  const [balance, setBalance] = useState<WalletBalance | null>(null)
  const [transactions, setTransactions] = useState<TeaTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const getBalance = useCallback(async (address: string): Promise<void> => {
    if (!address) {
      setBalance(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const balanceData = await TeaTokenService.getWalletBalance(address)
      setBalance(balanceData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch balance'
      setError(errorMessage)
      secureLog.error('Failed to fetch tea token balance:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getTransactions = useCallback(async (address: string, limit: number = 20): Promise<void> => {
    try {
      const mappedTransactions = await TeaTokenService.getTransactions(address, limit)
      setTransactions(mappedTransactions)
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") {
        secureLog.error('Error fetching transactions:', error)
      }
      toast({
        title: "Transaction Error",
        description: "Failed to fetch transaction history",
        variant: "destructive"
      })
    }
  }, [toast])

  const awardTokens = useCallback(async (
    walletAddress: string,
    action: TeaTransaction['action'],
    amount: number,
    spillId?: string,
    metadata?: Record<string, unknown>
  ): Promise<boolean> => {
    const result = await TeaTokenService.awardTokens(walletAddress, action, amount, spillId, metadata)
    
    if (!result.success) {
      toast({
        title: "Token Award Failed",
        description: result.error || "Failed to award tokens. Please try again.",
        variant: "destructive"
      })
      return false
    }

    // Update local balance if we have one
    if (balance && balance.wallet_address === walletAddress) {
      setBalance(prev => prev ? {
        ...prev,
        tea_balance: result.data.new_balance,
        total_earned: prev.total_earned + (amount > 0 ? amount : 0),
        total_spent: prev.total_spent + (amount < 0 ? Math.abs(amount) : 0),
        last_transaction_at: new Date().toISOString()
      } : null)
    }

    // Add to transactions
    const newTransaction: TeaTransaction = {
      id: result.data.transaction_id,
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
  }, [balance, toast])

  const refreshBalance = useCallback(() => {
    getBalance(walletAddress)
  }, [walletAddress, getBalance])

  // Initial load
  useEffect(() => {
    getBalance(walletAddress)
  }, [walletAddress, getBalance])

  // Set up real-time updates using polling (every 30 seconds)
  useEffect(() => {
    if (!walletAddress) return

    const interval = setInterval(() => {
      getBalance(walletAddress)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [walletAddress, getBalance])

  // Manual refresh function
  const forceRefresh = useCallback(() => {
    getBalance(walletAddress)
  }, [walletAddress, getBalance])

  return {
    balance,
    transactions,
    isLoading,
    error,
    awardTokens,
    getBalance,
    getTransactions,
    refreshBalance: forceRefresh,
    refetch: getBalance
  }
}
