
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define easing types
type EasingType = "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate";

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
  delay?: number;
  duration?: number;
  ease?: EasingType;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = 0,
  delay = 0,
  duration = 1,
  ease = 'easeOut'
}) => {
  const { scrollYProgress } = useScroll();
  
  // Calculate transform values based on direction - memoized to prevent recalculation
  const transformValue = React.useMemo(() => speed * 100, [speed]);
  
  // Create transforms based on direction
  const yTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' ? [offset, -transformValue] : 
    direction === 'down' ? [offset, transformValue] : [0, 0]
  );
  
  const xTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'left' ? [offset, -transformValue] : 
    direction === 'right' ? [offset, transformValue] : [0, 0]
  );

  // Use the appropriate transform based on direction
  const y = direction === 'up' || direction === 'down' ? yTransform : 0;
  const x = direction === 'left' || direction === 'right' ? xTransform : 0;

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      style={{
        y,
        x,
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement;
