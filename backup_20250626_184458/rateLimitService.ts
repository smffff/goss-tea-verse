
export interface RateLimitResult {
  allowed: boolean
  currentCount: number
  maxActions: number
  resetTime?: Date
  blockedReason?: string
}

export class RateLimitService {
  private static rateLimits: Map<string, { count: number; windowStart: number }> = new Map()

  static checkRateLimit(
    identifier: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 15
  ): RateLimitResult {
    const now = Date.now()
    const windowMs = windowMinutes * 60 * 1000
    const key = `${identifier}:${action}`
    
    const existing = this.rateLimits.get(key)
    
    // Clean up expired entries
    if (existing && (now - existing.windowStart) > windowMs) {
      this.rateLimits.delete(key)
    }
    
    const current = this.rateLimits.get(key) || { count: 0, windowStart: now }
    
    if (current.count >= maxActions) {
      return {
        allowed: false,
        currentCount: current.count,
        maxActions,
        resetTime: new Date(current.windowStart + windowMs),
        blockedReason: 'Rate limit exceeded'
      }
    }
    
    // Update count
    this.rateLimits.set(key, {
      count: current.count + 1,
      windowStart: current.windowStart
    })
    
    return {
      allowed: true,
      currentCount: current.count + 1,
      maxActions
    }
  }
}
