
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
