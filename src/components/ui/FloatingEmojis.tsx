import React from 'react';
import { motion } from 'framer-motion';
import ParallaxElement from './ParallaxElement';

interface FloatingEmojiProps {
  emoji: string;
  position: { x: number; y: number };
  size?: number;
  speed?: number;
  delay?: number;
  className?: string;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({
  emoji,
  position,
  size = 48,
  speed = 0.3,
  delay = 0,
  className = ''
}) => {
  return (
    <ParallaxElement
      speed={speed}
      direction="up"
      delay={delay}
      className={`absolute pointer-events-none ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        fontSize: `${size}px`,
        zIndex: 1
      }}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay
        }}
        className="drop-shadow-lg"
      >
        {emoji}
      </motion.div>
    </ParallaxElement>
  );
};

const FloatingEmojis: React.FC = () => {
  const emojis = [
    { emoji: '🫖', position: { x: 10, y: 20 }, size: 32, speed: 0.2, delay: 0 },
    { emoji: '💋', position: { x: 85, y: 15 }, size: 28, speed: 0.4, delay: 0.5 },
    { emoji: '🍿', position: { x: 15, y: 80 }, size: 36, speed: 0.3, delay: 1 },
    { emoji: '💰', position: { x: 80, y: 75 }, size: 40, speed: 0.5, delay: 1.5 },
    { emoji: '🫧', position: { x: 50, y: 10 }, size: 24, speed: 0.6, delay: 2 },
    { emoji: '🔥', position: { x: 90, y: 50 }, size: 44, speed: 0.3, delay: 0.8 },
    { emoji: '⚡', position: { x: 5, y: 60 }, size: 32, speed: 0.4, delay: 1.2 },
    { emoji: '🎭', position: { x: 70, y: 25 }, size: 36, speed: 0.2, delay: 1.8 },
    { emoji: '💎', position: { x: 25, y: 90 }, size: 28, speed: 0.5, delay: 0.3 },
    { emoji: '🚀', position: { x: 95, y: 85 }, size: 40, speed: 0.4, delay: 0.7 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {emojis.map((emojiData, index) => (
        <FloatingEmoji
          key={index}
          emoji={emojiData.emoji}
          position={emojiData.position}
          size={emojiData.size}
          speed={emojiData.speed}
          delay={emojiData.delay}
        />
      ))}
    </div>
  );
};

export default FloatingEmojis; 