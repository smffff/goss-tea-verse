import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { moderateText } from '@/lib/moderation';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  anonymous_token: string;
}

interface CommentSectionProps {
  submissionId: string;
}

const CommentSection = ({ submissionId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [submissionId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('submission_id', submissionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments((data || []) as Comment[]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const result = moderateText(newComment);
    if (!result.clean) {
      toast({
        title: "Comment Blocked",
        description: result.reason,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      const { data, error } = await supabase
        .from('messages')
        .insert({
          content: newComment.trim(),
          submission_id: submissionId,
          anonymous_token: anonymousToken
        })
        .select()
        .single();

      if (error) throw error;

      // Generate AI response
      await supabase.functions.invoke('generate-ai-commentary', {
        body: { 
          content: newComment.trim(),
          category: 'general',
          submissionId: submissionId,
          isComment: true
        }
      });

      setComments(prev => [...prev, data]);
      setNewComment('');
      
      toast({
        title: "Comment posted! ☕",
        description: "Your comment is live and CTeaBot might respond soon!"
      });

      // Refresh comments to get AI response
      setTimeout(fetchComments, 1000);
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Failed to post comment",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
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

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
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

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-3 bg-ctea-darker/50 border-ctea-teal/20">
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
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No comments yet. Be the first to start the conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
