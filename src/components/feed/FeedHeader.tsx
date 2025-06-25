import React from 'react';
import BetaDisclaimer from '@/components/BetaDisclaimer';
import FeedStats from '@/components/feed/FeedStats';
import WalletStatus from '@/components/feed/WalletStatus';
import LiveFeedNotice from '@/components/feed/LiveFeedNotice';
import FeedCTA from '@/components/feed/FeedCTA';

const FeedHeader = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
            CTea Feed ☕
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            The hottest crypto gossip, fresh from the blockchain
          </p>

          {/* Beta Disclaimer */}
          <BetaDisclaimer variant="inline" className="mb-6" />

          {/* Wallet Status */}
          <WalletStatus />

          {/* Live Stats */}
          <FeedStats variant="default" />

          {/* Live Feed Notice */}
          <LiveFeedNotice />
        </div>

        {/* Enhanced CTA */}
        <FeedCTA variant="default" />
      </div>
    </section>
  );
};

export default FeedHeader;
