
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

const TrendingTopics = () => {
  return (
    <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-ctea-teal" />
          Trending Topics
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
            <span className="text-white font-medium text-sm">#SolanaSzn</span>
            <Badge className="bg-ctea-pink text-white text-xs">🔥 Hot</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
            <span className="text-white font-medium text-sm">#EthereumETF</span>
            <Badge className="bg-ctea-yellow text-ctea-dark text-xs">📈 Rising</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
            <span className="text-white font-medium text-sm">#MemeCoins</span>
            <Badge className="bg-ctea-purple text-white text-xs">💎 Viral</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrendingTopics;
