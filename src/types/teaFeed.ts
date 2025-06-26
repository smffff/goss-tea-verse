
export interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  anonymous_token: string;
  status: 'pending' | 'approved' | 'flagged' | 'rejected';
  reactions: {
    hot: number;
    cold: number;
    spicy: number;
  };
  verification_score: number;
  is_verified: boolean;
  has_evidence: boolean;
  evidence_urls?: string[];
  verification_method?: string;
  verification_data?: Record<string, any>;
  average_rating: number;
  rating_count: number;
  evidence_credibility_score: number;
  flag_count: number;
  spiciness?: number;
  chaos?: number;
  relevance?: number;
  ai_rated: boolean;
  reaction?: string;
  moderator_notes?: string;
}
