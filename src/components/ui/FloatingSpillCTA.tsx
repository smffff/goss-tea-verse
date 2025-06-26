
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coffee, Plus, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpillingTeaCup from './SpillingTeaCup';

interface FloatingSpillCTAProps {
  className?: string;
}

const FloatingSpillCTA: React.FC<FloatingSpillCTAProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down a bit, but not on landing page
      const shouldShow = window.scrollY > 300 && location.pathname !== '/';
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Don't show on certain pages
  const hiddenPaths = ['/', '/spill', '/submit'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className={`fixed bottom-6 right-6 z-40 ${className}`}
        >
          <motion.div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Floating Button */}
            <Button
              onClick={() => navigate('/spill')}
              className="
                w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FF9500] 
                hover:from-[#FF9500] hover:to-[#00D4AA] text-white shadow-2xl
                border-4 border-white/20 backdrop-blur-sm
                relative overflow-hidden group
              "
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Icon */}
              <motion.div
                animate={isHovered ? {
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{ duration: 0.6 }}
              >
                <SpillingTeaCup size="sm" animated isSpilling={isHovered} />
              </motion.div>
            </Button>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  className="absolute right-full top-1/2 transform -translate-y-1/2 mr-4 whitespace-nowrap"
                >
                  <div className="bg-black/90 text-white px-4 py-2 rounded-lg font-semibold shadow-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#FF6B9D]" />
                      <span>Spill More Tea!</span>
                    </div>
                    <div className="text-xs text-white/70 mt-1">
                      Share gossip • Earn $TEA
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-black/90" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#FF6B9D]/40"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00D4AA]/40"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5
              }}
            />

            {/* Notification badge */}
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#00D4AA] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            >
              +
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSpillCTA;
