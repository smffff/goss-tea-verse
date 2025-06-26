import { SecurityServiceUnified } from '@/services/securityServiceUnified';
import { ContentValidationService } from '@/services/security/contentValidationService';
import { RateLimitService } from '@/services/security/rateLimitService';
import { UrlValidationService } from '@/services/security/urlValidationService';
import { TokenValidationService } from '@/services/security/tokenValidationService';

// Main security function that replaces all scattered security checks
export const performSubmissionSecurityCheck = SecurityServiceUnified.validateSubmissionSecurity;

// Secure logging utility to prevent sensitive information exposure in production
export const secureLog = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, data);
    }
  },
  
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, error);
    } else {
      // In production, only log sanitized error messages
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name }
        : typeof error === 'string' 
          ? error.substring(0, 100) 
          : 'Unknown error';
      console.error(message, sanitizedError);
    }
  },
  
  warn: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message, data);
    }
  },
  
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, data);
    }
  }
};

// Sanitize sensitive data for production logging
export const sanitizeForLogging = (data: any): any => {
  if (process.env.NODE_ENV === 'production') {
    if (typeof data === 'string') {
      // Remove potential sensitive patterns
      return data
        .replace(/password[=:]\s*\S+/gi, 'password=***')
        .replace(/token[=:]\s*\S+/gi, 'token=***')
        .replace(/key[=:]\s*\S+/gi, 'key=***')
        .replace(/secret[=:]\s*\S+/gi, 'secret=***')
        .substring(0, 200); // Limit length
    }
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (['password', 'token', 'key', 'secret', 'auth'].includes(key.toLowerCase())) {
          sanitized[key] = '***';
        } else {
          sanitized[key] = sanitizeForLogging(value);
        }
      }
      return sanitized;
    }
  }
  return data;
};

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
