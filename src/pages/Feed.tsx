
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedTeaFeed from '@/components/EnhancedTeaFeed';
import EnhancedFeedHeader from '@/components/feed/EnhancedFeedHeader';
import EnhancedFeedCTA from '@/components/feed/EnhancedFeedCTA';
import EnhancedSidebar from '@/components/feed/EnhancedSidebar';

const Feed = () => {
  return (
    <Layout>
      {/* Enhanced Header Section */}
      <EnhancedFeedHeader />

      {/* Enhanced CTA Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <EnhancedFeedCTA />
        </div>
      </section>

      {/* Main Feed Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Single Column Feed */}
          <div className="block lg:hidden">
            <EnhancedTeaFeed />
          </div>

          {/* Desktop: Enhanced Two Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {/* Main Feed - 3 columns */}
            <div className="lg:col-span-3">
              <EnhancedTeaFeed />
            </div>

            {/* Enhanced Sidebar - 1 column */}
            <EnhancedSidebar />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Feed;
