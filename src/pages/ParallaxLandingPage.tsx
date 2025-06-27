
import React from 'react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';
import MobileBottomNavigation from '@/components/navigation/MobileBottomNavigation';
import FloatingElements from '@/components/landing/FloatingElements';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsPanel from '@/components/landing/TestimonialsPanel';
import TokenPanel from '@/components/landing/TokenPanel';

const ParallaxLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a] overflow-x-hidden">
      <UnifiedNavigation />
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <ParallaxElement speed={0.5} direction="up">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8" 
                style={{ fontFamily: "'Luckiest Guy', cursive" }}>
              CTea Newsroom
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12">
              Where crypto gossip gets served piping hot ☕
            </p>
          </div>
        </ParallaxElement>
      </section>

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsPanel />

      {/* Token Info */}
      <TokenPanel />

      <MobileBottomNavigation />
    </div>
  );
};

export default ParallaxLandingPage;
