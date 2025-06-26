
import { ContentValidationService, SecurityValidationResult } from './security/contentValidationService';
import { RateLimitService, RateLimitResult } from './security/rateLimitService';
import { UrlValidationService, UrlValidationResult } from './security/urlValidationService';
import { TokenValidationService, TokenValidationResult } from './security/tokenValidationService';

interface ComprehensiveSecurityResult {
  overallValid: boolean;
  contentValidation: SecurityValidationResult;
  urlValidation: UrlValidationResult;
  rateLimitCheck: RateLimitResult;
  tokenValidation: TokenValidationResult;
}

export class SecurityServiceUnified {
  private static instance: SecurityServiceUnified;

  public static getInstance(): SecurityServiceUnified {
    if (!SecurityServiceUnified.instance) {
      SecurityServiceUnified.instance = new SecurityServiceUnified();
    }
    return SecurityServiceUnified.instance;
  }

  public static async validateSubmissionSecurity(
    content: string,
    urls: string[],
    action: string = 'submission'
  ): Promise<ComprehensiveSecurityResult> {
    // Get or create secure token first
    const tokenValidation = TokenValidationService.getOrCreateSecureToken();
    
    // Run all validations in parallel for better performance
    const [contentValidation, urlValidation, rateLimitCheck] = await Promise.all([
      ContentValidationService.validateContent(content),
      Promise.resolve(UrlValidationService.validateUrls(urls)),
      RateLimitService.checkRateLimit(tokenValidation.token, action)
    ]);
    
    return {
      overallValid: contentValidation.valid && urlValidation.invalid.length === 0 && rateLimitCheck.allowed,
      contentValidation,
      urlValidation,
      rateLimitCheck,
      tokenValidation
    };
  }

  // Convenience methods that delegate to specific services
  public validateUrls(urls: string[]): UrlValidationResult {
    return UrlValidationService.validateUrls(urls);
  }

  public getOrCreateSecureToken(): TokenValidationResult {
    return TokenValidationService.getOrCreateSecureToken();
  }

  public sanitizeContent(content: string): string {
    return ContentValidationService.sanitizeContent(content);
  }
}

// Export convenience functions for backward compatibility
export const performSubmissionSecurityCheck = SecurityServiceUnified.validateSubmissionSecurity;
export const sanitizeContent = (content: string) => ContentValidationService.sanitizeContent(content);
export const validateUrls = (urls: string[]) => UrlValidationService.validateUrls(urls);
export const getOrCreateSecureToken = () => TokenValidationService.getOrCreateSecureToken();

// Re-export types for convenience
export type { SecurityValidationResult, RateLimitResult, UrlValidationResult, TokenValidationResult, ComprehensiveSecurityResult };
