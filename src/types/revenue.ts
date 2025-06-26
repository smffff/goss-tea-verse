
export interface AffiliatePartner {
  name: string;
  baseUrl: string;
  commission: number;
  description?: string;
  category: 'exchange' | 'wallet' | 'defi' | 'nft' | 'trading' | 'education';
}

export interface SponsoredPost {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  sponsorLogo?: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
  budget: number;
  targetImpressions: number;
  currentImpressions: number;
  clickCount: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  placement: 'feed' | 'sidebar' | 'header' | 'footer';
}

export interface RevenueMetrics {
  affiliateClicks: number;
  affiliateConversions: number;
  affiliateRevenue: number;
  sponsoredImpressions: number;
  sponsoredClicks: number;
  sponsoredRevenue: number;
  premiumSubscribers: number;
  premiumRevenue: number;
  tipCount: number;
  tipRevenue: number;
  totalRevenue: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface TipTransaction {
  id: string;
  amount: number;
  currency: string;
  fromUser: string;
  toUser: string;
  contentId: string;
  contentType: 'submission' | 'comment' | 'general';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  platformFee: number;
  netAmount: number;
}
