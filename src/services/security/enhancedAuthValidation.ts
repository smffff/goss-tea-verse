
import { EmailValidator } from './emailValidator';
import { PasswordValidator } from './passwordValidator';
import { BetaCodeValidator } from './betaCodeValidator';
import { SessionValidator } from './sessionValidator';

// Re-export types for backward compatibility
export type {
  AuthValidationResult,
  EmailValidationResult,
  PasswordValidationResult,
  BetaCodeValidationResponse
} from './types';

export class EnhancedAuthValidation {
  // Delegate to specialized validators
  public static validateEmail = EmailValidator.validateEmail;
  public static validatePassword = PasswordValidator.validatePassword;
  public static validateBetaCode = BetaCodeValidator.validateBetaCode;
  public static validateAuthSession = SessionValidator.validateAuthSession;
}
