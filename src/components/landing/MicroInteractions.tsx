
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Crown, Coffee } from 'lucide-react';

const MicroInteractions: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleChaosClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime < 500) {
      setClickCount(prev => prev + 1);
      if (clickCount > 5) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  }, [clickCount, lastClickTime]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating chaos elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 cursor-pointer pointer-events-auto"
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleChaosClick}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="text-4xl filter drop-shadow-lg"
        >
          🫖
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -15, 15, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="text-3xl"
      >
        💅
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/3"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="text-3xl opacity-70"
      >
        👀
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/3"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="text-2xl opacity-60"
      >
        🔥
      </motion.div>

      {/* Easter egg animation */}
      {showEasterEgg && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.5, 1], rotate: [0, 360] }}
            transition={{ duration: 2 }}
            className="text-center"
          >
            <div className="text-8xl mb-4">🎉</div>
            <h3 className="text-4xl font-gothic font-bold text-[#FF1E8B] mb-2">
              Chaos Unlocked!
            </h3>
            <p className="text-xl text-[#00FF9D] font-cyber">
              You found the secret degen mode! 🫖✨
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Floating success indicators */}
      <motion.div
        className="absolute top-1/2 left-1/8"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 3 }}
      >
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-[#00FF9D]/30">
          <Crown className="w-4 h-4 text-[#FFFF00]" />
          <span className="text-[#00FF9D] text-sm font-cyber">VIP Status</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/8"
        animate={{
          x: [0, 15, 0],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 4 }}
      >
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-[#FF1E8B]/30">
          <Zap className="w-4 h-4 text-[#FF1E8B]" />
          <span className="text-[#FF1E8B] text-sm font-cyber">Tea Flowing</span>
        </div>
      </motion.div>
    </div>
  );
};

export default MicroInteractions;
