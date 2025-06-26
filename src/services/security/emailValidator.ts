
import type { EmailValidationResult } from './types';

const SUSPICIOUS_DOMAINS = [
  '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.org',
  'throwaway.email', 'temp-mail.org', 'mohmal.com', 'yopmail.com'
];

export class EmailValidator {
  public static validateEmail(email: string): EmailValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const format = emailRegex.test(email);
    
    const domain = email.split('@')[1]?.toLowerCase() || '';
    const disposable = SUSPICIOUS_DOMAINS.some(d => domain.includes(d));
    
    // Check for suspicious patterns
    const suspicious = 
      email.includes('+') && email.split('+')[1]?.includes('test') ||
      /\d{10,}/.test(email) || // Long number sequences
      /^[a-z]{1,3}@/.test(email) || // Very short usernames
      domain.includes('test') ||
      domain.includes('example');

    return {
      isValid: format && !disposable && !suspicious,
      format,
      domain: !!domain,
      disposable,
      suspicious
    };
  }
}
