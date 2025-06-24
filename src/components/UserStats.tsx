
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Coffee, Zap } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';

const UserStats = () => {
  const { userProgression, userLevel, isLoading } = useUserProgression();

  if (isLoading) {
    return (
      <Card className="p-4 bg-ctea-dark/50 animate-pulse">
        <div className="h-4 bg-ctea-teal/20 rounded mb-2"></div>
        <div className="h-8 bg-ctea-teal/10 rounded"></div>
      </Card>
    );
  }

  if (!userProgression || !userLevel) {
    return null;
  }

  const progressToNextLevel = userLevel.max_xp 
    ? ((userProgression.current_xp - userLevel.min_xp) / (userLevel.max_xp - userLevel.min_xp)) * 100
    : 100;

  return (
    <Card className="p-4 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-ctea-yellow" />
          <span className="font-bold text-white">Level {userProgression.current_level}</span>
          <Badge 
            className="text-xs" 
            style={{ backgroundColor: userLevel.badge_color, color: '#000' }}
          >
            {userLevel.name}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-sm text-ctea-teal font-bold">{userProgression.current_xp} XP</div>
          {userLevel.max_xp && (
            <div className="text-xs text-gray-400">/ {userLevel.max_xp} XP</div>
          )}
        </div>
      </div>

      {userLevel.max_xp && (
        <div className="mb-4">
          <Progress value={progressToNextLevel} className="h-2" />
          <div className="text-xs text-gray-400 mt-1">
            {userLevel.max_xp - userProgression.current_xp} XP to next level
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="flex items-center justify-center mb-1">
            <Coffee className="w-4 h-4 text-ctea-orange" />
          </div>
          <div className="text-lg font-bold text-ctea-orange">{userProgression.tea_points}</div>
          <div className="text-xs text-gray-400">$TEA Points</div>
        </div>
        
        <div>
          <div className="flex items-center justify-center mb-1">
            <Star className="w-4 h-4 text-ctea-pink" />
          </div>
          <div className="text-lg font-bold text-ctea-pink">{userProgression.total_posts}</div>
          <div className="text-xs text-gray-400">Posts</div>
        </div>
        
        <div>
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 text-ctea-cyan" />
          </div>
          <div className="text-lg font-bold text-ctea-cyan">{userProgression.total_reactions_received}</div>
          <div className="text-xs text-gray-400">Reactions</div>
        </div>
      </div>
    </Card>
  );
};

export default UserStats;
