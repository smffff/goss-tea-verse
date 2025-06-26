
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface TrendingTopicsProps {
  variant?: 'default' | 'enhanced';
  className?: string;
}

const TrendingTopics = ({ variant = 'default', className = '' }: TrendingTopicsProps) => {
  const topics = [
    { topic: '#CryptoNews', badge: '🔥 Hot' },
    { topic: '#DeFi', badge: '📈 Rising' },
    { topic: '#NFTs', badge: '💎 Viral' }
  ];

  return (
    <Card className={`bg-gray-800/30 border-gray-700 ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-400" />
          Trending Topics
        </h3>
        <div className="space-y-3">
          {topics.map(({ topic, badge }) => (
            <div key={topic} className="flex items-center justify-between p-3 bg-gray-800/20 border border-gray-700 rounded-lg">
              <span className="text-white font-medium text-sm">{topic}</span>
              <Badge className="text-xs bg-teal-500/20 text-teal-400 border-teal-500/30">
                {badge}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TrendingTopics;
