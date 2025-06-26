
// Re-export everything from the new auth validation service for backward compatibility
export { AuthValidationService as EnhancedAuthValidation } from './authValidationService';
export type {
  AuthValidationResult,
  EmailValidationResult,
  PasswordValidationResult,
  BetaCodeValidationResponse
} from './types';
