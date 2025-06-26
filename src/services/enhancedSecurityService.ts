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

interface SubmissionSecurityResult {
  overallValid: boolean;
  contentValidation: {
    valid: boolean;
    sanitized: string;
    threats: string[];
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    securityScore: number;
  };
  urlValidation: {
    valid: string[];
    invalid: string[];
  };
  rateLimitCheck: {
    allowed: boolean;
    blockedReason?: string;
  };
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

  public static async validateSubmissionSecurity(
    content: string,
    urls: string[],
    action: string = 'submission'
  ): Promise<SubmissionSecurityResult> {
    const instance = this.getInstance();
    
    // Content validation
    const contentValidation = instance.validateContent(content);
    
    // URL validation
    const urlValidation = instance.validateUrls(urls);
    
    // Rate limit check
    const rateLimitCheck = instance.checkRateLimit(action, 5, 60);
    
    return {
      overallValid: contentValidation.valid && urlValidation.invalid.length === 0 && rateLimitCheck.allowed,
      contentValidation: {
        valid: contentValidation.valid,
        sanitized: contentValidation.sanitized,
        threats: contentValidation.threats,
        riskLevel: contentValidation.riskLevel,
        securityScore: contentValidation.securityScore || 80
      },
      urlValidation,
      rateLimitCheck
    };
  }

  public static async logSecurityEvent(
    eventType: string,
    details: Record<string, unknown> = {},
    severity: 'info' | 'warning' | 'error' | 'critical' = 'info'
  ): Promise<void> {
    const instance = this.getInstance();
    instance.logSecurityEvent(eventType, details, severity);
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

  private validateContent(content: string): {
    valid: boolean;
    sanitized: string;
    threats: string[];
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    securityScore?: number;
  } {
    const threats: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    
    if (!content || content.trim().length === 0) {
      return { valid: false, sanitized: '', threats: ['Empty content'], riskLevel: 'low' };
    }
    
    // Basic validation
    if (content.length > 10000) {
      threats.push('Content too long');
      riskLevel = 'medium';
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
      if (pattern.test(content)) {
        threats.push('Suspicious pattern detected');
        riskLevel = 'critical';
        break;
      }
    }
    
    const sanitized = this.sanitizeInput(content);
    
    return {
      valid: threats.length === 0,
      sanitized,
      threats,
      riskLevel,
      securityScore: 85
    };
  }

  private validateUrls(urls: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];
    
    urls.filter(url => url && url.trim()).forEach(url => {
      try {
        const urlObj = new URL(url);
        if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
          valid.push(url);
        } else {
          invalid.push(url);
        }
      } catch {
        invalid.push(url);
      }
    });
    
    return { valid, invalid };
  }

  private checkRateLimit(action: string, maxAttempts: number, windowMinutes: number): {
    allowed: boolean;
    blockedReason?: string;
  } {
    // Simple client-side rate limiting
    const key = `rate_limit_${action}`;
    const now = Date.now();
    const stored = localStorage.getItem(key);
    
    if (stored) {
      const data = JSON.parse(stored);
      const windowMs = windowMinutes * 60 * 1000;
      
      if (now - data.timestamp < windowMs) {
        if (data.count >= maxAttempts) {
          return { allowed: false, blockedReason: 'Rate limit exceeded' };
        }
        data.count++;
      } else {
        data.count = 1;
        data.timestamp = now;
      }
      
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, JSON.stringify({ count: 1, timestamp: now }));
    }
    
    return { allowed: true };
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
