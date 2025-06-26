
import { SecurityServiceUnified } from '@/services/securityServiceUnified';
import { ContentValidationService } from '@/services/security/contentValidationService';
import { RateLimitService } from '@/services/security/rateLimitService';
import { UrlValidationService } from '@/services/security/urlValidationService';
import { TokenValidationService } from '@/services/security/tokenValidationService';

// Main security function that replaces all scattered security checks
export const performSubmissionSecurityCheck = SecurityServiceUnified.validateSubmissionSecurity;

// Content sanitization with enhanced security
export const sanitizeContent = (content: string): string => {
  return ContentValidationService.sanitizeContent(content);
};

// Token management
export const getOrCreateSecureToken = (): string => {
  const result = TokenValidationService.getOrCreateSecureToken();
  return result.token;
};

// URL validation - single URL
export const validateUrl = (url: string): boolean => {
  if (!url?.trim()) return false;
  
  const result = UrlValidationService.validateUrls([url]);
  return result.valid.length > 0;
};

// URL validation - multiple URLs
export const validateUrls = (urls: string[]): string[] => {
  const result = UrlValidationService.validateUrls(urls);
  return result.valid;
};

// Legacy function for backward compatibility
export const validateContentSecurity = (content: string) => {
  const sanitized = sanitizeContent(content);
  const threats: string[] = [];
  
  // Basic threat detection
  if (content !== sanitized) {
    threats.push('Potentially dangerous content detected');
  }
  
  return {
    isValid: threats.length === 0,
    sanitized,
    threats
  };
};

// Rate limiting check helper
export const checkClientRateLimit = async (action: string, maxAttempts: number, windowMinutes: number): Promise<boolean> => {
  try {
    const token = getOrCreateSecureToken();
    const result = await RateLimitService.checkRateLimit(token, action, maxAttempts, windowMinutes);
    return result.allowed;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return false;
  }
};
