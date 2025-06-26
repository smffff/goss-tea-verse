
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import EnhancedHeroSection from '@/components/landing/EnhancedHeroSection';
import EnhancedChaosPanel from '@/components/landing/EnhancedChaosPanel';
import TokenPanel from '@/components/landing/TokenPanel';
import TestimonialsPanel from '@/components/landing/TestimonialsPanel';
import BuzzwordsPanel from '@/components/landing/BuzzwordsPanel';
import EnhancedAccessFlow from '@/components/landing/EnhancedAccessFlow';
import FloatingElements from '@/components/landing/FloatingElements';

const ParallaxLanding: React.FC = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Enhanced parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const middleY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleAccessSuccess = () => {
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
          {/* Animated neon grid */}
          <motion.div 
            className="w-full h-full"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px']
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 107, 157, 0.2) 2px, transparent 2px),
                linear-gradient(90deg, rgba(0, 212, 170, 0.2) 2px, transparent 2px),
                linear-gradient(rgba(255, 149, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 149, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px'
            }}
          />
          
          {/* Enhanced floating geometric shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 border-4 opacity-30"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              borderColor: ['#FF6B9D', '#00D4AA', '#FF9500', '#FF6B9D']
            }}
            transition={{ duration: 25, repeat: Infinity }}
            style={{ 
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              filter: 'drop-shadow(0 0 20px currentColor)'
            }}
          />
          
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-32 h-32 opacity-20 rounded-full"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.4, 1],
              backgroundColor: ['#00D4AA', '#FF6B9D', '#FF9500', '#00D4AA']
            }}
            transition={{ duration: 18, repeat: Infinity }}
            style={{ filter: 'blur(1px)' }}
          />
          
          {/* Neon scan lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-30"
            animate={{
              backgroundPosition: ['0px 0px', '0px 200vh']
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: 'linear-gradient(transparent 97%, rgba(0, 212, 170, 0.8) 98%, transparent 100%)',
              backgroundSize: '100% 100px'
            }}
          />
        </div>
      </motion.div>

      {/* Middle Layer - Enhanced Floating Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: middleY }}
      >
        <FloatingElements />
        
        {/* Additional retro elements with glow effects */}
        <motion.div
          className="absolute top-1/3 right-1/5 text-7xl opacity-25 filter drop-shadow-lg"
          animate={{
            rotate: [0, 20, -20, 0],
            scale: [1, 1.2, 1],
            textShadow: [
              '0 0 20px rgba(255, 107, 157, 0.8)',
              '0 0 40px rgba(0, 212, 170, 0.8)',
              '0 0 20px rgba(255, 149, 0, 0.8)',
              '0 0 20px rgba(255, 107, 157, 0.8)'
            ]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          📺
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 left-1/5 text-5xl opacity-40 filter drop-shadow-lg"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          🎯
        </motion.div>
        
        {/* Floating meme coins */}
        <motion.div
          className="absolute top-1/2 left-1/6 text-4xl opacity-35"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          🪙
        </motion.div>
      </motion.div>

      {/* Foreground Content with enhanced effects */}
      <motion.div 
        className="relative z-10"
        style={{ y: foregroundY }}
      >
        <EnhancedHeroSection onEnterClick={handleEnterClick} />
        <EnhancedChaosPanel onAccessPath={() => setShowAccessModal(true)} />
        <TokenPanel />
        <TestimonialsPanel />
        <BuzzwordsPanel />
      </motion.div>

      {/* Enhanced Access Flow Modal */}
      <EnhancedAccessFlow
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        onSuccess={handleAccessSuccess}
      />

      {/* Enhanced retro effects */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* CRT screen curvature effect */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 70%, rgba(0,0,0,0.3) 100%)',
            borderRadius: '20px'
          }}
        />
        
        {/* Moving scan line */}
        <motion.div
          className="w-full h-2 bg-gradient-to-r from-transparent via-[#00D4AA] to-transparent opacity-40 blur-sm"
          animate={{
            y: [0, window.innerHeight || 800, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxLanding;
