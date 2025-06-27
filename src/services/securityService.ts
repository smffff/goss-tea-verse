import { RateLimitService } from './security/rateLimitService';
import { ContentValidationService } from './security/contentValidationService';
import { TokenValidationService } from './security/tokenValidationService';

export class SecurityService {
  static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 15
  ) {
    return RateLimitService.checkRateLimit(identifier, action, maxActions, windowMinutes);
  }

  static async logSecurityEvent(event: any): Promise<void> {
    // Implementation for logging security events
    console.warn('[SECURITY EVENT]', event);
  }

  static validateTokenSecurity(token: string) {
    return TokenValidationService.validateTokenSecurity(token);
  }

  static validateContent(content: string) {
    return ContentValidationService.validateContent(content);
  }

  static async checkIPActivity(ipAddress: string) {
    // Placeholder implementation
    return { suspicious: false, score: 0 };
  }

  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return TokenValidationService.validateCSRFToken(token, sessionToken);
  }

  static validateSecurityHeaders(headers: Headers) {
    // Placeholder implementation
    return { valid: true, issues: [] };
  }
}
