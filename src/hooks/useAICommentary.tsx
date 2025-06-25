
import { useState } from 'react';
import { TeaSubmission, AIComment } from '@/types/teaFeed';

export const useAICommentary = () => {
  const [aiComments, setAiComments] = useState<{ [key: string]: AIComment[] }>({});

  const generateAICommentary = async (submission: TeaSubmission, type: 'spicy' | 'smart' | 'memy' | 'savage' = 'spicy') => {
    try {
      const response = await fetch('/api/generate-ai-commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: submission.id,
          content: submission.content,
          type
        })
      });

      if (response.ok) {
        const comment = await response.json();
        setAiComments(prev => ({
          ...prev,
          [submission.id]: [...(prev[submission.id] || []), comment]
        }));
      }
    } catch (error) {
      console.error('useAICommentary - Error generating AI commentary:', error);
    }
  };

  return { aiComments, generateAICommentary };
};
