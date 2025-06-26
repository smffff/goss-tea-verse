
import { web3CrossChainService } from './web3CrossChainService';

export interface AccessLevel {
  level: 'none' | 'sipper' | 'connoisseur' | 'legend' | 'bribed' | 'submitted';
  hasAccess: boolean;
  teaBalance: number;
  accessMethod: 'wallet' | 'bribe' | 'spill' | 'code' | 'none';
  perks: string[];
}

class AccessControlService {
  // Fun threshold numbers as specified
  private readonly ACCESS_THRESHOLDS = {
    sipper: 69,
    connoisseur: 420,
    legend: 1337
  };

  async checkWalletAccess(address: string): Promise<AccessLevel> {
    try {
      console.log('🔐 Checking wallet access for:', address);
      
      const ogStatus = await web3CrossChainService.getOGStatus(address);
      
      return {
        level: ogStatus.tier,
        hasAccess: ogStatus.isOG,
        teaBalance: ogStatus.balance,
        accessMethod: 'wallet',
        perks: web3CrossChainService.getOGPerks(ogStatus.tier)
      };
    } catch (error) {
      console.error('Failed to check wallet access:', error);
      return this.getNoAccessLevel();
    }
  }

  checkBribeAccess(tipAmount: number): AccessLevel {
    // Any tip gives access
    if (tipAmount > 0) {
      return {
        level: 'bribed',
        hasAccess: true,
        teaBalance: 0,
        accessMethod: 'bribe',
        perks: ['early_access', 'briber_badge', 'dev_love']
      };
    }
    return this.getNoAccessLevel();
  }

  checkSubmissionAccess(hasSubmitted: boolean): AccessLevel {
    if (hasSubmitted) {
      return {
        level: 'submitted',
        hasAccess: true,
        teaBalance: 0,
        accessMethod: 'spill',
        perks: ['early_access', 'gossip_badge', 'insider_status']
      };
    }
    return this.getNoAccessLevel();
  }

  private getNoAccessLevel(): AccessLevel {
    return {
      level: 'none',
      hasAccess: false,
      teaBalance: 0,
      accessMethod: 'none',
      perks: []
    };
  }

  getAccessMessage(accessLevel: AccessLevel): string {
    if (!accessLevel.hasAccess) {
      return "No $TEA? No entry. But we accept bribes, memes, and hot gossip.";
    }

    switch (accessLevel.accessMethod) {
      case 'wallet':
        return `Welcome back, OG ${accessLevel.level.toUpperCase()}! Your ${accessLevel.teaBalance} $TEA speaks volumes. 🫖`;
      case 'bribe':
        return "Bribe accepted! The devs are pleased. Welcome to the chaos. 💸";
      case 'spill':
        return "Your tea was *chef's kiss*. Welcome to the inner circle, gossip lord. ☕";
      case 'code':
        return "Code verified. You're either an insider or really good at guessing. 🔑";
      default:
        return "Access granted through mysterious means. We don't ask questions. 🤫";
    }
  }
}

export const accessControlService = new AccessControlService();
