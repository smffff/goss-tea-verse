
import { useState, useEffect, useCallback } from 'react'
import { useToast } from './use-toast'
import { TeaTokenService } from '../services/teaTokenService'
import type { TeaTransaction, WalletBalance, UseTeaTokensReturn } from '../types/teaTokens'
import { secureLog } from '@/utils/secureLogging'

export function useTeaTokens(walletAddress?: string): UseTeaTokensReturn {
  const [balance, setBalance] = useState<WalletBalance | null>(null)
  const [transactions, setTransactions] = useState<TeaTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getBalance = useCallback(async (address: string): Promise<void> => {
    try {
      const balanceRecord = await TeaTokenService.getWalletBalance(address)
      setBalance(balanceRecord)
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development") {
        secureLog.error('Error fetching balance:', error)
      }
      toast({
        title: "Balance Error",
        description: "Failed to fetch wallet balance",
        variant: "destructive"
      })
    }
  }, [toast])

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
