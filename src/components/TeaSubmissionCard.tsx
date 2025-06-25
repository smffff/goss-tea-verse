import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, Flag } from 'lucide-react';
import SubmissionHeader from './SubmissionHeader';
import SubmissionContent from './SubmissionContent';
import EvidenceLinks from './EvidenceLinks';
import ReactionButtons from './ReactionButtons';
import AICommentary from './AICommentary';
import AICommentarySelector from './AICommentarySelector';
import CommentSection from './CommentSection';
import BribeBoostSystem from './BribeBoostSystem';
import MemeRemixer from './MemeRemixer';
import ReportModal from './ReportModal';
import ShareButtons from './ShareButtons';

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

const TeaSubmissionCard = ({
  submission,
  aiComments,
  isExpanded,
  onReaction,
  onToggleComments,
  onGenerateAI,
  onBoostUpdated
}: TeaSubmissionCardProps) => {
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
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
      {/* Boost Indicator */}
      {submission.boost_score && submission.boost_score > 0 && (
        <div className="mb-4 p-2 bg-gradient-to-r from-ctea-yellow/20 to-ctea-orange/20 rounded-lg border border-ctea-yellow/30">
          <div className="flex items-center gap-2">
            <span className="text-ctea-yellow font-bold">🚀</span>
            <span className="text-white text-sm">
              Boosted with +{submission.boost_score} visibility points
            </span>
          </div>
        </div>
      )}

      <SubmissionHeader submission={submission} />
      
      <SubmissionContent content={submission.content} />
      
      {imageUrls.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Evidence image ${index + 1} for tea submission`}
                className="w-full rounded-lg border border-ctea-teal/20"
              />
            ))}
          </div>
        </div>
      )}
      
      <EvidenceLinks evidenceUrls={otherEvidenceUrls} />
      
      <ReactionButtons 
        reactions={submission.reactions}
        onReaction={(type) => onReaction(submission.id, type)}
      />

      {/* Share Buttons */}
      <div className="my-2">
        <div className="hidden md:block">
          <ShareButtons
            url={window.location.origin + '/feed/' + submission.id}
            title={submission.content.slice(0, 80) + '...'}
            variant="expanded"
            className="w-full"
          />
        </div>
        <div className="block md:hidden">
          <ShareButtons
            url={window.location.origin + '/feed/' + submission.id}
            title={submission.content.slice(0, 80) + '...'}
            variant="minimal"
            className="w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-4">
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
            onClick={() => setShowAISelector(!showAISelector)}
            className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            disabled={isGeneratingAI}
          >
            🤖 AI Take
          </Button>
        </div>
        <div className="flex gap-2">
          <BribeBoostSystem
            submissionId={submission.id}
            currentBoost={submission.boost_score || 0}
            onBoostUpdated={handleBoostUpdated}
          />
          <MemeRemixer
            submissionId={submission.id}
            content={submission.content}
            category={submission.category}
          />
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-ctea-teal">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-gray-400 hover:text-ctea-pink"
            onClick={() => setShowReportModal(true)}
          >
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* AI Commentary Selector */}
      {showAISelector && (
        <div className="mt-4 p-4 bg-ctea-darker/50 rounded-lg border border-ctea-teal/20">
          <h4 className="text-white font-medium mb-3">Choose AI Commentary Style:</h4>
          <AICommentarySelector 
            onSelectType={handleAIGeneration}
            isGenerating={isGeneratingAI}
          />
        </div>
      )}

      {/* AI Comments */}
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

      {/* Comments Section */}
      {isExpanded && (
        <div className="mt-4">
          <CommentSection submissionId={submission.id} />
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        submissionId={submission.id}
        submissionContent={submission.content}
      />
    </Card>
  );
};

export default TeaSubmissionCard;
