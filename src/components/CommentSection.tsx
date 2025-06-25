
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import CommentForm from './comments/CommentForm';
import CommentsList from './comments/CommentsList';

interface CommentSectionProps {
  submissionId: string;
}

const CommentSection = ({ submissionId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { comments, isLoading, addComment } = useComments(submissionId);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const success = await addComment(newComment);
      if (success) {
        setNewComment('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-ctea-teal/20 rounded mb-2"></div>
        <div className="h-20 bg-ctea-teal/10 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white font-medium">
        <MessageCircle className="w-4 h-4" />
        Comments ({comments.length})
      </div>

      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        onSubmit={handleSubmitComment}
        isSubmitting={isSubmitting}
      />

      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentSection;
