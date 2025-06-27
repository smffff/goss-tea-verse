import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';
import { TeaTokenService } from '@/services/TeaTokenService';

interface LeaderboardEntry {
  wallet_address: string;
  tea_balance: number;
  total_earned: number;
  total_spent: number;
  total_transactions: number;
  spills_posted: number;
  tips_given: number;
  rewards_received: number;
}

const TokenLeaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'all' | 'week' | 'month'>('all');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await TeaTokenService.getLeaderboard(timeframe);
      setLeaderboard(response);
    } catch (error) {
      secureLog.error('Failed to fetch leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    if (walletAddress) {
      fetchLeaderboard();
    }
  }, [walletAddress, fetchLeaderboard]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Trophy className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/30';
      case 2:
        return 'bg-gradient-to-r from-gray-300/20 to-gray-500/20 border-gray-300/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-amber-600/30';
      default:
        return 'bg-ctea-dark/50 border-ctea-teal/30';
    }
  };

  const formatWalletAddress = (address: string) => {
    if (address === 'anonymous') return 'Anonymous User';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <Card className="bg-ctea-dark/50 border-ctea-teal/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-ctea-teal border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-ctea-dark/50 border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-ctea-teal" />
          $TEA Leaderboard
        </CardTitle>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('all')}
            className={`px-3 py-1 rounded text-xs ${
              timeframe === 'all' 
                ? 'bg-ctea-teal text-white' 
                : 'bg-ctea-darker text-gray-400 hover:text-white'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 rounded text-xs ${
              timeframe === 'month' 
                ? 'bg-ctea-teal text-white' 
                : 'bg-ctea-darker text-gray-400 hover:text-white'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 rounded text-xs ${
              timeframe === 'week' 
                ? 'bg-ctea-teal text-white' 
                : 'bg-ctea-darker text-gray-400 hover:text-white'
            }`}
          >
            This Week
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.wallet_address}
              className={`flex items-center justify-between p-3 rounded-lg border ${getRankColor(index + 1)}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(index + 1)}
                  <span className="text-white font-bold">#{index + 1}</span>
                </div>
                <div>
                  <p className="text-white font-medium">
                    {formatWalletAddress(entry.wallet_address)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {entry.spills_posted} spills • {entry.tips_given} tips
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  {entry.tea_balance} $TEA
                </Badge>
                <p className="text-xs text-gray-400 mt-1">
                  Total: {entry.total_earned}
                </p>
              </div>
            </div>
          ))}
          
          {leaderboard.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No leaderboard data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenLeaderboard; 