
import React from 'react';
import { Flame } from 'lucide-react';

const TrendingTicker = () => {
  const trendingTopics = [
    "🚀 New DeFi protocol launching next week",
    "🔥 Major exchange listing rumors",
    "💎 NFT collection floor price manipulation",
    "⚡ Layer 2 scaling solution alpha",
    "🎯 Memecoin pump incoming",
    "📈 Institutional adoption accelerating",
    "🌟 Cross-chain bridge breakthrough"
  ];

  return (
    <div className="bg-gradient-to-r from-ctea-teal via-ctea-purple to-ctea-pink text-white py-2 sm:py-3 overflow-hidden">
      <div className="flex items-center justify-center space-x-4 sm:space-x-8 animate-marquee">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Flame className="w-4 h-4 text-ctea-yellow" />
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">TRENDING NOW:</span>
        </div>
        {trendingTopics.map((topic, index) => (
          <span key={index} className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0">{topic}</span>
        ))}
      </div>
    </div>
  );
};

export default TrendingTicker;
