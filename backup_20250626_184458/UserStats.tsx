
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Coffee, Zap } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';

const UserStats: React.FC = () => {
  const { progression, currentLevel, nextLevel } = useUserProgression();

  const xpProgress = nextLevel 
    ? ((progression.current_xp - currentLevel.min_xp) / (nextLevel.min_xp - currentLevel.min_xp)) * 100
    : 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30">
      <div className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-ctea-teal" />
              <span className="text-white font-bold">Level {currentLevel.level}</span>
              <Badge 
                className="text-xs"
                style={{ backgroundColor: currentLevel.badge_color + '20', color: currentLevel.badge_color, borderColor: currentLevel.badge_color + '50' }}
              >
                {currentLevel.name}
              </Badge>
            </div>
            {nextLevel && (
              <span className="text-sm text-gray-400">
                {progression.current_xp} / {nextLevel.min_xp} XP
              </span>
            )}
          </div>
          {nextLevel && (
            <Progress value={xpProgress} className="h-2 bg-ctea-darker" />
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-ctea-yellow" />
              <span className="text-sm text-gray-400">Tea Points</span>
            </div>
            <p className="text-lg font-bold text-white">{progression.tea_points.toLocaleString()}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-ctea-purple" />
              <span className="text-sm text-gray-400">Posts</span>
            </div>
            <p className="text-lg font-bold text-white">{progression.total_posts}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-ctea-pink" />
              <span className="text-sm text-gray-400">Reactions Given</span>
            </div>
            <p className="text-lg font-bold text-white">{progression.total_reactions_given}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-ctea-teal" />
              <span className="text-sm text-gray-400">Reactions Received</span>
            </div>
            <p className="text-lg font-bold text-white">{progression.total_reactions_received}</p>
          </div>
        </div>

        {/* Next Level Preview */}
        {nextLevel && (
          <div className="p-3 bg-ctea-darker/50 rounded-lg border border-ctea-teal/20">
            <h4 className="text-sm font-medium text-white mb-2">Next Level: {nextLevel.name}</h4>
            <p className="text-xs text-gray-400">
              {(nextLevel.min_xp - progression.current_xp).toLocaleString()} XP needed to level up
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserStats;
