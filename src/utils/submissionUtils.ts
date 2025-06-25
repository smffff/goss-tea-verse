
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
    // Include AI reaction if available
    ai_reaction: submission.ai_reaction || null,
    // Ensure visibility field is included
    visible: submission.visible || false,
    // Include Twitter integration fields
    tweeted: submission.tweeted || false,
    tweet_id: submission.tweet_id || null
  };
};

export const filterSubmissions = (submissions: TeaSubmission[], filter: string): TeaSubmission[] => {
  if (filter === 'all') return submissions;
  
  return submissions.filter(submission => {
    const reactions = submission.reactions;
    const totalReactions = reactions.hot + reactions.cold + reactions.spicy;
    
    switch (filter) {
      case 'hot':
        return reactions.hot > Math.max(reactions.cold, reactions.spicy);
      case 'cold':
        return reactions.cold > Math.max(reactions.hot, reactions.spicy);
      case 'spicy':
        return reactions.spicy > Math.max(reactions.hot, reactions.cold);
      case 'controversial':
        return totalReactions > 10 && Math.abs(reactions.hot - reactions.cold) < 3;
      case 'trending':
        return totalReactions > 15;
      case 'verified':
        return submission.has_evidence;
      case 'ai-commented':
        return !!submission.ai_reaction;
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
