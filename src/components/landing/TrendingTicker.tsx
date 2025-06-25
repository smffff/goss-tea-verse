
import React from 'react';
import { Flame } from 'lucide-react';

const TrendingTicker = () => {
  const trendingTopics = [
    "🚀 New DeFi protocol launching next week",
    "🔥 Major exchange listing rumors",
    "💎 NFT collection floor price manipulation",
    "⚡ Layer 2 scaling solution alpha",
    "🎯 Memecoin pump incoming"
  ];

  return (
    <div className="bg-gradient-to-r from-accent via-accent2 to-accent text-white py-2 overflow-hidden">
      <div className="flex items-center justify-center space-x-8 animate-marquee">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-medium">TRENDING NOW:</span>
        </div>
        {trendingTopics.map((topic, index) => (
          <span key={index} className="text-sm whitespace-nowrap">{topic}</span>
        ))}
      </div>
    </div>
  );
};

export default TrendingTicker;
