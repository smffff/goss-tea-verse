interface SecurityEvent {
  event_type: string;
  details: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: string;
  session_id?: string;
  user_agent?: string;
  ip_address?: string;
}

interface SecurityConfig {
  maxLoginAttempts: number;
  lockoutDuration: number;
  sessionTimeout: number;
  rateLimitWindow: number;
  rateLimitMax: number;
}

interface SecurityMetrics {
  totalEvents: number;
  criticalEvents: number;
  blockedAttempts: number;
  activeThreats: number;
}

export class EnhancedSecurityService {
  private static instance: EnhancedSecurityService;
  private events: SecurityEvent[] = [];
  private blockedIPs: Set<string> = new Set();
  private suspiciousSessions: Set<string> = new Set();

  private config: SecurityConfig = {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    rateLimitWindow: 60 * 1000, // 1 minute
    rateLimitMax: 100
  };

  public static getInstance(): EnhancedSecurityService {
    if (!EnhancedSecurityService.instance) {
      EnhancedSecurityService.instance = new EnhancedSecurityService();
    }
    return EnhancedSecurityService.instance;
  }

  public logSecurityEvent(
    eventType: string,
    details: Record<string, unknown> = {},
    severity: 'info' | 'warning' | 'error' | 'critical' = 'info'
  ): void {
    const event: SecurityEvent = {
      event_type: eventType,
      details,
      severity,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId(),
      user_agent: navigator.userAgent,
      ip_address: 'client-side' // Cannot get real IP from client
    };

    this.events.push(event);
    
    // Keep only recent events (last 1000)
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SECURITY] ${severity.toUpperCase()}: ${eventType}`, details);
    }

    // Handle critical events
    if (severity === 'critical') {
      this.handleCriticalEvent(event);
    }
  }

  public getSecurityMetrics(): SecurityMetrics {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);

    const recentEvents = this.events.filter(
      event => new Date(event.timestamp).getTime() > oneHourAgo
    );

    return {
      totalEvents: recentEvents.length,
      criticalEvents: recentEvents.filter(e => e.severity === 'critical').length,
      blockedAttempts: recentEvents.filter(e => e.event_type.includes('blocked')).length,
      activeThreats: this.suspiciousSessions.size
    };
  }

  public isIPBlocked(ip: string): boolean {
    return this.blockedIPs.has(ip);
  }

  public blockIP(ip: string, reason: string): void {
    this.blockedIPs.add(ip);
    this.logSecurityEvent('ip_blocked', { ip, reason }, 'warning');
  }

  public validateInput(input: string, maxLength: number = 1000): boolean {
    // Basic validation
    if (!input || input.length > maxLength) {
      return false;
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /eval\s*\(/gi,
      /union\s+select/gi,
      /drop\s+table/gi
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(input)) {
        this.logSecurityEvent('suspicious_input_detected', { 
          pattern: pattern.source,
          input: input.substring(0, 100) + '...' 
        }, 'warning');
        return false;
      }
    }

    return true;
  }

  public sanitizeInput(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('security_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('security_session_id', sessionId);
    }
    return sessionId;
  }

  private handleCriticalEvent(event: SecurityEvent): void {
    // Add session to suspicious list
    if (event.session_id) {
      this.suspiciousSessions.add(event.session_id);
    }

    // In a real app, you might want to:
    // - Send alert to security team
    // - Temporarily block the session
    // - Require additional authentication
    console.warn('[CRITICAL SECURITY EVENT]', event);
  }

  public clearEvents(): void {
    this.events = [];
  }

  public getRecentEvents(count: number = 10): SecurityEvent[] {
    return this.events.slice(-count);
  }
}

// Export singleton instance
export const securityService = EnhancedSecurityService.getInstance();
