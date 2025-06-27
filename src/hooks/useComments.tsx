import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getOrCreateSecureToken } from '@/utils/securityUtils';
import { secureLog } from '@/utils/secureLog';

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

  const fetchComments = async (): Promise<void> => {
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
    } catch (error: unknown) {
      try {
        secureLog.error('Error fetching comments:', error);
      } catch (logError) {
        console.error('Error fetching comments:', error);
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load comments",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (content: string, parentId?: string): Promise<void> => {
    try {
      // Use secure token generation and content sanitization
      const anonymousToken = getOrCreateSecureToken();
      
      // Basic content validation and sanitization
      const sanitizedContent = content.trim();
      if (!sanitizedContent || sanitizedContent.length < 1) {
        throw new Error('Comment cannot be empty');
      }
      
      if (sanitizedContent.length > 500) {
        throw new Error('Comment is too long (max 500 characters)');
      }

      // Check for potentially harmful content
      const suspiciousPatterns = [
        /<script[^>]*>/i,
        /javascript:/i,
        /on\w+\s*=/i
      ];

      if (suspiciousPatterns.some(pattern => pattern.test(sanitizedContent))) {
        throw new Error('Comment contains invalid content');
      }

      const newComment: Comment = {
        id: Date.now().toString(),
        content: sanitizedContent,
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
    } catch (error: unknown) {
      try {
        secureLog.error('Error adding comment:', error);
      } catch (logError) {
        console.error('Error adding comment:', error);
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post comment",
        variant: "destructive"
      });
    }
  };

  const toggleLike = async (commentId: string): Promise<void> => {
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
    } catch (error: unknown) {
      try {
        secureLog.error('Error toggling like:', error);
      } catch (logError) {
        console.error('Error toggling like:', error);
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update like",
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
