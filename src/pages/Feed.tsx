
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedTeaFeed from '@/components/EnhancedTeaFeed';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, TrendingUp, Fire, Users } from 'lucide-react';

const Feed = () => {
  const trendingTopics = [
    { tag: 'Bitcoin', posts: 156 },
    { tag: 'Ethereum', posts: 89 },
    { tag: 'Solana', posts: 67 },
    { tag: 'DeFi', posts: 45 },
    { tag: 'NFTs', posts: 34 }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Coffee className="w-8 h-8 text-[#00d1c1]" />
            Tea Feed
            <Fire className="w-8 h-8 text-[#ff61a6]" />
          </h1>
          <p className="text-gray-400 text-lg">
            The hottest crypto gossip, served fresh with AI commentary
          </p>
        </div>

        {/* Desktop: Two Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* Main Feed - 3 columns */}
          <div className="lg:col-span-3">
            <EnhancedTeaFeed />
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="bg-ctea-dark/50 border-[#00d1c1]/30">
              <CardContent className="p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#ff61a6]" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.tag} className="flex items-center justify-between">
                      <span className="text-gray-300">#{topic.tag}</span>
                      <span className="text-[#00d1c1] text-sm">{topic.posts} posts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-gradient-to-br from-[#ff61a6]/20 to-[#00d1c1]/20 border-[#ff61a6]/30">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-[#00d1c1]" />
                <div className="text-2xl font-bold text-white mb-1">2,420</div>
                <div className="text-sm text-gray-300 mb-4">Active Tea Spillers</div>
                <div className="text-xs text-gray-400">
                  Join the conversation and start earning credibility!
                </div>
              </CardContent>
            </Card>
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
