import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Comment } from '@/types/comments';
import CommentCard from '@/components/comments/CommentCard';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400">
        <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No comments yet. Be the first to start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
