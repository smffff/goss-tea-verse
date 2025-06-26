
import { useEffect, useRef, useState, useMemo } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  const observerOptions = useMemo(() => ({
    threshold,
    rootMargin
  }), [threshold, rootMargin]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isCurrentlyIntersecting);
        
        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
          
          if (triggerOnce) {
            observer.unobserve(target);
          }
        }
      },
      observerOptions
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [observerOptions, triggerOnce, hasIntersected]);

  return {
    targetRef,
    isIntersecting,
    hasIntersected
  };
};

export const useMultipleIntersectionObserver = (
  elementsCount: number,
  options: UseIntersectionObserverOptions = {}
) => {
  const [intersectingElements, setIntersectingElements] = useState<boolean[]>(
    new Array(elementsCount).fill(false)
  );
  const refs = useRef<(HTMLElement | null)[]>([]);

  const observerOptions = useMemo(() => ({
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px'
  }), [options.threshold, options.rootMargin]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setIntersectingElements(prev => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });

            if (entry.isIntersecting && options.triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      observerOptions
    );

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [observerOptions, options.triggerOnce]);

  const setRef = (index: number) => (element: HTMLElement | null) => {
    refs.current[index] = element;
  };

  return {
    intersectingElements,
    setRef
  };
};
