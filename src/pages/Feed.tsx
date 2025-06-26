
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedTeaFeed from '@/components/EnhancedTeaFeed';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, TrendingUp, Flame, Users } from 'lucide-react';
import EnhancedFeedHeader from '@/components/feed/EnhancedFeedHeader';
import EnhancedSidebar from '@/components/feed/EnhancedSidebar';

const Feed = () => {
  return (
    <Layout>
      {/* Enhanced Feed Header */}
      <EnhancedFeedHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Desktop: Two Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* Main Feed - 3 columns */}
          <div className="lg:col-span-3">
            <EnhancedTeaFeed />
          </div>

          {/* Enhanced Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <EnhancedSidebar />
          </div>
        </div>

        {/* Mobile: Single Column */}
        <div className="block lg:hidden">
          <EnhancedTeaFeed />
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
