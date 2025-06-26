
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Flag, Share2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';

interface LiveTeaSubmissionCardProps {
  submission: TeaSubmission;
  onReaction: (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => void;
}

const LiveTeaSubmissionCard: React.FC<LiveTeaSubmissionCardProps> = ({
  submission,
  onReaction
}) => {
  const [hasReacted, setHasReacted] = useState(false);
  const { toast } = useToast();

  const handleReaction = (type: 'hot' | 'cold' | 'spicy') => {
    if (hasReacted) {
      toast({
        title: "Already Reacted",
        description: "You can only react once per submission",
        variant: "destructive"
      });
      return;
    }

    onReaction(submission.id, type);
    setHasReacted(true);
    
    const emoji = type === 'hot' ? '🔥' : type === 'spicy' ? '🌶️' : '🧊';
    toast({
      title: `Reacted with ${emoji}`,
      description: "Your reaction has been recorded!",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CTea Newsroom - Hot Tea Alert!',
        text: submission.content.slice(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${submission.content.slice(0, 100)}... - CTea Newsroom`);
      toast({
        title: "Copied to Clipboard",
        description: "Tea link copied to share!",
      });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-ctea-dark/60 border-ctea-teal/20 hover:border-ctea-teal/40 transition-all duration-300">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {submission.author ? submission.author[0].toUpperCase() : 'A'}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">
                  {submission.author || 'Anonymous Tea Spiller'}
                </p>
                <p className="text-gray-400 text-sm">
                  {formatTimeAgo(submission.created_at)}
                </p>
              </div>
            </div>
            
            {submission.category && (
              <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/50">
                #{submission.category}
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-white leading-relaxed">
              {submission.content}
            </p>
          </div>

          {/* Evidence */}
          {submission.evidence_urls && submission.evidence_urls.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <ExternalLink className="w-4 h-4" />
                Evidence provided
              </div>
              <div className="bg-ctea-darker/50 rounded p-3">
                <a
                  href={submission.evidence_urls[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ctea-teal hover:text-pink-400 text-sm truncate block"
                >
                  {submission.evidence_urls[0]}
                </a>
              </div>
            </div>
          )}

          {/* Reactions */}
          <div className="flex items-center gap-4 mb-4 p-3 bg-ctea-darker/30 rounded-lg">
            <button
              onClick={() => handleReaction('hot')}
              disabled={hasReacted}
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                hasReacted
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 hover:scale-105'
              }`}
            >
              🔥 <span className="font-bold">{submission.reactions.hot}</span>
            </button>
            
            <button
              onClick={() => handleReaction('spicy')}
              disabled={hasReacted}
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                hasReacted
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-105'
              }`}
            >
              🌶️ <span className="font-bold">{submission.reactions.spicy}</span>
            </button>
            
            <button
              onClick={() => handleReaction('cold')}
              disabled={hasReacted}
              className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                hasReacted
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-105'
              }`}
            >
              🧊 <span className="font-bold">{submission.reactions.cold}</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Comment
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleShare}
                className="text-gray-400 hover:text-ctea-teal hover:bg-ctea-teal/10"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-red-400 hover:bg-red-400/10"
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LiveTeaSubmissionCard;
