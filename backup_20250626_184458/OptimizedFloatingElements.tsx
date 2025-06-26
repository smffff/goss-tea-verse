
import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  emoji: string;
  position: { x: number; y: number };
  size: number;
  delay: number;
  duration: number;
}

const FloatingElement: React.FC<FloatingElementProps> = memo(({
  emoji,
  position,
  size,
  delay,
  duration
}) => {
  const animationVariants = useMemo(() => ({
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    }
  }), []);

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        fontSize: `${size}px`,
        zIndex: 1
      }}
      variants={animationVariants}
      animate="animate"
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      <div className="drop-shadow-lg">
        {emoji}
      </div>
    </motion.div>
  );
});

FloatingElement.displayName = 'FloatingElement';

const OptimizedFloatingElements: React.FC = memo(() => {
  const elements = useMemo(() => [
    { emoji: '🫖', position: { x: 10, y: 20 }, size: 32, delay: 0, duration: 4 },
    { emoji: '💋', position: { x: 85, y: 15 }, size: 28, delay: 0.5, duration: 3.5 },
    { emoji: '🍿', position: { x: 15, y: 80 }, size: 36, delay: 1, duration: 4.5 },
    { emoji: '💰', position: { x: 80, y: 75 }, size: 40, delay: 1.5, duration: 3 },
    { emoji: '🫧', position: { x: 50, y: 10 }, size: 24, delay: 2, duration: 5 },
    { emoji: '🔥', position: { x: 90, y: 50 }, size: 44, delay: 0.8, duration: 3.8 },
    { emoji: '⚡', position: { x: 5, y: 60 }, size: 32, delay: 1.2, duration: 4.2 },
    { emoji: '🎭', position: { x: 70, y: 25 }, size: 36, delay: 1.8, duration: 3.3 },
    { emoji: '💎', position: { x: 25, y: 90 }, size: 28, delay: 0.3, duration: 4.7 },
    { emoji: '🚀', position: { x: 95, y: 85 }, size: 40, delay: 0.7, duration: 3.7 }
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          emoji={element.emoji}
          position={element.position}
          size={element.size}
          delay={element.delay}
          duration={element.duration}
        />
      ))}
    </div>
  );
});

OptimizedFloatingElements.displayName = 'OptimizedFloatingElements';

export default OptimizedFloatingElements;
