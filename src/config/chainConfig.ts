
import { ChainConfig } from '@/types/crossChain';

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  avalanche: {
    id: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://snowtrace.io',
    tokenAddress: '0x...', // Replace with actual $TEA token address
  },
  avalanche_testnet: {
    id: 43113,
    name: 'Avalanche Fuji',
    symbol: 'AVAX',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    blockExplorer: 'https://testnet.snowtrace.io',
    tokenAddress: '0x...', // Replace with testnet token address
  },
  solana: {
    id: 101,
    name: 'Solana',
    symbol: 'SOL',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    blockExplorer: 'https://explorer.solana.com',
  },
  solana_devnet: {
    id: 103,
    name: 'Solana Devnet',
    symbol: 'SOL',
    rpcUrl: 'https://api.devnet.solana.com',
    blockExplorer: 'https://explorer.solana.com/?cluster=devnet',
  }
};

export const OG_TIERS = {
  sipper: { minBalance: 100, maxBalance: 999, perks: ['og_badge', 'early_access'] },
  connoisseur: { minBalance: 1000, maxBalance: 9999, perks: ['og_badge', 'early_access', 'exclusive_content', 'priority_support'] },
  legend: { minBalance: 10000, maxBalance: Infinity, perks: ['og_badge', 'early_access', 'exclusive_content', 'priority_support', 'governance_power', 'custom_badge'] }
};
