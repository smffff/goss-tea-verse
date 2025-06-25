
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface TrendingTopicsProps {
  variant?: 'default' | 'enhanced';
  className?: string;
}

const TrendingTopics = ({ variant = 'default', className = '' }: TrendingTopicsProps) => {
  const isEnhanced = variant === 'enhanced';
  
  const topicsData = isEnhanced 
    ? [
        { 
          topic: '#SolanaSzn', 
          badge: { text: '🔥 Hot', color: 'bg-ctea-pink text-white' },
          verification: { text: '95% Verified', color: 'bg-green-500/20 text-green-400' }
        },
        { 
          topic: '#EthereumETF', 
          badge: { text: '📈 Rising', color: 'bg-ctea-yellow text-ctea-dark' },
          verification: { text: '87% Verified', color: 'bg-green-500/20 text-green-400' }
        },
        { 
          topic: '#MemeCoins', 
          badge: { text: '💎 Viral', color: 'bg-ctea-purple text-white' },
          verification: { text: '72% Verified', color: 'bg-yellow-500/20 text-yellow-400' }
        }
      ]
    : [
        { topic: '#SolanaSzn', badge: { text: '🔥 Hot', color: 'bg-ctea-pink text-white' } },
        { topic: '#EthereumETF', badge: { text: '📈 Rising', color: 'bg-ctea-yellow text-ctea-dark' } },
        { topic: '#MemeCoins', badge: { text: '💎 Viral', color: 'bg-ctea-purple text-white' } }
      ];

  const title = isEnhanced ? 'Verified Trending Topics' : 'Trending Topics';

  return (
    <Card className={`bg-ctea-dark/30 border border-ctea-teal/20 ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-ctea-teal" />
          {title}
        </h3>
        <div className="space-y-3">
          {topicsData.map(({ topic, badge, verification }) => (
            <div key={topic} className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">{topic}</span>
                {verification && (
                  <Badge className={`text-xs ${verification.color}`}>
                    {verification.text}
                  </Badge>
                )}
              </div>
              <Badge className={`text-xs ${badge.color}`}>
                {badge.text}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TrendingTopics;
