
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Plus, Trophy, Star } from 'lucide-react';

interface QuickActionsProps {
  variant?: 'default' | 'enhanced';
  className?: string;
}

const QuickActions = ({ variant = 'default', className = '' }: QuickActionsProps) => {
  const navigate = useNavigate();

  const buttonClass = variant === 'enhanced' 
    ? 'bg-gradient-ctea text-white font-bold'
    : 'bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold';

  const spillButtonText = variant === 'enhanced' ? 'Spill Now' : 'Spill New Tea';

  return (
    <Card className={`bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30 ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-ctea-yellow" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Button 
            className={`w-full ${buttonClass}`}
            onClick={() => navigate('/submit')}
          >
            <Plus className="w-4 h-4 mr-2" />
            {spillButtonText}
          </Button>
          <Button 
            variant="outline"
            className="w-full border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
            onClick={() => navigate('/campaigns')}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Join Campaign
          </Button>
          <Button 
            variant="outline"
            className="w-full border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10"
          >
            <Star className="w-4 h-4 mr-2" />
            Become Moderator
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
