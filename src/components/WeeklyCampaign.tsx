
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Flame, Trophy } from 'lucide-react';

interface WeeklyCampaignProps {
  title: string;
  description: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  participants: number;
  topPrize: string;
  isActive: boolean;
  submissions: number;
}

const WeeklyCampaign: React.FC<WeeklyCampaignProps> = ({
  title,
  description,
  theme,
  startDate,
  endDate,
  participants,
  topPrize,
  isActive,
  submissions
}) => {
  const timeLeft = isActive ? Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
  const getCampaignEmoji = (theme: string) => {
    switch (theme.toLowerCase()) {
      case 'meme': return '🔥';
      case 'drama': return '☕';
      case 'chaos': return '💀';
      case 'viral': return '⚡';
      default: return '🫖';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/50 to-ctea-purple/20 border-ctea-teal/30 neon-border relative overflow-hidden">
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ctea-teal via-ctea-pink to-ctea-orange animate-pulse"></div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <span className="text-2xl">{getCampaignEmoji(theme)}</span>
          </div>
          <Badge className={`${isActive ? 'bg-ctea-teal text-ctea-dark' : 'bg-gray-600 text-white'} font-bold`}>
            {isActive ? 'LIVE NOW' : 'ENDED'}
          </Badge>
        </div>
        
        {isActive && (
          <div className="text-right">
            <div className="text-lg font-bold text-ctea-yellow">{timeLeft} days left</div>
            <div className="text-sm text-gray-400">Ends {endDate.toLocaleDateString()}</div>
          </div>
        )}
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-ctea-teal" />
          </div>
          <div className="text-lg font-bold text-white">{participants.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Participants</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 text-ctea-orange" />
          </div>
          <div className="text-lg font-bold text-white">{submissions.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Submissions</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5 text-ctea-yellow" />
          </div>
          <div className="text-lg font-bold text-white">{topPrize}</div>
          <div className="text-xs text-gray-400">Top Prize</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-ctea-pink" />
          </div>
          <div className="text-lg font-bold text-white">{theme}</div>
          <div className="text-xs text-gray-400">Theme</div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          className={`flex-1 ${isActive ? 'bg-ctea-teal hover:bg-ctea-teal/80' : 'bg-gray-600 hover:bg-gray-700'} text-white font-bold`}
          disabled={!isActive}
        >
          {isActive ? 'Submit Your Spill' : 'Campaign Ended'}
        </Button>
        
        <Button 
          variant="outline" 
          className="border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10"
        >
          View Submissions
        </Button>
      </div>
    </Card>
  );
};

export default WeeklyCampaign;
