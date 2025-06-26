
import React from 'react';
import AnimatedBadges from '@/components/ui/AnimatedBadges';

const FloatingBadges = () => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-floating-badges space-y-4 hidden lg:block">
      <div className="animate-float" style={{ animationDelay: '0s' }}>
        <AnimatedBadges 
          type="top-spiller" 
          size={56} 
          className="hover:scale-110 transition-transform cursor-pointer drop-shadow-lg" 
        />
      </div>
      
      <div className="animate-float" style={{ animationDelay: '1s' }}>
        <AnimatedBadges 
          type="ai-favorite" 
          size={56} 
          className="hover:scale-110 transition-transform cursor-pointer drop-shadow-lg" 
        />
      </div>
      
      <div className="animate-float" style={{ animationDelay: '2s' }}>
        <AnimatedBadges 
          type="anonymous-oracle" 
          size={56} 
          className="hover:scale-110 transition-transform cursor-pointer drop-shadow-lg" 
        />
      </div>
    </div>
  );
};

export default FloatingBadges;
