
import React from 'react';
import { motion } from 'framer-motion';
import TeaCupSVG from './teacup/TeaCupSVG';
import TeaCupGradients from './teacup/TeaCupGradients';
import SpillEffects from './teacup/SpillEffects';

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
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <TeaCupGradients />
        <TeaCupSVG animated={animated} isSpilling={isSpilling} />
        <SpillEffects isSpilling={isSpilling} />
      </svg>
      
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
