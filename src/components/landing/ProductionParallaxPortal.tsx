
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductionHeroSection from './ProductionHeroSection';
import WhatIsCTeaSection from './WhatIsCTeaSection';
import HowItWorksSection from './HowItWorksSection';
import OGSippersSection from './OGSippersSection';
import LiveFeedDemoSection from './LiveFeedDemoSection';
import FinalCTASection from './FinalCTASection';

const ProductionParallaxPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Vaporwave background parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Vaporwave Background Parallax Layer */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#100C2A] via-[#1a0d26] to-[#0a0a0a]">
          {/* Vaporwave Grid */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 75, 179, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 216, 164, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
          
          {/* Sunset/Cosmic Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4FB3]/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D8A4]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-[#9C27B0]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/8 w-64 h-64 bg-[#FF9C39]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </motion.div>

      {/* Floating Vaporwave Elements */}
      <motion.div 
        className="fixed inset-0 z-5 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '50%']) }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-16 h-16 border-2 border-pink-400/30 rotate-45"
          animate={{ rotate: [45, 405], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-8 h-20 bg-gradient-to-t from-pink-400/30 to-transparent"
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

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
