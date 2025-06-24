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
  onGenerateAI: (submission: TeaSubmission, type?: 'spicy' | 'smart' | 'memy' | 'savage') => void;
}

const TeaSubmissionCard = ({
  submission,
  aiComments,
  isExpanded,
  onReaction,
  onToggleComments,
  onGenerateAI
}: TeaSubmissionCardProps) => {
  const [showAISelector, setShowAISelector] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleAIGeneration = async (type: 'spicy' | 'smart' | 'memy' | 'savage') => {
    setIsGeneratingAI(true);
    setShowAISelector(false);
    try {
      await onGenerateAI(submission, type);
    } finally {
      setIsGeneratingAI(false);
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
    <div className="p-6 bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 dark:border-accent mb-2">
      <SubmissionHeader submission={submission} />
      <div className="mb-2">
        <span className="block text-gray-500 dark:text-gray-300 text-base font-medium">
          {submission.summary || submission.content.split(' ').slice(0,25).join(' ') + (submission.content.split(' ').length > 25 ? '...' : '')}
        </span>
      </div>
      <SubmissionContent content={submission.content} />
      
      {/* Display uploaded images */}
      {imageUrls.length > 0 && (
        <div className="mb-4 space-y-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <img 
                src={url} 
                alt={`Submission image ${index + 1}`}
                className="w-full max-h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(url, '_blank')}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Display other evidence links */}
      {otherEvidenceUrls.length > 0 && (
        <EvidenceLinks evidenceUrls={otherEvidenceUrls} />
      )}
      
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
            onClick={() => setShowAISelector(!showAISelector)}
            className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            disabled={isGeneratingAI}
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
    </div>
  );
};

export default TeaSubmissionCard;
