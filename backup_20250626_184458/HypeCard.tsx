import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Flame, Trophy, Zap } from 'lucide-react';

interface HypeCardProps {
  title: string;
  description: string;
  type: 'campaign' | 'leaderboard' | 'spotlight' | 'challenge';
  isActive?: boolean;
  participants?: number;
  timeLeft?: string;
  featured?: boolean;
}

const HypeCard: React.FC<HypeCardProps> = ({ 
  title, 
  description, 
  type, 
  isActive = false, 
  participants = 0,
  timeLeft,
  featured = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'campaign': return <Flame className="w-5 h-5" />;
      case 'leaderboard': return <Trophy className="w-5 h-5" />;
      case 'spotlight': return <Crown className="w-5 h-5" />;
      case 'challenge': return <Zap className="w-5 h-5" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'campaign': return 'from-ctea-orange/20 to-ctea-pink/20';
      case 'leaderboard': return 'from-ctea-yellow/20 to-ctea-orange/20';
      case 'spotlight': return 'from-ctea-purple/20 to-ctea-pink/20';
      case 'challenge': return 'from-ctea-teal/20 to-ctea-purple/20';
    }
  };

  return (
    <Card className={`p-6 bg-gradient-to-br ${getGradient()} border-ctea-teal/30 neon-border relative overflow-hidden ${featured ? 'ring-2 ring-ctea-yellow animate-pulse-slow' : ''}`}>
      {featured && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-ctea-yellow text-ctea-dark font-bold">FEATURED</Badge>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-gradient-ctea">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-2 truncate">{description.slice(0, 100)}{description.length > 100 ? '…' : ''}</p>
          <p className="text-gray-300 mb-4">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-sm">
              {participants > 0 && (
                <span className="text-ctea-teal">
                  {participants.toLocaleString()} participants
                </span>
              )}
              {timeLeft && (
                <span className="text-ctea-pink">
                  {timeLeft} left
                </span>
              )}
            </div>
            
            <Button 
              size="sm" 
              className={`${isActive ? 'bg-ctea-teal hover:bg-ctea-teal/80' : 'bg-ctea-purple hover:bg-ctea-purple/80'} text-white`}
            >
              {isActive ? 'Join Now' : 'View'}
            </Button>
          </div>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ctea-teal/10 to-transparent animate-pulse"></div>
      )}
    </Card>
  );
};

export default HypeCard;
