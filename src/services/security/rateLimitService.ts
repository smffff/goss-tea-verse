
export interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  maxActions: number;
  blockedReason?: string;
}

export class RateLimitService {
  private static rateLimitData: Map<string, { count: number; windowStart: number }> = new Map();

  static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions: number = 5,
    windowMinutes: number = 60
  ): Promise<RateLimitResult> {
    const key = `${identifier}:${action}`;
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;

    const existing = this.rateLimitData.get(key);
    
    if (!existing || now - existing.windowStart > windowMs) {
      // New window or expired window
      this.rateLimitData.set(key, { count: 1, windowStart: now });
      return {
        allowed: true,
        currentCount: 1,
        maxActions
      };
    }

    existing.count++;
    
    if (existing.count > maxActions) {
      return {
        allowed: false,
        currentCount: existing.count,
        maxActions,
        blockedReason: `Rate limit exceeded: ${existing.count}/${maxActions} in ${windowMinutes} minutes`
      };
    }

    return {
      allowed: true,
      currentCount: existing.count,
      maxActions
    };
  }
}
