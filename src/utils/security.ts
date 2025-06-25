
import { sanitizeContent, sanitizeUrls, getOrCreateSecureToken } from '@/utils/securityUtils';

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

// Simple rate limiting check (client-side)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const checkClientRateLimit = (action: string, maxAttempts: number = 3, windowMinutes: number = 60): boolean => {
  const now = Date.now();
  const key = `${action}_${Math.floor(now / (windowMinutes * 60 * 1000))}`;
  
  const current = rateLimitStore.get(key) || { count: 0, resetTime: now + (windowMinutes * 60 * 1000) };
  
  if (now > current.resetTime) {
    current.count = 0;
    current.resetTime = now + (windowMinutes * 60 * 1000);
  }
  
  if (current.count >= maxAttempts) {
    return false;
  }
  
  current.count++;
  rateLimitStore.set(key, current);
  return true;
};

// Content validation with threat detection
export const validateContentSecurity = (content: string): SecurityValidationResult => {
  const threats: string[] = [];
  let isValid = true;
  
  // Basic content validation
  if (!content || content.trim().length === 0) {
    threats.push('Empty content');
    isValid = false;
  }
  
  if (content.length > 2000) {
    threats.push('Content too long');
    isValid = false;
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      threats.push('Suspicious content detected');
      isValid = false;
      break;
    }
  }
  
  // Sanitize content
  const sanitized = sanitizeContent(content);
  
  return {
    isValid,
    sanitized,
    threats
  };
};

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
  getOrCreateSecureToken
};
