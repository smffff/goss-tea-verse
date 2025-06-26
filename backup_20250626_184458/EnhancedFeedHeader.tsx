import React from 'react';
import { Card } from '@/components/ui/card';
import { useWallet } from '@/components/WalletProvider';
import FeedStats from '@/components/feed/FeedStats';
import WalletStatus from '@/components/feed/WalletStatus';

const EnhancedFeedHeader = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
            Hot Takes & Drama ☕
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            The freshest tea from the crypto world. Upvote the spiciest takes and join the conversation.
          </p>

          {/* Wallet Status */}
          <WalletStatus />

          {/* Live Stats */}
          <FeedStats variant="enhanced" />
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeedHeader;
