
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Flag, Clock } from 'lucide-react';
import { TeaSubmission } from '@/types/teaFeed';

interface LiveTeaSubmissionCardProps {
  submission: TeaSubmission;
  onReaction: (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => void;
}

const LiveTeaSubmissionCard: React.FC<LiveTeaSubmissionCardProps> = ({
  submission,
  onReaction
}) => {
  const [userReaction, setUserReaction] = useState<string | null>(null);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleReaction = (reactionType: 'hot' | 'cold' | 'spicy') => {
    if (userReaction === reactionType) return; // Prevent duplicate reactions
    
    setUserReaction(reactionType);
    onReaction(submission.id, reactionType);
  };

  const getTotalReactions = () => {
    return submission.reactions.hot + submission.reactions.cold + submission.reactions.spicy;
  };

  return (
    <Card className="bg-ctea-dark/60 border-ctea-teal/30 hover:border-ctea-teal/50 transition-all duration-300">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-ctea-teal border-ctea-teal/30">
              {submission.category}
            </Badge>
            {submission.is_verified && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                ✓ Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Clock className="w-3 h-3" />
            {formatTimeAgo(submission.created_at)}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-white leading-relaxed">{submission.content}</p>
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
                  className="w-full h-32 object-cover rounded-lg border border-ctea-teal/20 hover:border-ctea-teal/40 transition-colors"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ))}
            </div>
          </div>
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

        {/* Reactions */}
        <div className="flex items-center gap-4 mb-4 p-3 bg-ctea-darker/50 rounded-lg">
          <button
            onClick={() => handleReaction('hot')}
            className={`flex items-center gap-2 transition-colors ${
              userReaction === 'hot' 
                ? 'text-orange-400 scale-110' 
                : 'text-orange-400/70 hover:text-orange-400'
            }`}
            disabled={userReaction !== null}
          >
            🔥 <span className="font-medium">{submission.reactions.hot}</span>
          </button>
          <button
            onClick={() => handleReaction('spicy')}
            className={`flex items-center gap-2 transition-colors ${
              userReaction === 'spicy' 
                ? 'text-red-400 scale-110' 
                : 'text-red-400/70 hover:text-red-400'
            }`}
            disabled={userReaction !== null}
          >
            🌶️ <span className="font-medium">{submission.reactions.spicy}</span>
          </button>
          <button
            onClick={() => handleReaction('cold')}
            className={`flex items-center gap-2 transition-colors ${
              userReaction === 'cold' 
                ? 'text-blue-400 scale-110' 
                : 'text-blue-400/70 hover:text-blue-400'
            }`}
            disabled={userReaction !== null}
          >
            🧊 <span className="font-medium">{submission.reactions.cold}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <span>Total reactions: {getTotalReactions()}</span>
            {submission.verification_score > 0 && (
              <span>Credibility: {submission.verification_score}%</span>
            )}
          </div>
          {submission.average_rating > 0 && (
            <span>Rating: {submission.average_rating.toFixed(1)}/10</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Comment
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:bg-gray-700 hover:text-red-400"
          >
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTeaSubmissionCard;
