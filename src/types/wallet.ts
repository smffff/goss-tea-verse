
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  network: 'ethereum' | 'avalanche' | null;
  balance: {
    eth: string;
    avax: string;
    tea: string;
    soap: string;
  };
}

export interface TokenBalance {
  formatted: string;
  raw: string;
  decimals: number;
}

export interface EarlyAccessStatus {
  hasAccess: boolean;
  accessType: 'tea_holder' | 'tipper' | 'manual' | 'none';
  requiredAmount: number;
  currentAmount: number;
}
