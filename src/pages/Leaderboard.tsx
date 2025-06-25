
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedLeaderboard from '@/components/EnhancedLeaderboard';
import { Card } from '@/components/ui/card';
import { Trophy, Crown, Star, TrendingUp, Coffee, Zap } from 'lucide-react';

const Leaderboard = () => {
  const stats = [
    { label: 'Total Users', value: '2,420', icon: Star, color: 'text-ctea-teal' },
    { label: 'Tea Spilled', value: '15,742', icon: Coffee, color: 'text-ctea-purple' },
    { label: 'Reactions Given', value: '89,324', icon: Zap, color: 'text-ctea-yellow' }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-ctea-yellow" />
            Leaderboard
            <Crown className="w-10 h-10 text-ctea-pink" />
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            See who's spilling the hottest tea and earning the most street cred
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="bg-ctea-darker/50 border-ctea-teal/30 text-center p-4">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                <div className={`text-xl font-bold ${color}`}>{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </Card>
            ))}
          </div>

          {/* Scoring Info */}
          <Card className="bg-gradient-to-r from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30 p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-ctea-yellow" />
              How Scoring Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-ctea-teal mb-1">+5</div>
                <div className="text-gray-300">Points per tea submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ctea-purple mb-1">+2</div>
                <div className="text-gray-300">Points per emoji reaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ctea-yellow mb-1">+10</div>
                <div className="text-gray-300">Bonus for high engagement</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Leaderboard */}
        <EnhancedLeaderboard />
      </div>
    </Layout>
  );
};

export default Leaderboard;
