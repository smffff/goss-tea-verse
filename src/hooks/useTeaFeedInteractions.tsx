
import { useState } from 'react';
import { TeaSubmission } from '@/types/teaFeed';

export const useTeaFeedInteractions = () => {
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingSubmission, setReportingSubmission] = useState<string | null>(null);

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

  const handleReport = (submissionId: string) => {
    setReportingSubmission(submissionId);
    setShowReportModal(true);
  };

  const handleBoostUpdated = (
    submissionId: string, 
    newBoost: number,
    setSubmissions: React.Dispatch<React.SetStateAction<TeaSubmission[]>>
  ) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, boost_score: newBoost }
        : submission
    ));
  };

  return {
    expandedSubmissions,
    showReportModal,
    setShowReportModal,
    reportingSubmission,
    setReportingSubmission,
    toggleComments,
    handleReport,
    handleBoostUpdated
  };
};
