
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Plus, Trophy } from 'lucide-react';

interface QuickActionsProps {
  variant?: 'default' | 'enhanced';
  className?: string;
}

const QuickActions = ({ variant = 'default', className = '' }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold"
            onClick={() => navigate('/spill')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Spill Tea
          </Button>
          <Button 
            variant="outline"
            className="w-full border-teal-500 text-teal-400 hover:bg-teal-500/10"
          >
            <Trophy className="w-4 h-4 mr-2" />
            View Leaderboard
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
