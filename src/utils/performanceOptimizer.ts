// Utility to optimize performance by caching expensive computations or data fetches.
// It supports various caching strategies and provides insights into cache performance.

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

type CacheKey = string;

class PerformanceCache<T> {
  private cache: Map<CacheKey, CacheEntry<T>> = new Map();
  private maxAge: number; // Maximum age of cache entries in milliseconds
  private maxSize: number; // Maximum number of entries in the cache
  private cleanupInterval: number; // Interval for cleaning up expired entries
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(maxAge: number = 60000, maxSize: number = 100, cleanupInterval: number = 60000) {
    this.maxAge = maxAge;
    this.maxSize = maxSize;
    this.cleanupInterval = cleanupInterval;
    this.scheduleCleanup();
  }

  private scheduleCleanup() {
    this.cleanupTimer = setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  public stopCleanup() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  public get(key: CacheKey): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }

    const now = Date.now();
    if (now - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.data;
  }

  public set(key: CacheKey, data: T): void {
    const now = Date.now();
    this.cache.set(key, { data, timestamp: now });
    this.ensureMaxSize();
  }

  private ensureMaxSize(): void {
    if (this.cache.size > this.maxSize) {
      // Remove the oldest entry
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.cache.entries()) {
      if (now - data.timestamp > this.maxAge) {
        this.cache.delete(key);
      }
    }
  }
}

// Example usage:
const dataCache = new PerformanceCache<any>(60000, 50); // 60 seconds, max 50 entries

// Memoization utility
function memoize<T extends (...args: any[]) => any>(
  func: T,
  cache: PerformanceCache<ReturnType<T>>,
  keyGenerator: (...args: Parameters<T>) => string = (...args) => JSON.stringify(args)
): T {
  return function (...args: Parameters<T>): ReturnType<T> {
    const key = keyGenerator(...args);
    const cachedData = cache.get(key);

    if (cachedData) {
      return cachedData;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  } as T;
}

// Usage example:
const expensiveFunction = (a: number, b: number) => {
  console.log('Running expensive function');
  return a + b;
};

const cachedExpensiveFunction = memoize(
  expensiveFunction,
  new PerformanceCache<number>(),
  (a, b) => `${a}-${b}`
);

// Throttling utility
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  let lastResult: ReturnType<T> | null = null;

  return function (...args: Parameters<T>): ReturnType<T> {
    if (!inThrottle) {
      lastResult = func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
      return lastResult;
    }
    return lastResult as ReturnType<T>;
  } as T;
}

// Debouncing utility
function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>): ReturnType<T> {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
    return undefined as ReturnType<T>;
  } as T;
}

// Example of performance monitoring
function monitorPerformance<T extends (...args: any[]) => any>(func: T, key: string): T {
  return function (...args: Parameters<T>): ReturnType<T> {
    const startTime = performance.now();
    const result = func(...args);
    const endTime = performance.now();
    const duration = endTime - startTime;

    performance.mark(key);
    performance.measure(key, key);

    console.log(`Function ${key} took ${duration}ms`);

    // Performance monitoring integration
    const performanceEntry = performance.getEntriesByName(key)[0];
    if (performanceEntry) {
      console.log(`Cache performance for ${key}:`, performanceEntry.duration);
    }
    
    return result;
  } as T;
}

export { PerformanceCache, memoize, throttle, debounce, monitorPerformance };
