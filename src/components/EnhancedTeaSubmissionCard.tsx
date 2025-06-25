
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, Flag, ThumbsUp, ThumbsDown, Coffee } from 'lucide-react';
import ShareButtons from './ShareButtons';
import ReportModal from './modals/ReportModal';
import { useToast } from '@/hooks/use-toast';

interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  evidence_urls: string[] | null;
  reactions: { hot: number; cold: number; spicy: number };
  created_at: string;
  average_rating: number;
  rating_count: number;
  has_evidence: boolean;
  summary?: string;
  boost_score?: number;
  credibility_score?: number;
  verification_level?: 'none' | 'basic' | 'verified' | 'trusted' | 'legendary';
  memeability_score?: number;
  viral_potential?: number;
  engagement_rate?: number;
  is_trending?: boolean;
  author?: string;
  user_vote?: 'up' | 'down' | null;
}

interface EnhancedTeaSubmissionCardProps {
  submission: TeaSubmission;
  onReaction?: (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => void;
  onVote?: (submissionId: string, voteType: 'up' | 'down') => void;
  viewMode?: 'quick' | 'detailed';
}

const EnhancedTeaSubmissionCard: React.FC<EnhancedTeaSubmissionCardProps> = ({
  submission,
  onReaction,
  onVote,
  viewMode = 'detailed'
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(submission.user_vote || null);
  const { toast } = useToast();

  const handleVote = (voteType: 'up' | 'down') => {
    const newVote = userVote === voteType ? null : voteType;
    setUserVote(newVote);
    
    if (onVote) {
      onVote(submission.id, voteType);
    }
    
    toast({
      title: newVote ? `${newVote === 'up' ? 'Upvoted' : 'Downvoted'}!` : 'Vote removed',
      description: newVote ? 'Thanks for your feedback!' : 'Your vote has been removed',
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const shareUrl = `${window.location.origin}/feed/${submission.id}`;
  const shareTitle = submission.content.slice(0, 80) + '...';

  return (
    <>
      <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-[#00d1c1]/30 hover:border-[#00d1c1]/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00d1c1] to-[#ff61a6] rounded-full flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
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
            <Badge className="bg-[#00d1c1]/20 text-[#00d1c1] border-[#00d1c1]/30">
              #{submission.category}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-300 leading-relaxed">
            {submission.content}
          </p>
          
          {submission.summary && (
            <div className="mt-3 p-3 bg-[#ff61a6]/10 border border-[#ff61a6]/30 rounded-lg">
              <p className="text-sm text-gray-300">
                <span className="text-[#ff61a6] font-medium">AI Summary:</span> {submission.summary}
              </p>
            </div>
          )}
        </div>

        {/* Evidence/Media */}
        {submission.evidence_urls && submission.evidence_urls.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {submission.evidence_urls.slice(0, 2).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Evidence ${index + 1}`}
                  className="w-full rounded-lg border border-[#00d1c1]/20 hover:border-[#00d1c1]/40 transition-colors"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reactions */}
        <div className="flex items-center gap-4 mb-4 p-3 bg-ctea-darker/50 rounded-lg">
          <button
            onClick={() => onReaction?.(submission.id, 'hot')}
            className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            🔥 <span>{submission.reactions.hot}</span>
          </button>
          <button
            onClick={() => onReaction?.(submission.id, 'spicy')}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            🌶️ <span>{submission.reactions.spicy}</span>
          </button>
          <button
            onClick={() => onReaction?.(submission.id, 'cold')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            🧊 <span>{submission.reactions.cold}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleVote('up')}
              className={`border-green-500/30 hover:bg-green-500/10 ${
                userVote === 'up' ? 'bg-green-500/20 text-green-400' : 'text-green-400'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleVote('down')}
              className={`border-red-500/30 hover:bg-red-500/10 ${
                userVote === 'down' ? 'bg-red-500/20 text-red-400' : 'text-red-400'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="border-[#00d1c1]/30 text-[#00d1c1] hover:bg-[#00d1c1]/10"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Comment
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <ShareButtons
              url={shareUrl}
              title={shareTitle}
              variant="minimal"
            />
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowReportModal(true)}
              className="text-gray-400 hover:text-red-400"
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        contentId={submission.id}
      />
    </>
  );
};

export default EnhancedTeaSubmissionCard;
