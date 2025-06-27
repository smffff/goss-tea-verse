
import { supabase } from '@/integrations/supabase/client';
import { TeaTokenService } from './teaTokenService';
import { track } from '@/utils/analytics';
import { secureLog } from '@/utils/secureLogging';

export type TokenAction = 'spill' | 'tip' | 'flag' | 'upvote' | 'downvote' | 'reward' | 'penalty';

interface TokenReward {
  action: TokenAction;
  amount: number;
  description: string;
}

const TOKEN_REWARDS: Record<TokenAction, TokenReward> = {
  spill: { action: 'spill', amount: 10, description: 'Posted a new spill' },
  tip: { action: 'tip', amount: 5, description: 'Gave a tip' },
  flag: { action: 'flag', amount: -2, description: 'Flagged content' },
  upvote: { action: 'upvote', amount: 1, description: 'Upvoted content' },
  downvote: { action: 'downvote', amount: -1, description: 'Downvoted content' },
  reward: { action: 'reward', amount: 20, description: 'Received reward' },
  penalty: { action: 'penalty', amount: -10, description: 'Received penalty' }
};

export class TeaTokenRewardService {
  static async rewardSpill(walletAddress: string, spillId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const reward = TOKEN_REWARDS.spill;
      
      const success = await TeaTokenService.awardTokens(
        walletAddress,
        reward.action,
        reward.amount,
        spillId,
        { action_type: 'spill_reward', description: reward.description }
      );

      if (success) {
        track('tea_tokens_earned', {
          action: 'spill',
          amount: reward.amount,
          wallet: walletAddress
        });

        return { success: true };
      } else {
        return { success: false, error: 'Failed to award tokens' };
      }
    } catch (error) {
      secureLog.error('Spill reward error:', error);
      return { success: false, error: 'Reward service unavailable' };
    }
  }

  static async rewardTip(
    fromWallet: string, 
    toWallet: string, 
    amount: number, 
    spillId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Deduct from sender
      const deductSuccess = await TeaTokenService.awardTokens(
        fromWallet,
        'tip',
        -amount,
        spillId,
        { action_type: 'tip_sent', recipient: toWallet }
      );

      if (deductSuccess) {
        // Award to recipient
        const awardSuccess = await TeaTokenService.awardTokens(
          toWallet,
          'reward',
          amount,
          spillId,
          { action_type: 'tip_received', sender: fromWallet }
        );

        if (awardSuccess) {
          track('tea_tokens_transferred', {
            from: fromWallet,
            to: toWallet,
            amount,
            type: 'tip'
          });

          return { success: true };
        } else {
          return { success: false, error: 'Failed to award tip to recipient' };
        }
      } else {
        return { success: false, error: 'Insufficient balance or transfer failed' };
      }
    } catch (error) {
      secureLog.error('Tip reward error:', error);
      return { success: false, error: 'Tip service unavailable' };
    }
  }

  static async rewardReaction(
    walletAddress: string, 
    reactionType: 'upvote' | 'downvote', 
    spillId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const reward = TOKEN_REWARDS[reactionType];
      
      const success = await TeaTokenService.awardTokens(
        walletAddress,
        reward.action,
        reward.amount,
        spillId,
        { action_type: 'reaction_reward', reaction_type: reactionType }
      );

      if (success) {
        track('tea_tokens_earned', {
          action: reactionType,
          amount: reward.amount,
          wallet: walletAddress
        });

        return { success: true };
      } else {
        return { success: false, error: 'Failed to process reaction reward' };
      }
    } catch (error) {
      secureLog.error('Reaction reward error:', error);
      return { success: false, error: 'Reaction service unavailable' };
    }
  }

  static async penalizeUser(
    walletAddress: string, 
    reason: string, 
    spillId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const penalty = TOKEN_REWARDS.penalty;
      
      const success = await TeaTokenService.awardTokens(
        walletAddress,
        penalty.action,
        penalty.amount,
        spillId,
        { action_type: 'penalty', reason }
      );

      if (success) {
        track('tea_tokens_penalty', {
          wallet: walletAddress,
          amount: penalty.amount,
          reason
        });

        return { success: true };
      } else {
        return { success: false, error: 'Failed to apply penalty' };
      }
    } catch (error) {
      secureLog.error('Penalty error:', error);
      return { success: false, error: 'Penalty service unavailable' };
    }
  }

  static getRewardAmount(action: TokenAction): number {
    return TOKEN_REWARDS[action]?.amount || 0;
  }

  static getRewardDescription(action: TokenAction): string {
    return TOKEN_REWARDS[action]?.description || 'Unknown action';
  }
}
