
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useTeaSubmissionActions = () => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const { toast } = useToast();

  const handleVote = (submissionId: string, voteType: 'up' | 'down', onVote?: (id: string, type: 'up' | 'down') => void) => {
    const newVote = userVote === voteType ? null : voteType;
    setUserVote(newVote);
    
    if (onVote) {
      onVote(submissionId, voteType);
    }
    
    toast({
      title: newVote ? `${newVote === 'up' ? 'Upvoted' : 'Downvoted'}!` : 'Vote removed',
      description: newVote ? 'Thanks for your feedback!' : 'Your vote has been removed',
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return {
    userVote,
    handleVote,
    formatTimeAgo
  };
};
