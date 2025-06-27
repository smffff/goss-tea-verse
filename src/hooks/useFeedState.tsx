import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission } from '@/utils/submissionUtils';

export const useFeedState = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      secureLog.info('Fetching submissions...');
      
      const { data, error } = await supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      
      const transformedData = (data || []).map(transformSubmission);
      setSubmissions(transformedData);
      secureLog.info('Fetched submissions:', transformedData.length);
    } catch (error) {
      secureLog.error('Error fetching submissions:', error);
      toast({
        title: "Failed to Load Feed",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleReaction = useCallback(async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    try {
      // Update local state optimistically
      setSubmissions(prev => prev.map(submission => {
        if (submission.id === submissionId) {
          return {
            ...submission,
            reactions: {
              ...submission.reactions,
              [reactionType]: submission.reactions[reactionType] + 1
            }
          };
        }
        return submission;
      }));
      
      return true;
    } catch (error) {
      secureLog.error('Reaction error:', error);
      return false;
    }
  }, []);

  return {
    submissions,
    setSubmissions,
    isLoading,
    fetchSubmissions,
    handleReaction
  };
};
