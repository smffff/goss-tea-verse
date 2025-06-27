import { SUPPORTED_CHAINS, OG_TIERS } from '@/config/chainConfig';
import { OGStatus, CrossChainUser } from '@/types/crossChain';

class CrossChainService {
  // Check Avalanche $TEA balance for OG status
  async checkAvalancheBalance(address: string): Promise<number> {
    try {
      // Mock implementation - replace with actual token contract call
      if (process.env.NODE_ENV === "development") {
        console.info('🔍 Checking Avalanche $TEA balance for:', address);
      }
      
      // Simulate API call to check token balance
      const mockBalance = Math.floor(Math.random() * 15000); // Mock for demo
      
      // In production, use Web3 provider to call token contract:
      // const provider = new ethers.providers.JsonRpcProvider(SUPPORTED_CHAINS.avalanche.rpcUrl);
      // const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      // const balance = await tokenContract.balanceOf(address);
      
      return mockBalance;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error('Failed to check Avalanche balance:', error);
      }
      return 0;
    }
  }

  // Determine OG tier based on balance
  determineOGTier(balance: number): OGStatus['tier'] {
    if (balance >= OG_TIERS.legend.minBalance) return 'legend';
    if (balance >= OG_TIERS.connoisseur.minBalance) return 'connoisseur';
    if (balance >= OG_TIERS.sipper.minBalance) return 'sipper';
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
      eligibleForAirdrop: avalancheBalance >= OG_TIERS.sipper.minBalance,
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
    return OG_TIERS[tier].perks;
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
}

export const crossChainService = new CrossChainService();
