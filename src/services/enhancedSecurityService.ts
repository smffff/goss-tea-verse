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
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
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
    let securityScore = 100;
    
    if (!content || content.trim().length === 0) {
      return { valid: false, sanitized: '', threats: ['Empty content'], riskLevel: 'low', securityScore: 0 };
    }
    
    // Basic validation
    if (content.length > 10000) {
      threats.push('Content too long');
      riskLevel = 'medium';
      securityScore -= 20;
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
        threats.push('Suspicious content pattern detected');
        riskLevel = 'critical';
        securityScore = 0;
        break;
      }
    }

    // Sanitize content
    const sanitized = content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');

    return {
      valid: threats.length === 0,
      sanitized,
      threats,
      riskLevel,
      securityScore
    };
  }

  private validateUrls(urls: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    for (const url of urls) {
      if (!url?.trim()) continue;
      
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
    }

    return { valid, invalid };
  }

  private checkRateLimit(action: string, maxAttempts: number, windowMinutes: number): { allowed: boolean; blockedReason?: string } {
    // Simple client-side rate limiting
    const key = `rate_limit_${action}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      const data = JSON.parse(stored);
      const now = Date.now();
      const windowMs = windowMinutes * 60 * 1000;
      
      if (now - data.timestamp < windowMs && data.count >= maxAttempts) {
        return { allowed: false, blockedReason: 'Rate limit exceeded' };
      }
      
      if (now - data.timestamp < windowMs) {
        data.count++;
      } else {
        data.count = 1;
        data.timestamp = now;
      }
      
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, JSON.stringify({ count: 1, timestamp: Date.now() }));
    }
    
    return { allowed: true };
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('security_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('security_session_id', sessionId);
    }
    return sessionId;
  }

  private handleCriticalEvent(event: SecurityEvent): void {
    // Log critical event
    console.error('[CRITICAL SECURITY EVENT]', event);
    
    // Could implement additional measures like:
    // - Block the session
    // - Send alert to administrators
    // - Temporarily restrict functionality
  }
}
