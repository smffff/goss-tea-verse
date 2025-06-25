
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TeaFeed from '@/components/TeaFeed';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, Zap, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import BetaDisclaimer from '@/components/BetaDisclaimer';

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState('hot');

  const filters = [
    { id: 'hot', label: 'Hot Takes', icon: Zap, color: 'ctea-pink' },
    { id: 'fresh', label: 'Fresh Tea', icon: Coffee, color: 'ctea-teal' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'ctea-purple' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Beta Disclaimer */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                CTea Feed ☕
              </h1>
              <p className="text-gray-400">
                The hottest crypto gossip, fresh from the blockchain
              </p>
            </div>
            <Link to="/submit">
              <Button className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white">
                <Plus className="w-4 h-4 mr-2" />
                Spill Tea
              </Button>
            </Link>
          </div>
          
          <BetaDisclaimer variant="inline" className="mb-6" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  activeFilter === filter.id
                    ? `bg-${filter.color} text-white`
                    : `border-${filter.color}/30 text-${filter.color} hover:bg-${filter.color}/10`
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Feed */}
        <TeaFeed filter={activeFilter} />
      </div>
    </Layout>
  );
};

export default Feed;
