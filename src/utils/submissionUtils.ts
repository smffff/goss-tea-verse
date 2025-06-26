
import { TeaSubmission } from '@/types/teaFeed';

export const transformSubmission = (dbSubmission: any): TeaSubmission => {
  return {
    id: dbSubmission.id,
    content: dbSubmission.content,
    category: dbSubmission.category,
    created_at: dbSubmission.created_at,
    updated_at: dbSubmission.updated_at,
    anonymous_token: dbSubmission.anonymous_token,
    status: dbSubmission.status,
    reactions: typeof dbSubmission.reactions === 'object' 
      ? dbSubmission.reactions 
      : { hot: 0, cold: 0, spicy: 0 },
    verification_score: dbSubmission.verification_score || 0,
    is_verified: dbSubmission.is_verified || false,
    has_evidence: dbSubmission.has_evidence || false,
    evidence_urls: dbSubmission.evidence_urls || [],
    verification_method: dbSubmission.verification_method,
    verification_data: dbSubmission.verification_data || {},
    average_rating: dbSubmission.average_rating || 0,
    rating_count: dbSubmission.rating_count || 0,
    evidence_credibility_score: dbSubmission.evidence_credibility_score || 0,
    flag_count: dbSubmission.flag_count || 0,
    spiciness: dbSubmission.spiciness,
    chaos: dbSubmission.chaos,
    relevance: dbSubmission.relevance,
    ai_rated: dbSubmission.ai_rated || false,
    reaction: dbSubmission.reaction,
    ai_reaction: dbSubmission.ai_reaction,
    moderator_notes: dbSubmission.moderator_notes,
    boost_score: dbSubmission.boost_score,
    author: dbSubmission.author,
    is_viral: dbSubmission.is_viral,
    visible: dbSubmission.visible,
    tweeted: dbSubmission.tweeted,
    tweet_id: dbSubmission.tweet_id
  };
};

export const filterSubmissions = (submissions: TeaSubmission[], filter: string): TeaSubmission[] => {
  if (filter === 'all') return submissions;
  
  switch (filter) {
    case 'verified':
      return submissions.filter(sub => sub.is_verified);
    case 'hot':
      return submissions.filter(sub => sub.reactions.hot > 5);
    case 'spicy':
      return submissions.filter(sub => sub.reactions.spicy > 3);
    case 'tech':
      return submissions.filter(sub => sub.category === 'tech');
    case 'nft':
      return submissions.filter(sub => sub.category === 'nft');
    case 'exchange':
      return submissions.filter(sub => sub.category === 'exchange');
    default:
      return submissions;
  }
};
