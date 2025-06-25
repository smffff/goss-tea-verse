
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission, AIComment } from '@/types/teaFeed';
import { mockSubmissions } from '@/data/mockTeaSubmissions';

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
    fetchSubmissions();
    fetchAIComments();
  }, [activeFilter, sortBy]);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use mock data for now
      let filteredData = [...mockSubmissions];
      
      // Apply client-side filtering
      if (activeFilter !== 'all') {
        filteredData = filteredData.filter(submission => {
          const reactions = submission.reactions;
          switch (activeFilter) {
            case 'hot':
              return reactions.hot > reactions.cold;
            case 'spicy':
              return reactions.spicy > 50;
            case 'trending':
              return (reactions.hot + reactions.cold + reactions.spicy) > 200;
            case 'boosted':
              return (submission.boost_score || 0) > 100;
            case 'viral':
              return submission.is_viral;
            default:
              return true;
          }
        });
      }

      // Apply sorting
      filteredData.sort((a, b) => {
        switch (sortBy) {
          case 'reactions':
            return (b.reactions.hot + b.reactions.cold + b.reactions.spicy) - (a.reactions.hot + a.reactions.cold + a.reactions.spicy);
          case 'boosted':
            return (b.boost_score || 0) - (a.boost_score || 0);
          case 'controversial':
            return Math.abs(b.reactions.hot - b.reactions.cold) - Math.abs(a.reactions.hot - a.reactions.cold);
          default:
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });
      
      setSubmissions(filteredData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      // Fallback to mock data
      setSubmissions(mockSubmissions);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIComments = async () => {
    try {
      console.log('AI comments would be fetched here');
    } catch (error) {
      console.error('Error fetching AI comments:', error);
    }
  };

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    try {
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

      // Update local state
      setSubmissions(prev => prev.map(submission => {
        if (submission.id === submissionId) {
          const newReactions = { ...submission.reactions };
          newReactions[reactionType]++;
          return { ...submission, reactions: newReactions };
        }
        return submission;
      }));

      // Track user progression - use 'given' as the type
      incrementReaction('given');

      toast({
        title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
        description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
      });

    } catch (error) {
      console.error('Error adding reaction:', error);
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
      console.error('Error generating AI commentary:', error);
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
      console.error('Share error:', error);
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
