import React from 'react';
import { Card } from '@/components/ui/card';
import { Comment } from '@/types/comments';
import { formatTimeAgo } from '@/utils/timeUtils';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card className="p-3 bg-ctea-darker/50 border-ctea-teal/20">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-medium text-ctea-teal">
          {comment.anonymous_token === 'ai-commentary-bot' ? '🤖 CTeaBot' : 'Anonymous'}
        </span>
        <span className="text-xs text-gray-400">
          {formatTimeAgo(comment.created_at)}
        </span>
      </div>
      <p className="text-white text-sm leading-relaxed">{comment.content}</p>
    </Card>
  );
};

export default CommentCard;
