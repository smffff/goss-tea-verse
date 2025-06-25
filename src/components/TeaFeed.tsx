
import React from 'react';
import TeaSubmissionCard from './TeaSubmissionCard';
import HotTakesFilters from './HotTakesFilters';
import FeedSkeleton from './FeedSkeleton';
import ReportModal from './ReportModal';
import TeaFeedActions from './TeaFeedActions';
import { useTeaFeed } from '@/hooks/useTeaFeed';
import { TeaFeedProps } from '@/types/teaFeed';

const TeaFeed: React.FC<TeaFeedProps> = ({ filter: externalFilter }) => {
  const {
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
  } = useTeaFeed(externalFilter);

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <HotTakesFilters 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Feed Items */}
      <div className="space-y-6">
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
          submissions.map((submission) => (
            <div key={submission.id} className="relative">
              <TeaSubmissionCard
                submission={submission}
                onReaction={handleReaction}
                onBoostUpdated={handleBoostUpdated}
                onGenerateAI={generateAICommentary}
                aiComments={aiComments[submission.id] || []}
                isExpanded={expandedSubmissions.has(submission.id)}
                onToggleComments={() => toggleComments(submission.id)}
              />
              
              {/* Action Buttons */}
              <TeaFeedActions
                submissionId={submission.id}
                submissionContent={submission.content}
                copiedLink={copiedLink}
                onShare={handleShare}
                onReport={handleReport}
              />
            </div>
          ))
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setReportingSubmission(null);
        }}
        submissionId={reportingSubmission || ''}
      />
    </div>
  );
};

export default TeaFeed;
