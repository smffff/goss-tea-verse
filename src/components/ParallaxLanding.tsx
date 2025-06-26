
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import EnhancedHeroPanel from '@/components/landing/EnhancedHeroPanel';
import EnhancedChaosPanel from '@/components/landing/EnhancedChaosPanel';
import TokenPanel from '@/components/landing/TokenPanel';
import TestimonialsPanel from '@/components/landing/TestimonialsPanel';
import BuzzwordsPanel from '@/components/landing/BuzzwordsPanel';
import EnhancedAccessModal from '@/components/landing/EnhancedAccessModal';
import FloatingElements from '@/components/landing/FloatingElements';

const ParallaxLanding: React.FC = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedPath, setSelectedPath] = useState<'spill' | 'bribe' | 'code' | null>(null);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Enhanced parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const middleY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleAccessPath = (path: 'spill' | 'bribe' | 'code') => {
    setSelectedPath(path);
    setShowAccessModal(true);
  };

  const handleAccessSubmit = () => {
    // Access granted, navigate to feed
    setShowAccessModal(false);
    toast({
      title: "🎉 Welcome to CTea Newsroom!",
      description: "Time to spill some tea and earn those tokens!",
    });
    navigate('/feed');
  };

  const handleEnterClick = () => {
    // Check if user already has beta access
    const hasBetaAccess = localStorage.getItem('ctea-beta-access') === 'granted';
    
    if (hasBetaAccess) {
      navigate('/feed');
    } else {
      setShowAccessModal(true);
      setSelectedPath(null); // Let them choose their path
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a]">
      {/* Enhanced Background Layer - Retro Grid Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY, opacity }}
      >
        <div className="w-full h-full relative">
          {/* Animated grid */}
          <div 
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 107, 157, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(255, 149, 0, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 149, 0, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px'
            }}
          />
          
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-[#FF6B9D] opacity-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#00D4AA] opacity-10 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Middle Layer - Enhanced Floating Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: middleY }}
      >
        <FloatingElements />
        
        {/* Additional retro elements */}
        <motion.div
          className="absolute top-1/3 right-1/5 text-6xl opacity-20"
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          📺
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 left-1/5 text-4xl opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          🎯
        </motion.div>
      </motion.div>

      {/* Foreground Content with enhanced effects */}
      <motion.div 
        className="relative z-10"
        style={{ y: foregroundY }}
      >
        <EnhancedHeroPanel onEnterClick={handleEnterClick} />
        <EnhancedChaosPanel onAccessPath={handleAccessPath} />
        <TokenPanel />
        <TestimonialsPanel />
        <BuzzwordsPanel />
      </motion.div>

      {/* Enhanced Access Modal */}
      <EnhancedAccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        selectedPath={selectedPath}
        accessCode={accessCode}
        onAccessCodeChange={setAccessCode}
        onSubmit={handleAccessSubmit}
      />

      {/* Retro scan lines effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20">
        <motion.div
          className="w-full h-1 bg-gradient-to-r from-transparent via-[#00D4AA] to-transparent"
          animate={{
            y: [0, window.innerHeight || 800]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxLanding;
