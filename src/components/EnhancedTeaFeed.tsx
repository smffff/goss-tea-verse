
import React, { useEffect } from 'react';
import EnhancedTeaSubmissionCard from '@/components/EnhancedTeaSubmissionCard';
import FeedSkeleton from '@/components/FeedSkeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedFeedState } from '@/hooks/useEnhancedFeedState';
import { useEnhancedRealTime } from '@/hooks/useEnhancedRealTime';

const EnhancedTeaFeed = () => {
  const {
    submissions,
    setSubmissions,
    isLoading,
    fetchSubmissions,
    handleReaction,
    handleBoostUpdated
  } = useEnhancedFeedState();

  const { toast } = useToast();

  // Set up real-time updates
  useEnhancedRealTime({ setSubmissions });

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleRefresh = async () => {
    await fetchSubmissions();
    toast({
      title: "Feed Refreshed!",
      description: "Latest tea has been loaded",
    });
  };

  const handleVote = (submissionId: string, voteType: 'up' | 'down') => {
    console.log(`Vote ${voteType} on submission ${submissionId}`);
    // TODO: Implement voting logic
  };

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Coffee className="w-5 h-5 text-[#00d1c1]" />
          Latest Tea
        </h2>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="border-[#00d1c1]/30 text-[#00d1c1] hover:bg-[#00d1c1]/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Feed Content */}
      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-bold text-white mb-2">No tea found</h3>
          <p className="text-gray-400">Be the first to spill some tea!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <EnhancedTeaSubmissionCard
              key={submission.id}
              submission={submission}
              onReaction={handleReaction}
              onVote={handleVote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedTeaFeed;
