
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission, AIComment } from '@/types/teaFeed';

export const useTeaFeed = (externalFilter?: string) => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [aiComments, setAiComments] = useState<{ [key: string]: AIComment[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState(externalFilter || 'all');
  const [sortBy, setSortBy] = useState('latest');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingSubmission, setReportingSubmission] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const { incrementReaction } = useUserProgression();
  const { toast } = useToast();

  // Update activeFilter when externalFilter changes
  useEffect(() => {
    if (externalFilter) {
      setActiveFilter(externalFilter);
    }
  }, [externalFilter]);

  useEffect(() => {
    console.log('useTeaFeed - Initial load or filter change, fetching submissions...');
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
          console.log('useTeaFeed - New submission received via real-time:', payload);
          const newSubmission = payload.new as any;
          
          // Only add if status is approved
          if (newSubmission.status === 'approved') {
            const transformedSubmission = transformSubmission(newSubmission);
            setSubmissions(prev => [transformedSubmission, ...prev]);
            
            toast({
              title: "New Tea Alert! ☕",
              description: "Fresh gossip just dropped!",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('useTeaFeed - Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [activeFilter, sortBy]);

  const transformSubmission = (submission: any): TeaSubmission => {
    // Safely parse reactions
    let parsedReactions = { hot: 0, cold: 0, spicy: 0 };
    if (submission.reactions && typeof submission.reactions === 'object') {
      const reactions = submission.reactions as any;
      parsedReactions = {
        hot: reactions.hot || 0,
        cold: reactions.cold || 0,
        spicy: reactions.spicy || 0
      };
    }

    return {
      ...submission,
      reactions: parsedReactions,
      boost_score: submission.boost_score || 0,
      is_viral: (parsedReactions.hot + parsedReactions.cold + parsedReactions.spicy) > 50
    };
  };

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      console.log('useTeaFeed - Fetching submissions from Supabase...');
      
      let query = supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved'); // Only fetch approved submissions

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
        console.error('useTeaFeed - Error fetching submissions:', error);
        throw error;
      }
      
      console.log('useTeaFeed - Fetched submissions:', data?.length || 0);
      
      const transformedData = (data || []).map(transformSubmission);

      // Apply client-side filtering
      let filteredData = transformedData;
      if (activeFilter !== 'all') {
        filteredData = transformedData.filter(submission => {
          const reactions = submission.reactions;
          switch (activeFilter) {
            case 'hot':
              return reactions.hot > reactions.cold;
            case 'spicy':
              return reactions.spicy > 5;
            case 'trending':
              return (reactions.hot + reactions.cold + reactions.spicy) > 10;
            case 'boosted':
              return (submission.boost_score || 0) > 0;
            case 'viral':
              return submission.is_viral;
            default:
              return true;
          }
        });
      }
      
      console.log('useTeaFeed - Filtered submissions:', filteredData.length);
      setSubmissions(filteredData);
    } catch (error) {
      console.error('useTeaFeed - Error in fetchSubmissions:', error);
      toast({
        title: "Failed to Load Feed",
        description: "Couldn't fetch the latest tea. Please try refreshing.",
        variant: "destructive"
      });
      // Set empty array on error instead of using mock data
      setSubmissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    try {
      console.log('useTeaFeed - Adding reaction:', { submissionId, reactionType });
      
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
        // Update existing reaction
        await supabase
          .from('user_reactions')
          .update({ reaction_type: reactionType })
          .eq('id', existingReaction.id);
      } else {
        // Create new reaction
        await supabase
          .from('user_reactions')
          .insert({
            submission_id: submissionId,
            anonymous_token: anonymousToken,
            reaction_type: reactionType
          });
      }

      // Update local state optimistically
      setSubmissions(prev => prev.map(submission => {
        if (submission.id === submissionId) {
          const newReactions = { ...submission.reactions };
          newReactions[reactionType]++;
          return { ...submission, reactions: newReactions };
        }
        return submission;
      }));

      // Track user progression
      incrementReaction('given');

      toast({
        title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
        description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
      });

    } catch (error) {
      console.error('useTeaFeed - Error adding reaction:', error);
      toast({
        title: "Reaction Failed",
        description: "Couldn't add your reaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBoostUpdated = (submissionId: string, newBoost: number) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, boost_score: newBoost }
        : submission
    ));
  };

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
      console.error('useTeaFeed - Error generating AI commentary:', error);
    }
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

  const handleShare = async (submissionId: string, platform: 'twitter' | 'copy') => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const shareUrl = `${window.location.origin}/feed?submission=${submissionId}`;
    const shareText = `🔥 Hot Tea Alert: ${submission.content.substring(0, 100)}... #CTea #CryptoGossip`;

    try {
      if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopiedLink(submissionId);
        toast({
          title: "Link Copied! 📋",
          description: "Share link copied to clipboard",
        });
        setTimeout(() => setCopiedLink(null), 2000);
      }
    } catch (error) {
      console.error('useTeaFeed - Share error:', error);
      toast({
        title: "Share Failed",
        description: "Couldn't share content. Please try again.",
        variant: "destructive"
      });
    }
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
    handleReaction,
    handleBoostUpdated,
    generateAICommentary,
    toggleComments,
    handleShare,
    handleReport
  };
};
