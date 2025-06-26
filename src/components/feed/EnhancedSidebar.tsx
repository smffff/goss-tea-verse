
import React from 'react';
import TokenGatedContent from '@/components/TokenGatedContent';
import Leaderboard from '@/components/Leaderboard';
import TrendingTopics from '@/components/feed/TrendingTopics';
import QuickActions from '@/components/feed/QuickActions';
import CommunityStats from '@/components/feed/CommunityStats';
import ChainSwitcher from '@/components/crosschain/ChainSwitcher';
import OGStatusCard from '@/components/crosschain/OGStatusCard';
import { RevenueSidebar } from '@/components/revenue/RevenueIntegration';
import PremiumFeatureGate from '@/components/revenue/PremiumFeatureGate';
import TipJar from '@/components/revenue/TipJar';
import RevenueErrorBoundary from '@/components/revenue/RevenueErrorBoundary';
import { Card } from '@/components/ui/card';
import { Crown } from 'lucide-react';
import { useRevenue } from '@/components/revenue/RevenueProvider';

const EnhancedSidebar = () => {
  const { premiumContentEnabled } = useRevenue();

  const handleUpgrade = () => {
    // Navigate to subscription page or open Stripe checkout
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('Opening subscription flow...');
    // You can integrate this with your payment system
  };

  return (
    <div className="space-y-6">
      {/* Cross-Chain & OG Status */}
      <OGStatusCard />
      <ChainSwitcher />

      {/* Revenue Components with Error Boundary */}
      <RevenueErrorBoundary>
        <RevenueSidebar />
      </RevenueErrorBoundary>

      {/* Premium Feature Example */}
      {premiumContentEnabled && (
        <RevenueErrorBoundary>
          <PremiumFeatureGate
            featureName="Advanced Tea Analytics"
            description="Get detailed insights into tea trends, viral predictions, and market sentiment analysis."
            requiredTier="premium"
            onUpgrade={handleUpgrade}
            user={null} // Pass actual user when auth is integrated
          >
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 p-4">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-400" />
                Premium Analytics
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Viral Score:</span>
                  <span className="text-green-400">+127%</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend Momentum:</span>
                  <span className="text-orange-400">Rising</span>
                </div>
                <div className="flex justify-between">
                  <span>Sentiment:</span>
                  <span className="text-purple-400">Bullish</span>
                </div>
              </div>
            </Card>
          </PremiumFeatureGate>
        </RevenueErrorBoundary>
      )}

      {/* Token Gated Premium Content */}
      <TokenGatedContent
        requiredTea={100}
        requiredSoap={50}
        contentType="premium"
        title="Premium Tea Access"
        description="Get exclusive access to verified insider information and premium gossip."
      >
        <Card className="bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30 p-4">
          <h4 className="font-bold text-white mb-2">🔥 Exclusive Insider Tea</h4>
          <p className="text-sm text-gray-300">Premium content for verified members</p>
        </Card>
      </TokenGatedContent>

      {/* Enhanced Leaderboard */}
      <Leaderboard 
        title="Top Contributors" 
        period="weekly" 
        maxEntries={5}
        showRefresh={true}
      />

      {/* Trending Topics with Credibility */}
      <TrendingTopics variant="enhanced" />

      {/* Community Tip Jar with Error Boundary */}
      <RevenueErrorBoundary>
        <TipJar
          contentCreator="CTea Community"
          contentId="sidebar"
          placement="sidebar"
        />
      </RevenueErrorBoundary>

      {/* Legendary Content Access */}
      <TokenGatedContent
        requiredSoap={500}
        contentType="legendary"
        title="Legendary Access"
        description="Join the elite circle of trusted community members with legendary status."
      >
        <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/30 p-4">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            Legendary Tea
          </h4>
          <p className="text-sm text-gray-300">Ultra-exclusive content for legendary members</p>
        </Card>
      </TokenGatedContent>

      {/* Enhanced Quick Actions */}
      <QuickActions variant="enhanced" />

      {/* Enhanced Community Stats */}
      <CommunityStats variant="enhanced" />
    </div>
  );
};

export default EnhancedSidebar;
