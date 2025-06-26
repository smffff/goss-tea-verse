
import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Zap } from 'lucide-react';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const LiveStats = () => {
  const [animatedStats, setAnimatedStats] = useState({
    posts: 0,
    users: 0,
    points: 0
  });

  useEffect(() => {
    // Animate numbers on component mount
    const targets = { posts: 15742, users: 2420, points: 420000 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedStats({
        posts: Math.floor(targets.posts * progress),
        users: Math.floor(targets.users * progress),
        points: Math.floor(targets.points * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
      <div className="bg-black/30 backdrop-blur-lg border border-[#00D8A4]/30 rounded-xl p-4 sm:p-6 hover:border-[#00D8A4]/50 transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-3">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mr-3" style={{ color: BRAND_CONFIG.colors.primary }} />
        </div>
        <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: BRAND_CONFIG.colors.primary }}>
          {animatedStats.posts.toLocaleString()}
        </div>
        <p className="text-gray-400 text-xs sm:text-sm">Hot Takes Shared</p>
      </div>
      
      <div className="bg-black/30 backdrop-blur-lg border border-[#9333EA]/30 rounded-xl p-4 sm:p-6 hover:border-[#9333EA]/50 transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-3">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#9333EA] mr-3" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-[#9333EA] mb-1">{animatedStats.users.toLocaleString()}</div>
        <p className="text-gray-400 text-xs sm:text-sm">Active Tea Sippers</p>
      </div>
      
      <div className="bg-black/30 backdrop-blur-lg border border-[#FF4FB3]/30 rounded-xl p-4 sm:p-6 hover:border-[#FF4FB3]/50 transition-all duration-300 hover:scale-105 sm:col-span-1 col-span-1">
        <div className="flex items-center justify-center mb-3">
          <Zap className="w-6 h-6 sm:w-8 sm:h-8 mr-3" style={{ color: BRAND_CONFIG.colors.accent }} />
        </div>
        <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: BRAND_CONFIG.colors.accent }}>
          {animatedStats.points.toLocaleString()}
        </div>
        <p className="text-gray-400 text-xs sm:text-sm">$TEA Points Earned</p>
      </div>
    </div>
  );
};

export default LiveStats;
