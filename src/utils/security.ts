
// Enhanced security utilities - now using unified service layer
// Updated: 2025-01-26 - Using centralized configuration and services

export {
  performSubmissionSecurityCheck,
  sanitizeContent,
  getOrCreateSecureToken,
  validateUrls,
  checkClientRateLimit,
  validateContentSecurity
} from './securityUtils';

// Re-export URL validation utilities
export { validateUrl, sanitizeUrl } from './urlValidation';

// Re-export services using new centralized approach
export { ServiceFactory as SecurityServiceFactory } from '@/services';
export { UnifiedSecurityService as SecurityService } from '@/services/unifiedSecurityService';
export { EnhancedSecurityService } from '@/services/enhancedSecurityService';
