
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedTeaCupProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'spilling' | 'steaming' | 'glowing';
  className?: string;
  animated?: boolean;
  interactive?: boolean;
}

const EnhancedTeaCup: React.FC<EnhancedTeaCupProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  animated = true,
  interactive = false
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const getAnimation = () => {
    if (!animated) return {};
    
    switch (variant) {
      case 'spilling':
        return {
          rotate: [0, 15, -5, 0],
          y: [0, -5, 0],
          transition: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
      case 'steaming':
        return {
          scale: [1, 1.05, 1],
          filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
          transition: { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
      case 'glowing':
        return {
          filter: [
            'drop-shadow(0 0 0px #FF2052)', 
            'drop-shadow(0 0 20px #FF2052)', 
            'drop-shadow(0 0 0px #FF2052)'
          ],
          transition: { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
      default:
        return {
          y: [0, -8, 0],
          transition: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
    }
  };

  const interactiveProps = interactive ? {
    whileHover: { 
      scale: 1.1, 
      rotate: 5,
      filter: 'drop-shadow(0 0 15px #FF2052)'
    },
    whileTap: { scale: 0.95 },
    style: { cursor: 'pointer' }
  } : {};

  return (
    <motion.div
      className={cn(sizeClasses[size], 'relative', className)}
      animate={getAnimation()}
      {...interactiveProps}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2052" />
            <stop offset="50%" stopColor="#FFD93D" />
            <stop offset="100%" stopColor="#A67CFF" />
          </linearGradient>
          
          <linearGradient id="teaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="50%" stopColor="#D2691E" />
            <stop offset="100%" stopColor="#FF6B9D" />
          </linearGradient>
          
          <radialGradient id="steamGradient" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF2052" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A67CFF" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Steam (for steaming variant) */}
        {(variant === 'steaming' || variant === 'default') && (
          <motion.g
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              staggerChildren: 0.3
            }}
          >
            <motion.path
              d="M45 25 Q47 15 45 5 Q43 15 45 25"
              fill="url(#steamGradient)"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.path
              d="M60 20 Q62 10 60 0 Q58 10 60 20"
              fill="url(#steamGradient)"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.path
              d="M75 25 Q77 15 75 5 Q73 15 75 25"
              fill="url(#steamGradient)"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.g>
        )}

        {/* Cup Body */}
        <path
          d="M30 40 L30 85 Q30 95 40 95 L80 95 Q90 95 90 85 L90 40 Z"
          fill="url(#cupGradient)"
          stroke="#0B0B17"
          strokeWidth="2"
        />

        {/* Tea Liquid */}
        <motion.path
          d="M35 45 L35 80 Q35 85 40 85 L80 85 Q85 85 85 80 L85 45 Z"
          fill="url(#teaGradient)"
          animate={variant === 'spilling' ? {
            d: [
              "M35 45 L35 80 Q35 85 40 85 L80 85 Q85 85 85 80 L85 45 Z",
              "M35 50 L35 80 Q35 85 40 85 L80 85 Q85 85 85 80 L85 55 Z",
              "M35 45 L35 80 Q35 85 40 85 L80 85 Q85 85 85 80 L85 45 Z"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Tea Surface */}
        <ellipse
          cx="60"
          cy="47"
          rx="25"
          ry="4"
          fill="#D2691E"
          opacity="0.7"
        />

        {/* Handle */}
        <path
          d="M90 55 Q105 55 105 70 Q105 85 90 85"
          fill="none"
          stroke="url(#cupGradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Spill Effect (for spilling variant) */}
        {variant === 'spilling' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <circle cx="95" cy="90" r="4" fill="url(#teaGradient)" opacity="0.6" />
            <circle cx="100" cy="95" r="3" fill="url(#teaGradient)" opacity="0.4" />
            <circle cx="105" cy="100" r="2" fill="url(#teaGradient)" opacity="0.3" />
            <path
              d="M95 90 Q100 95 105 100 Q110 105 115 100"
              stroke="url(#teaGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
          </motion.g>
        )}

        {/* Glow Effect (for glowing variant) */}
        {variant === 'glowing' && (
          <circle
            cx="60"
            cy="67"
            r="40"
            fill="none"
            stroke="url(#cupGradient)"
            strokeWidth="2"
            opacity="0.3"
          />
        )}
      </svg>
    </motion.div>
  );
};

export default EnhancedTeaCup;
