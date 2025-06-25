import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, Flag, ExternalLink, Eye } from 'lucide-react';
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
import CredibilityIndicator from './CredibilityIndicator';
import ViralityIndicator from './ViralityIndicator';

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
}

interface AIComment {
  id: string;
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  submission_id: string;
  created_at: string;
}

interface EnhancedTeaSubmissionCardProps {
  submission: TeaSubmission;
  aiComments: AIComment[];
  isExpanded: boolean;
  onReaction: (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => void;
  onToggleComments: (submissionId: string) => void;
  onGenerateAI: (submission: TeaSubmission, type: 'spicy' | 'smart' | 'memy' | 'savage') => void;
  onBoostUpdated?: (submissionId: string, newBoost: number) => void;
  viewMode?: 'quick' | 'detailed';
}

const EnhancedTeaSubmissionCard: React.FC<EnhancedTeaSubmissionCardProps> = ({
  submission,
  aiComments,
  isExpanded,
  onReaction,
  onToggleComments,
  onGenerateAI,
  onBoostUpdated,
  viewMode = 'detailed'
}) => {
  const [showAISelector, setShowAISelector] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRabbitHole, setShowRabbitHole] = useState(false);

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

  // Calculate derived metrics
  const soapScore = submission.credibility_score || Math.floor(Math.random() * 100);
  const evidenceStrength = submission.has_evidence ? 85 : 25;
  const communityTrust = Math.min(95, (submission.reactions.hot - submission.reactions.cold + 50));
  const memeability = submission.memeability_score || Math.floor(Math.random() * 100);
  const viralPotential = submission.viral_potential || Math.floor(Math.random() * 100);
  const engagementRate = submission.engagement_rate || Math.min(100, (submission.reactions.hot + submission.reactions.cold + submission.reactions.spicy) * 5);

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border hover:border-ctea-teal/50 transition-all duration-300">
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

      {/* Enhanced Content Indicators */}
      <div className="mb-4 space-y-3">
        {/* Credibility & Virality Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CredibilityIndicator
            soapScore={soapScore}
            verificationLevel={submission.verification_level || 'none'}
            evidenceStrength={evidenceStrength}
            communityTrust={communityTrust}
          />
          <ViralityIndicator
            memeability={memeability}
            viralPotential={viralPotential}
            engagementRate={engagementRate}
            isTrending={submission.is_trending}
            isBoosted={(submission.boost_score || 0) > 0}
          />
        </div>

        {/* Quick Actions for Rabbit Hole Content */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowRabbitHole(!showRabbitHole)}
            className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
          >
            <Eye className="w-3 h-3 mr-1" />
            {showRabbitHole ? 'Hide Context' : 'Rabbit Hole'}
          </Button>
          
          {submission.category && (
            <Badge className="bg-ctea-dark/50 text-ctea-teal border border-ctea-teal/30">
              #{submission.category}
            </Badge>
          )}

          {evidenceStrength > 70 && (
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
              🔍 Well-Sourced
            </Badge>
          )}
        </div>

        {/* Rabbit Hole Deep Dive */}
        {showRabbitHole && (
          <div className="p-4 bg-ctea-darker/50 rounded-lg border border-ctea-purple/20">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              🕳️ Context & Background
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Related to ongoing {submission.category} developments</p>
              <p>• Community trust level: {Math.round(communityTrust)}% based on reactions</p>
              <p>• Evidence strength: {evidenceStrength}% from {submission.evidence_urls?.length || 0} sources</p>
              {submission.summary && <p>• AI Summary: {submission.summary}</p>}
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="text-xs border-ctea-teal/30 text-ctea-teal">
                <ExternalLink className="w-3 h-3 mr-1" />
                Related Posts
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-ctea-purple/30 text-ctea-purple">
                <ExternalLink className="w-3 h-3 mr-1" />
                Background Info
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {imageUrls.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Evidence image ${index + 1} for tea submission`}
                className="w-full rounded-lg border border-ctea-teal/20 hover:border-ctea-teal/40 transition-colors"
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
      />
    </Card>
  );
};

export default EnhancedTeaSubmissionCard;
