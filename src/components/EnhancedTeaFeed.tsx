
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import EnhancedTeaSubmissionCard from './EnhancedTeaSubmissionCard';
import HotTakesFilters from './HotTakesFilters';
import LoadingSpinner from './LoadingSpinner';
import FeedSkeleton from './FeedSkeleton';
import ContentModeSelector from './ContentModeSelector';
import WalletConnectOnboarding from './WalletConnectOnboarding';
import { useWallet } from './WalletProvider';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission, filterSubmissions } from '@/utils/submissionUtils';

interface AIComment {
  id: string;
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  submission_id: string;
  created_at: string;
}

const EnhancedTeaFeed = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [aiComments, setAiComments] = useState<{ [key: string]: AIComment[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'quick' | 'detailed'>('detailed');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { incrementReaction } = useUserProgression();
  const { wallet } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    console.log('EnhancedTeaFeed - Initial load, fetching submissions...');
    fetchSubmissions();
    
    // Check if user needs onboarding
    const hasSeenOnboarding = localStorage.getItem('ctea_onboarding_complete');
    if (!hasSeenOnboarding && !wallet.isConnected) {
      setShowOnboarding(true);
    }

    // Set up real-time subscription for new submissions
    const channel = supabase
      .channel('tea_submissions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tea_submissions'
        },
        (payload) => {
          console.log('EnhancedTeaFeed - New submission received via real-time:', payload);
          const newSubmission = payload.new as any;
          
          // Only add if status is approved and visible
          if (newSubmission.status === 'approved' && newSubmission.visible === true) {
            const transformedSubmission = transformSubmission(newSubmission);
            setSubmissions(prev => [transformedSubmission, ...prev]);
            
            toast({
              title: "New Tea Alert! ☕",
              description: "Fresh gossip just dropped in the feed!",
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
          console.log('EnhancedTeaFeed - Submission updated via real-time:', payload);
          const updatedSubmission = payload.new as any;
          
          // Handle AI verification completed - submission becomes visible
          if (updatedSubmission.status === 'approved' && updatedSubmission.visible === true && updatedSubmission.ai_rated === true) {
            const transformedSubmission = transformSubmission(updatedSubmission);
            
            setSubmissions(prev => {
              const existingIndex = prev.findIndex(sub => sub.id === updatedSubmission.id);
              if (existingIndex >= 0) {
                const newSubmissions = [...prev];
                newSubmissions[existingIndex] = transformedSubmission;
                return newSubmissions;
              } else {
                return [transformedSubmission, ...prev];
              }
            });
            
            toast({
              title: "AI Analysis Complete! 🤖",
              description: "Tea has been rated and is now live!",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('EnhancedTeaFeed - Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    console.log('EnhancedTeaFeed - Filter or sort changed, refetching...');
    fetchSubmissions();
  }, [activeFilter, sortBy]);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      console.log('EnhancedTeaFeed - Fetching submissions from Supabase...');
      
      let query = supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved')
        .eq('visible', true)
        .eq('ai_rated', true); // Only fetch AI-rated submissions

      // Apply sorting
      switch (sortBy) {
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
        console.error('EnhancedTeaFeed - Error fetching submissions:', error);
        throw error;
      }
      
      console.log('EnhancedTeaFeed - Fetched submissions:', data?.length || 0);
      
      const transformedData = (data || []).map(transformSubmission);
      const filteredData = filterSubmissions(transformedData, activeFilter);
      
      console.log('EnhancedTeaFeed - Filtered submissions:', filteredData.length);
      setSubmissions(filteredData);
    } catch (error) {
      console.error('EnhancedTeaFeed - Error in fetchSubmissions:', error);
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
      console.log('EnhancedTeaFeed - Adding reaction:', { submissionId, reactionType });
      
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

      // Update local state optimistically
      setSubmissions(prev => prev.map(sub => {
        if (sub.id === submissionId) {
          const newReactions = { ...sub.reactions };
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          return { ...sub, reactions: newReactions };
        }
        return sub;
      }));

      toast({
        title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
        description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
      });

    } catch (error) {
      console.error('EnhancedTeaFeed - Error handling reaction:', error);
      toast({
        title: "Reaction Failed",
        description: "Couldn't add your reaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBoostUpdated = (submissionId: string, newBoost: number) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return { ...sub, boost_score: newBoost };
      }
      return sub;
    }));
  };

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
        setAiComments(prev => ({
          ...prev,
          [submission.id]: [
            ...(prev[submission.id] || []),
            {
              id: Date.now().toString(),
              content: data.commentary,
              type: type,
              submission_id: submission.id,
              created_at: new Date().toISOString()
            }
          ]
        }));
      }
    } catch (error) {
      console.error('EnhancedTeaFeed - Error generating AI commentary:', error);
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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('ctea_onboarding_complete', 'true');
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <WalletConnectOnboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="space-y-8 md:space-y-6">
      {/* Enhanced Controls */}
      <div className="space-y-4">
        <ContentModeSelector
          currentMode={viewMode}
          onModeChange={setViewMode}
        />
        
        <HotTakesFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-bold text-white mb-2">No tea found</h3>
          <p className="text-gray-400">
            {activeFilter === 'all' 
              ? "Be the first to spill some tea!" 
              : "Try adjusting your filters to find more content."}
          </p>
        </div>
      ) : (
        <div className="space-y-8 md:space-y-6">
          {submissions.map((submission) => (
            <EnhancedTeaSubmissionCard
              key={submission.id}
              submission={submission}
              aiComments={aiComments[submission.id] || []}
              isExpanded={expandedSubmissions.has(submission.id)}
              onReaction={handleReaction}
              onToggleComments={toggleComments}
              onGenerateAI={generateAICommentary}
              onBoostUpdated={handleBoostUpdated}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedTeaFeed;
