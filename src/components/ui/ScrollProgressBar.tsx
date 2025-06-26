import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useParallaxScroll';

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useScrollProgress();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 origin-left z-50"
      style={{ scaleX }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-pink-500/50 to-purple-600/50 blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 animate-pulse" />
    </motion.div>
  );
};

export default ScrollProgressBar; 