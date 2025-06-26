import { useState, useEffect } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  easing?: number;
}

export const useParallaxScroll = (options: ParallaxOptions = {}) => {
  const {
    speed = 0.5,
    direction = 'up',
    offset = 0,
    easing = 0.1
  } = options;

  const [scrollY, setScrollY] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targetY = scrollY * speed + offset;
    setParallaxY(prev => prev + (targetY - prev) * easing);
  }, [scrollY, speed, offset, easing]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${parallaxY}px)`;
      case 'down':
        return `translateY(${-parallaxY}px)`;
      case 'left':
        return `translateX(${parallaxY}px)`;
      case 'right':
        return `translateX(${-parallaxY}px)`;
      default:
        return `translateY(${parallaxY}px)`;
    }
  };

  return {
    scrollY,
    parallaxY,
    transform: getTransform(),
    style: { transform: getTransform() }
  };
};

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
}; 