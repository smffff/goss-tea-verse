
// Enhanced security utilities - now importing from enhanced version
export {
  SecureTokenManager,
  ContentSanitizer,
  ClientRateLimit,
  getOrCreateSecureToken,
  sanitizeContent,
  validateUrls,
  checkClientRateLimit
} from './enhancedSecurityUtils';

// Backward compatibility exports
export { EnhancedSecurityService as SecurityService } from '@/services/enhancedSecurityService';

// Legacy function aliases for backward compatibility
export const performSubmissionSecurityCheck = async (
  content: string,
  urls: string[],
  action: string = 'submission'
) => {
  const { EnhancedSecurityService } = await import('@/services/enhancedSecurityService');
  const result = await EnhancedSecurityService.validateSubmissionSecurity(content, urls, action);
  
  return {
    content: {
      isValid: result.contentValidation.valid,
      sanitized: result.contentValidation.sanitized,
      threats: result.contentValidation.threats
    },
    urls: result.urlValidation.valid,
    token: await (await import('./enhancedSecurityUtils')).SecureTokenManager.getOrCreateToken(),
    rateLimitOk: result.rateLimitCheck.allowed
  };
};

export const validateContentSecurity = (content: string) => {
  const { ContentSanitizer } = require('./enhancedSecurityUtils');
  const { sanitized, threats, riskLevel } = ContentSanitizer.sanitizeContent(content);
  return {
    isValid: threats.length === 0 && riskLevel !== 'critical',
    sanitized,
    threats
  };
};
