
import React from 'react';
import TrendingTopics from '@/components/feed/TrendingTopics';
import QuickActions from '@/components/feed/QuickActions';
import CommunityStats from '@/components/feed/CommunityStats';

const FeedSidebar = () => {
  return (
    <div className="space-y-6">
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
