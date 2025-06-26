
export interface ChainConfig {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  tokenAddress?: string;
}

export interface OGStatus {
  isOG: boolean;
  tier: 'none' | 'sipper' | 'connoisseur' | 'legend';
  balance: number;
  eligibleForAirdrop: boolean;
  chainData: {
    avalanche: {
      balance: number;
      lastChecked: string;
    };
    solana?: {
      balance: number;
      lastChecked: string;
    };
  };
}

export interface CrossChainUser {
  avalancheAddress?: string;
  solanaAddress?: string;
  ogStatus: OGStatus;
  migrationStatus: 'not_started' | 'pending' | 'completed';
  airdropClaimed: boolean;
}
