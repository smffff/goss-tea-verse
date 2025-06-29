
import { EnhancedContentValidationService, EnhancedValidationResult } from './enhancedContentValidation';
import { RateLimitService } from './rateLimitService';
import { SecureTokenService } from './tokenService';
import { secureLog } from '@/utils/secureLogging';

export interface SecurityCheckResult {
  allowed: boolean;
  validationResult: EnhancedValidationResult;
  rateLimitResult: { allowed: boolean; remaining: number; resetTime?: number };
  token: string;
  errors: string[];
}

export class UnifiedSecurityService {
  public static async performSecurityCheck(
    content: string,
    action: string = 'submission',
    maxAttempts: number = 5,
    windowMinutes: number = 15
  ): Promise<SecurityCheckResult> {
    const errors: string[] = [];
    
    try {
      // Get or create secure token
      const token = SecureTokenService.getOrCreateToken();
      
      // Validate token
      if (!SecureTokenService.validateToken(token)) {
        errors.push('Invalid security token');
        secureLog.warn('Invalid token detected', { action });
      }
      
      // Rate limiting check
      const rateLimitResult = RateLimitService.checkRateLimit(token, action, maxAttempts, windowMinutes);
      
      if (!rateLimitResult.allowed) {
        errors.push('Rate limit exceeded. Please try again later.');
        secureLog.warn('Rate limit exceeded', { token: token.substring(0, 8), action });
      }
      
      // Content validation
      const validationResult = EnhancedContentValidationService.validateContent(content);
      
      if (!validationResult.valid) {
        errors.push(...validationResult.threats);
      }
      
      if (validationResult.blocked) {
        errors.push('Content blocked due to security policy violation');
        secureLog.warn('Content blocked', { 
          riskLevel: validationResult.riskLevel,
          threats: validationResult.threats 
        });
      }
      
      const allowed = errors.length === 0 && !validationResult.blocked && rateLimitResult.allowed;
      
      return {
        allowed,
        validationResult,
        rateLimitResult,
        token,
        errors
      };
    } catch (error) {
      secureLog.error('Security check failed', error);
      return {
        allowed: false,
        validationResult: {
          valid: false,
          sanitized: '',
          threats: ['Security check failed'],
          riskLevel: 'critical',
          securityScore: 0,
          blocked: true
        },
        rateLimitResult: { allowed: false, remaining: 0 },
        token: '',
        errors: ['Security system error']
      };
    }
  }

  public static sanitizeForSubmission(content: string): string {
    const validation = EnhancedContentValidationService.validateContent(content);
    return validation.sanitized;
  }
}
