
export interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  evidence_urls: string[] | null;
  reactions: { hot: number; cold: number; spicy: number };
  created_at: string;
  average_rating: number;
  rating_count: number;
  has_evidence: boolean;
  boost_score?: number;
  author?: string;
  is_viral?: boolean;
  // AI Rating System fields
  ai_reaction?: string | null;
  reaction?: string | null;
  spiciness?: number | null;
  chaos?: number | null;
  relevance?: number | null;
  ai_rated?: boolean;
  visible?: boolean;
  tweeted?: boolean;
  tweet_id?: string | null;
}

export interface AIComment {
  id: string;
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  submission_id: string;
  created_at: string;
}

export interface TeaFeedProps {
  filter?: string;
}

export interface AIRatingResponse {
  reaction: string;
  spiciness: number;
  chaos: number;
  relevance: number;
}
