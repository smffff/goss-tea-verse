
import { ContentValidationService, SecurityValidationResult } from './security/contentValidationService';
import { RateLimitService, RateLimitResult } from './security/rateLimitService';
import { UrlValidationService, UrlValidationResult } from './security/urlValidationService';
import { TokenValidationService, TokenValidationResult } from './security/tokenValidationService';
import { ErrorReportingService } from '@/utils/errorReporting';

interface ComprehensiveSecurityResult {
  overallValid: boolean;
  contentValidation: SecurityValidationResult;
  urlValidation: UrlValidationResult;
  rateLimitCheck: RateLimitResult;
  tokenValidation: TokenValidationResult;
  fallbacksUsed: string[];
  errorReports: string[];
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
    const fallbacksUsed: string[] = [];
    const errorReports: string[] = [];

    try {
      // Get or create secure token first
      const tokenValidation = TokenValidationService.getOrCreateSecureToken();
      
      // Run all validations in parallel for better performance
      const [contentValidation, urlValidation, rateLimitCheck] = await Promise.allSettled([
        ContentValidationService.validateContent(content),
        Promise.resolve(UrlValidationService.validateUrls(urls)),
        RateLimitService.checkRateLimit(tokenValidation.token, action)
      ]);

      // Process results and handle failures
      const processedContentValidation = this.processValidationResult(
        contentValidation,
        'content_validation',
        fallbacksUsed,
        errorReports,
        content
      );

      const processedUrlValidation = this.processValidationResult(
        urlValidation,
        'url_validation',
        fallbacksUsed,
        errorReports,
        urls
      );

      const processedRateLimitCheck = this.processValidationResult(
        rateLimitCheck,
        'rate_limit',
        fallbacksUsed,
        errorReports,
        { token: tokenValidation.token, action }
      );

      const overallValid = 
        processedContentValidation.valid && 
        processedUrlValidation.invalid.length === 0 && 
        processedRateLimitCheck.allowed;

      return {
        overallValid,
        contentValidation: processedContentValidation,
        urlValidation: processedUrlValidation,
        rateLimitCheck: processedRateLimitCheck,
        tokenValidation,
        fallbacksUsed,
        errorReports
      };
    } catch (error) {
      const errorId = ErrorReportingService.reportSecurityError(error as Error, {
        content: content.substring(0, 100),
        urlCount: urls.length,
        action
      }).id;

      errorReports.push(errorId);
      fallbacksUsed.push('emergency_fallback');

      // Return safe fallback result
      return {
        overallValid: false,
        contentValidation: {
          valid: false,
          sanitized: ContentValidationService.sanitizeContent(content),
          threats: ['🫖 Security system temporarily unavailable'],
          riskLevel: 'medium',
          securityScore: 50
        },
        urlValidation: UrlValidationService.validateUrls(urls),
        rateLimitCheck: {
          allowed: true, // Be permissive in emergency fallback
          currentCount: 0,
          maxActions: 5
        },
        tokenValidation: TokenValidationService.getOrCreateSecureToken(),
        fallbacksUsed,
        errorReports
      };
    }
  }

  private static processValidationResult(
    result: PromiseSettledResult<any>,
    type: string,
    fallbacksUsed: string[],
    errorReports: string[],
    context: any
  ): any {
    if (result.status === 'fulfilled') {
      return result.value;
    }

    // Handle rejected promises
    const errorId = ErrorReportingService.reportSecurityError(
      result.reason,
      { validationType: type, context }
    ).id;

    errorReports.push(errorId);
    fallbacksUsed.push(type);

    // Return appropriate fallback based on type
    switch (type) {
      case 'content_validation':
        return {
          valid: false,
          sanitized: ContentValidationService.sanitizeContent(context),
          threats: [`🫖 ${type} fallback active`],
          riskLevel: 'medium' as const,
          securityScore: 50
        };
      case 'url_validation':
        return UrlValidationService.validateUrls(context);
      case 'rate_limit':
        return {
          allowed: true, // Be permissive in fallback
          currentCount: 0,
          maxActions: 5,
          blockedReason: `🫖 ${type} fallback active`
        };
      default:
        return {};
    }
  }

  // Convenience methods that delegate to specific services
  public validateUrls(urls: string[]): UrlValidationResult {
    try {
      return UrlValidationService.validateUrls(urls);
    } catch (error) {
      ErrorReportingService.reportError('url_validation_error', error as Error, 'SecurityServiceUnified');
      return { valid: [], invalid: urls };
    }
  }

  public getOrCreateSecureToken(): TokenValidationResult {
    try {
      return TokenValidationService.getOrCreateSecureToken();
    } catch (error) {
      ErrorReportingService.reportError('token_validation_error', error as Error, 'SecurityServiceUnified');
      return { valid: false, token: 'fallback_token_' + Date.now() };
    }
  }

  public sanitizeContent(content: string): string {
    try {
      return ContentValidationService.sanitizeContent(content);
    } catch (error) {
      ErrorReportingService.reportError('content_sanitization_error', error as Error, 'SecurityServiceUnified');
      return content.replace(/[<>]/g, ''); // Minimal fallback
    }
  }
}

// Export convenience functions for backward compatibility
export const performSubmissionSecurityCheck = SecurityServiceUnified.validateSubmissionSecurity;
export const sanitizeContent = (content: string) => {
  try {
    return ContentValidationService.sanitizeContent(content);
  } catch (error) {
    ErrorReportingService.reportError('sanitize_content_error', error as Error);
    return content;
  }
};
export const validateUrls = (urls: string[]) => {
  try {
    return UrlValidationService.validateUrls(urls);
  } catch (error) {
    ErrorReportingService.reportError('validate_urls_error', error as Error);
    return { valid: [], invalid: urls };
  }
};
export const getOrCreateSecureToken = () => {
  try {
    return TokenValidationService.getOrCreateSecureToken();
  } catch (error) {
    ErrorReportingService.reportError('get_token_error', error as Error);
    return { valid: false, token: 'fallback_' + Date.now() };
  }
};

// Re-export types for convenience
export type { SecurityValidationResult, RateLimitResult, UrlValidationResult, TokenValidationResult, ComprehensiveSecurityResult };
