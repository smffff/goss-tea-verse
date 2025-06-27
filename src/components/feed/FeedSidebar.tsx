import React from 'react';
import TrendingTopics from '@/components/feed/TrendingTopics';
import QuickActions from '@/components/feed/QuickActions';
import CommunityStats from '@/components/feed/CommunityStats';
import TeaRewardSystem from '@/components/tokens/TeaRewardSystem';
import TokenLeaderboard from '@/components/tokens/TokenLeaderboard';
import { useDailyLoginReward } from '@/hooks/useDailyLoginReward';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';

const FeedSidebar = () => {
  // Get user's anonymous token as wallet address
  const userWallet = localStorage.getItem('ctea_anonymous_token') || 
    Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  
  const { hasClaimedToday, isChecking, claimDailyLoginReward } = useDailyLoginReward(userWallet);

  return (
    <div className="space-y-6">
      {/* Daily Login Reward */}
      {!hasClaimedToday && (
        <div className="bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20 border border-ctea-teal/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Coffee className="w-5 h-5 text-ctea-teal" />
            <h3 className="text-white font-semibold">Daily Login Bonus</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Claim your daily 3 $TEA bonus for logging in!
          </p>
          <Button
            onClick={claimDailyLoginReward}
            disabled={isChecking}
            className="w-full bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white"
          >
            {isChecking ? 'Claiming...' : 'Claim 3 $TEA'}
          </Button>
        </div>
      )}

      {/* Token Rewards System */}
      <TeaRewardSystem walletAddress={userWallet} />

      {/* Token Leaderboard */}
      <TokenLeaderboard />

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
