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
    { label: 'Total Users', value: '2,420', icon: Star, color: 'text-vintage-red' },
    { label: 'Tea Spilled', value: '15,742', icon: Coffee, color: 'text-tabloid-black' },
    { label: 'Reactions Given', value: '89,324', icon: Zap, color: 'text-vintage-red' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return { icon: '🏆', class: 'badge-gold', tooltip: '🔥 Top Spiller – Your gossip is legendary' };
      case 2: return { icon: '🥈', class: 'badge-silver', tooltip: '🌟 Silver Spiller – Elite gossip game' };
      case 3: return { icon: '🥉', class: 'badge-bronze', tooltip: '🔥 Bronze Spiller – Rising star' };
      default: return null;
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-vintage-red';
    if (score >= 75) return 'text-yellow-600';
    return 'text-tabloid-black/60';
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
          <h1 className="text-3xl font-display font-bold text-tabloid-black mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-vintage-red" />
            Spillerboard
            <Crown className="w-8 h-8 text-vintage-red" />
          </h1>
          <p className="text-lg text-tabloid-black/70 mb-6">
            See who's spilling the hottest tea and earning the most street cred
          </p>

          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-pill btn-pill-red text-white font-bold mb-8"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Rankings'}
          </Button>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="bg-pale-pink border-vintage-red/20 text-center">
                <CardContent className="p-4">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                  <div className={`text-xl font-bold ${color}`}>{value}</div>
                  <div className="text-sm text-tabloid-black/70">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scoring Info */}
          <Card className="bg-gradient-to-r from-vintage-red/10 to-pale-pink border-vintage-red/30 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-tabloid-black text-center text-xl flex items-center justify-center gap-2 font-display">
                <TrendingUp className="w-5 h-5 text-vintage-red" />
                How Scoring Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-vintage-red mb-1">+5</div>
                  <div className="text-tabloid-black/70">Points per tea submitted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-tabloid-black mb-1">+2</div>
                  <div className="text-tabloid-black/70">Points per emoji reaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-vintage-red mb-1">+10</div>
                  <div className="text-tabloid-black/70">Bonus for high engagement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MVP Leaderboard Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Top Spillers */}
          <Card className="bg-pale-pink border-vintage-red/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tabloid-black font-display">
                <TrendingUp className="w-5 h-5 text-vintage-red" /> Top Spillers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topSpillers.map((user) => {
                  const badge = getRankBadge(user.rank);
                  return (
                    <li key={user.rank} className="flex items-center gap-3">
                      {badge ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${badge.class}`} title={badge.tooltip}>
                          {badge.icon}
                        </span>
                      ) : (
                        <span className="text-xl font-bold text-tabloid-black/60">{user.rank}</span>
                      )}
                      <span className="font-semibold text-tabloid-black flex-1">{user.username}</span>
                      <span className="text-vintage-red font-mono">{user.teas} teas</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          {/* Most AI-Upvoted */}
          <Card className="bg-pale-pink border-vintage-red/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tabloid-black font-display">
                <Brain className="w-5 h-5 text-tabloid-black" /> Most AI-Upvoted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mostAIUpvoted.map((user) => {
                  const badge = getRankBadge(user.rank);
                  return (
                    <li key={user.rank} className="flex items-center gap-3">
                      {badge ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${badge.class}`}>
                          {badge.icon}
                        </span>
                      ) : (
                        <span className="text-xl font-bold text-tabloid-black/60">{user.rank}</span>
                      )}
                      <span className="font-semibold text-tabloid-black flex-1">{user.username}</span>
                      <span className="text-tabloid-black font-mono">{user.upvotes} upvotes</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          {/* Top Tippers */}
          <Card className="bg-pale-pink border-vintage-red/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tabloid-black font-display">
                <DollarSign className="w-5 h-5 text-yellow-600" /> Top Tippers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topTippers.map((user) => {
                  const badge = getRankBadge(user.rank);
                  return (
                    <li key={user.rank} className="flex items-center gap-3">
                      {badge ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${badge.class}`}>
                          {badge.icon}
                        </span>
                      ) : (
                        <span className="text-xl font-bold text-tabloid-black/60">{user.rank}</span>
                      )}
                      <span className="font-semibold text-tabloid-black flex-1">{user.username}</span>
                      <span className="text-yellow-600 font-mono">{user.tips} tips</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card className="bg-pale-pink border-vintage-red/20 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-tabloid-black text-center font-display">Top Tea Spillers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user) => {
                const badge = getRankBadge(user.rank);
                return (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      user.rank <= 3 
                        ? 'bg-gradient-to-r from-vintage-red/10 to-newsprint border-vintage-red/30' 
                        : 'bg-white/50 border-vintage-red/10 hover:border-vintage-red/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold min-w-[2rem]">
                        {badge ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${badge.class}`} title={badge.tooltip}>
                            {badge.icon}
                          </span>
                        ) : (
                          <span className="text-tabloid-black/60">#{user.rank}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-tabloid-black font-bold">{user.username}</div>
                        <div className="text-sm text-tabloid-black/60">
                          {user.teaSpilled} teas • {user.reactionsGiven} reactions
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-vintage-red">
                        {user.points.toLocaleString()}
                      </div>
                      <Badge className={`${getCredibilityColor(user.credibilityScore)} border-current`}>
                        {user.credibilityScore}% credibility
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboard;
