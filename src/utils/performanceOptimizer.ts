
import { secureLog } from './secureLogging';

// Performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observers: Map<string, IntersectionObserver> = new Map();
  private lazyLoadQueue: Set<string> = new Set();
  private isProduction = process.env.NODE_ENV === 'production';

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Lazy load images with intersection observer
  setupLazyLoading(selector: string = 'img[data-src]'): void {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );

    this.observers.set('lazy-images', observer);

    // Observe all lazy images
    document.querySelectorAll(selector).forEach((img) => {
      observer.observe(img);
    });
  }

  // Preload critical resources
  preloadResources(resources: string[]): void {
    if (typeof window === 'undefined') return;

    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = this.getResourceType(resource);
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Get resource type for preloading
  private getResourceType(resource: string): string {
    const extension = resource.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'css':
        return 'style';
      case 'js':
        return 'script';
      case 'woff':
      case 'woff2':
        return 'font';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'webp':
      case 'avif':
        return 'image';
      default:
        return 'fetch';
    }
  }

  // Optimize images with WebP support
  optimizeImages(): void {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      // Add loading="lazy" to non-critical images
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }

      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }
    });
  }

  // Debounce function calls
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle function calls
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Memoize expensive calculations
  memoize<T extends (...args: any[]) => any>(
    func: T,
    keyGenerator?: (...args: Parameters<T>) => string
  ): T {
    const cache = new Map<string, ReturnType<T>>();
    
    return ((...args: Parameters<T>): ReturnType<T> => {
      const key = keyGenerator 
        ? keyGenerator(...args)
        : JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key)!;
      }
      
      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }

  // Code splitting helper
  async lazyLoadComponent<T>(
    importFn: () => Promise<{ default: React.ComponentType<T> }>,
    fallback?: React.ComponentType<any>
  ): Promise<React.ComponentType<T>> {
    try {
      const module = await importFn();
      return module.default;
    } catch (error) {
      secureLog.error('Failed to lazy load component:', error);
      return fallback || (() => React.createElement('div', null, 'Loading...'));
    }
  }

  // Bundle analyzer helper
  analyzeBundle(): void {
    if (!this.isProduction && typeof window !== 'undefined') {
      // Log bundle information in development
      const scripts = document.querySelectorAll('script[src]');
      const styles = document.querySelectorAll('link[rel="stylesheet"]');
      
      secureLog.info('Bundle Analysis:', {
        scripts: scripts.length,
        styles: styles.length,
        totalSize: this.calculateTotalSize([...scripts, ...styles])
      });
    }
  }

  // Calculate total size of resources
  private calculateTotalSize(elements: Element[]): string {
    // This is a simplified calculation
    // In a real implementation, you'd fetch the actual file sizes
    const estimatedSize = elements.length * 50; // 50KB per resource estimate
    return `${estimatedSize}KB`;
  }

  // Optimize CSS delivery
  optimizeCSSDelivery(): void {
    if (typeof window === 'undefined') return;

    // Inline critical CSS
    const criticalCSS = this.extractCriticalCSS();
    if (criticalCSS) {
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
    }

    // Defer non-critical CSS
    const nonCriticalLinks = document.querySelectorAll('link[rel="stylesheet"][data-non-critical]');
    nonCriticalLinks.forEach((link) => {
      link.setAttribute('media', 'print');
      link.setAttribute('onload', "this.media='all'");
    });
  }

  // Extract critical CSS (simplified)
  private extractCriticalCSS(): string {
    // In a real implementation, you'd use a tool like critical
    // This is a placeholder for critical CSS extraction
    return `
      .critical-styles {
        /* Critical CSS would be injected here */
      }
    `;
  }

  // Optimize JavaScript execution
  optimizeJavaScript(): void {
    if (typeof window === 'undefined') return;

    // Use requestIdleCallback for non-critical tasks
    if ('requestIdleCallback' in window) {
      // Defer non-critical JavaScript
      requestIdleCallback(() => {
        this.loadNonCriticalScripts();
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        this.loadNonCriticalScripts();
      }, 1000);
    }
  }

  // Load non-critical scripts
  private loadNonCriticalScripts(): void {
    const nonCriticalScripts = document.querySelectorAll('script[data-non-critical]');
    nonCriticalScripts.forEach((script) => {
      const newScript = document.createElement('script');
      newScript.src = script.getAttribute('src') || '';
      newScript.async = true;
      document.body.appendChild(newScript);
    });
  }

  // Monitor Core Web Vitals
  monitorWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        secureLog.info('LCP:', lastEntry.startTime);
        
        if (this.isProduction && window.gtag) {
          window.gtag('event', 'largest_contentful_paint', {
            value: Math.round(lastEntry.startTime)
          });
        }
      }
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        secureLog.info('FID:', fid);
        
        if (this.isProduction && window.gtag) {
          window.gtag('event', 'first_input_delay', {
            value: Math.round(fid)
          });
        }
      }
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          secureLog.info('CLS:', clsValue);
          
          if (this.isProduction && window.gtag) {
            window.gtag('event', 'cumulative_layout_shift', {
              value: Math.round(clsValue * 1000)
            });
          }
        }
      }
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // Cleanup observers
  cleanup(): void {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
    this.lazyLoadQueue.clear();
  }
}

// Export singleton instance
export const performanceOptimizer = PerformanceOptimizer.getInstance();

// Utility functions for common optimizations
export const optimizeImages = () => performanceOptimizer.optimizeImages();
export const setupLazyLoading = (selector?: string) => performanceOptimizer.setupLazyLoading(selector);
export const preloadResources = (resources: string[]) => performanceOptimizer.preloadResources(resources);
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => 
  performanceOptimizer.debounce(func, wait);
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number) => 
  performanceOptimizer.throttle(func, limit);
export const memoize = <T extends (...args: any[]) => any>(
  func: T, 
  keyGenerator?: (...args: Parameters<T>) => string
) => performanceOptimizer.memoize(func, keyGenerator);
