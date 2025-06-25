
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission, filterSubmissions } from '@/utils/submissionUtils';
import { useSimpleReactions } from './useSimpleReactions';
import { useSimpleSharing } from './useSimpleSharing';
import { useSimpleAICommentary } from './useSimpleAICommentary';

export const useSimpleTeaFeed = (externalFilter?: string) => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState(externalFilter || 'all');
  const [sortBy, setSortBy] = useState('latest');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingSubmission, setReportingSubmission] = useState<string | null>(null);
  
  const { handleReaction } = useSimpleReactions();
  const { copiedLink, handleShare } = useSimpleSharing(submissions);
  const { aiComments, generateAICommentary } = useSimpleAICommentary();
  const { toast } = useToast();

  // Update activeFilter when externalFilter changes
  useEffect(() => {
    if (externalFilter) {
      setActiveFilter(externalFilter);
    }
  }, [externalFilter]);

  useEffect(() => {
    console.log('useSimpleTeaFeed - Initial load or filter change, fetching submissions...');
    fetchSubmissions();

    // Set up real-time subscription for new submissions
    const channel = supabase
      .channel('tea_feed_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tea_submissions'
        },
        (payload) => {
          console.log('useSimpleTeaFeed - New submission received via real-time:', payload);
          const newSubmission = payload.new as any;
          
          // Only add if status is approved AND visible
          if (newSubmission.status === 'approved' && newSubmission.visible === true) {
            const transformedSubmission = transformSubmission(newSubmission);
            setSubmissions(prev => [transformedSubmission, ...prev]);
            
            toast({
              title: "New Tea Alert! ☕",
              description: "Fresh gossip just dropped!",
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tea_submissions'
        },
        (payload) => {
          console.log('useSimpleTeaFeed - Submission updated via real-time:', payload);
          const updatedSubmission = payload.new as any;
          
          // Handle visibility updates (AI verification completed)
          if (updatedSubmission.status === 'approved' && updatedSubmission.visible === true) {
            const transformedSubmission = transformSubmission(updatedSubmission);
            
            setSubmissions(prev => {
              const existingIndex = prev.findIndex(sub => sub.id === updatedSubmission.id);
              if (existingIndex >= 0) {
                // Update existing submission
                const newSubmissions = [...prev];
                newSubmissions[existingIndex] = transformedSubmission;
                return newSubmissions;
              } else {
                // Add new visible submission
                return [transformedSubmission, ...prev];
              }
            });
            
            toast({
              title: "Tea Verified! ☕",
              description: "New verified tea just appeared in the feed!",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('useSimpleTeaFeed - Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [activeFilter, sortBy]);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      console.log('useSimpleTeaFeed - Fetching submissions from Supabase...');
      
      let query = supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved')
        .eq('visible', true); // Only fetch visible submissions

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
        console.error('useSimpleTeaFeed - Error fetching submissions:', error);
        throw error;
      }
      
      console.log('useSimpleTeaFeed - Fetched submissions:', data?.length || 0);
      
      const transformedData = (data || []).map(transformSubmission);
      const filteredData = filterSubmissions(transformedData, activeFilter);
      
      console.log('useSimpleTeaFeed - Filtered submissions:', filteredData.length);
      setSubmissions(filteredData);
    } catch (error) {
      console.error('useSimpleTeaFeed - Error in fetchSubmissions:', error);
      toast({
        title: "Failed to Load Feed",
        description: "Couldn't fetch the latest tea. Please try refreshing.",
        variant: "destructive"
      });
      setSubmissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactionWrapper = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    const success = await handleReaction(submissionId, reactionType);
    
    if (success) {
      // Update local state optimistically
      setSubmissions(prev => prev.map(submission => {
        if (submission.id === submissionId) {
          const newReactions = { ...submission.reactions };
          newReactions[reactionType]++;
          return { ...submission, reactions: newReactions };
        }
        return submission;
      }));
    }
  };

  const handleBoostUpdated = (submissionId: string, newBoost: number) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, boost_score: newBoost }
        : submission
    ));
  };

  const toggleComments = (submissionId: string) => {
    setExpandedSubmissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  const handleReport = (submissionId: string) => {
    setReportingSubmission(submissionId);
    setShowReportModal(true);
  };

  return {
    submissions,
    aiComments,
    isLoading,
    expandedSubmissions,
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    showReportModal,
    setShowReportModal,
    reportingSubmission,
    setReportingSubmission,
    copiedLink,
    handleReaction: handleReactionWrapper,
    handleBoostUpdated,
    generateAICommentary,
    toggleComments,
    handleShare,
    handleReport
  };
};
