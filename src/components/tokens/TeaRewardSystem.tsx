import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, TrendingUp, Award, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { TeaTokenService } from '@/services/teaTokenService';
import { useTeaTokens } from '@/hooks/useTeaTokens';
import { secureLog } from '@/utils/secureLog';

interface Transaction {
  id: number;
  amount: number;
  action: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

interface RewardEvent {
  id: string;
  type: 'tea_earned' | 'soap_earned' | 'level_up' | 'achievement';
  amount?: number;
  message: string;
  timestamp: number;
}

interface TeaRewardSystemProps {
  walletAddress?: string;
  className?: string;
}

const TeaRewardSystem: React.FC<TeaRewardSystemProps> = ({
  walletAddress,
  className = ''
}) => {
  const [recentRewards, setRecentRewards] = useState<RewardEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { balance, refreshBalance } = useTeaTokens(walletAddress);

  // Load recent transactions as reward events
  useEffect(() => {
    if (!walletAddress) return;

    const loadRecentTransactions = async () => {
      setIsLoading(true);
      try {
        const transactions = await TeaTokenService.getTransactions(walletAddress, 5);
        
        const rewardEvents: RewardEvent[] = transactions
          .filter(t => t.amount > 0) // Only show positive transactions
          .map(t => ({
            id: t.id.toString(),
            type: 'tea_earned' as const,
            amount: t.amount,
            message: getTransactionMessage(t),
            timestamp: new Date(t.created_at).getTime()
          }));

        setRecentRewards(rewardEvents);
      } catch (error) {
        secureLog.error('Failed to load transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentTransactions();
  }, [walletAddress]);

  const getTransactionMessage = (transaction: Transaction): string => {
    const metadata = transaction.metadata || {};
    
    switch (transaction.action) {
      case 'spill':
        return `+${transaction.amount} $TEA for spilling tea!`;
      case 'reward':
        if (metadata.reward_type === 'reaction') {
          const emoji = metadata.reaction_type === 'hot' ? '🔥' : 
                       metadata.reaction_type === 'cold' ? '❄️' : '🌶️';
          return `${emoji} +${transaction.amount} $TEA for ${metadata.reaction_type} reaction!`;
        } else if (metadata.reward_type === 'daily_login') {
          return `☕ +${transaction.amount} $TEA daily login bonus!`;
        } else if (metadata.reward_type === 'quality_spill') {
          return `🏆 +${transaction.amount} $TEA for quality tea!`;
        }
        return `+${transaction.amount} $TEA reward!`;
      default:
        return `+${transaction.amount} $TEA earned!`;
    }
  };

  // Add real reward event (called from parent components)
  const addRewardEvent = (event: Omit<RewardEvent, 'id' | 'timestamp'>) => {
    const newEvent: RewardEvent = {
      ...event,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    setRecentRewards(prev => [newEvent, ...prev.slice(0, 4)]);
    refreshBalance(); // Refresh balance when new reward is added

    // Show toast notification
    toast({
      title: getRewardTitle(event.type),
      description: event.message,
      duration: 3000,
    });
  };

  const getRewardTitle = (type: RewardEvent['type']) => {
    switch (type) {
      case 'tea_earned': return '🫖 $TEA Earned!';
      case 'soap_earned': return '🧼 $SOAP Earned!';
      case 'level_up': return '⬆️ Level Up!';
      case 'achievement': return '🏆 Achievement Unlocked!';
      default: return '🎉 Reward!';
    }
  };

  const getRewardIcon = (type: RewardEvent['type']) => {
    switch (type) {
      case 'tea_earned': return Coins;
      case 'soap_earned': return Award;
      case 'level_up': return TrendingUp;
      case 'achievement': return Zap;
      default: return Coins;
    }
  };

  const getRewardColor = (type: RewardEvent['type']) => {
    switch (type) {
      case 'tea_earned': return 'text-green-400 bg-green-500/20';
      case 'soap_earned': return 'text-blue-400 bg-blue-500/20';
      case 'level_up': return 'text-purple-400 bg-purple-500/20';
      case 'achievement': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  // Expose addRewardEvent to parent components
  React.useImperativeHandle(React.useRef(), () => ({
    addRewardEvent
  }));

  return (
    <Card className={`bg-gradient-to-br from-ctea-dark/50 to-black/50 border-ctea-teal/30 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Token Rewards</h3>
          <div className="flex gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {balance?.tea_balance || 0} $TEA
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              {balance?.total_earned || 0} Total
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin w-6 h-6 border-2 border-ctea-teal border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <AnimatePresence>
              {recentRewards.map((reward) => {
                const Icon = getRewardIcon(reward.type);
                
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    className={`flex items-center gap-3 p-2 rounded-lg border ${getRewardColor(reward.type)} border-current/30`}
                  >
                    <Icon className="w-4 h-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{reward.message}</p>
                      {reward.amount && (
                        <p className="text-xs opacity-70">+{reward.amount} tokens</p>
                      )}
                    </div>
                    <span className="text-xs opacity-50">
                      {Math.floor((Date.now() - reward.timestamp) / 1000)}s ago
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          
          {!isLoading && recentRewards.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <Coins className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start earning $TEA by spilling quality gossip!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeaRewardSystem;
