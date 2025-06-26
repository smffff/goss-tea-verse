
import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';
import FallbackPage from '@/pages/FallbackPage';

export default function ParallaxLanding() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simple loading check
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Fallback if something goes wrong
    const errorTimer = setTimeout(() => {
      if (!isLoaded) {
        console.warn('⚠️ ParallaxLanding taking too long to load');
        setHasError(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(errorTimer);
    };
  }, [isLoaded]);

  const handleEnterClick = () => {
    console.log('Enter button clicked - beta access flow would start here');
  };

  if (hasError) {
    return <FallbackPage error="Landing page failed to load properly" />;
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a]">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🫖</div>
          <p className="text-white/80">Brewing the perfect tea...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${BRAND_CONFIG.colors.background} 0%, #0a0a0a 100%)`,
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Step 1: Basic test - if you see this, the stack works */}
      <main className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-6">
          <div className="text-8xl mb-4">🫖</div>
          <h1 
            className="text-6xl font-bold mb-4"
            style={{ 
              color: BRAND_CONFIG.colors.primary,
              fontFamily: 'Luckiest Guy, cursive'
            }}
          >
            CTea Newsroom
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Welcome to the hottest gossip spot in crypto! Ready to spill some tea? 🍵
          </p>
          <button
            onClick={handleEnterClick}
            className="bg-gradient-to-r from-[#00D8A4] to-[#FF4FB3] text-white font-bold px-8 py-4 rounded-xl text-xl hover:scale-105 transition-transform"
          >
            Enter the Teahouse
          </button>
        </div>
      </main>

      {/* Step 2: Uncomment one component at a time */}
      {/* <EnhancedHeroSection onEnterClick={handleEnterClick} /> */}
      
      {/* Step 3: Add the stats panel */}
      {/* <BetaStatsPanel /> */}
    </div>
  );
}
