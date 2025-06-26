
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TeaCupSVG from './teacup/TeaCupSVG';
import TeaCupGradients from './teacup/TeaCupGradients';
import EnhancedSpillEffects from './teacup/EnhancedSpillEffects';

interface EnhancedSpillingTeaCupProps {
  className?: string;
  animated?: boolean;
  isSpilling?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  onHover?: boolean;
  interactive?: boolean;
}

const EnhancedSpillingTeaCup: React.FC<EnhancedSpillingTeaCupProps> = ({ 
  className = '', 
  animated = false, 
  isSpilling = false,
  size = 'md',
  onHover = false,
  interactive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    hero: 'w-48 h-48 md:w-64 md:h-64'
  };

  const shouldSpill = isSpilling || (onHover && isHovered) || isClicked;

  const handleClick = () => {
    if (interactive) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 3000);
    }
  };

  return (
    <motion.div 
      className={`${sizes[size]} ${className} relative cursor-pointer`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.05 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <TeaCupGradients />
        <TeaCupSVG animated={animated} isSpilling={shouldSpill} />
        <EnhancedSpillEffects isSpilling={shouldSpill} />
      </svg>
      
      {/* Overflow effects */}
      {shouldSpill && (
        <div className="absolute -bottom-4 -right-6 pointer-events-none">
          <motion.div
            className="w-16 h-6 bg-gradient-to-r from-[#FF6B9D] via-[#FF9500] to-transparent rounded-full opacity-60"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Particle overflow */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FF6B9D] rounded-full"
              initial={{ 
                x: Math.random() * 20,
                y: Math.random() * 10,
                scale: 0 
              }}
              animate={{
                x: Math.random() * 40 + 20,
                y: Math.random() * 20 + 15,
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedSpillingTeaCup;
