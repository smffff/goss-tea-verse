
import { UnifiedSecurityService } from '@/services/unifiedSecurityService';

// Main security function that replaces all scattered security checks
export const performSubmissionSecurityCheck = UnifiedSecurityService.validateSubmissionSecurity;

// Content sanitization with enhanced security
export const sanitizeContent = (content: string): string => {
  if (!content) return '';
  
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;')
    .replace(/=/g, '&#x3D;')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '');
};

// Token management
export const getOrCreateSecureToken = (): string => {
  const service = UnifiedSecurityService.getInstance();
  const result = (service as any).getOrCreateSecureToken();
  return result.token;
};

// URL validation - single URL
export const validateUrl = (url: string): boolean => {
  if (!url?.trim()) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// URL validation - multiple URLs
export const validateUrls = (urls: string[]): string[] => {
  const service = UnifiedSecurityService.getInstance();
  const result = (service as any).validateUrls(urls);
  return result.valid;
};

// Rate limiting check
export const checkClientRateLimit = (action: string, maxAttempts: number, windowMinutes: number): boolean => {
  const service = UnifiedSecurityService.getInstance();
  const result = (service as any).checkRateLimit(action, maxAttempts, windowMinutes);
  return result.allowed;
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
