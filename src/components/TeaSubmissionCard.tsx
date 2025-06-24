
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, Flag } from 'lucide-react';
import SubmissionHeader from './SubmissionHeader';
import SubmissionContent from './SubmissionContent';
import EvidenceLinks from './EvidenceLinks';
import ReactionButtons from './ReactionButtons';
import AICommentary from './AICommentary';
import CommentSection from './CommentSection';

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
}

interface AIComment {
  id: string;
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  submission_id: string;
  created_at: string;
}

interface TeaSubmissionCardProps {
  submission: TeaSubmission;
  aiComments: AIComment[];
  isExpanded: boolean;
  onReaction: (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => void;
  onToggleComments: (submissionId: string) => void;
  onGenerateAI: (submission: TeaSubmission) => void;
}

const TeaSubmissionCard = ({
  submission,
  aiComments,
  isExpanded,
  onReaction,
  onToggleComments,
  onGenerateAI
}: TeaSubmissionCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
      <SubmissionHeader submission={submission} />
      <SubmissionContent content={submission.content} />
      <EvidenceLinks evidenceUrls={submission.evidence_urls} />
      <ReactionButtons 
        reactions={submission.reactions}
        onReaction={(type) => onReaction(submission.id, type)}
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggleComments(submission.id)}
            className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Comments
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onGenerateAI(submission)}
            className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
          >
            🤖 AI Take
          </Button>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-ctea-teal">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-ctea-pink">
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* AI Comments */}
      {aiComments.length > 0 && (
        <div className="mt-4 space-y-3">
          {aiComments.map((comment) => (
            <AICommentary
              key={comment.id}
              content={comment.content}
              type={comment.type}
              onRegenerate={() => onGenerateAI(submission)}
            />
          ))}
        </div>
      )}

      {/* Comments Section */}
      {isExpanded && (
        <div className="mt-4">
          <CommentSection submissionId={submission.id} />
        </div>
      )}
    </Card>
  );
};

export default TeaSubmissionCard;
