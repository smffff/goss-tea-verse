
import { ContentValidationService } from './contentValidationService';

interface SecurityValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
}

interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  maxActions: number;
  resetTime?: Date;
  blockedReason?: string;
}

interface ComprehensiveSecurityResult {
  overallValid: boolean;
  contentValidation: SecurityValidationResult;
  urlValidation: {
    valid: string[];
    invalid: string[];
  };
  rateLimitCheck: RateLimitResult;
  tokenValidation: {
    valid: boolean;
    token: string;
  };
}

export class UnifiedSecurityService {
  private static instance: UnifiedSecurityService;
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();

  public static getInstance(): UnifiedSecurityService {
    if (!UnifiedSecurityService.instance) {
      UnifiedSecurityService.instance = new UnifiedSecurityService();
    }
    return UnifiedSecurityService.instance;
  }

  public static async validateSubmissionSecurity(
    content: string,
    urls: string[],
    action: string = 'submission'
  ): Promise<ComprehensiveSecurityResult> {
    const instance = this.getInstance();
    
    // Content validation using existing service
    const contentResult = ContentValidationService.validateContent(content);
    
    // Enhanced content validation
    const contentValidation: SecurityValidationResult = {
      valid: contentResult.valid,
      sanitized: contentResult.sanitized,
      threats: contentResult.threats,
      riskLevel: this.calculateRiskLevel(contentResult.threats),
      securityScore: this.calculateSecurityScore(contentResult.threats)
    };

    // URL validation
    const urlValidation = instance.validateUrls(urls);
    
    // Token validation and generation
    const tokenValidation = instance.getOrCreateSecureToken();
    
    // Rate limit check
    const rateLimitCheck = instance.checkRateLimit(action, 5, 60);
    
    return {
      overallValid: contentValidation.valid && urlValidation.invalid.length === 0 && rateLimitCheck.allowed,
      contentValidation,
      urlValidation,
      rateLimitCheck,
      tokenValidation
    };
  }

  private static calculateRiskLevel(threats: string[]): 'low' | 'medium' | 'high' | 'critical' {
    if (threats.length === 0) return 'low';
    if (threats.some(t => t.includes('XSS') || t.includes('injection'))) return 'critical';
    if (threats.length > 2) return 'high';
    return 'medium';
  }

  private static calculateSecurityScore(threats: string[]): number {
    const baseScore = 100;
    const penaltyPerThreat = 20;
    return Math.max(0, baseScore - (threats.length * penaltyPerThreat));
  }

  public validateUrls(urls: string[]): { valid: string[]; invalid: string[] } {
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

  public getOrCreateSecureToken(): { valid: boolean; token: string } {
    let token = sessionStorage.getItem('anonymous_token');
    
    if (!token || !this.validateToken(token)) {
      token = this.generateSecureToken();
      sessionStorage.setItem('anonymous_token', token);
    }
    
    return { valid: true, token };
  }

  private generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private validateToken(token: string): boolean {
    if (!token || token.length < 32 || token.length > 128) return false;
    return /^[A-Za-z0-9_-]+$/.test(token);
  }

  public checkRateLimit(action: string, maxAttempts: number, windowMinutes: number): RateLimitResult {
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    const key = `${action}_${Math.floor(now / windowMs)}`;

    const stored = this.rateLimitStore.get(action);
    let count = 0;

    if (stored && stored.resetTime > now) {
      count = stored.count;
    }

    if (count >= maxAttempts) {
      return {
        allowed: false,
        currentCount: count,
        maxActions: maxAttempts,
        resetTime: new Date(stored?.resetTime || now + windowMs),
        blockedReason: 'Rate limit exceeded'
      };
    }

    this.rateLimitStore.set(action, {
      count: count + 1,
      resetTime: now + windowMs
    });

    return {
      allowed: true,
      currentCount: count + 1,
      maxActions: maxAttempts
    };
  }
}

// Export convenience function for backward compatibility
export const performSubmissionSecurityCheck = UnifiedSecurityService.validateSubmissionSecurity;
