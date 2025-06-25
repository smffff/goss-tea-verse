
import { sanitizeContent, sanitizeUrls, getOrCreateSecureToken } from '@/utils/securityUtils';
import { validateContentSecurity, checkClientRateLimit } from '@/utils/securityEnhanced';

/**
 * Unified security utilities for CTea Newsroom
 * Combines basic and enhanced security features
 */

export interface SecurityValidationResult {
  isValid: boolean;
  sanitized: string;
  threats: string[];
}

export interface SubmissionSecurityCheck {
  content: SecurityValidationResult;
  urls: string[];
  token: string;
  rateLimitOk: boolean;
}

// Enhanced submission security check
export const performSubmissionSecurityCheck = (
  content: string,
  urls: string[],
  action: string = 'submission'
): SubmissionSecurityCheck => {
  // Rate limiting check
  const rateLimitOk = checkClientRateLimit(action, 3, 60);
  
  // Content validation and sanitization
  const contentValidation = validateContentSecurity(content);
  
  // URL sanitization
  const sanitizedUrls = sanitizeUrls(urls);
  
  // Generate secure token
  const token = getOrCreateSecureToken();
  
  return {
    content: contentValidation,
    urls: sanitizedUrls,
    token,
    rateLimitOk
  };
};

// Export main utilities
export {
  sanitizeContent,
  sanitizeUrls,
  getOrCreateSecureToken,
  validateContentSecurity,
  checkClientRateLimit
};
