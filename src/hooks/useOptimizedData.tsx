import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useUnifiedState } from './useUnifiedState.tsx';
import { UnifiedService } from '@/services/UnifiedService';
import { useComponentPerformance } from './usePerformanceMonitor';
import { secureLog } from '@/utils/secureLogging';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface UseOptimizedDataOptions<T> {
  key: string;
  fetcher: () => Promise<T>;
  ttl?: number; // Time to live in milliseconds
  dependencies?: any[];
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  transform?: (data: T) => T;
  compare?: (prev: T, next: T) => boolean;
}

interface UseOptimizedDataReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  invalidate: () => void;
  updateData: (updater: (prev: T | null) => T) => void;
  isStale: boolean;
  lastUpdated: number | null;
}

// Global cache for data sharing across components
const globalCache = new Map<string, CacheEntry<any>>();

// Cache cleanup interval
const CACHE_CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Clean up expired cache entries
const cleanupCache = () => {
  const now = Date.now();
  for (const [key, entry] of globalCache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      globalCache.delete(key);
    }
  }
};

// Set up periodic cache cleanup
if (typeof window !== 'undefined') {
  setInterval(cleanupCache, CACHE_CLEANUP_INTERVAL);
}

export function useOptimizedData<T>({
  key,
  fetcher,
  ttl = 5 * 60 * 1000, // 5 minutes default
  dependencies = [],
  enabled = true,
  onSuccess,
  onError,
  transform,
  compare
}: UseOptimizedDataOptions<T>): UseOptimizedDataReturn<T> {
  const { startRender, endRender } = useComponentPerformance(`useOptimizedData-${key}`);
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Check if data is stale
  const isStale = useMemo(() => {
    if (!lastUpdated) return true;
    return Date.now() - lastUpdated > ttl;
  }, [lastUpdated, ttl]);

  // Get cached data
  const getCachedData = useCallback((): T | null => {
    const cached = globalCache.get(key);
    if (cached && Date.now() - cached.timestamp <= cached.ttl) {
      return cached.data;
    }
    return null;
  }, [key]);

  // Set cached data
  const setCachedData = useCallback((newData: T) => {
    globalCache.set(key, {
      data: newData,
      timestamp: Date.now(),
      ttl
    });
  }, [key, ttl]);

  // Fetch data with performance monitoring
  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;

    startRender();
    
    // Check cache first (unless forced)
    if (!force) {
      const cached = getCachedData();
      if (cached) {
        setData(cached);
        setLastUpdated(Date.now());
        setError(null);
        onSuccess?.(cached);
        endRender();
        return;
      }
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      
      if (!isMountedRef.current || abortControllerRef.current.signal.aborted) {
        return;
      }

      const transformedData = transform ? transform(result) : result;
      
      setData(transformedData);
      setLastUpdated(Date.now());
      setCachedData(transformedData);
      onSuccess?.(transformedData);
      
    } catch (err) {
      if (!isMountedRef.current || abortControllerRef.current.signal.aborted) {
        return;
      }
      
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      endRender();
    }
  }, [enabled, fetcher, transform, onSuccess, onError, getCachedData, setCachedData, startRender, endRender]);

  // Refetch function
  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  // Invalidate cache
  const invalidate = useCallback(() => {
    globalCache.delete(key);
    setData(null);
    setLastUpdated(null);
  }, [key]);

  // Update data optimistically
  const updateData = useCallback((updater: (prev: T | null) => T) => {
    setData(prev => {
      const newData = updater(prev);
      setCachedData(newData);
      return newData;
    });
  }, [setCachedData]);

  // Effect for initial fetch and dependency changes
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, ...dependencies]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Memoized return value to prevent unnecessary re-renders
  return useMemo(() => ({
    data,
    isLoading,
    error,
    refetch,
    invalidate,
    updateData,
    isStale,
    lastUpdated
  }), [data, isLoading, error, refetch, invalidate, updateData, isStale, lastUpdated]);
}

// Hook for optimistic updates with rollback
export function useOptimisticUpdate<T, U>(
  key: string,
  fetcher: () => Promise<T>,
  updater: (data: T, update: U) => T,
  mutationFn: (update: U) => Promise<void>
) {
  const { data, updateData, refetch } = useOptimizedData({ key, fetcher });
  const [pendingUpdates, setPendingUpdates] = useState<U[]>([]);

  const optimisticUpdate = useCallback(async (update: U) => {
    if (!data) return;

    // Apply optimistic update
    updateData(current => updater(current!, update));
    setPendingUpdates(prev => [...prev, update]);

    try {
      // Perform actual mutation
      await mutationFn(update);
      
      // Remove from pending updates on success
      setPendingUpdates(prev => prev.filter(u => u !== update));
    } catch (error) {
      // Rollback on error
      await refetch();
      setPendingUpdates(prev => prev.filter(u => u !== update));
      throw error;
    }
  }, [data, updateData, updater, mutationFn, refetch]);

  return {
    data,
    optimisticUpdate,
    pendingUpdates,
    hasPendingUpdates: pendingUpdates.length > 0
  };
}

// Hook for infinite scrolling with virtualization
export function useInfiniteScroll<T>(
  key: string,
  fetcher: (page: number, limit: number) => Promise<{ data: T[]; hasMore: boolean }>,
  limit = 20
) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allData, setAllData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const result = await fetcher(page, limit);
      setAllData(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load more data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, hasMore, isLoading, fetcher]);

  const reset = useCallback(() => {
    setPage(1);
    setHasMore(true);
    setAllData([]);
  }, []);

  return {
    data: allData,
    isLoading,
    hasMore,
    loadMore,
    reset
  };
}

// Hook for real-time data with WebSocket support
export function useRealtimeData<T>(
  key: string,
  initialData: T | null = null,
  wsUrl?: string
) {
  const [data, setData] = useState<T | null>(initialData);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!wsUrl) return;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setData(newData);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  return {
    data,
    setData,
    sendMessage,
    isConnected: wsRef.current?.readyState === WebSocket.OPEN
  };
} 