
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserBadges from '@/components/ui/UserBadges';

const LeaderboardTeaser = () => {
  const navigate = useNavigate();

  const topSpillers = [
    { 
      rank: 1, 
      name: 'Anonymous Oracle', 
      spills: 42, 
      badge: '🏆', 
      bgClass: 'badge-gold',
      badgeType: 'top-spiller' as const
    },
    { 
      rank: 2, 
      name: 'CryptoGossiper', 
      spills: 38, 
      badge: '🥈', 
      bgClass: 'badge-silver',
      badgeType: 'ai-favorite' as const
    },
    { 
      rank: 3, 
      name: 'TeaSpillMaster', 
      spills: 35, 
      badge: '🥉', 
      bgClass: 'badge-bronze',
      badgeType: 'anonymous-oracle' as const
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-pale-pink to-newsprint border-vintage-red/30 shadow-lg card-tabloid-hover">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-vintage-red" />
          <h3 className="font-bold text-tabloid-black text-lg font-display">Who's stirring the pot this week?</h3>
        </div>
        
        <div className="space-y-2 mb-4">
          {topSpillers.map((spiller) => (
            <div key={spiller.rank} className="flex items-center justify-between p-2 bg-white/50 rounded border border-vintage-red/10">
              <div className="flex items-center gap-2">
                <span className={`text-lg px-2 py-1 rounded-full text-xs font-bold ${spiller.bgClass}`}>
                  {spiller.badge}
                </span>
                <span className="font-medium text-tabloid-black">#{spiller.rank}</span>
                <span className="text-tabloid-black/80">{spiller.name}</span>
                <UserBadges type={spiller.badgeType} size={24} />
              </div>
              <span className="text-sm font-bold text-vintage-red">{spiller.spills} spills</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => navigate('/leaderboard')}
          className="btn-pill btn-pill-red w-full text-white font-bold btn-tabloid-hover"
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
