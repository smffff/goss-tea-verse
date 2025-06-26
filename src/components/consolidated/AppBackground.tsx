
import React from 'react';
import { Coffee, Sparkles, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const AppBackground: React.FC = () => {
  return (
    <>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-ctea-purple rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Elements */}
      <ParallaxElement speed={0.5} direction="up" className="absolute top-20 left-10">
        <Coffee className="w-12 h-12 text-ctea-teal opacity-30" />
      </ParallaxElement>
      <ParallaxElement speed={0.3} direction="down" className="absolute top-40 right-20">
        <Sparkles className="w-8 h-8 text-pink-400 opacity-40" />
      </ParallaxElement>
      <ParallaxElement speed={0.7} direction="up" className="absolute bottom-32 left-20">
        <Zap className="w-10 h-10 text-yellow-400 opacity-35" />
      </ParallaxElement>
    </>
  );
};

export default AppBackground;
