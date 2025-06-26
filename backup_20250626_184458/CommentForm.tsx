
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface CommentFormProps {
  newComment: string;
  setNewComment: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  newComment,
  setNewComment,
  onSubmit,
  isSubmitting
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment... CTeaBot might join the conversation! 🤖"
        className="w-full p-3 bg-ctea-darker border border-ctea-teal/30 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-ctea-teal focus:border-transparent"
        rows={3}
        maxLength={500}
      />
      <Button
        type="submit"
        disabled={!newComment.trim() || isSubmitting}
        size="sm"
        className="bg-ctea-teal hover:bg-ctea-teal/80 text-white"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
            Posting...
          </>
        ) : (
          <>
            <Send className="w-3 h-3 mr-2" />
            Post Comment
          </>
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
