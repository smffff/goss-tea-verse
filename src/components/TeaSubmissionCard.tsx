import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Flag, ThumbsUp, ThumbsDown } from 'lucide-react';
import { TeaSubmission } from '@/types/teaFeed';
import SubmissionMedia from '@/components/submission/SubmissionMedia';

interface TeaSubmissionCardProps {
  submission: TeaSubmission;
  aiComments: any[];
  isExpanded: boolean;
  onReaction: (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => void;
  onToggleComments: () => void;
  onGenerateAI: () => void;
  onVote: (submissionId: string, voteType: 'up' | 'down') => void;
}

const TeaSubmissionCard: React.FC<TeaSubmissionCardProps> = ({
  submission,
  aiComments,
  isExpanded,
  onReaction,
  onToggleComments,
  onGenerateAI,
  onVote
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalReactions = () => {
    return submission.reactions.hot + submission.reactions.cold + submission.reactions.spicy;
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-teal-400 border-teal-400/30">
            {submission.category}
          </Badge>
          {submission.is_verified && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              ✓ Verified
            </Badge>
          )}
        </div>
        <span className="text-sm text-gray-400">
          {formatDate(submission.created_at)}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-white leading-relaxed">{submission.content}</p>
      </div>

      {/* Media */}
      {submission.evidence_urls && submission.evidence_urls.length > 0 && (
        <SubmissionMedia imageUrls={submission.evidence_urls} />
      )}

      {/* AI Commentary */}
      {submission.ai_reaction && (
        <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 text-sm font-medium">🤖 AI Take</span>
          </div>
          <p className="text-gray-300 text-sm">{submission.ai_reaction}</p>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
        <span>Reactions: {getTotalReactions()}</span>
        <span>Rating: {submission.average_rating.toFixed(1)}/10</span>
        {submission.verification_score > 0 && (
          <span>Credibility: {submission.verification_score}%</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Reaction Buttons */}
          <Button
            size="sm"
            variant="ghost"
            className="text-orange-400 hover:bg-orange-400/10"
            onClick={() => onReaction(submission.id, 'hot')}
          >
            🔥 {submission.reactions.hot}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-blue-400 hover:bg-blue-400/10"
            onClick={() => onReaction(submission.id, 'cold')}
          >
            🧊 {submission.reactions.cold}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-400 hover:bg-red-400/10"
            onClick={() => onReaction(submission.id, 'spicy')}
          >
            🌶️ {submission.reactions.spicy}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Vote Buttons */}
          <Button
            size="sm"
            variant="ghost"
            className="text-green-400 hover:bg-green-400/10"
            onClick={() => onVote(submission.id, 'up')}
          >
            <ThumbsUp className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-400 hover:bg-red-400/10"
            onClick={() => onVote(submission.id, 'down')}
          >
            <ThumbsDown className="w-4 h-4" />
          </Button>

          {/* Other Actions */}
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:bg-gray-700"
            onClick={onToggleComments}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Comments
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:bg-gray-700"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:bg-gray-700"
          >
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TeaSubmissionCard;
