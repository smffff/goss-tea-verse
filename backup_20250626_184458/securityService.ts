
import { RateLimitService, type RateLimitResult } from './rateLimitService'
import { ContentValidationService, type ContentValidationResult } from './contentValidationService'
import { TokenValidationService, type TokenValidationResult } from './tokenValidationService'
import { SecurityEventService, type SecurityEvent } from './securityEventService'
import { IPActivityService, type IPActivityResult } from './ipActivityService'
import { SecurityHeadersService, type SecurityHeadersResult } from './securityHeadersService'

export class SecurityService {
  // Enhanced rate limiting with IP tracking
  static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 15
  ): Promise<RateLimitResult> {
    return RateLimitService.checkRateLimit(identifier, action, maxActions, windowMinutes)
  }

  // Enhanced security event logging
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    return SecurityEventService.logSecurityEvent(event)
  }

  // Token security validation
  static validateTokenSecurity(token: string): TokenValidationResult {
    return TokenValidationService.validateTokenSecurity(token)
  }

  // Content validation and sanitization
  static validateContent(content: string): ContentValidationResult {
    return ContentValidationService.validateContent(content)
  }

  // Check IP activity patterns
  static async checkIPActivity(ipAddress: string): Promise<IPActivityResult> {
    return IPActivityService.checkIPActivity(ipAddress)
  }

  // Enhanced CSRF token validation
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return TokenValidationService.validateCSRFToken(token, sessionToken)
  }

  // Security headers validation
  static validateSecurityHeaders(headers: Headers): SecurityHeadersResult {
    return SecurityHeadersService.validateSecurityHeaders(headers)
  }
}

// Re-export types for backward compatibility
export type {
  RateLimitResult,
  ContentValidationResult,
  TokenValidationResult,
  SecurityEvent,
  IPActivityResult,
  SecurityHeadersResult
}
