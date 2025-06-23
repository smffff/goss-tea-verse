
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Medal, Star, Trophy } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  badge: 'og' | 'meme-lord' | 'drama-king' | 'viral-queen' | 'chaos-agent' | null;
  streak: number;
  isRising?: boolean;
}

interface LeaderboardCardProps {
  title: string;
  entries: LeaderboardEntry[];
  period: 'weekly' | 'monthly' | 'all-time';
  resetTime?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ title, entries, period, resetTime }) => {
  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'og': return 'bg-ctea-yellow text-ctea-dark';
      case 'meme-lord': return 'bg-ctea-purple text-white';
      case 'drama-king': return 'bg-ctea-pink text-white';
      case 'viral-queen': return 'bg-ctea-teal text-ctea-dark';
      case 'chaos-agent': return 'bg-ctea-orange text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-ctea-yellow" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-ctea-orange" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-400">#{rank}</span>;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30 neon-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-right">
          <Badge variant="outline" className="text-ctea-teal border-ctea-teal">
            {period.toUpperCase()}
          </Badge>
          {resetTime && (
            <p className="text-xs text-gray-400 mt-1">Resets in {resetTime}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {entries.map((entry) => (
          <div 
            key={entry.rank} 
            className={`flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-ctea-dark/30 to-transparent border border-ctea-teal/20 ${entry.isRising ? 'animate-glow' : ''}`}
          >
            <div className="flex items-center gap-2">
              {getRankIcon(entry.rank)}
              {entry.isRising && <Star className="w-4 h-4 text-ctea-yellow animate-pulse" />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">{entry.username}</span>
                {entry.badge && (
                  <Badge className={`text-xs ${getBadgeColor(entry.badge)}`}>
                    {entry.badge.replace('-', ' ').toUpperCase()}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{entry.score.toLocaleString()} points</span>
                {entry.streak > 0 && (
                  <span className="text-ctea-orange">{entry.streak} day streak 🔥</span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-ctea-teal">#{entry.rank}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeaderboardCard;
