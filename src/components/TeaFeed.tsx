
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
        {submissions.map((submission) => (
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
        ))}
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
