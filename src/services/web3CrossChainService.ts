
import { SUPPORTED_CHAINS, OG_TIERS } from '@/config/chainConfig';
import { OGStatus, CrossChainUser } from '@/types/crossChain';
import { adminConfigService } from './adminConfigService';

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
      
      // Check for admin override
      const adminBalance = adminConfigService.getMockTokenBalance();
      if (adminBalance !== null) {
        console.log('🔧 Using admin mock balance:', adminBalance);
        return adminBalance;
      }

      if (!window.ethereum) {
        console.warn('No ethereum provider found');
        return 0;
      }

      // For demo purposes, generate a realistic mock balance
      // In production, this would call the actual token contract
      const demoBalance = this.generateRealisticBalance(address);
      
      console.log('💰 Balance found:', demoBalance);
      return demoBalance;
      
    } catch (error) {
      console.error('Failed to check Avalanche balance:', error);
      return 0;
    }
  }

  // Check Solana $TEA balance for Phantom wallet
  async checkSolanaBalance(address: string): Promise<number> {
    try {
      console.log('🔍 Checking Solana $TEA balance for:', address);
      
      // Check for admin override
      const adminBalance = adminConfigService.getMockTokenBalance();
      if (adminBalance !== null) {
        console.log('🔧 Using admin mock balance:', adminBalance);
        return adminBalance;
      }

      // For demo purposes, generate a realistic mock balance
      // In production, this would call the actual SPL token program
      const demoBalance = this.generateRealisticBalance(address);
      
      console.log('💰 Solana balance found:', demoBalance);
      return demoBalance;
      
    } catch (error) {
      console.error('Failed to check Solana balance:', error);
      return 0;
    }
  }

  // Generate realistic balance based on address for demo
  private generateRealisticBalance(address: string): number {
    // Use address hash to generate consistent "balance" for demo
    const hash = address.toLowerCase().slice(2, 10);
    const seed = parseInt(hash, 16) % 10000;
    
    // Create realistic distribution with fun numbers
    if (seed < 50) return Math.floor(Math.random() * 5000) + 2000; // 0.5% are legends (1337+)
    if (seed < 200) return Math.floor(Math.random() * 917) + 420; // 1.5% are connoisseurs (420-1336)
    if (seed < 1000) return Math.floor(Math.random() * 351) + 69; // 8% are sippers (69-419)
    return Math.floor(Math.random() * 69); // 90% have low/no balance
  }

  // Determine OG tier based on balance
  determineOGTier(balance: number): OGStatus['tier'] {
    // Admin override
    if (adminConfigService.shouldForceOGAccess()) {
      return 'legend';
    }

    if (balance >= this.ACCESS_THRESHOLDS.legend) return 'legend';
    if (balance >= this.ACCESS_THRESHOLDS.connoisseur) return 'connoisseur';
    if (balance >= this.ACCESS_THRESHOLDS.sipper) return 'sipper';
    return 'none';
  }

  // Get complete OG status
  async getOGStatus(address: string, chain: 'avalanche' | 'solana' = 'avalanche'): Promise<OGStatus> {
    const balance = chain === 'solana' 
      ? await this.checkSolanaBalance(address)
      : await this.checkAvalancheBalance(address);
    
    const tier = this.determineOGTier(balance);
    
    // Ensure chainData always includes avalanche property
    const chainData: OGStatus['chainData'] = {
      avalanche: {
        balance: chain === 'avalanche' ? balance : 0,
        lastChecked: new Date().toISOString()
      }
    };

    // Add solana data if that's the chain being checked
    if (chain === 'solana') {
      chainData.solana = {
        balance,
        lastChecked: new Date().toISOString()
      };
    }
    
    return {
      isOG: tier !== 'none' || adminConfigService.shouldForceOGAccess(),
      tier,
      balance,
      eligibleForAirdrop: balance >= this.ACCESS_THRESHOLDS.sipper || adminConfigService.shouldForceOGAccess(),
      chainData
    };
  }

  // Get OG tier perks
  getOGPerks(tier: OGStatus['tier']): string[] {
    if (tier === 'none' && !adminConfigService.shouldForceOGAccess()) return [];
    
    const perks = {
      sipper: ['early_access', 'basic_features'],
      connoisseur: ['early_access', 'priority_support', 'exclusive_content'],
      legend: ['early_access', 'priority_support', 'exclusive_content', 'governance_voting', 'vip_features']
    };
    
    return perks[tier] || perks.legend; // Default to legend perks for admin users
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

  // Connect to Phantom wallet for Solana
  async connectPhantom(): Promise<string | null> {
    try {
      if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
        await window.solana.connect();
        return window.solana.publicKey.toString();
      } else {
        throw new Error('Phantom wallet not found');
      }
    } catch (error) {
      console.error('Failed to connect Phantom wallet:', error);
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
