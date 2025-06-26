
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationEffectsProps {
  trigger: boolean;
  type?: 'confetti' | 'tea_particles' | 'sparkles';
  duration?: number;
  onComplete?: () => void;
}

const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({
  trigger,
  type = 'confetti',
  duration = 3000,
  onComplete
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
        onComplete?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, duration, onComplete]);

  const generateParticles = () => {
    const particles = [];
    const count = type === 'tea_particles' ? 15 : 25;
    
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 1;
      const x = Math.random() * window.innerWidth;
      const rotation = Math.random() * 360;
      
      let emoji = '🎉';
      if (type === 'tea_particles') emoji = ['🫖', '☕', '🍵'][Math.floor(Math.random() * 3)];
      if (type === 'sparkles') emoji = ['✨', '⭐', '🌟'][Math.floor(Math.random() * 3)];
      
      particles.push(
        <motion.div
          key={i}
          className="fixed text-2xl pointer-events-none z-50"
          initial={{
            x: x,
            y: -50,
            rotate: 0,
            opacity: 1,
            scale: 0
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: rotation,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: delay,
            ease: 'easeOut'
          }}
        >
          {emoji}
        </motion.div>
      );
    }
    
    return particles;
  };

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {generateParticles()}
        </div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationEffects;
