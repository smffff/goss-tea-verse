import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import SubmissionHeader from '@/components/SubmissionHeader';
import SubmissionContent from '@/components/SubmissionContent';
import SubmissionMetrics from '@/components/submission/SubmissionMetrics';
import SubmissionMedia from '@/components/submission/SubmissionMedia';
import SubmissionActions from '@/components/submission/SubmissionActions';
import EvidenceLinks from '@/components/EvidenceLinks';
import ReactionButtons from '@/components/ReactionButtons';
import AICommentary from '@/components/AICommentary';
import AICommentarySelector from '@/components/AICommentarySelector';
import CommentSection from '@/components/CommentSection';
import ReportModal from '@/components/ReportModal';
import ShareButtons from '@/components/ShareButtons';

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
  boost_score?: number;
  credibility_score?: number;
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
  onGenerateAI: (submission: TeaSubmission, type: 'spicy' | 'smart' | 'memy' | 'savage') => void;
  onBoostUpdated?: (submissionId: string, newBoost: number) => void;
}

const TeaSubmissionCard: React.FC<TeaSubmissionCardProps> = ({
  submission,
  aiComments,
  isExpanded,
  onReaction,
  onToggleComments,
  onGenerateAI,
  onBoostUpdated
}) => {
  const [showAISelector, setShowAISelector] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleAIGeneration = async (type: 'spicy' | 'smart' | 'memy' | 'savage') => {
    setIsGeneratingAI(true);
    setShowAISelector(false);
    try {
      await onGenerateAI(submission, type);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleBoostUpdated = (newBoost: number) => {
    if (onBoostUpdated) {
      onBoostUpdated(submission.id, newBoost);
    }
  };

  // Separate image URLs from other evidence URLs
  const imageUrls = submission.evidence_urls?.filter(url => 
    url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  ) || [];
  
  const otherEvidenceUrls = submission.evidence_urls?.filter(url => 
    !url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  ) || [];

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border hover:border-ctea-teal/50 transition-all duration-300">
      <SubmissionHeader submission={submission} />
      <SubmissionContent content={submission.content} />
      
      <SubmissionMetrics
        ratingCount={submission.rating_count}
        hasEvidence={submission.has_evidence}
        boostScore={submission.boost_score}
        credibilityScore={submission.credibility_score}
      />
      
      <SubmissionMedia imageUrls={imageUrls} />
      <EvidenceLinks evidenceUrls={otherEvidenceUrls} />
      
      <ReactionButtons 
        reactions={submission.reactions}
        onReaction={(type) => onReaction(submission.id, type)}
      />

      <div className="my-2">
        <ShareButtons
          url={window.location.origin + '/feed/' + submission.id}
          title={submission.content.slice(0, 80) + '...'}
          variant="minimal"
          className="w-full"
        />
      </div>

      <SubmissionActions
        submissionId={submission.id}
        content={submission.content}
        category={submission.category}
        currentBoost={submission.boost_score || 0}
        onToggleComments={() => onToggleComments(submission.id)}
        onShowAISelector={() => setShowAISelector(!showAISelector)}
        onShowReport={() => setShowReportModal(true)}
        onBoostUpdated={handleBoostUpdated}
        isGeneratingAI={isGeneratingAI}
      />

      {showAISelector && (
        <div className="mt-4 p-4 bg-ctea-darker/50 rounded-lg border border-ctea-teal/20">
          <h4 className="text-white font-medium mb-3">Choose AI Commentary Style:</h4>
          <AICommentarySelector 
            onSelectType={handleAIGeneration}
            isGenerating={isGeneratingAI}
          />
        </div>
      )}

      {(aiComments.length > 0 || isGeneratingAI) && (
        <div className="mt-4 space-y-3">
          {isGeneratingAI && (
            <AICommentary
              content=""
              type="spicy"
              isGenerating={true}
            />
          )}
          {aiComments.map((comment) => (
            <AICommentary
              key={comment.id}
              content={comment.content}
              type={comment.type}
              onRegenerate={() => handleAIGeneration(comment.type)}
            />
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="mt-4">
          <CommentSection submissionId={submission.id} />
        </div>
      )}

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        submissionId={submission.id}
      />
    </Card>
  );
};

export default TeaSubmissionCard;
