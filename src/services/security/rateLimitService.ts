
import { secureLog } from '@/utils/secureLogging';

interface RateLimitEntry {
  count: number;
  windowStart: number;
  lastAttempt: number;
}

export class RateLimitService {
  private static storage = new Map<string, RateLimitEntry>();
  private static readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

  static {
    // Cleanup expired entries every 5 minutes
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  public static checkRateLimit(
    identifier: string,
    action: string,
    maxAttempts: number,
    windowMinutes: number
  ): { allowed: boolean; remaining: number; resetTime?: number } {
    const key = `${identifier}:${action}`;
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    const entry = this.storage.get(key);

    // No previous attempts
    if (!entry) {
      this.storage.set(key, {
        count: 1,
        windowStart: now,
        lastAttempt: now
      });
      return { allowed: true, remaining: maxAttempts - 1 };
    }

    // Check if window has expired
    if (now - entry.windowStart > windowMs) {
      this.storage.set(key, {
        count: 1,
        windowStart: now,
        lastAttempt: now
      });
      return { allowed: true, remaining: maxAttempts - 1 };
    }

    // Check if limit exceeded
    if (entry.count >= maxAttempts) {
      secureLog.warn('Rate limit exceeded', { 
        identifier, 
        action, 
        attempts: entry.count,
        maxAttempts 
      });
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: entry.windowStart + windowMs 
      };
    }

    // Increment counter
    entry.count++;
    entry.lastAttempt = now;
    this.storage.set(key, entry);

    return { allowed: true, remaining: maxAttempts - entry.count };
  }

  private static cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.storage.entries()) {
      // Remove entries older than 1 hour
      if (now - entry.lastAttempt > 60 * 60 * 1000) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.storage.delete(key);
    }
  }
}
