
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeaderboardTeaser = () => {
  const navigate = useNavigate();

  const topSpillers = [
    { rank: 1, name: 'Anonymous Oracle', spills: 42, badge: '🫖' },
    { rank: 2, name: 'CryptoGossiper', spills: 38, badge: '🕵️' },
    { rank: 3, name: 'TeaSpillMaster', spills: 35, badge: '🔥' }
  ];

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-red-50 border-red-300 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-gray-900 text-lg">Who's stirring the pot this week?</h3>
        </div>
        
        <div className="space-y-2 mb-4">
          {topSpillers.map((spiller) => (
            <div key={spiller.rank} className="flex items-center justify-between p-2 bg-white/50 rounded">
              <div className="flex items-center gap-2">
                <span className="text-lg">{spiller.badge}</span>
                <span className="font-medium text-gray-900">#{spiller.rank}</span>
                <span className="text-gray-700">{spiller.name}</span>
              </div>
              <span className="text-sm font-bold text-red-600">{spiller.spills} spills</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => navigate('/leaderboard')}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          See Spillerboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTeaser;
