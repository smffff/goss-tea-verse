import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, TrendingUp, Coffee, Zap, RefreshCw, Brain, DollarSign } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  teaSpilled: number;
  reactionsGiven: number;
  credibilityScore: number;
  badge?: string;
}

const Leaderboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "CryptoWhale",
      points: 15420,
      teaSpilled: 89,
      reactionsGiven: 1245,
      credibilityScore: 98,
      badge: "👑"
    },
    {
      rank: 2,
      username: "AlphaHunter",
      points: 12890,
      teaSpilled: 67,
      reactionsGiven: 987,
      credibilityScore: 94,
      badge: "🏆"
    },
    {
      rank: 3,
      username: "TeaSpiller99",
      points: 10567,
      teaSpilled: 78,
      reactionsGiven: 756,
      credibilityScore: 91,
      badge: "🥉"
    },
    {
      rank: 4,
      username: "DegenTrader2024",
      points: 8934,
      teaSpilled: 56,
      reactionsGiven: 623,
      credibilityScore: 87
    },
    {
      rank: 5,
      username: "TokenGossiper",
      points: 7421,
      teaSpilled: 45,
      reactionsGiven: 534,
      credibilityScore: 84
    }
  ];

  const stats = [
    { label: 'Total Users', value: '2,420', icon: Star, color: 'text-[#00d1c1]' },
    { label: 'Tea Spilled', value: '15,742', icon: Coffee, color: 'text-[#ff61a6]' },
    { label: 'Reactions Given', value: '89,324', icon: Zap, color: 'text-yellow-400' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-amber-600';
      default: return 'text-gray-400';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-[#00d1c1]';
    if (score >= 75) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const topSpillers = [
    { rank: 1, username: 'CryptoWhale', teas: 89 },
    { rank: 2, username: 'AlphaHunter', teas: 67 },
    { rank: 3, username: 'TeaSpiller99', teas: 61 },
    { rank: 4, username: 'DegenTrader2024', teas: 56 },
    { rank: 5, username: 'TokenGossiper', teas: 45 },
  ];

  const mostAIUpvoted = [
    { rank: 1, username: 'AlphaHunter', upvotes: 120 },
    { rank: 2, username: 'CryptoWhale', upvotes: 110 },
    { rank: 3, username: 'TeaSpiller99', upvotes: 98 },
    { rank: 4, username: 'TokenGossiper', upvotes: 87 },
    { rank: 5, username: 'DegenTrader2024', upvotes: 80 },
  ];

  const topTippers = [
    { rank: 1, username: 'TipsterPro', tips: 42 },
    { rank: 2, username: 'AlphaHunter', tips: 37 },
    { rank: 3, username: 'CryptoWhale', tips: 29 },
    { rank: 4, username: 'TeaSpiller99', tips: 21 },
    { rank: 5, username: 'TokenGossiper', tips: 18 },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Leaderboard
            <Crown className="w-8 h-8 text-[#ff61a6]" />
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            See who's spilling the hottest tea and earning the most street cred
          </p>

          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:opacity-90 text-white font-bold mb-8"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Rankings'}
          </Button>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="bg-ctea-darker/50 border-[#00d1c1]/30 text-center">
                <CardContent className="p-4">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                  <div className={`text-xl font-bold ${color}`}>{value}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scoring Info */}
          <Card className="bg-gradient-to-r from-[#ff61a6]/20 to-[#00d1c1]/20 border-[#ff61a6]/30 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-center text-xl flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                How Scoring Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00d1c1] mb-1">+5</div>
                  <div className="text-gray-300">Points per tea submitted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ff61a6] mb-1">+2</div>
                  <div className="text-gray-300">Points per emoji reaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">+10</div>
                  <div className="text-gray-300">Bonus for high engagement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MVP Leaderboard Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Top Spillers */}
          <Card className="bg-ctea-dark/50 border-[#00d1c1]/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white"><TrendingUp className="w-5 h-5 text-ctea-teal" /> Top Spillers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topSpillers.map((user) => (
                  <li key={user.rank} className="flex items-center gap-3">
                    <span className={`text-xl font-bold ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : user.rank === 3 ? 'text-amber-600' : 'text-gray-400'}`}>{user.rank}</span>
                    <span className="font-semibold text-white flex-1">{user.username}</span>
                    <span className="text-ctea-teal font-mono">{user.teas} teas</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Most AI-Upvoted */}
          <Card className="bg-ctea-dark/50 border-[#00d1c1]/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white"><Brain className="w-5 h-5 text-ctea-pink" /> Most AI-Upvoted</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mostAIUpvoted.map((user) => (
                  <li key={user.rank} className="flex items-center gap-3">
                    <span className={`text-xl font-bold ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : user.rank === 3 ? 'text-amber-600' : 'text-gray-400'}`}>{user.rank}</span>
                    <span className="font-semibold text-white flex-1">{user.username}</span>
                    <span className="text-ctea-pink font-mono">{user.upvotes} upvotes</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Top Tippers */}
          <Card className="bg-ctea-dark/50 border-[#00d1c1]/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white"><DollarSign className="w-5 h-5 text-yellow-400" /> Top Tippers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topTippers.map((user) => (
                  <li key={user.rank} className="flex items-center gap-3">
                    <span className={`text-xl font-bold ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : user.rank === 3 ? 'text-amber-600' : 'text-gray-400'}`}>{user.rank}</span>
                    <span className="font-semibold text-white flex-1">{user.username}</span>
                    <span className="text-yellow-400 font-mono">{user.tips} tips</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card className="bg-ctea-dark/50 border-[#00d1c1]/30 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center">Top Tea Spillers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    user.rank <= 3 
                      ? 'bg-gradient-to-r from-yellow-500/10 to-[#00d1c1]/10 border-yellow-500/30' 
                      : 'bg-ctea-darker/30 border-gray-600/30 hover:border-[#00d1c1]/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${getRankColor(user.rank)} min-w-[2rem]`}>
                      {user.badge || `#${user.rank}`}
                    </div>
                    <div>
                      <div className="text-white font-bold">{user.username}</div>
                      <div className="text-sm text-gray-400">
                        {user.teaSpilled} teas • {user.reactionsGiven} reactions
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-[#00d1c1]">
                      {user.points.toLocaleString()}
                    </div>
                    <Badge className={`${getCredibilityColor(user.credibilityScore)} border-current`}>
                      {user.credibilityScore}% credibility
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboard;
