import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const usePerformanceMonitor = (pageName: string) => {
  const metricsRef = useRef<PerformanceMetrics>({
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  });

  useEffect(() => {
    const startTime = performance.now();

    // Track page load time
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      metricsRef.current.pageLoadTime = loadTime;
      
      console.log(`[Performance] ${pageName} loaded in ${loadTime.toFixed(2)}ms`);
      
      // Track in analytics
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          page_name: pageName,
          load_time: loadTime
        });
      }
    };

    // Track First Contentful Paint
    const trackFCP = () => {
      const fcpEntry = performance.getEntriesByType('paint').find(
        entry => entry.name === 'first-contentful-paint'
      );
      
      if (fcpEntry) {
        metricsRef.current.firstContentfulPaint = fcpEntry.startTime;
        console.log(`[Performance] FCP: ${fcpEntry.startTime.toFixed(2)}ms`);
      }
    };

    // Track Largest Contentful Paint
    const trackLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metricsRef.current.largestContentfulPaint = lastEntry.startTime;
        
        console.log(`[Performance] LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        
        if (window.gtag) {
          window.gtag('event', 'largest_contentful_paint', {
            page_name: pageName,
            lcp_time: lastEntry.startTime
          });
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Track Cumulative Layout Shift
    const trackCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Use type guard for LayoutShift
          if (!entry.hadRecentInput && 'value' in entry) {
            clsValue += (entry as PerformanceEntry & { value: number }).value;
          }
        }
        metricsRef.current.cumulativeLayoutShift = clsValue;
        
        console.log(`[Performance] CLS: ${clsValue.toFixed(4)}`);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Track First Input Delay
    const trackFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metricsRef.current.firstInputDelay = entry.processingStart - entry.startTime;
          
          console.log(`[Performance] FID: ${metricsRef.current.firstInputDelay.toFixed(2)}ms`);
          
          if (window.gtag) {
            window.gtag('event', 'first_input_delay', {
              page_name: pageName,
              fid_time: metricsRef.current.firstInputDelay
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Initialize tracking
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleLoad);
    } else {
      handleLoad();
    }

    // Track web vitals
    trackFCP();
    trackLCP();
    trackCLS();
    trackFID();

    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', handleLoad);
    };
  }, [pageName]);

  // Return current metrics
  return metricsRef.current;
};

// Performance monitoring for specific components
export const useComponentPerformance = (componentName: string) => {
  const renderStartRef = useRef<number>(0);

  useEffect(() => {
    renderStartRef.current = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStartRef.current;
      
      if (renderTime > 16) { // Longer than one frame (16ms)
        console.warn(`[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });

  return {
    startRender: () => {
      renderStartRef.current = performance.now();
    },
    endRender: () => {
      const renderTime = performance.now() - renderStartRef.current;
      return renderTime;
    }
  };
}; 