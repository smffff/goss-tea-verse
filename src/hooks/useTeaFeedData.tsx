
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission, filterSubmissions } from '@/utils/submissionUtils';

export const useTeaFeedData = (activeFilter: string, sortBy: string) => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('useTeaFeedData - Fetching submissions from Supabase...');
      
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
        case 'controversial':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(30);

      if (error) {
        console.error('useTeaFeedData - Error fetching submissions:', error);
        throw error;
      }
      
      console.log('useTeaFeedData - Fetched submissions:', data?.length || 0);
      
      const transformedData = (data || []).map(transformSubmission);
      const filteredData = filterSubmissions(transformedData, activeFilter);
      
      console.log('useTeaFeedData - Filtered submissions:', filteredData.length);
      setSubmissions(filteredData);
    } catch (error) {
      console.error('useTeaFeedData - Error in fetchSubmissions:', error);
      toast({
        title: "Failed to Load Feed",
        description: "Couldn't fetch the latest tea. Please try refreshing.",
        variant: "destructive"
      });
      setSubmissions([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter, sortBy, toast]);

  return {
    submissions,
    setSubmissions,
    isLoading,
    fetchSubmissions
  };
};
