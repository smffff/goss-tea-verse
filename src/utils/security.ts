
// Enhanced security utilities - now using unified service layer
// Updated: 2025-01-26 - Using centralized security service

export {
  performSubmissionSecurityCheck,
  sanitizeContent,
  getOrCreateSecureToken,
  validateUrls,
  validateUrl,
  checkClientRateLimit,
  validateContentSecurity
} from './securityUtils';

// Re-export the unified security service
export { SecurityServiceUnified as SecurityService } from '@/services/securityServiceUnified';
