
import React from 'react';
import TokenGatedContent from '@/components/TokenGatedContent';
import Leaderboard from '@/components/Leaderboard';
import TrendingTopics from './TrendingTopics';
import QuickActions from './QuickActions';
import CommunityStats from './CommunityStats';
import { Card } from '@/components/ui/card';

const FeedSidebar = () => {
  return (
    <div className="space-y-6">
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

      {/* Leaderboard */}
      <Leaderboard 
        title="Top Contributors" 
        period="weekly" 
        maxEntries={5}
        showRefresh={true}
      />

      {/* Trending Topics */}
      <TrendingTopics />

      {/* Quick Actions */}
      <QuickActions />

      {/* Community Stats */}
      <CommunityStats />
    </div>
  );
};

export default FeedSidebar;
