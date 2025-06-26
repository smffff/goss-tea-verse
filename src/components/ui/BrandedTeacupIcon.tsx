
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrandedTeacupIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'default' | 'spilling' | 'bounce' | 'steam' | 'steaming' | 'glow' | 'glowing';
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

const BrandedTeacupIcon: React.FC<BrandedTeacupIconProps> = ({
  size = 'md',
  variant = 'default',
  className,
  showText = false,
  animated = false
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-32 h-32'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-2xl',
    hero: 'text-3xl'
  };

  const getAnimation = () => {
    if (!animated && variant === 'default') return {};
    
    const normalizedVariant = variant === 'steaming' ? 'steam' : variant === 'glowing' ? 'glow' : variant;
    
    switch (normalizedVariant) {
      case 'bounce':
        return {
          y: [0, -10, 0],
          transition: { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
      case 'spilling':
        return {
          rotate: [0, 15, -5, 0],
          transition: { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
      case 'steam':
        return {
          scale: [1, 1.05, 1],
          transition: { 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
      case 'glow':
        return {
          filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
          transition: { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        };
      default:
        return animated ? {
          scale: [1, 1.05, 1],
          transition: { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" as const
          }
        } : {};
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <motion.div
        className={cn(sizes[size], 'relative')}
        animate={getAnimation()}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="teacupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d1c1" />
              <stop offset="50%" stopColor="#ff6b9d" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="teaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff9500" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
            <radialGradient id="steamGradient" cx="50%" cy="0%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00d1c1" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* Steam */}
          {(variant === 'steam' || variant === 'steaming' || variant === 'default') && (
            <motion.g
              animate={{
                y: [0, -5, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              <path
                d="M45 20 Q47 15 45 10 Q43 15 45 20"
                fill="url(#steamGradient)"
              />
              <path
                d="M50 18 Q52 13 50 8 Q48 13 50 18"
                fill="url(#steamGradient)"
              />
              <path
                d="M55 20 Q57 15 55 10 Q53 15 55 20"
                fill="url(#steamGradient)"
              />
            </motion.g>
          )}

          {/* Teacup */}
          <path
            d="M25 35 L25 70 Q25 75 30 75 L65 75 Q70 75 70 70 L70 35 Z"
            fill="url(#teacupGradient)"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Tea liquid */}
          <motion.path
            d="M30 40 L30 68 Q30 70 32 70 L63 70 Q65 70 65 68 L65 40 Z"
            fill="url(#teaGradient)"
            animate={variant === 'spilling' ? {
              d: [
                "M30 40 L30 68 Q30 70 32 70 L63 70 Q65 70 65 68 L65 40 Z",
                "M30 40 L30 68 Q30 70 32 70 L63 70 Q65 70 65 68 L65 45 Z",
                "M30 40 L30 68 Q30 70 32 70 L63 70 Q65 70 65 68 L65 40 Z"
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Handle */}
          <path
            d="M70 45 Q80 45 80 55 Q80 65 70 65"
            fill="none"
            stroke="url(#teacupGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Spill effect */}
          {variant === 'spilling' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1 }}
            >
              <circle cx="75" cy="70" r="3" fill="url(#teaGradient)" opacity="0.6" />
              <circle cx="78" cy="75" r="2" fill="url(#teaGradient)" opacity="0.4" />
              <circle cx="80" cy="78" r="1" fill="url(#teaGradient)" opacity="0.3" />
            </motion.g>
          )}

          {/* Glow effect */}
          {(variant === 'glow' || variant === 'glowing') && (
            <circle
              cx="50"
              cy="55"
              r="35"
              fill="none"
              stroke="url(#teacupGradient)"
              strokeWidth="1"
              opacity="0.3"
            />
          )}
        </svg>
      </motion.div>

      {showText && (
        <motion.div
          className={cn('text-center', textSizes[size])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-purple-400 bg-clip-text text-transparent">
            CTea
          </div>
          <div className="text-white/60 text-xs">
            Newsroom
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BrandedTeacupIcon;
