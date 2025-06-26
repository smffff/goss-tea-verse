
import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            rotate: 0 
          }}
          animate={{
            y: -50,
            rotate: 360,
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          {i % 3 === 0 ? '🫖' : i % 3 === 1 ? '☕' : '💰'}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
