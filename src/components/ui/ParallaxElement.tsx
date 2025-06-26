
import React from 'react';
import { motion, useScroll, useTransform, Easing } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
  delay?: number;
  duration?: number;
  ease?: Easing;
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
  
  // Calculate transform values based on direction
  const transformValue = speed * 100;
  
  const yUp = useTransform(scrollYProgress, [0, 1], [offset, -transformValue]);
  const yDown = useTransform(scrollYProgress, [0, 1], [offset, transformValue]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [offset, -transformValue]);
  const xRight = useTransform(scrollYProgress, [0, 1], [offset, transformValue]);

  // Determine which transform to use based on direction
  const y = direction === 'up' ? yUp : direction === 'down' ? yDown : 0;
  const x = direction === 'left' ? xLeft : direction === 'right' ? xRight : 0;

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
