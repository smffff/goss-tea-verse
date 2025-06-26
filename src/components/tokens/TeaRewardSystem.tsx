
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, TrendingUp, Award, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [totalTea, setTotalTea] = useState(0);
  const [totalSoap, setTotalSoap] = useState(0);
  const { toast } = useToast();

  // Simulate real-time reward events
  const addRewardEvent = (event: Omit<RewardEvent, 'id' | 'timestamp'>) => {
    const newEvent: RewardEvent = {
      ...event,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    setRecentRewards(prev => [newEvent, ...prev.slice(0, 4)]);

    // Update totals
    if (event.type === 'tea_earned' && event.amount) {
      setTotalTea(prev => prev + event.amount);
    } else if (event.type === 'soap_earned' && event.amount) {
      setTotalSoap(prev => prev + event.amount);
    }

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

  // Auto-generate sample rewards for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const rewards = [
        { type: 'tea_earned' as const, amount: 5, message: '+5 $TEA for quality tea spill!' },
        { type: 'soap_earned' as const, amount: 2, message: '+2 $SOAP for credible gossip!' },
        { type: 'level_up' as const, message: 'Reached Tea Connoisseur level!' },
        { type: 'achievement' as const, message: 'Unlocked "Viral Spiller" badge!' },
      ];
      
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        addRewardEvent(randomReward);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`bg-gradient-to-br from-ctea-dark/50 to-black/50 border-ctea-teal/30 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Token Rewards</h3>
          <div className="flex gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {totalTea} $TEA
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              {totalSoap} $SOAP
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
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
          
          {recentRewards.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <Coins className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start earning $TEA and $SOAP by spilling quality gossip!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeaRewardSystem;
