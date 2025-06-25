
import { TeaSubmission } from '@/types/teaFeed';

export const transformSubmission = (submission: any): TeaSubmission => {
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
    is_viral: (parsedReactions.hot + parsedReactions.cold + parsedReactions.spicy) > 50
  };
};

export const filterSubmissions = (submissions: TeaSubmission[], activeFilter: string): TeaSubmission[] => {
  if (activeFilter === 'all') return submissions;

  return submissions.filter(submission => {
    const reactions = submission.reactions;
    switch (activeFilter) {
      case 'hot':
        return reactions.hot > reactions.cold;
      case 'spicy':
        return reactions.spicy > 5;
      case 'trending':
        return (reactions.hot + reactions.cold + reactions.spicy) > 10;
      case 'boosted':
        return (submission.boost_score || 0) > 0;
      case 'viral':
        return submission.is_viral;
      default:
        return true;
    }
  });
};
