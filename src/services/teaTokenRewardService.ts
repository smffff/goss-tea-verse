import { TeaTokenService } from './teaTokenService';
import { secureLog } from '@/utils/secureLog';

export type TokenAction = 'spill' | 'reward' | 'transfer' | 'tip';

export interface TokenRewardConfig {
  action: TokenAction;
  baseAmount: number;
  bonusMultiplier?: number;
  maxPerDay?: number;
  description: string;
}

export const TOKEN_REWARDS: Record<string, TokenRewardConfig> = {
  spill_tea: {
    action: 'spill',
    baseAmount: 5,
    bonusMultiplier: 1.5,
    maxPerDay: 50,
    description: 'Spilling quality tea'
  },
  hot_reaction: {
    action: 'reward',
    baseAmount: 1,
    maxPerDay: 20,
    description: 'Hot reaction given'
  },
  cold_reaction: {
    action: 'reward',
    baseAmount: 1,
    maxPerDay: 20,
    description: 'Cold reaction given'
  },
  spicy_reaction: {
    action: 'reward',
    baseAmount: 2,
    maxPerDay: 20,
    description: 'Spicy reaction given'
  },
  daily_login: {
    action: 'reward',
    baseAmount: 3,
    maxPerDay: 3,
    description: 'Daily login bonus'
  },
  quality_spill: {
    action: 'reward',
    baseAmount: 10,
    maxPerDay: 100,
    description: 'High-quality tea spill'
  },
  viral_spill: {
    action: 'reward',
    baseAmount: 25,
    maxPerDay: 200,
    description: 'Viral tea spill'
  }
};

export class TeaTokenRewardService {
  static async awardSpillReward(
    walletAddress: string,
    spillId: string,
    contentLength: number,
    hasEvidence: boolean = false
  ): Promise<{ success: boolean; amount: number; message: string }> {
    try {
      const baseConfig = TOKEN_REWARDS.spill_tea;
      let amount = baseConfig.baseAmount;

      // Bonus for longer content
      if (contentLength > 200) {
        amount += 2;
      }
      if (contentLength > 400) {
        amount += 3;
      }

      // Bonus for evidence
      if (hasEvidence) {
        amount += 3;
      }

      const result = await TeaTokenService.awardTokens(
        walletAddress,
        baseConfig.action,
        amount,
        spillId,
        {
          content_length: contentLength,
          has_evidence: hasEvidence,
          reward_type: 'spill_tea'
        }
      );

      if (result.success) {
        return {
          success: true,
          amount,
          message: `+${amount} $TEA for spilling tea!`
        };
      } else {
        throw new Error(result.error || 'Failed to award tokens');
      }
    } catch (error) {
      secureLog.error('Failed to award spill reward:', error);
      return {
        success: false,
        amount: 0,
        message: 'Failed to award tokens'
      };
    }
  }

  static async awardReactionReward(
    walletAddress: string,
    reactionType: 'hot' | 'cold' | 'spicy',
    spillId: string
  ): Promise<{ success: boolean; amount: number; message: string }> {
    try {
      const configKey = `${reactionType}_reaction`;
      const config = TOKEN_REWARDS[configKey];
      
      if (!config) {
        throw new Error(`Unknown reaction type: ${reactionType}`);
      }

      const result = await TeaTokenService.awardTokens(
        walletAddress,
        config.action,
        config.baseAmount,
        spillId,
        {
          reaction_type: reactionType,
          reward_type: 'reaction'
        }
      );

      if (result.success) {
        const emoji = reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️';
        return {
          success: true,
          amount: config.baseAmount,
          message: `${emoji} +${config.baseAmount} $TEA for ${reactionType} reaction!`
        };
      } else {
        throw new Error(result.error || 'Failed to award tokens');
      }
    } catch (error) {
      secureLog.error('Failed to award reaction reward:', error);
      return {
        success: false,
        amount: 0,
        message: 'Failed to award tokens'
      };
    }
  }

  static async awardDailyLoginReward(walletAddress: string): Promise<{ success: boolean; amount: number; message: string }> {
    try {
      const config = TOKEN_REWARDS.daily_login;
      
      const result = await TeaTokenService.awardTokens(
        walletAddress,
        config.action,
        config.baseAmount,
        undefined,
        {
          reward_type: 'daily_login',
          date: new Date().toISOString().split('T')[0]
        }
      );

      if (result.success) {
        return {
          success: true,
          amount: config.baseAmount,
          message: `☕ +${config.baseAmount} $TEA daily login bonus!`
        };
      } else {
        throw new Error(result.error || 'Failed to award tokens');
      }
    } catch (error) {
      secureLog.error('Failed to award daily login reward:', error);
      return {
        success: false,
        amount: 0,
        message: 'Failed to award tokens'
      };
    }
  }

  static async awardQualitySpillReward(
    walletAddress: string,
    spillId: string,
    qualityScore: number
  ): Promise<{ success: boolean; amount: number; message: string }> {
    try {
      const config = TOKEN_REWARDS.quality_spill;
      let amount = config.baseAmount;

      // Bonus based on quality score (0-100)
      if (qualityScore > 80) {
        amount += 15;
      } else if (qualityScore > 60) {
        amount += 10;
      }

      const result = await TeaTokenService.awardTokens(
        walletAddress,
        config.action,
        amount,
        spillId,
        {
          quality_score: qualityScore,
          reward_type: 'quality_spill'
        }
      );

      if (result.success) {
        return {
          success: true,
          amount,
          message: `🏆 +${amount} $TEA for quality tea!`
        };
      } else {
        throw new Error(result.error || 'Failed to award tokens');
      }
    } catch (error) {
      secureLog.error('Failed to award quality spill reward:', error);
      return {
        success: false,
        amount: 0,
        message: 'Failed to award tokens'
      };
    }
  }
} 