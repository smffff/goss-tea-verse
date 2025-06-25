
import React from 'react';
import BetaDisclaimer from '@/components/BetaDisclaimer';
import FeedStats from './FeedStats';
import WalletStatus from './WalletStatus';
import LiveFeedNotice from './LiveFeedNotice';
import FeedCTA from './FeedCTA';

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
          <FeedStats />

          {/* Live Feed Notice */}
          <LiveFeedNotice />
        </div>

        {/* Enhanced CTA */}
        <FeedCTA />
      </div>
    </section>
  );
};

export default FeedHeader;
