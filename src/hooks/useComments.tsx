
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { moderateText } from '@/lib/moderation';
import { Comment } from '@/types/comments';

export const useComments = (submissionId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id, content, created_at, anonymous_token')
        .eq('submission_id', submissionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (content: string): Promise<boolean> => {
    const result = moderateText(content);
    if (!result.clean) {
      toast({
        title: "Comment Blocked",
        description: result.reason,
        variant: "destructive"
      });
      return false;
    }

    try {
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      const { data, error } = await supabase
        .from('messages')
        .insert({
          content: content.trim(),
          submission_id: submissionId,
          anonymous_token: anonymousToken
        })
        .select('id, content, created_at, anonymous_token')
        .single();

      if (error) throw error;

      // Generate AI response
      await supabase.functions.invoke('generate-ai-commentary', {
        body: { 
          content: content.trim(),
          category: 'general',
          submissionId: submissionId,
          isComment: true
        }
      });

      if (data) {
        setComments(prev => [...prev, data]);
      }
      
      toast({
        title: "Comment posted! ☕",
        description: "Your comment is live and CTeaBot might respond soon!"
      });

      // Refresh comments to get AI response
      setTimeout(fetchComments, 1000);
      return true;
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Failed to post comment",
        description: "Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [submissionId]);

  return {
    comments,
    isLoading,
    addComment,
    fetchComments
  };
};
