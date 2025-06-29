
import { ContentValidationService } from './security/contentValidation';
import { RateLimitManagerService } from './security/rateLimitManager';
import { TokenManagerService } from './security/tokenManager';
import { SecurityLoggerService } from './security/securityLogger';
import { SubmissionSecurityService } from './security/submissionSecurity';
import type { ContentValidationResult, RateLimitResult, ThreatLevel } from './security/types';

export class SecurityService {
  // Token management
  static async getOrCreateSecureToken(): Promise<string> {
    return TokenManagerService.getOrCreateSecureToken();
  }

  // Content validation
  static async validateContent(content: string, maxLength = 2000): Promise<ContentValidationResult> {
    return ContentValidationService.validateContent(content, maxLength);
  }

  // Rate limiting
  static async checkRateLimit(
    token: string, 
    action: string, 
    maxAttempts: number, 
    windowMinutes: number
  ): Promise<RateLimitResult> {
    return RateLimitManagerService.checkRateLimit(token, action, maxAttempts, windowMinutes);
  }

  // Security logging
  static async logSecurityEvent(
    eventType: string,
    details: Record<string, unknown>,
    threatLevel: ThreatLevel = 'low'
  ): Promise<void> {
    return SecurityLoggerService.logSecurityEvent(eventType, details, threatLevel);
  }

  // Submission security (delegated methods)
  static async validateSubmissionSecurity(
    content: string, 
    action: string = 'submission'
  ): Promise<{
    success: boolean;
    errors: string[];
    sanitizedContent?: string;
  }> {
    return SubmissionSecurityService.validateSubmissionSecurity(content, action);
  }

  static async createSecureSubmission(content: string, category: string = 'general') {
    return SubmissionSecurityService.createSecureSubmission(content, category);
  }

  static async createSecureReaction(
    submissionId: string, 
    reactionType: 'hot' | 'cold' | 'spicy'
  ) {
    return SubmissionSecurityService.createSecureReaction(submissionId, reactionType);
  }
}
