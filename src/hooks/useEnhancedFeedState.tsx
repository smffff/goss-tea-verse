
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUserProgression } from '@/hooks/useUserProgression';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission, filterSubmissions } from '@/utils/submissionUtils';

interface FeedState {
  submissions: TeaSubmission[];
  isLoading: boolean;
  expandedSubmissions: Set<string>;
  activeFilter: string;
  sortBy: string;
}

export const useEnhancedFeedState = () => {
  const [feedState, setFeedState] = useState<FeedState>({
    submissions: [],
    isLoading: true,
    expandedSubmissions: new Set<string>(),
    activeFilter: 'all',
    sortBy: 'latest'
  });

  const { incrementReaction } = useUserProgression();
  const { toast } = useToast();

  const setSubmissions = (submissions: TeaSubmission[]) => {
    setFeedState(prev => ({ ...prev, submissions }));
  };

  const setIsLoading = (isLoading: boolean) => {
    setFeedState(prev => ({ ...prev, isLoading }));
  };

  const setExpandedSubmissions = (expandedSubmissions: Set<string>) => {
    setFeedState(prev => ({ ...prev, expandedSubmissions }));
  };

  const setActiveFilter = (activeFilter: string) => {
    setFeedState(prev => ({ ...prev, activeFilter }));
  };

  const setSortBy = (sortBy: string) => {
    setFeedState(prev => ({ ...prev, sortBy }));
  };

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      console.log('useEnhancedFeedState - Fetching submissions from Supabase...');
      
      let query = supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved');

      // Apply sorting based on current sortBy value
      const currentSortBy = feedState.sortBy;
      switch (currentSortBy) {
        case 'reactions':
          query = query.order('rating_count', { ascending: false });
          break;
        case 'spiciest':
          query = query.order('spiciness', { ascending: false });
          break;
        case 'chaotic':
          query = query.order('chaos', { ascending: false });
          break;
        case 'relevant':
          query = query.order('relevance', { ascending: false });
          break;
        case 'boosted':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(50);

      if (error) {
        console.error('useEnhancedFeedState - Error fetching submissions:', error);
        throw error;
      }
      
      console.log('useEnhancedFeedState - Fetched submissions:', data?.length || 0);
      
      const transformedData = (data || []).map(transformSubmission);
      
      // Apply filtering based on current activeFilter value
      const currentFilter = feedState.activeFilter;
      const filteredData = filterSubmissions(transformedData, currentFilter);
      
      console.log('useEnhancedFeedState - Filtered submissions:', filteredData.length);
      setSubmissions(filteredData);
    } catch (error) {
      console.error('useEnhancedFeedState - Error in fetchSubmissions:', error);
      toast({
        title: "Failed to Load Feed",
        description: "Couldn't fetch the latest tea. Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    try {
      console.log('useEnhancedFeedState - Adding reaction:', { submissionId, reactionType });
      
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      const { data: existingReaction } = await supabase
        .from('user_reactions')
        .select('*')
        .eq('submission_id', submissionId)
        .eq('anonymous_token', anonymousToken)
        .single();

      if (existingReaction) {
        await supabase
          .from('user_reactions')
          .update({ reaction_type: reactionType })
          .eq('id', existingReaction.id);
      } else {
        await supabase
          .from('user_reactions')
          .insert({
            submission_id: submissionId,
            anonymous_token: anonymousToken,
            reaction_type: reactionType
          });

        await incrementReaction('given');
      }

      // Update submissions with new reaction count
      const updatedSubmissions = feedState.submissions.map(item => {
        if (item.id === submissionId) {
          const newReactions = { ...item.reactions };
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          return { ...item, reactions: newReactions };
        }
        return item;
      });
      
      setSubmissions(updatedSubmissions);

      toast({
        title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
        description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
      });

    } catch (error) {
      console.error('useEnhancedFeedState - Error handling reaction:', error);
      toast({
        title: "Reaction Failed",
        description: "Couldn't add your reaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBoostUpdated = (submissionId: string, newBoost: number) => {
    const updatedSubmissions = feedState.submissions.map(item => 
      item.id === submissionId ? { ...item, boost_score: newBoost } : item
    );
    setSubmissions(updatedSubmissions);
  };

  const toggleComments = (submissionId: string) => {
    const newSet = new Set(feedState.expandedSubmissions);
    if (newSet.has(submissionId)) {
      newSet.delete(submissionId);
    } else {
      newSet.add(submissionId);
    }
    setExpandedSubmissions(newSet);
  };

  return {
    submissions: feedState.submissions,
    setSubmissions,
    isLoading: feedState.isLoading,
    expandedSubmissions: feedState.expandedSubmissions,
    activeFilter: feedState.activeFilter,
    setActiveFilter,
    sortBy: feedState.sortBy,
    setSortBy,
    fetchSubmissions,
    handleReaction,
    handleBoostUpdated,
    toggleComments
  };
};
