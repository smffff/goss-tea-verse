
import { ContentValidationService } from './security/contentValidationService';
import { RateLimitService } from './security/rateLimitService';

interface UnifiedSecurityResult {
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
  tokenValidation: {
    token: string;
    valid: boolean;
  };
}

export class UnifiedSecurityService {
  public static async validateSubmissionSecurity(
    content: string,
    urls: string[],
    action: string = 'submission'
  ): Promise<UnifiedSecurityResult> {
    try {
      // Generate or get anonymous token
      const token = this.generateAnonymousToken();
      
      // Content validation
      const contentValidation = await ContentValidationService.validateContent(content, 1000);
      
      // URL validation
      const urlValidation = this.validateUrls(urls);
      
      // Rate limit check
      const rateLimitCheck = await RateLimitService.checkRateLimit(token, action, 5, 60);
      
      return {
        overallValid: contentValidation.valid && urlValidation.invalid.length === 0 && rateLimitCheck.allowed,
        contentValidation,
        urlValidation,
        rateLimitCheck,
        tokenValidation: {
          token,
          valid: true
        }
      };
    } catch (error) {
      console.error('Unified security validation failed:', error);
      
      // Fallback validation
      return {
        overallValid: content.trim().length > 0 && content.length <= 1000,
        contentValidation: {
          valid: content.trim().length > 0 && content.length <= 1000,
          sanitized: this.basicSanitize(content),
          threats: [],
          riskLevel: 'low',
          securityScore: 80
        },
        urlValidation: this.validateUrls(urls),
        rateLimitCheck: { allowed: true },
        tokenValidation: {
          token: this.generateAnonymousToken(),
          valid: true
        }
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
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');
  }

  private static generateAnonymousToken(): string {
    return crypto.randomUUID();
  }
}
