
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FallbackPage from '@/pages/FallbackPage';
import BackgroundEffects from '@/components/landing/BackgroundEffects';
import HeroContent from '@/components/landing/HeroContent';
import FloatingParticles from '@/components/landing/FloatingParticles';

export default function ParallaxLanding() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSpilling, setIsSpilling] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    const errorTimer = setTimeout(() => {
      if (!isLoaded) {
        console.warn('⚠️ ParallaxLanding taking too long to load');
        setHasError(true);
      }
    }, 5000);

    // Auto-spill animation
    const spillInterval = setInterval(() => {
      setIsSpilling(true);
      setTimeout(() => setIsSpilling(false), 3000);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(errorTimer);
      clearInterval(spillInterval);
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
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffects />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
        style={{ opacity }}
      >
        <HeroContent isSpilling={isSpilling} onEnterClick={handleEnterClick} />
      </motion.div>

      <FloatingParticles />
    </div>
  );
}
