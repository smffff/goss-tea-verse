
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Medal, Coffee } from 'lucide-react';
import { TeaTokenService } from '@/services/teaTokenService';
import type { WalletBalance } from '@/types/teaTokens';

interface LeaderboardEntry extends WalletBalance {
  rank: number;
  displayName: string;
}

const TokenLeaderboard = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // Mock data for now since we don't have a leaderboard endpoint
      const mockLeaders: LeaderboardEntry[] = [
        {
          wallet_address: '0x1234...5678',
          displayName: 'Tea Master',
          tea_balance: 1250,
          total_earned: 1500,
          total_spent: 250,
          total_transactions: 45,
          spills_posted: 12,
          tips_given: 8,
          rewards_received: 25,
          rank: 1
        },
        {
          wallet_address: '0x2345...6789',
          displayName: 'Gossip Guru',
          tea_balance: 980,
          total_earned: 1200,
          total_spent: 220,
          total_transactions: 38,
          spills_posted: 10,
          tips_given: 6,
          rewards_received: 22,
          rank: 2
        },
        {
          wallet_address: '0x3456...7890',
          displayName: 'Spill Specialist',
          tea_balance: 750,
          total_earned: 900,
          total_spent: 150,
          total_transactions: 32,
          spills_posted: 8,
          tips_given: 4,
          rewards_received: 20,
          rank: 3
        }
      ];
      
      setLeaders(mockLeaders);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <Coffee className="w-5 h-5 text-ctea-teal" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 2:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 3:
        return 'bg-amber-600/20 text-amber-400 border-amber-600/30';
      default:
        return 'bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-ctea-dark/60 border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-ctea-teal" />
            Top Tea Earners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-ctea-darker/50 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-600 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-600 rounded w-16"></div>
                </div>
                <div className="h-6 bg-gray-600 rounded w-12"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-ctea-dark/60 border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-ctea-teal" />
          Top Tea Earners
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaders.map((leader) => (
            <div
              key={leader.wallet_address}
              className="flex items-center gap-3 p-3 bg-ctea-darker/50 rounded-lg hover:bg-ctea-darker/70 transition-colors"
            >
              <div className="flex items-center gap-2">
                {getRankIcon(leader.rank)}
                <Badge
                  variant="outline"
                  className={`text-xs ${getRankBadgeColor(leader.rank)}`}
                >
                  #{leader.rank}
                </Badge>
              </div>
              
              <div className="flex-1">
                <div className="text-white font-medium text-sm">
                  {leader.displayName}
                </div>
                <div className="text-xs text-gray-400">
                  {leader.spills_posted} spills • {leader.tips_given} tips
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-ctea-teal font-bold">
                  {leader.tea_balance.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">$TEA</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-ctea-teal/20">
          <div className="text-center text-xs text-gray-400">
            Rankings update every hour
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenLeaderboard;
