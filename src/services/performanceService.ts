export class PerformanceService {
  private static instance: PerformanceService;
  private metrics: Map<string, number> = new Map();
  private isProduction = process.env.NODE_ENV === 'production';

  static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService();
    }
    return PerformanceService.instance;
  }

  // Track custom performance metrics
  mark(name: string): void {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name);
    }
  }

  measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        if (endMark) {
          performance.measure(name, startMark, endMark);
        } else {
          performance.measure(name, startMark);
        }
        
        const entries = performance.getEntriesByName(name, 'measure');
        const duration = entries[entries.length - 1]?.duration || 0;
        
        this.metrics.set(name, duration);
        
        // Report to analytics in production
        if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: name,
            value: Math.round(duration),
            event_category: 'performance'
          });
        }
        
        return duration;
      } catch (error) {
        secureLog.warn('Performance measurement failed:', error);
        return null;
      }
    }
    return null;
  }

  // Track page load performance
  trackPageLoad(): void {
    if (typeof window === 'undefined') return;

    const handleLoad = () => {
      // Track page load timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp_connect: navigation.connectEnd - navigation.connectStart,
          request_response: navigation.responseEnd - navigation.requestStart,
          dom_processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
          load_complete: navigation.loadEventEnd - navigation.fetchStart
        };

        Object.entries(metrics).forEach(([name, value]) => {
          this.metrics.set(name, value);
          
          if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'timing_complete', {
              name: name,
              value: Math.round(value),
              event_category: 'page_timing'
            });
          }
        });
      }

      // Track Core Web Vitals
      this.trackCoreWebVitals();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
  }

  // Track Core Web Vitals
  private trackCoreWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Dynamic import to avoid bundling if not needed
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      const reportVital = (vital: any) => {
        this.metrics.set(vital.name, vital.value);
        
        if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', vital.name, {
            event_category: 'Web Vitals',
            value: Math.round(vital.name === 'CLS' ? vital.value * 1000 : vital.value),
            custom_parameters: {
              metric_id: vital.id,
              metric_value: vital.value,
              metric_delta: vital.delta
            }
          });
        }

        // Log to console in development
        if (!this.isProduction) {
          if (process.env.NODE_ENV === "development") {
            console.info(`📊 ${vital.name}:`, vital.value, vital);
          }
        }
      };

      onCLS(reportVital);
      onFID(reportVital);
      onFCP(reportVital);
      onLCP(reportVital);
      onTTFB(reportVital);
    }).catch(() => {
      // web-vitals library not available
      secureLog.warn('Web Vitals library not available');
    });
  }

  // Track resource loading performance
  trackResourceLoading(): void {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          // Track slow resources
          if (resource.duration > 1000) {
            secureLog.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
            
            if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'slow_resource', {
                event_category: 'performance',
                event_label: resource.name,
                value: Math.round(resource.duration)
              });
            }
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  // Track user interactions
  trackInteraction(action: string, element?: string): void {
    this.mark(`interaction_${action}_start`);
    
    if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: 'user_interaction',
        event_label: element
      });
    }
  }

  // Get all metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear();
    if (typeof performance !== 'undefined' && performance.clearMarks) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }

  // Report performance summary
  reportSummary(): void {
    const metrics = this.getMetrics();
    
    console.group('🚀 CTea Performance Summary');
    Object.entries(metrics).forEach(([name, value]) => {
      if (process.env.NODE_ENV === "development") {
        console.info(`${name}: ${value.toFixed(2)}ms`);
      }
    });
    console.groupEnd();

    // Send to analytics
    if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_summary', {
        event_category: 'performance',
        custom_parameters: metrics
      });
    }
  }
}

// Export singleton instance
export const performanceService = PerformanceService.getInstance();

// Auto-initialize on import
if (typeof window !== 'undefined') {
  performanceService.trackPageLoad();
  performanceService.trackResourceLoading();
}
