
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  anonymous_token: string;
  created_at: string;
  likes: number;
  replies: Comment[];
  user_reaction?: 'like' | null;
}

export const useComments = (submissionId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      
      // Mock data for now since the table doesn't exist
      const mockComments: Comment[] = [
        {
          id: '1',
          content: 'This is some hot tea! 🔥',
          anonymous_token: 'anon_1',
          created_at: new Date().toISOString(),
          likes: 5,
          replies: [],
          user_reaction: null
        },
        {
          id: '2',
          content: 'Source? This sounds too good to be true.',
          anonymous_token: 'anon_2',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          likes: 2,
          replies: [],
          user_reaction: null
        }
      ];
      
      setComments(mockComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (content: string, parentId?: string) => {
    try {
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      const newComment: Comment = {
        id: Date.now().toString(),
        content,
        anonymous_token: anonymousToken,
        created_at: new Date().toISOString(),
        likes: 0,
        replies: [],
        user_reaction: null
      };

      if (parentId) {
        setComments(prev => prev.map(comment => 
          comment.id === parentId 
            ? { ...comment, replies: [...comment.replies, newComment] }
            : comment
        ));
      } else {
        setComments(prev => [newComment, ...prev]);
      }

      toast({
        title: "Comment Added! 💬",
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    }
  };

  const toggleLike = async (commentId: string) => {
    try {
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          const isLiked = comment.user_reaction === 'like';
          return {
            ...comment,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
            user_reaction: isLiked ? null : 'like' as const
          };
        }
        return comment;
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (submissionId) {
      fetchComments();
    }
  }, [submissionId]);

  return {
    comments,
    isLoading,
    addComment,
    toggleLike,
    refetch: fetchComments
  };
};
