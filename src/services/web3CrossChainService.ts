
import { SUPPORTED_CHAINS, OG_TIERS } from '@/config/chainConfig';
import { OGStatus, CrossChainUser } from '@/types/crossChain';

class Web3CrossChainService {
  private readonly ACCESS_THRESHOLDS = {
    sipper: 69,
    connoisseur: 420,
    legend: 1337
  };

  // Check Avalanche $TEA balance using Web3
  async checkAvalancheBalance(address: string): Promise<number> {
    try {
      console.log('🔍 Checking Avalanche $TEA balance for:', address);
      
      if (!window.ethereum) {
        console.warn('No ethereum provider found');
        return 0;
      }

      // For demo purposes, generate a realistic mock balance
      // In production, this would call the actual token contract
      const mockBalance = this.generateRealisticBalance(address);
      
      console.log('💰 Balance found:', mockBalance);
      return mockBalance;
      
    } catch (error) {
      console.error('Failed to check Avalanche balance:', error);
      return 0;
    }
  }

  // Generate realistic balance based on address for demo
  private generateRealisticBalance(address: string): number {
    // Use address hash to generate consistent "balance" for demo
    const hash = address.toLowerCase().slice(2, 10);
    const seed = parseInt(hash, 16) % 10000;
    
    // Create realistic distribution
    if (seed < 50) return Math.floor(Math.random() * 5000) + 2000; // 0.5% are legends
    if (seed < 200) return Math.floor(Math.random() * 1000) + 500; // 1.5% are connoisseurs  
    if (seed < 1000) return Math.floor(Math.random() * 300) + 100; // 8% are sippers
    return Math.floor(Math.random() * 50); // 90% have low/no balance
  }

  // Determine OG tier based on balance
  determineOGTier(balance: number): OGStatus['tier'] {
    if (balance >= this.ACCESS_THRESHOLDS.legend) return 'legend';
    if (balance >= this.ACCESS_THRESHOLDS.connoisseur) return 'connoisseur';
    if (balance >= this.ACCESS_THRESHOLDS.sipper) return 'sipper';
    return 'none';
  }

  // Get complete OG status
  async getOGStatus(address: string): Promise<OGStatus> {
    const avalancheBalance = await this.checkAvalancheBalance(address);
    const tier = this.determineOGTier(avalancheBalance);
    
    return {
      isOG: tier !== 'none',
      tier,
      balance: avalancheBalance,
      eligibleForAirdrop: avalancheBalance >= this.ACCESS_THRESHOLDS.sipper,
      chainData: {
        avalanche: {
          balance: avalancheBalance,
          lastChecked: new Date().toISOString()
        }
      }
    };
  }

  // Get OG tier perks
  getOGPerks(tier: OGStatus['tier']): string[] {
    if (tier === 'none') return [];
    
    const perks = {
      sipper: ['early_access', 'basic_features'],
      connoisseur: ['early_access', 'priority_support', 'exclusive_content'],
      legend: ['early_access', 'priority_support', 'exclusive_content', 'governance_voting', 'vip_features']
    };
    
    return perks[tier] || [];
  }

  // Create shareable OG status
  createOGShareLink(ogStatus: OGStatus): string {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      og: 'true',
      tier: ogStatus.tier,
      balance: ogStatus.balance.toString(),
      source: 'og_share'
    });
    return `${baseUrl}?${params.toString()}`;
  }

  // Check wallet connection and switch to Avalanche if needed
  async ensureAvalancheNetwork(): Promise<boolean> {
    if (!window.ethereum) {
      throw new Error('No wallet found');
    }

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const avalancheChainId = '0xa86a'; // 43114 in hex
      
      if (chainId === avalancheChainId) {
        return true;
      }

      // Try to switch to Avalanche
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: avalancheChainId }],
      });
      
      return true;
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask, add it
      if (error.code === 4902) {
        await this.addAvalancheNetwork();
        return true;
      }
      throw error;
    }
  }

  private async addAvalancheNetwork(): Promise<void> {
    if (!window.ethereum) {
      throw new Error('No wallet found');
    }

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0xa86a',
          chainName: 'Avalanche Network',
          nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18,
          },
          rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://snowtrace.io/'],
        },
      ],
    });
  }
}

export const web3CrossChainService = new Web3CrossChainService();
