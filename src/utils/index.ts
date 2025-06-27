
// Re-export utility functions for backward compatibility
export {
  generateSecureToken,
  hashString,
  validateSecureInput,
  performSubmissionSecurityCheck,
  sanitizeContent,
  getOrCreateSecureToken,
  validateUrls,
  checkClientRateLimit,
  validateContentSecurity
} from './securityUtils';

export { secureLog } from './secureLogging';
export { track } from './analytics';
