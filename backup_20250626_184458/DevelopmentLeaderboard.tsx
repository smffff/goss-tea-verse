
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, Zap } from 'lucide-react';

const DevelopmentLeaderboard: React.FC = () => {
  const mockLeaders = [
    { rank: 1, name: "Anonymous Whale", soap: 1337, spills: 42, credibility: 95 },
    { rank: 2, name: "Tea Sipper", soap: 1200, spills: 38, credibility: 92 },
    { rank: 3, name: "Gossip Lord", soap: 1100, spills: 35, credibility: 89 },
    { rank: 4, name: "Alpha Spiller", soap: 950, spills: 31, credibility: 87 },
    { rank: 5, name: "Rumor Mill", soap: 800, spills: 28, credibility: 85 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          CTea Leaderboard
        </h1>
        <p className="text-gray-400">Top tea spillers and gossip contributors</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-ctea-dark/80 border-yellow-400/30 text-center">
          <CardContent className="p-6">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">1,337</div>
            <div className="text-sm text-gray-400">Total SOAP Earned</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-ctea-teal/30 text-center">
          <CardContent className="p-6">
            <Zap className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">420</div>
            <div className="text-sm text-gray-400">Tea Spills</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-pink-400/30 text-center">
          <CardContent className="p-6">
            <Star className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">89%</div>
            <div className="text-sm text-gray-400">Avg Credibility</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-purple-400/30 text-center">
          <CardContent className="p-6">
            <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">69</div>
            <div className="text-sm text-gray-400">Active Sippers</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-ctea-dark/80 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-xl">🏆 Top Tea Spillers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLeaders.map((leader) => (
              <div 
                key={leader.rank}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    leader.rank === 1 ? 'bg-yellow-500 text-black' :
                    leader.rank === 2 ? 'bg-gray-400 text-black' :
                    leader.rank === 3 ? 'bg-orange-600 text-white' :
                    'bg-white/20 text-white'
                  }`}>
                    {leader.rank}
                  </div>
                  <div>
                    <div className="text-white font-bold">{leader.name}</div>
                    <div className="text-gray-400 text-sm">{leader.spills} spills</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {leader.soap} SOAP
                  </Badge>
                  <Badge className={`${
                    leader.credibility > 90 ? 'bg-green-500/20 text-green-400' :
                    leader.credibility > 85 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {leader.credibility}% credible
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentLeaderboard;
