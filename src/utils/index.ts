
// CTea Utilities - Centralized Utility Functions
// Created: 2025-01-26 - Organizing scattered utility functions

// Security utilities
export {
  performSubmissionSecurityCheck,
  sanitizeContent,
  getOrCreateSecureToken,
  validateUrls,
  checkClientRateLimit,
  validateContentSecurity,
  validateUrl
} from './securityUtils';

// URL validation utilities
export { validateUrl as validateSingleUrl, sanitizeUrl } from './urlValidation';

// Time utilities
export { formatTimeAgo, formatDate, isRecent } from './timeUtils';

// Analytics utilities
export { track, identify, page } from './analytics';

// Error handling utilities
export { handleError, createErrorBoundary } from './errorHandler';

// Common utility functions
export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  }) as T;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
