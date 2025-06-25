
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
    const totalReactions = reactions.hot + reactions.cold + reactions.spicy;
    
    switch (activeFilter) {
      case 'hot':
        return reactions.hot > reactions.cold;
      case 'spicy':
        return reactions.spicy > 5;
      case 'trending':
        return totalReactions > 10;
      case 'boosted':
        return (submission.boost_score || 0) > 0;
      case 'viral':
        return submission.is_viral;
      default:
        return true;
    }
  });
};

export const calculateViralityScore = (reactions: { hot: number; cold: number; spicy: number }): number => {
  const total = reactions.hot + reactions.cold + reactions.spicy;
  const hotWeight = reactions.hot * 1.5;
  const spicyWeight = reactions.spicy * 2;
  return Math.round(hotWeight + reactions.cold + spicyWeight);
};
