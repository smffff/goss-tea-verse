
import React from 'react';
import { motion } from 'framer-motion';
import ParallaxElement from '@/components/ui/ParallaxElement';

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating Emojis */}
      <ParallaxElement speed={0.3} direction="up" className="absolute top-20 left-10">
        <div className="text-6xl animate-float opacity-60">🫖</div>  
      </ParallaxElement>
      <ParallaxElement speed={0.4} direction="down" className="absolute top-40 right-20">
        <div className="text-5xl animate-float opacity-70 animation-delay-1000">💅</div>
      </ParallaxElement>
      <ParallaxElement speed={0.2} direction="up" className="absolute bottom-40 left-20">
        <div className="text-4xl animate-float opacity-50 animation-delay-2000">👀</div>
      </ParallaxElement>
      <ParallaxElement speed={0.5} direction="right" className="absolute top-60 left-1/2">
        <div className="text-5xl animate-float opacity-60 animation-delay-1500">🔥</div>
      </ParallaxElement>
      <ParallaxElement speed={0.3} direction="left" className="absolute bottom-60 right-10">
        <div className="text-4xl animate-float opacity-70 animation-delay-500">😤</div>
      </ParallaxElement>
    </div>
  );
};

export default FloatingElements;
