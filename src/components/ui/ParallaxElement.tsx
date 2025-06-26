import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
  delay?: number;
  duration?: number;
  ease?: string;
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
  
  const getTransform = () => {
    const baseTransform = scrollYProgress.get();
    const transformValue = baseTransform * speed * 100 + offset;
    
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [offset, -transformValue]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [offset, transformValue]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [offset, -transformValue]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [offset, transformValue]);
      default:
        return useTransform(scrollYProgress, [0, 1], [offset, -transformValue]);
    }
  };

  const y = direction === 'up' || direction === 'down' ? getTransform() : 0;
  const x = direction === 'left' || direction === 'right' ? getTransform() : 0;

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