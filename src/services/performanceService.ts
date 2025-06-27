
export interface PerformanceMetrics {
  pageLoadTime: number;
  timeToInteractive: number;
  memoryUsage?: number;
  apiResponseTime?: number;
}

export class PerformanceService {
  private static metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    timeToInteractive: 0
  };

  static init() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.measurePageLoad();
      this.measureMemoryUsage();
    }
  }

  private static measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.timeToInteractive = navigation.domInteractive - navigation.fetchStart;
      }
    });
  }

  private static measureMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
    }
  }

  static measureApiCall<T>(apiCall: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    return apiCall().then(result => {
      const endTime = performance.now();
      this.metrics.apiResponseTime = endTime - startTime;
      return result;
    });
  }

  static getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  static logMetrics() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', this.metrics);
    }
  }
}
