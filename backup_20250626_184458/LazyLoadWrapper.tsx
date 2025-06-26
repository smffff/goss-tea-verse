import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  height?: string;
  placeholder?: React.ReactNode;
  threshold?: number;
  className?: string;
}

const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  height = 'auto',
  placeholder,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (isVisible) {
      // Simulate loading delay for better UX
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const defaultPlaceholder = (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4 bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
      <Skeleton className="h-4 w-full bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20" />
      <Skeleton className="h-4 w-2/3 bg-gray-700" />
    </div>
  );

  return (
    <div 
      ref={ref} 
      className={`transition-opacity duration-300 ${className}`}
      style={{ minHeight: height }}
    >
      {!isLoaded ? (
        <div className="animate-pulse">
          {placeholder || defaultPlaceholder}
        </div>
      ) : (
        <div className="animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

export default LazyLoadWrapper; 