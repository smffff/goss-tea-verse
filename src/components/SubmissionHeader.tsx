import React from 'react';
import { Badge } from '@/components/ui/badge';

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

interface SubmissionHeaderProps {
  submission: TeaSubmission;
}

const SubmissionHeader = ({ submission }: SubmissionHeaderProps) => {
  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      gossip: '☕',
      drama: '🎭',
      rumors: '👂',
      exposed: '👀',
      memes: '🐸'
    };
    return emojis[category] || '☕';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Badge className="bg-gradient-to-r from-ctea-purple to-ctea-pink text-white">
          {getCategoryEmoji(submission.category)} {submission.category}
        </Badge>
        {submission.has_evidence && (
          <Badge variant="outline" className="border-ctea-yellow text-ctea-yellow">
            📸 Evidence
          </Badge>
        )}
      </div>
      <span className="text-sm text-gray-400">{formatTimeAgo(submission.created_at)}</span>
    </div>
  );
};

export default SubmissionHeader;
