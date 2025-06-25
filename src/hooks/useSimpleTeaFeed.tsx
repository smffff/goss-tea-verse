
import { useState, useEffect } from 'react';
import { useSimpleReactions } from './useSimpleReactions';
import { useSimpleSharing } from './useSimpleSharing';
import { useSimpleAICommentary } from './useSimpleAICommentary';
import { useTeaFeedData } from './useTeaFeedData';
import { useTeaFeedRealtime } from './useTeaFeedRealtime';
import { useTeaFeedInteractions } from './useTeaFeedInteractions';

export const useSimpleTeaFeed = (externalFilter?: string) => {
  const [activeFilter, setActiveFilter] = useState(externalFilter || 'all');
  const [sortBy, setSortBy] = useState('latest');
  
  const { handleReaction } = useSimpleReactions();
  const { aiComments, generateAICommentary } = useSimpleAICommentary();
  const {
    expandedSubmissions,
    showReportModal,
    setShowReportModal,
    reportingSubmission,
    setReportingSubmission,
    toggleComments,
    handleReport,
    handleBoostUpdated
  } = useTeaFeedInteractions();

  // Update activeFilter when externalFilter changes
  useEffect(() => {
    if (externalFilter) {
      setActiveFilter(externalFilter);
    }
  }, [externalFilter]);

  const {
    submissions,
    setSubmissions,
    isLoading,
    fetchSubmissions
  } = useTeaFeedData(activeFilter, sortBy);

  const { copiedLink, handleShare } = useSimpleSharing(submissions);

  // Set up real-time subscriptions
  useTeaFeedRealtime({ setSubmissions });

  useEffect(() => {
    console.log('useSimpleTeaFeed - Initial load or filter change, fetching submissions...');
    fetchSubmissions();
  }, [activeFilter, sortBy, fetchSubmissions]);

  const handleReactionWrapper = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    const success = await handleReaction(submissionId, reactionType);
    
    if (success) {
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
    }
  };

  const handleBoostUpdatedWrapper = (submissionId: string, newBoost: number) => {
    handleBoostUpdated(submissionId, newBoost, setSubmissions);
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
    handleBoostUpdated: handleBoostUpdatedWrapper,
    generateAICommentary,
    toggleComments,
    handleShare,
    handleReport
  };
};
