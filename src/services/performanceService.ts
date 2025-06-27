import { secureLog } from '@/utils/secureLogging';

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage?: number;
  timestamp: number;
}

class PerformanceService {
  private metrics: PerformanceMetrics[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    try {
      // First Input Delay observer
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric({
            loadTime: 0,
            renderTime: 0,
            interactionTime: entry.processingStart - entry.startTime,
            timestamp: Date.now()
          });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

    } catch (error) {
      secureLog.error('Failed to initialize performance observers:', { error });
    }
  }

  public measurePageLoad(): PerformanceMetrics | null {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!navigation) return null;

      // Use loadEventEnd instead of navigationStart
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;

      const metrics: PerformanceMetrics = {
        loadTime,
        renderTime,
        interactionTime: 0,
        memoryUsage: this.getMemoryUsage(),
        timestamp: Date.now()
      };

      this.recordMetric(metrics);
      return metrics;
    } catch (error) {
      secureLog.error('Failed to measure page load:', { error });
      return null;
    }
  }

  public measureRenderTime(componentName: string, startTime: number): number {
    try {
      const renderTime = performance.now() - startTime;
      
      this.recordMetric({
        loadTime: 0,
        renderTime,
        interactionTime: 0,
        timestamp: Date.now()
      });

      secureLog.info(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      return renderTime;
    } catch (error) {
      secureLog.error('Failed to measure render time:', { error });
      return 0;
    }
  }

  private getMemoryUsage(): number | undefined {
    try {
      // @ts-ignore - memory API might not be available in all browsers
      return (performance as any).memory?.usedJSHeapSize;
    } catch {
      return undefined;
    }
  }

  private recordMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  public getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  public getAverageMetrics(): Partial<PerformanceMetrics> {
    if (this.metrics.length === 0) return {};

    const totals = this.metrics.reduce((acc, metric) => ({
      loadTime: acc.loadTime + metric.loadTime,
      renderTime: acc.renderTime + metric.renderTime,
      interactionTime: acc.interactionTime + metric.interactionTime
    }), { loadTime: 0, renderTime: 0, interactionTime: 0 });

    const count = this.metrics.length;
    return {
      loadTime: totals.loadTime / count,
      renderTime: totals.renderTime / count,
      interactionTime: totals.interactionTime / count
    };
  }

  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }
}

export const performanceService = new PerformanceService();
