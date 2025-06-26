
import React from 'react';
import Layout from '@/components/Layout';
import TeaFeed from '@/components/TeaFeed';
import FeedHeader from '@/components/feed/FeedHeader';
import FeedSidebar from '@/components/feed/FeedSidebar';

const Feed = () => {
  return (
    <Layout>
      <FeedHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Desktop: Two Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* Main Feed - 3 columns */}
          <div className="lg:col-span-3">
            <TeaFeed />
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <FeedSidebar />
          </div>
        </div>

        {/* Mobile: Single Column */}
        <div className="block lg:hidden">
          <TeaFeed />
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
