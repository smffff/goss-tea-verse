
export interface WalletBalance {
  wallet_address: string;
  tea_balance: number;
  total_earned: number;
  total_spent: number;
  total_transactions: number;
  spills_posted: number;
  tips_given: number;
  rewards_received: number;
  created_at: string;
  updated_at: string;
  last_transaction_at: string | null;
}

export interface TeaTransaction {
  id: string;
  wallet_address: string;
  action: 'spill' | 'tip' | 'flag' | 'upvote' | 'downvote' | 'reward' | 'penalty';
  amount: number;
  spill_id?: string;
  status: 'pending' | 'confirmed' | 'failed';
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface UseTeaTokensReturn {
  balance: WalletBalance | null;
  transactions: TeaTransaction[];
  isLoading: boolean;
  error: string | null;
  awardTokens: (
    walletAddress: string,
    action: TeaTransaction['action'],
    amount: number,
    spillId?: string,
    metadata?: Record<string, unknown>
  ) => Promise<boolean>;
  getBalance: (address: string) => Promise<void>;
  getTransactions: (address: string, limit?: number) => Promise<void>;
  refreshBalance: () => void;
  refetch: (address?: string) => Promise<void>;
}
