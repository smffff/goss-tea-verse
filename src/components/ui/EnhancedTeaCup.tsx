
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedTeaCupProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'steaming' | 'glowing';
  animated?: boolean;
  className?: string;
}

const EnhancedTeaCup: React.FC<EnhancedTeaCupProps> = ({
  size = 'md',
  variant = 'default',
  animated = false,
  className
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const baseClasses = cn(
    'inline-block',
    sizeClasses[size],
    className
  );

  const teacupEmoji = '🫖';

  if (!animated) {
    return (
      <div className={baseClasses}>
        {teacupEmoji}
      </div>
    );
  }

  const animations = {
    default: {
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
      }
    },
    steaming: {
      rotate: [0, -2, 2, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
      }
    },
    glowing: {
      scale: [1, 1.1, 1],
      rotate: [0, -3, 3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
      }
    }
  };

  return (
    <motion.div
      className={baseClasses}
      animate={animations[variant]}
      style={{
        filter: variant === 'glowing' ? 'drop-shadow(0 0 10px rgba(255, 32, 82, 0.5))' : undefined
      }}
    >
      {variant === 'steaming' && (
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs opacity-70"
          animate={{
            y: [-5, -15, -5],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1] as const
          }}
        >
          ☁️
        </motion.div>
      )}
      {teacupEmoji}
    </motion.div>
  );
};

export default EnhancedTeaCup;
