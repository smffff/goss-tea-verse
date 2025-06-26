
import React from 'react';
import AffiliateLink from './AffiliateLink';
import SponsoredContent from './SponsoredContent';
import TipJar from './TipJar';
import { useRevenue } from './RevenueProvider';

// Common affiliate partners for crypto
export const AFFILIATE_PARTNERS = {
  coinbase: {
    name: 'Coinbase',
    baseUrl: 'https://coinbase.com/join/',
    commission: 0.50 // $50 per signup
  },
  binance: {
    name: 'Binance',
    baseUrl: 'https://accounts.binance.com/register?ref=',
    commission: 0.20 // 20% commission
  },
  kraken: {
    name: 'Kraken',
    baseUrl: 'https://r.kraken.com/c/',
    commission: 0.25 // 25% commission
  }
};

// Revenue sidebar component
export const RevenueSidebar: React.FC = () => {
  const { sponsoredContentEnabled } = useRevenue();

  return (
    <div className="space-y-6">
      {sponsoredContentEnabled && (
        <SponsoredContent
          title="Trade Crypto Like a Pro"
          description="Get advanced trading tools and 0% fees for 30 days"
          ctaText="Start Trading"
          ctaLink="https://example.com/trading"
          sponsor="CryptoExchange Pro"
          placement="sidebar"
        />
      )}

      <TipJar
        contentCreator="CTea Newsroom"
        contentId="general"
        placement="sidebar"
      />
    </div>
  );
};

// Inline affiliate recommendations
export const CryptoAffiliateBanner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <h3 className="font-bold text-gray-900 mb-3 text-center">🚀 Start Your Crypto Journey</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AffiliateLink
          href={`${AFFILIATE_PARTNERS.coinbase.baseUrl}CTEA123`}
          platform="coinbase"
          placement="banner"
          className="text-center"
        >
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
            Coinbase - $10 Bonus
          </div>
        </AffiliateLink>
        
        <AffiliateLink
          href={`${AFFILIATE_PARTNERS.binance.baseUrl}CTEANEWS`}
          platform="binance"
          placement="banner"
          className="text-center"
        >
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium">
            Binance - 20% Off Fees
          </div>
        </AffiliateLink>
        
        <AffiliateLink
          href={`${AFFILIATE_PARTNERS.kraken.baseUrl}CTEA456`}
          platform="kraken"
          placement="banner"
          className="text-center"
        >
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium">
            Kraken - Advanced Tools
          </div>
        </AffiliateLink>
      </div>
    </div>
  );
};

export default AffiliateLink;
