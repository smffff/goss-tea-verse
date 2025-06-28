
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EnhancedHero from '@/components/landing/EnhancedHero';
import InfoBlocks from '@/components/landing/InfoBlocks';
import BetaAccess from '@/components/landing/BetaAccess';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check for existing access
    const betaAccess = localStorage.getItem('ctea-beta-access');
    const walletConnected = localStorage.getItem('ctea-wallet-connected');
    const demoMode = localStorage.getItem('ctea-demo-mode');
    
    if (betaAccess || walletConnected || demoMode) {
      setHasAccess(true);
    }
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
    // Small delay for dramatic effect
    setTimeout(() => {
      navigate('/feed');
    }, 1000);
  };

  const handleEnterClick = () => {
    if (hasAccess) {
      navigate('/feed');
    } else {
      // Scroll to beta access section
      const betaSection = document.getElementById('beta-access');
      betaSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#4A1A4A] to-[#050505] animate-gradient">
      {/* Enhanced Hero Section */}
      <EnhancedHero onEnterClick={handleEnterClick} />
      
      {/* Info Blocks */}
      <InfoBlocks />
      
      {/* Beta Access Section */}
      {!hasAccess && (
        <div id="beta-access">
          <BetaAccess onAccessGranted={handleAccessGranted} />
        </div>
      )}

      {/* Success Animation Overlay */}
      {hasAccess && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-r from-[#00FF9D] to-[#FF1E8B] flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="text-8xl mb-4">🫖</div>
            <h2 className="text-4xl font-gothic font-bold text-black mb-2">
              Welcome to the Tea Zone!
            </h2>
            <p className="text-xl text-black/80 font-cyber">
              Redirecting to the hottest gossip feed...
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#00FF9D]/20 bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-white/60 text-sm font-cyber">
              © 2024 CTea Newsroom. Brewing chaos, one spill at a time.
            </p>
            <div className="flex justify-center space-x-6 text-xs text-white/40 font-cyber">
              <span>🔐 Anonymous First</span>
              <span>•</span>
              <span>🫖 Community Driven</span>
              <span>•</span>
              <span>💀 Chaos Guaranteed</span>
            </div>
            <p className="text-xs text-[#00FF9D] font-bold">
              Built by degens, for degens. Lady Invisible approves. 💅
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
