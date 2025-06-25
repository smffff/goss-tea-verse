
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, Flag } from 'lucide-react';
import BribeBoostSystem from '@/components/BribeBoostSystem';
import MemeRemixer from '@/components/MemeRemixer';

interface SubmissionActionsProps {
  submissionId: string;
  content: string;
  category: string;
  currentBoost: number;
  onToggleComments: () => void;
  onShowAISelector: () => void;
  onShowReport: () => void;
  onBoostUpdated: (newBoost: number) => void;
  isGeneratingAI: boolean;
}

const SubmissionActions: React.FC<SubmissionActionsProps> = ({
  submissionId,
  content,
  category,
  currentBoost,
  onToggleComments,
  onShowAISelector,
  onShowReport,
  onBoostUpdated,
  isGeneratingAI
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleComments}
          className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Comments
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onShowAISelector}
          className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
          disabled={isGeneratingAI}
        >
          🤖 AI Take
        </Button>
      </div>
      <div className="flex gap-2">
        <BribeBoostSystem
          submissionId={submissionId}
          currentBoost={currentBoost}
          onBoostUpdated={onBoostUpdated}
        />
        <MemeRemixer
          submissionId={submissionId}
          content={content}
          category={category}
        />
        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-ctea-teal">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-gray-400 hover:text-ctea-pink"
          onClick={onShowReport}
        >
          <Flag className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SubmissionActions;
