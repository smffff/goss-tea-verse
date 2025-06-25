
import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Copy, CheckCircle, Flag } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface TeaFeedActionsProps {
  submissionId: string;
  submissionContent: string;
  copiedLink: string | null;
  onShare: (submissionId: string, platform: 'twitter' | 'copy') => void;
  onReport: (submissionId: string) => void;
}

const TeaFeedActions: React.FC<TeaFeedActionsProps> = ({
  submissionId,
  submissionContent,
  copiedLink,
  onShare,
  onReport
}) => {
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-ctea-teal/20">
      <div className="flex items-center gap-2">
        <ShareButtons
          url={`${window.location.origin}/feed?submission=${submissionId}`}
          title={`Hot Tea: ${submissionContent.substring(0, 50)}...`}
          variant="minimal"
          className="text-ctea-teal"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShare(submissionId, 'twitter')}
          className="text-ctea-teal hover:bg-ctea-teal/10 hover:text-white transition-colors duration-200"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShare(submissionId, 'copy')}
          className="text-ctea-teal hover:bg-ctea-teal/10 hover:text-white transition-colors duration-200"
        >
          {copiedLink === submissionId ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReport(submissionId)}
          className="text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors duration-200"
        >
          <Flag className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TeaFeedActions;
