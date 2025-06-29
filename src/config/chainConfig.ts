import { ChainConfig } from '@/types/crossChain';

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  avalanche: {
    id: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://snowtrace.io',
    tokenAddress: '0x32ae402ce8a388a3f27a8668ad33bcf4cab4fadb', // $TEA token on AVAX
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
  sipper: { minBalance: 69, maxBalance: 419, perks: ['og_badge', 'early_access'] },
  connoisseur: { minBalance: 420, maxBalance: 1336, perks: ['og_badge', 'early_access', 'exclusive_content', 'priority_support'] },
  legend: { minBalance: 1337, maxBalance: Infinity, perks: ['og_badge', 'early_access', 'exclusive_content', 'priority_support', 'governance_power', 'custom_badge'] }
};
