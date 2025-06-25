
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TeaSubmission, AIComment } from '@/types/teaFeed';
import { useToast } from '@/hooks/use-toast';

export const useAICommentary = () => {
  const [aiComments, setAiComments] = useState<{ [key: string]: AIComment[] }>({});
  const { toast } = useToast();

  const generateAICommentary = async (submission: TeaSubmission, type: 'spicy' | 'smart' | 'memy' | 'savage' = 'spicy') => {
    try {
      console.log('useAICommentary - Generating AI commentary:', { submissionId: submission.id, type });
      
      const { data, error } = await supabase.functions.invoke('generate-ai-commentary', {
        body: {
          submission_id: submission.id,
          content: submission.content,
          type
        }
      });

      if (error) {
        console.error('useAICommentary - Supabase function error:', error);
        throw error;
      }

      if (data) {
        console.log('useAICommentary - AI commentary generated:', data);
        setAiComments(prev => ({
          ...prev,
          [submission.id]: [...(prev[submission.id] || []), data]
        }));

        toast({
          title: "AI Commentary Generated! 🤖",
          description: "CTeaBot has shared their thoughts on this tea!",
        });
      }
    } catch (error) {
      console.error('useAICommentary - Error generating AI commentary:', error);
      toast({
        title: "AI Commentary Failed",
        description: "CTeaBot is taking a coffee break. Try again later!",
        variant: "destructive"
      });
    }
  };

  return { aiComments, generateAICommentary };
};
