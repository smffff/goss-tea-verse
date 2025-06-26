
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from './how-it-works/SectionHeader';
import StepCard from './how-it-works/StepCard';
import InteractiveElements from './how-it-works/InteractiveElements';
import { steps } from './how-it-works/StepData';

const HowItWorksSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [1000, 2000], [100, -100]);
  const opacity = useTransform(scrollY, [900, 1200, 1800, 2100], [0, 1, 1, 0]);

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader />

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Connection Line with Neon Glow */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 via-orange-500 via-green-500 to-indigo-500 transform -translate-y-1/2 z-0 hidden lg:block rounded-full"
               style={{ filter: 'drop-shadow(0 0 10px rgba(255, 75, 179, 0.6))' }} />
          
          {/* Horizontal Scroll Grid */}
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-5 gap-8 relative z-10 pb-6 lg:pb-0">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>

        <InteractiveElements />
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
