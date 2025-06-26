
import type { PasswordValidationResult } from './types';

const COMMON_PASSWORDS = [
  'password', '123456', 'password123', 'admin', 'qwerty', 'letmein',
  'welcome', 'monkey', '1234567890', 'abc123', 'password1', 'iloveyou'
];

export class PasswordValidator {
  public static validatePassword(password: string): PasswordValidationResult {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      common: !COMMON_PASSWORDS.includes(password.toLowerCase())
    };

    const feedback: string[] = [];
    let score = 0;

    if (!requirements.length) {
      feedback.push('Password must be at least 8 characters long');
    } else {
      score += 20;
    }

    if (!requirements.uppercase) {
      feedback.push('Add uppercase letters (A-Z)');
    } else {
      score += 15;
    }

    if (!requirements.lowercase) {
      feedback.push('Add lowercase letters (a-z)');
    } else {
      score += 15;
    }

    if (!requirements.numbers) {
      feedback.push('Add numbers (0-9)');
    } else {
      score += 15;
    }

    if (!requirements.symbols) {
      feedback.push('Add special characters (!@#$%^&*)');
    } else {
      score += 20;
    }

    if (!requirements.common) {
      feedback.push('Avoid common passwords');
      score -= 30;
    } else {
      score += 15;
    }

    // Length bonus
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Pattern penalties
    if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
    if (/123|abc|qwe|asd/i.test(password)) score -= 15; // Sequential patterns

    score = Math.max(0, Math.min(100, score));

    let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
    if (score >= 80) strength = 'strong';
    else if (score >= 60) strength = 'good';
    else if (score >= 40) strength = 'fair';

    return {
      isValid: score >= 60 && requirements.length && requirements.common,
      strength,
      score,
      feedback: feedback.slice(0, 3), // Limit feedback to 3 items
      requirements
    };
  }
}
