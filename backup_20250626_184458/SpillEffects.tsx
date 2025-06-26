
import React from 'react';
import { motion } from 'framer-motion';

interface SpillEffectsProps {
  isSpilling: boolean;
}

const SpillEffects: React.FC<SpillEffectsProps> = ({ isSpilling }) => {
  if (!isSpilling) return null;

  return (
    <>
      {/* Spilling tea drops */}
      <motion.circle
        cx="90"
        cy="50"
        r="3"
        fill="#FF6B9D"
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 25, 45],
          y: [0, 15, 35]
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.circle
        cx="92"
        cy="55"
        r="2"
        fill="#FF9500"
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 30, 55],
          y: [0, 20, 45]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="88"
        cy="48"
        r="1.5"
        fill="#00D4AA"
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 20, 35],
          y: [0, 12, 28]
        }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />
    </>
  );
};

export default SpillEffects;
