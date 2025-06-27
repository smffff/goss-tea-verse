import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission, filterSubmissions } from '@/utils/submissionUtils';
import { secureLog } from '@/utils/secureLog';

export const useEnhancedFeedState = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const { toast } = useToast();

  const fetchSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      try {
        secureLog.info('useEnhancedFeedState - Fetching submissions...');
      } catch (logError) {
        console.log('useEnhancedFeedState - Fetching submissions...');
      }
      
      let query = supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved');

      // Apply sorting
      switch (sortBy) {
        case 'reactions':
          query = query.order('rating_count', { ascending: false });
          break;
        case 'boosted':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(30);

      if (error) throw error;
      
      const transformedData = (data || []).map(transformSubmission);
      const filteredData = filterSubmissions(transformedData, activeFilter);
      
      setSubmissions(filteredData);
      try {
        secureLog.info('useEnhancedFeedState - Fetched submissions:', filteredData.length);
      } catch (logError) {
        console.log('useEnhancedFeedState - Fetched submissions:', filteredData.length);
      }
    } catch (error) {
      try {
        secureLog.error('useEnhancedFeedState - Error:', error);
      } catch (logError) {
        console.error('useEnhancedFeedState - Error:', error);
      }
      toast({
        title: "Failed to Load Feed",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter, sortBy, toast]);

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
      try {
        secureLog.error('useEnhancedFeedState - Reaction error:', error);
      } catch (logError) {
        console.error('useEnhancedFeedState - Reaction error:', error);
      }
      return false;
    }
  }, []);

  const handleBoostUpdated = useCallback((submissionId: string, newBoost: number) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, boost_score: newBoost }
        : submission
    ));
  }, []);

  const toggleComments = useCallback((submissionId: string) => {
    setExpandedSubmissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  }, []);

  return {
    submissions,
    setSubmissions,
    isLoading,
    expandedSubmissions,
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    fetchSubmissions,
    handleReaction,
    handleBoostUpdated,
    toggleComments
  };
};
