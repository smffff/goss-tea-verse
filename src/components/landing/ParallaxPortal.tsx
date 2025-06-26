
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpillZoneSection from './sections/SpillZoneSection';
import WhatIsCTeaSection from './sections/WhatIsCTeaSection';
import HowItWorksSection from './sections/HowItWorksSection';
import OGSipperZoneSection from './sections/OGSipperZoneSection';
import LiveFeedDemoSection from './sections/LiveFeedDemoSection';
import JoinChaosSection from './sections/JoinChaosSection';
import ParallaxFloatingObjects from './ParallaxFloatingObjects';

const ParallaxPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Global parallax transforms for background layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Background Parallax Layer */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#100C2A] via-[#1a0d26] to-[#0a0a0a]">
          {/* Retro Grid */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 216, 164, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 216, 164, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
          
          {/* Deep Space Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4FB3]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D8A4]/10 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-[#FF9C39]/10 rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* Floating Objects Layer */}
      <ParallaxFloatingObjects scrollProgress={scrollYProgress} />

      {/* Content Sections */}
      <div className="relative z-10">
        <SpillZoneSection />
        <WhatIsCTeaSection />
        <HowItWorksSection />
        <OGSipperZoneSection />
        <LiveFeedDemoSection />
        <JoinChaosSection />
      </div>
    </div>
  );
};

export default ParallaxPortal;
