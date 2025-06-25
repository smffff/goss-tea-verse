
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

interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  evidence_urls: string[] | null;
  reactions: { hot: number; cold: number; spicy: number };
  created_at: string;
  average_rating: number;
  rating_count: number;
  has_evidence: boolean;
  boost_score?: number;
  credibility_score?: number;
  verification_level?: 'none' | 'basic' | 'verified' | 'trusted' | 'legendary';
  memeability_score?: number;
  viral_potential?: number;
  engagement_rate?: number;
  is_trending?: boolean;
}

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
          
          // Only add if status is approved
          if (newSubmission.status === 'approved') {
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
          
          setSubmissions(prev => prev.map(sub => 
            sub.id === updatedSubmission.id 
              ? transformSubmission(updatedSubmission)
              : sub
          ));
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
      // Add synthetic enhanced metrics for demo
      credibility_score: Math.floor(Math.random() * 100),
      verification_level: ['none', 'basic', 'verified', 'trusted', 'legendary'][Math.floor(Math.random() * 5)] as 'none' | 'basic' | 'verified' | 'trusted' | 'legendary',
      memeability_score: Math.floor(Math.random() * 100),
      viral_potential: Math.floor(Math.random() * 100),
      engagement_rate: Math.min(100, parsedReactions.hot + parsedReactions.cold + parsedReactions.spicy),
      is_trending: Math.random() > 0.8
    };
  };

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      console.log('EnhancedTeaFeed - Fetching submissions from Supabase...');
      
      let query = supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved'); // Only fetch approved submissions

      // Apply sorting
      switch (sortBy) {
        case 'reactions':
          query = query.order('rating_count', { ascending: false });
          break;
        case 'controversial':
          query = query.order('created_at', { ascending: false });
          break;
        case 'boosted':
          query = query.order('created_at', { ascending: false });
          break;
        case 'credibility':
          query = query.order('created_at', { ascending: false });
          break;
        case 'viral':
          query = query.order('rating_count', { ascending: false });
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

      // Apply client-side filtering with enhanced options
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
              return submission.is_trending || (reactions.hot + reactions.cold + reactions.spicy) > 10;
            case 'boosted':
              return (submission.boost_score || 0) > 0;
            case 'verified':
              return submission.verification_level !== 'none';
            case 'memeworthy':
              return (submission.memeability_score || 0) > 70;
            case 'credible':
              return (submission.credibility_score || 0) > 70;
            default:
              return true;
          }
        });
      }
      
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
      const { data, error } = await supabase.functions.invoke('generate-ai-commentary', {
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
