
import React from 'react';
import TokenGatedContent from '@/components/TokenGatedContent';
import Leaderboard from '@/components/Leaderboard';
import EnhancedTrendingTopics from './EnhancedTrendingTopics';
import EnhancedQuickActions from './EnhancedQuickActions';
import EnhancedCommunityStats from './EnhancedCommunityStats';
import { Card } from '@/components/ui/card';
import { Crown } from 'lucide-react';

const EnhancedSidebar = () => {
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

      {/* Enhanced Leaderboard */}
      <Leaderboard 
        title="Top Contributors" 
        period="weekly" 
        maxEntries={5}
        showRefresh={true}
      />

      {/* Trending Topics with Credibility */}
      <EnhancedTrendingTopics />

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
      <EnhancedQuickActions />

      {/* Enhanced Community Stats */}
      <EnhancedCommunityStats />
    </div>
  );
};

export default EnhancedSidebar;
