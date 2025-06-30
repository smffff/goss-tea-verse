import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (isLocked) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Add scroll lock class to body
      document.body.classList.add('scroll-lock');
      document.body.style.top = `-${scrollY}px`;
      
      return () => {
        // Remove scroll lock class
        document.body.classList.remove('scroll-lock');
        document.body.style.top = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
};
