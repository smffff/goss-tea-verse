
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EnhancedHero from '@/components/landing/EnhancedHero';
import InfoBlocks from '@/components/landing/InfoBlocks';
import BetaAccess from '@/components/landing/BetaAccess';
import MobileOptimizedLayout from '@/components/landing/MobileOptimizedLayout';
import MicroInteractions from '@/components/landing/MicroInteractions';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing access with enhanced loading state
    const checkAccess = async () => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Dramatic loading
      
      const betaAccess = localStorage.getItem('ctea-beta-access');
      const walletConnected = localStorage.getItem('ctea-wallet-connected');
      const demoMode = localStorage.getItem('ctea-demo-mode');
      
      if (betaAccess || walletConnected || demoMode) {
        setHasAccess(true);
      }
      setIsLoading(false);
    };

    checkAccess();
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
    // Dramatic redirect with style
    setTimeout(() => {
      navigate('/feed');
    }, 1500);
  };

  const handleEnterClick = () => {
    if (hasAccess) {
      navigate('/feed');
    } else {
      // Smooth scroll to beta access with enhanced easing
      const betaSection = document.getElementById('beta-access');
      betaSection?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#4A1A4A] to-[#050505] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-8xl mb-4"
          >
            🫖
          </motion.div>
          <h2 className="text-2xl font-gothic font-bold text-[#00FF9D] mb-2">
            Brewing Maximum Chaos...
          </h2>
          <p className="text-white/70 font-cyber">
            Loading the hottest gossip platform
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <MobileOptimizedLayout>
      {/* Micro-interactions overlay */}
      <MicroInteractions />
      
      {/* Enhanced Hero Section */}
      <EnhancedHero onEnterClick={handleEnterClick} />
      
      {/* Info Blocks with enhanced spacing */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <InfoBlocks />
      </motion.div>
      
      {/* Beta Access Section */}
      {!hasAccess && (
        <motion.div 
          id="beta-access"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BetaAccess onAccessGranted={handleAccessGranted} />
        </motion.div>
      )}

      {/* Enhanced Success Animation Overlay */}
      {hasAccess && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-r from-[#00FF9D] to-[#FF1E8B] flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 1.2, delay: 0.3 }}
          >
            <motion.div 
              className="text-9xl mb-6"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: 2 }}
            >
              🫖
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-gothic font-bold text-black mb-4">
              Welcome to the Chaos Zone!
            </h2>
            <p className="text-2xl text-black/80 font-cyber mb-4">
              Redirecting to the spiciest gossip feed...
            </p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-4xl"
            >
              ✨🔥✨
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced Footer */}
      <footer className="mt-20 border-t border-[#00FF9D]/20 bg-black/60 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <motion.p 
              className="text-white/70 text-lg font-cyber"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              © 2024 CTea Newsroom. Brewing chaos, spilling tea, stacking clout.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-8 text-white/50 font-cyber">
              <span className="flex items-center">
                🔐 <span className="ml-1">Anonymous First</span>
              </span>
              <span className="flex items-center">
                🫖 <span className="ml-1">Community Driven</span>
              </span>
              <span className="flex items-center">
                💀 <span className="ml-1">Chaos Guaranteed</span>
              </span>
              <span className="flex items-center">
                🚀 <span className="ml-1">Built for Degens</span>
              </span>
            </div>
            <motion.p 
              className="text-lg text-[#00FF9D] font-bold font-cyber"
              animate={{ 
                textShadow: [
                  '0 0 10px #00FF9D60',
                  '0 0 20px #00FF9D80',
                  '0 0 10px #00FF9D60'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Built by degens, for degens. Lady Invisible approves. 💅✨
            </motion.p>
          </div>
        </div>
      </footer>
    </MobileOptimizedLayout>
  );
};

export default Landing;
