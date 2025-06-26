
export interface TeaTransaction {
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

export interface WalletBalance {
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

export interface UseTeaTokensReturn {
  balance: WalletBalance | null
  transactions: TeaTransaction[]
  isLoading: boolean
  awardTokens: (walletAddress: string, action: TeaTransaction['action'], amount: number, spillId?: string, metadata?: Record<string, unknown>) => Promise<boolean>
  getBalance: (walletAddress: string) => Promise<void>
  getTransactions: (walletAddress: string, limit?: number) => Promise<void>
  refreshBalance: () => Promise<void>
}
