
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BrandedTeacupIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'default' | 'spilling' | 'steaming' | 'glowing';
  animated?: boolean;
  className?: string;
}

const BrandedTeacupIcon: React.FC<BrandedTeacupIconProps> = ({
  size = 'md',
  variant = 'default',
  animated = false,
  className
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'w-4 h-4 text-base';
      case 'sm': return 'w-6 h-6 text-lg';
      case 'md': return 'w-8 h-8 text-xl';
      case 'lg': return 'w-12 h-12 text-3xl';
      case 'xl': return 'w-16 h-16 text-4xl';
      case 'hero': return 'w-24 h-24 text-6xl';
      default: return 'w-8 h-8 text-xl';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'spilling':
        return {
          filter: 'drop-shadow(0 0 20px #00D8A4)',
          textShadow: '0 0 20px #00D8A4'
        };
      case 'steaming':
        return {
          filter: 'drop-shadow(0 0 15px #FF4FB3)',
          textShadow: '0 0 15px #FF4FB3'
        };
      case 'glowing':
        return {
          filter: 'drop-shadow(0 0 25px #FF9C39)',
          textShadow: '0 0 25px #FF9C39'
        };
      default:
        return {};
    }
  };

  const teacupContent = (
    <span 
      className={cn(getSizeClasses(), className)}
      style={getVariantStyles()}
    >
      🫖
    </span>
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          rotate: [0, -5, 5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className="inline-block"
      >
        {teacupContent}
      </motion.div>
    );
  }

  return <div className="inline-block">{teacupContent}</div>;
};

export default BrandedTeacupIcon;
