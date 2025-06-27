
import { secureLog } from '@/utils/secureLog';

interface PerformanceMetrics {
  pageLoadTime: number;
  resourceLoadTime: number;
  renderTime: number;
  interactionTime: number;
}

export class PerformanceService {
  private static metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    resourceLoadTime: 0,
    renderTime: 0,
    interactionTime: 0
  };

  static initializePerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    try {
      // Monitor page load performance
      window.addEventListener('load', () => {
        this.measurePageLoad();
      });

      // Monitor resource loading
      this.observeResourceLoading();

      // Monitor rendering performance
      this.observeRendering();

      secureLog.info('Performance monitoring initialized');
    } catch (error) {
      secureLog.error('Failed to initialize performance monitoring', error);
    }
  }

  private static measurePageLoad(): void {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.navigationStart;
        this.metrics.resourceLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        
        secureLog.info('Page load metrics recorded', this.metrics);
      }
    } catch (error) {
      secureLog.error('Failed to measure page load', error);
    }
  }

  private static observeResourceLoading(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            
            // Log slow resources
            if (resourceEntry.duration > 1000) {
              secureLog.warn('Slow resource detected', {
                name: resourceEntry.name,
                duration: resourceEntry.duration,
                size: resourceEntry.transferSize
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      secureLog.error('Failed to observe resource loading', error);
    }
  }

  private static observeRendering(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            secureLog.info('Paint timing recorded', {
              name: entry.name,
              startTime: entry.startTime
            });
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });
    } catch (error) {
      secureLog.error('Failed to observe rendering', error);
    }
  }

  static getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  static recordInteraction(interactionName: string, startTime: number): void {
    try {
      const duration = performance.now() - startTime;
      this.metrics.interactionTime = duration;
      
      secureLog.info('Interaction recorded', {
        name: interactionName,
        duration
      });
    } catch (error) {
      secureLog.error('Failed to record interaction', error);
    }
  }
}
