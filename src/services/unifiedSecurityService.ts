
import { ContentValidationService } from './security/contentValidationService';
import { RateLimitService } from './security/rateLimitService';
import { secureLog } from '@/utils/secureLog';

export interface UnifiedSecurityResult {
  success: boolean;
  error?: string;
  rateLimitCheck: {
    allowed: boolean;
    blockedReason?: string;
  };
  contentValidation: {
    valid: boolean;
    sanitized: string;
    threats: string[];
  };
  urlValidation: {
    valid: string[];
    invalid: string[];
  };
}

export class UnifiedSecurityService {
  private static instance: UnifiedSecurityService;

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
  ): Promise<UnifiedSecurityResult> {
    try {
      // Generate anonymous token for rate limiting
      const token = this.generateAnonymousToken();
      
      // Content validation
      const contentResult = await ContentValidationService.validateContent(content, 1000);
      
      // URL validation
      const urlResult = this.validateUrls(urls);
      
      // Rate limit check
      const rateLimitResult = await RateLimitService.checkRateLimit(token, action, 5, 60);
      
      const success = contentResult.valid && urlResult.invalid.length === 0 && rateLimitResult.allowed;
      
      return {
        success,
        rateLimitCheck: {
          allowed: rateLimitResult.allowed,
          blockedReason: rateLimitResult.blockedReason
        },
        contentValidation: {
          valid: contentResult.valid,
          sanitized: contentResult.sanitized,
          threats: contentResult.threats
        },
        urlValidation: urlResult
      };
    } catch (error) {
      secureLog.error('Security validation failed:', error);
      
      // Fallback validation
      return {
        success: content.trim().length > 0 && content.length <= 1000,
        rateLimitCheck: { allowed: true },
        contentValidation: {
          valid: content.trim().length > 0 && content.length <= 1000,
          sanitized: this.basicSanitize(content),
          threats: []
        },
        urlValidation: this.validateUrls(urls)
      };
    }
  }

  private static validateUrls(urls: string[]): { valid: string[]; invalid: string[] } {
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

  private static basicSanitize(content: string): string {
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  private static generateAnonymousToken(): string {
    let token = sessionStorage.getItem('ctea_anonymous_token');
    if (!token) {
      token = crypto.randomUUID();
      sessionStorage.setItem('ctea_anonymous_token', token);
    }
    return token;
  }
}

// Export default for easier imports
export default UnifiedSecurityService;
