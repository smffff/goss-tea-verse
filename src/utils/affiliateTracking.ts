
import { track } from '@/utils/analytics';
import { secureLog } from './secureLogging';

export interface AffiliateClick {
  platform: string;
  url: string;
  timestamp: number;
  referrer?: string;
}

export const trackAffiliateClick = (platform: string, url: string) => {
  const clickData: AffiliateClick = {
    platform,
    url,
    timestamp: Date.now(),
    referrer: document.referrer || 'direct'
  };

  // Track with analytics
  track('affiliate_click', {
    platform,
    url,
    source: 'buy_tea_cta'
  });

  // Store locally for tracking
  const clicks = JSON.parse(localStorage.getItem('ctea_affiliate_clicks') || '[]');
  clicks.push(clickData);
  localStorage.setItem('ctea_affiliate_clicks', JSON.stringify(clicks.slice(-50))); // Keep last 50

  secureLog.info('🔗 Affiliate click tracked:', platform, url);
};

export const getAffiliateStats = (): AffiliateClick[] => {
  return JSON.parse(localStorage.getItem('ctea_affiliate_clicks') || '[]');
};
