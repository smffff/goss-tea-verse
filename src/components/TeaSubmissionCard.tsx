
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Snowflake, Zap, Clock } from 'lucide-react';

interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  created_at: string;
  reactions: {
    hot: number;
    cold: number;
    spicy: number;
  };
}

interface TeaSubmissionCardProps {
  submission: TeaSubmission;
  onReaction?: (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => Promise<boolean>;
}

const TeaSubmissionCard: React.FC<TeaSubmissionCardProps> = ({ 
  submission, 
  onReaction 
}) => {
  const handleReaction = async (type: 'hot' | 'cold' | 'spicy') => {
    if (onReaction) {
      await onReaction(submission.id, type);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-400 border-0">
              {submission.category}
            </Badge>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock className="w-3 h-3" />
              {formatTime(submission.created_at)}
            </div>
          </div>
        </div>
        
        <p className="text-white mb-4 leading-relaxed">{submission.content}</p>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReaction('hot')}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <Flame className="w-4 h-4 mr-1" />
            {submission.reactions?.hot || 0}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReaction('cold')}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
          >
            <Snowflake className="w-4 h-4 mr-1" />
            {submission.reactions?.cold || 0}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReaction('spicy')}
            className="text-orange-400 hover:text-orange-300 hover:bg-orange-400/10"
          >
            <Zap className="w-4 h-4 mr-1" />
            {submission.reactions?.spicy || 0}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeaSubmissionCard;
