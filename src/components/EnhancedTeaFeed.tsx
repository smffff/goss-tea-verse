
import React, { useState, useEffect } from 'react';
import EnhancedTeaSubmissionCard from './EnhancedTeaSubmissionCard';
import HotTakesFilters from './HotTakesFilters';
import FeedSkeleton from './FeedSkeleton';
import ContentModeSelector from './ContentModeSelector';
import WalletConnectOnboarding from './WalletConnectOnboarding';
import { useWallet } from './WalletProvider';
import { useEnhancedFeedState } from '@/hooks/useEnhancedFeedState';
import { useEnhancedAIComments } from '@/hooks/useEnhancedAIComments';
import { useEnhancedRealTime } from '@/hooks/useEnhancedRealTime';

const EnhancedTeaFeed = () => {
  const [viewMode, setViewMode] = useState<'quick' | 'detailed'>('detailed');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { wallet } = useWallet();

  const {
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
  } = useEnhancedFeedState();

  const { aiComments, generateAICommentary } = useEnhancedAIComments();

  useEnhancedRealTime({ setSubmissions, activeFilter, sortBy });

  useEffect(() => {
    console.log('EnhancedTeaFeed - Initial load, fetching submissions...');
    fetchSubmissions();
    
    const hasSeenOnboarding = localStorage.getItem('ctea_onboarding_complete');
    if (!hasSeenOnboarding && !wallet.isConnected) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    console.log('EnhancedTeaFeed - Filter or sort changed, refetching...');
    fetchSubmissions();
  }, [activeFilter, sortBy]);

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
