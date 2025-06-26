
import React from 'react';
import { motion } from 'framer-motion';

interface SpillingTeaCupProps {
  className?: string;
  animated?: boolean;
  isSpilling?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SpillingTeaCup: React.FC<SpillingTeaCupProps> = ({ 
  className = '', 
  animated = false, 
  isSpilling = false,
  size = 'md'
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`${sizes[size]} ${className} relative`}>
      <motion.svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        animate={animated ? {
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Background glow */}
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="url(#teaGlow)"
          className="opacity-30"
        />
        
        {/* Steam with spilling effect */}
        <g className={animated ? 'animate-pulse' : ''}>
          <motion.path
            d="M45 25 C45 20, 49 20, 49 25 C49 20, 53 20, 53 25"
            stroke="#FF6B9D"
            strokeWidth="3"
            fill="none"
            className="opacity-80"
            animate={isSpilling ? {
              x: [0, 15, 30],
              y: [0, -5, -10],
              opacity: [0.8, 0.4, 0]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.path
            d="M53 23 C53 18, 57 18, 57 23 C57 18, 61 18, 61 23"
            stroke="#00D4AA"
            strokeWidth="3"
            fill="none"
            className="opacity-60"
            animate={isSpilling ? {
              x: [0, 20, 40],
              y: [0, -8, -15],
              opacity: [0.6, 0.3, 0]
            } : {}}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          />
          <motion.path
            d="M61 25 C61 20, 65 20, 65 25 C65 20, 69 20, 69 25"
            stroke="#FF9500"
            strokeWidth="3"
            fill="none"
            className="opacity-70"
            animate={isSpilling ? {
              x: [0, 25, 45],
              y: [0, -3, -8],
              opacity: [0.7, 0.4, 0]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </g>
        
        {/* Cup Body with tilt effect when spilling */}
        <motion.g
          animate={isSpilling ? { rotate: 15, x: 5 } : { rotate: 0, x: 0 }}
          style={{ transformOrigin: "60px 70px" }}
          transition={{ duration: 0.8 }}
        >
          <path
            d="M35 35 L35 75 C35 82, 40 87, 47 87 L73 87 C80 87, 85 82, 85 75 L85 35 Z"
            fill="url(#retroCup)"
            stroke="#1A0D26"
            strokeWidth="3"
          />
          
          {/* Tea liquid with spill effect */}
          <motion.path
            d="M37 37 L37 73 C37 79, 41 83, 47 83 L73 83 C79 83, 83 79, 83 73 L83 37 Z"
            fill="url(#spillingTea)"
            className="opacity-85"
            animate={isSpilling ? {
              d: [
                "M37 37 L37 73 C37 79, 41 83, 47 83 L73 83 C79 83, 83 79, 83 73 L83 37 Z",
                "M37 45 L37 73 C37 79, 41 83, 47 83 L73 83 C79 83, 83 79, 83 73 L83 45 Z"
              ]
            } : {}}
            transition={{ duration: 0.6 }}
          />
          
          {/* Spilling tea drops */}
          {isSpilling && (
            <>
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
          )}
          
          {/* Tea surface with ripple effect */}
          <motion.ellipse
            cx="60"
            cy="39"
            rx="23"
            ry="4"
            fill="url(#teaSurface)"
            className="opacity-60"
            animate={isSpilling ? {
              rx: [23, 25, 23],
              ry: [4, 6, 4]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Handle with retro styling */}
        <path
          d="M85 50 C98 50, 98 65, 85 65"
          stroke="url(#handleGradient)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Retro saucer */}
        <ellipse
          cx="60"
          cy="90"
          rx="35"
          ry="6"
          fill="url(#saucerRetro)"
          className="opacity-70"
        />
        
        {/* 80s-style decorative elements */}
        <rect x="40" y="60" width="2" height="15" fill="#FF6B9D" className="opacity-60" />
        <rect x="45" y="65" width="2" height="10" fill="#00D4AA" className="opacity-50" />
        <rect x="75" y="58" width="2" height="12" fill="#FF9500" className="opacity-60" />
        
        <defs>
          {/* Enhanced gradients with 80s vibes */}
          <radialGradient id="teaGlow" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF6B9D" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00D4AA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.4" />
          </radialGradient>
          
          <linearGradient id="retroCup" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="30%" stopColor="#FF9500" />
            <stop offset="70%" stopColor="#00D4AA" />
            <stop offset="100%" stopColor="#4DD9D4" />
          </linearGradient>
          
          <linearGradient id="spillingTea" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="25%" stopColor="#FF9500" />
            <stop offset="50%" stopColor="#F1C40F" />
            <stop offset="75%" stopColor="#E67E22" />
            <stop offset="100%" stopColor="#FF6B9D" />
          </linearGradient>
          
          <linearGradient id="teaSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF6B9D" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.3" />
          </linearGradient>
          
          <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="50%" stopColor="#00D4AA" />
            <stop offset="100%" stopColor="#FF9500" />
          </linearGradient>
          
          <linearGradient id="saucerRetro" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DD9D4" />
            <stop offset="50%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#00D4AA" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Overflow effects */}
      {isSpilling && (
        <div className="absolute -bottom-2 -right-4">
          <motion.div
            className="w-12 h-4 bg-gradient-to-r from-[#FF6B9D] via-[#FF9500] to-transparent rounded-full opacity-60"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}
    </div>
  );
};

export default SpillingTeaCup;
