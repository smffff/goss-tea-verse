
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductionHeroSection from './ProductionHeroSection';
import WhatIsCTeaSection from './WhatIsCTeaSection';
import HowItWorksSection from './HowItWorksSection';
import OGSippersSection from './OGSippersSection';
import LiveFeedDemoSection from './LiveFeedDemoSection';
import FinalCTASection from './FinalCTASection';
import ParallaxFloatingObjects from './ParallaxFloatingObjects';

const ProductionParallaxPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Enhanced vaporwave background parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.2, 0.15, 0.1]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Enhanced Vaporwave Background Parallax Layer */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#100C2A] via-[#1a0d26] via-[#2D1B69] to-[#0a0a0a]">
          {/* Enhanced Retro Grid with Neon Glow */}
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: gridOpacity }}
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 75, 179, 0.4) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(0, 216, 164, 0.4) 2px, transparent 2px)
                `,
                backgroundSize: '120px 120px',
                filter: 'drop-shadow(0 0 10px rgba(255, 75, 179, 0.3))'
              }}
            />
            {/* Diagonal grid overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(255, 156, 57, 0.2) 1px, transparent 1px),
                  linear-gradient(-45deg, rgba(156, 39, 176, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </motion.div>
          
          {/* Enhanced Cosmic Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4FB3]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D8A4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-[#9C27B0]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/8 w-64 h-64 bg-[#FF9C39]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-1/3 left-1/8 w-80 h-80 bg-[#FF6B9D]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
      </motion.div>

      {/* Enhanced Floating Vaporwave Elements */}
      <motion.div 
        className="fixed inset-0 z-5 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '50%']) }}
      >
        {/* Floating geometric shapes with comic styling */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-20 h-20 border-4 border-pink-400/40 rotate-45 bg-gradient-to-br from-pink-400/10 to-transparent"
          animate={{ rotate: [45, 405], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ filter: 'drop-shadow(0 0 15px rgba(255, 75, 179, 0.5))' }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full border-2 border-cyan-400/50"
          animate={{ y: [0, -40, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(0, 216, 164, 0.6))' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-12 h-32 bg-gradient-to-t from-pink-400/40 to-transparent border-l-4 border-pink-400/60"
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        
        {/* Comic-style speech bubbles */}
        <motion.div
          className="absolute top-1/3 right-1/3 bg-white/10 backdrop-blur-sm border-2 border-cyan-400/40 rounded-2xl p-4 max-w-48"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1.5 }}
          style={{ 
            filter: 'drop-shadow(0 0 10px rgba(0, 216, 164, 0.4))',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 25% 75%, 15% 100%, 10% 75%, 0% 75%)'
          }}
        >
          <p className="text-cyan-400 text-sm font-bold">"Spill the hottest tea!"</p>
        </motion.div>

        {/* Floating $TEA tokens */}
        <motion.div
          className="absolute top-1/2 left-1/8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xs border-4 border-yellow-400/60"
          animate={{ 
            rotateY: [0, 360],
            y: [0, -20, 0]
          }}
          transition={{ 
            rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
            y: { duration: 3, repeat: Infinity, delay: 0.5 }
          }}
          style={{ filter: 'drop-shadow(0 0 15px rgba(255, 193, 7, 0.6))' }}
        >
          $TEA
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/6 w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-xs border-3 border-green-400/60"
          animate={{ 
            rotateY: [360, 0],
            x: [0, 15, 0]
          }}
          transition={{ 
            rotateY: { duration: 6, repeat: Infinity, ease: 'linear' },
            x: { duration: 4, repeat: Infinity, delay: 2 }
          }}
          style={{ filter: 'drop-shadow(0 0 12px rgba(76, 175, 80, 0.6))' }}
        >
          TEA
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Objects Component */}
      <ParallaxFloatingObjects scrollProgress={scrollYProgress} />

      {/* Content Sections */}
      <div className="relative z-10">
        <ProductionHeroSection />
        <WhatIsCTeaSection />
        <HowItWorksSection />
        <OGSippersSection />
        <LiveFeedDemoSection />
        <FinalCTASection />
      </div>
    </div>
  );
};

export default ProductionParallaxPortal;
