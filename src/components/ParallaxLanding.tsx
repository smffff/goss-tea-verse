
import React from 'react';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

// Uncomment components one by one to test which one breaks
// import EnhancedHeroSection from '@/components/landing/EnhancedHeroSection';
// import BetaStatsPanel from '@/components/landing/BetaStatsPanel';

export default function ParallaxLanding() {
  const handleEnterClick = () => {
    console.log('Enter button clicked - beta access flow would start here');
  };

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
            Debug Mode: If you can see this, the stack is fine. 
            Now we'll reintroduce components one by one to isolate any crashes.
          </p>
          <button
            onClick={handleEnterClick}
            className="bg-gradient-to-r from-[#00D8A4] to-[#FF4FB3] text-white font-bold px-8 py-4 rounded-xl text-xl hover:scale-105 transition-transform"
          >
            🔧 Debug Mode Active
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
