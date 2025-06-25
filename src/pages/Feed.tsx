
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedTeaFeed from '@/components/EnhancedTeaFeed';
import FeedHeader from '@/components/feed/FeedHeader';
import FeedSidebar from '@/components/feed/FeedSidebar';

const Feed = () => {
  return (
    <Layout>
      {/* Enhanced Header Section */}
      <FeedHeader />

      {/* Main Feed Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Single Column Feed */}
          <div className="block lg:hidden">
            <EnhancedTeaFeed />
          </div>

          {/* Desktop: Two Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {/* Main Feed - 3 columns */}
            <div className="lg:col-span-3">
              <EnhancedTeaFeed />
            </div>

            {/* Sidebar - 1 column */}
            <FeedSidebar />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Feed;
