
import { EmailValidator } from './validators/emailValidator';
import { PasswordValidator } from './validators/passwordValidator';
import { BetaCodeValidator } from './validators/betaCodeValidator';
import { SessionValidator } from './validators/sessionValidator';

// Re-export types for backward compatibility
export type {
  AuthValidationResult,
  EmailValidationResult,
  PasswordValidationResult,
  BetaCodeValidationResponse
} from './types';

export class AuthValidationService {
  // Delegate to specialized validators
  public static validateEmail = EmailValidator.validateEmail;
  public static validatePassword = PasswordValidator.validatePassword;
  public static validateBetaCode = BetaCodeValidator.validateBetaCode;
  public static validateAuthSession = SessionValidator.validateAuthSession;
}

// Backward compatibility export
export const EnhancedAuthValidation = AuthValidationService;
