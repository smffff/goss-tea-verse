
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Medal, Award } from 'lucide-react'
import { TeaTokenService } from '@/services/teaTokenService'

interface LeaderboardEntry {
  wallet_address: string;
  displayName: string;
  tea_balance: number;
  total_earned: number;
  total_spent: number;
  total_transactions: number;
  spills_posted: number;
  tips_given: number;
  rewards_received: number;
  rank: number;
  created_at: string;
  updated_at: string;
  last_transaction_at: string | null;
}

const TokenLeaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock leaderboard data with all required properties
    const mockLeaders: LeaderboardEntry[] = [
      {
        wallet_address: '0x1234...5678',
        displayName: 'Tea Master 🫖',
        tea_balance: 15420,
        total_earned: 20000,
        total_spent: 4580,
        total_transactions: 89,
        spills_posted: 12,
        tips_given: 45,
        rewards_received: 23,
        rank: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_transaction_at: new Date().toISOString()
      },
      {
        wallet_address: '0xabcd...efgh',
        displayName: 'Spill Queen 👑',
        tea_balance: 12890,
        total_earned: 15000,
        total_spent: 2110,
        total_transactions: 67,
        spills_posted: 18,
        tips_given: 32,
        rewards_received: 19,
        rank: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_transaction_at: new Date().toISOString()
      },
      {
        wallet_address: '0x9876...1234',
        displayName: 'Gossip Guru 🗣️',
        tea_balance: 9450,
        total_earned: 12000,
        total_spent: 2550,
        total_transactions: 45,
        spills_posted: 8,
        tips_given: 28,
        rewards_received: 15,
        rank: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_transaction_at: new Date().toISOString()
      }
    ];

    setLeaders(mockLeaders);
    setIsLoading(false);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">#{rank}</span>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Token Leaders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading leaderboard...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Token Leaders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaders.map((leader) => (
          <div
            key={leader.wallet_address}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getRankIcon(leader.rank)}
              <div>
                <div className="font-medium">{leader.displayName}</div>
                <div className="text-sm text-white/60">
                  {leader.wallet_address}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-ctea-teal">
                {leader.tea_balance.toLocaleString()} $TEA
              </div>
              <div className="text-xs text-white/60">
                {leader.spills_posted} spills • {leader.tips_given} tips
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TokenLeaderboard;
