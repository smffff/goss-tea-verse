
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TeaSubmission } from '@/types/teaFeed';

interface SimpleAIComment {
  id: string;
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  submission_id: string;
  created_at: string;
}

export const useSimpleAICommentary = () => {
  const [aiComments, setAiComments] = useState<Record<string, SimpleAIComment[]>>({});

  const generateAICommentary = async (submission: TeaSubmission, type: 'spicy' | 'smart' | 'memy' | 'savage' = 'spicy') => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-commentary-enhanced', {
        body: { 
          content: submission.content,
          category: submission.category,
          submissionId: submission.id,
          commentaryType: type
        }
      });

      if (error) throw error;
      
      if (data?.commentary) {
        const newComment: SimpleAIComment = {
          id: Date.now().toString(),
          content: data.commentary,
          type: type,
          submission_id: submission.id,
          created_at: new Date().toISOString()
        };

        setAiComments(prevComments => {
          const currentComments = prevComments[submission.id] || [];
          return {
            ...prevComments,
            [submission.id]: [...currentComments, newComment]
          };
        });
      }
    } catch (error) {
      console.error('useSimpleAICommentary - Error generating AI commentary:', error);
    }
  };

  return {
    aiComments,
    generateAICommentary
  };
};
