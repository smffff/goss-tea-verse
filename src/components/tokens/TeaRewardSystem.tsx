
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, TrendingUp, Gift, Zap } from 'lucide-react';
import { TeaTokenService } from '@/services/teaTokenService';
import type { WalletBalance, TeaTransaction } from '@/types/teaTokens';

interface RewardEvent {
  id: string;
  type: 'spill' | 'tip' | 'reward';
  amount: number;
  description: string;
  timestamp: Date;
}

interface TeaRewardSystemProps {
  walletAddress: string;
  children?: React.ReactNode;
}

const TeaRewardSystem: React.FC<TeaRewardSystemProps> = ({ walletAddress, children }) => {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [recentRewards, setRecentRewards] = useState<RewardEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (walletAddress) {
      fetchBalanceAndRewards();
    }
  }, [walletAddress]);

  const fetchBalanceAndRewards = async () => {
    try {
      const [balanceData, transactionsData] = await Promise.all([
        TeaTokenService.getBalance(walletAddress),
        TeaTokenService.getTransactions(walletAddress, 5)
      ]);

      setBalance(balanceData);
      
      // Convert transactions to reward events
      const rewards: RewardEvent[] = transactionsData.map((tx: TeaTransaction) => ({
        id: tx.id.toString(),
        type: tx.action as 'spill' | 'tip' | 'reward',
        amount: tx.amount,
        description: getRewardDescription(tx.action, tx.amount),
        timestamp: new Date(tx.created_at)
      }));
      
      setRecentRewards(rewards);
    } catch (error) {
      console.error('Failed to fetch balance and rewards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRewardDescription = (action: string, amount: number): string => {
    switch (action) {
      case 'spill':
        return `+${amount} TEA for spilling tea`;
      case 'tip':
        return amount > 0 ? `+${amount} TEA tip received` : `${amount} TEA tip sent`;
      case 'reward':
        return `+${amount} TEA bonus reward`;
      case 'upvote':
        return `+${amount} TEA for upvote`;
      case 'downvote':
        return `${amount} TEA for downvote`;
      default:
        return `${amount > 0 ? '+' : ''}${amount} TEA`;
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'spill':
        return <Coffee className="w-4 h-4 text-ctea-teal" />;
      case 'tip':
        return <Gift className="w-4 h-4 text-purple-400" />;
      case 'reward':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      default:
        return <TrendingUp className="w-4 h-4 text-green-400" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-ctea-dark/60 border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coffee className="w-5 h-5 text-ctea-teal" />
            Tea Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 animate-pulse">
            <div className="h-8 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-ctea-dark/60 border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Coffee className="w-5 h-5 text-ctea-teal" />
          Tea Rewards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Balance Display */}
          <div className="text-center p-4 bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {balance?.tea_balance?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-gray-400">$TEA Balance</div>
            {balance && (
              <div className="text-xs text-gray-500 mt-1">
                Earned: {balance.total_earned} • Spent: {balance.total_spent}
              </div>
            )}
          </div>

          {/* Recent Rewards */}
          {recentRewards.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Recent Activity</h4>
              {recentRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center gap-2 p-2 bg-ctea-darker/30 rounded"
                >
                  {getRewardIcon(reward.type)}
                  <div className="flex-1">
                    <div className="text-xs text-white">{reward.description}</div>
                    <div className="text-xs text-gray-500">
                      {reward.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      reward.amount > 0
                        ? 'text-green-400 border-green-400/30'
                        : 'text-red-400 border-red-400/30'
                    }`}
                  >
                    {reward.amount > 0 ? '+' : ''}{reward.amount}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Earning Tips */}
          <div className="text-xs text-gray-400 space-y-1">
            <div>💡 Earn TEA by:</div>
            <div>• Spilling hot tea (+5 TEA)</div>
            <div>• Getting reactions (+1-3 TEA)</div>
            <div>• Daily login bonus (+3 TEA)</div>
          </div>

          {children && (
            <div>
              {React.cloneElement(children as React.ReactElement, {
                addRewardEvent: (event: Omit<RewardEvent, 'id' | 'timestamp'>) => {
                  const newEvent: RewardEvent = {
                    ...event,
                    id: crypto.randomUUID(),
                    timestamp: new Date()
                  };
                  setRecentRewards(prev => [newEvent, ...prev.slice(0, 4)]);
                }
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeaRewardSystem;
