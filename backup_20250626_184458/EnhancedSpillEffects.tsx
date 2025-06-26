
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedSpillEffectsProps {
  isSpilling: boolean;
  particleCount?: number;
}

const EnhancedSpillEffects: React.FC<EnhancedSpillEffectsProps> = ({ 
  isSpilling, 
  particleCount = 8 
}) => {
  if (!isSpilling) return null;

  return (
    <AnimatePresence>
      <g>
        {/* Main spill stream */}
        <motion.path
          d="M88 52 Q95 58, 102 70 Q108 82, 115 95"
          stroke="url(#spillGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Particle drops */}
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.circle
            key={i}
            r={Math.random() * 2 + 1}
            fill="#FF6B9D"
            initial={{ 
              cx: 90 + Math.random() * 10,
              cy: 50 + Math.random() * 5,
              opacity: 0,
              scale: 0
            }}
            animate={{
              cx: 100 + Math.random() * 30,
              cy: 70 + Math.random() * 40,
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5]
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              delay: Math.random() * 0.8,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 2
            }}
          />
        ))}

        {/* Steam enhancement */}
        <motion.g
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.path
            d="M45 25 C45 15, 49 15, 49 25 C49 15, 53 15, 53 25"
            stroke="#FF6B9D"
            strokeWidth="2"
            fill="none"
            animate={{
              x: isSpilling ? [0, 10, 20] : [0, 0, 0],
              opacity: isSpilling ? [0.8, 0.4, 0] : [0.8, 0.6, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>

        {/* Splash effects */}
        <motion.circle
          cx="110"
          cy="85"
          r="0"
          fill="#FF9500"
          opacity="0.6"
          animate={isSpilling ? {
            r: [0, 8, 0],
            opacity: [0, 0.6, 0]
          } : {}}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />

        <defs>
          <linearGradient id="spillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="50%" stopColor="#FF9500" />
            <stop offset="100%" stopColor="#00D4AA" />
          </linearGradient>
        </defs>
      </g>
    </AnimatePresence>
  );
};

export default EnhancedSpillEffects;
