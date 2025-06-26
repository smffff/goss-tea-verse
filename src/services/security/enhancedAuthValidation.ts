import { supabase } from '@/integrations/supabase/client';

export interface AuthValidationResult {
  isValid: boolean;
  securityScore: number;
  threats: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface EmailValidationResult {
  isValid: boolean;
  format: boolean;
  domain: boolean;
  disposable: boolean;
  suspicious: boolean;
}

export interface PasswordValidationResult {
  isValid: boolean;
  strength: 'weak' | 'fair' | 'good' | 'strong';
  score: number;
  feedback: string[];
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    common: boolean;
  };
}

interface BetaCodeValidationResponse {
  valid: boolean;
  message?: string;
}

// Type guard to check if response is valid beta code response
function isBetaCodeValidationResponse(data: any): data is BetaCodeValidationResponse {
  return data && typeof data === 'object' && typeof data.valid === 'boolean';
}

// Safe type conversion helper
function safeConvertToBetaCodeResponse(data: unknown): BetaCodeValidationResponse | null {
  if (isBetaCodeValidationResponse(data)) {
    return data;
  }
  return null;
}

export class EnhancedAuthValidation {
  private static readonly COMMON_PASSWORDS = [
    'password', '123456', 'password123', 'admin', 'qwerty', 'letmein',
    'welcome', 'monkey', '1234567890', 'abc123', 'password1', 'iloveyou'
  ];

  private static readonly SUSPICIOUS_DOMAINS = [
    '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.org',
    'throwaway.email', 'temp-mail.org', 'mohmal.com', 'yopmail.com'
  ];

  public static validateEmail(email: string): EmailValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const format = emailRegex.test(email);
    
    const domain = email.split('@')[1]?.toLowerCase() || '';
    const disposable = this.SUSPICIOUS_DOMAINS.some(d => domain.includes(d));
    
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

  public static validatePassword(password: string): PasswordValidationResult {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      common: !this.COMMON_PASSWORDS.includes(password.toLowerCase())
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

  public static async validateBetaCode(code: string): Promise<AuthValidationResult> {
    const threats: string[] = [];
    const recommendations: string[] = [];
    let securityScore = 100;
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    try {
      console.log('🔍 Starting beta code validation:', code.substring(0, 4) + '...');
      
      // Basic format validation
      if (!code || code.length < 3) {
        threats.push('Beta code too short');
        securityScore -= 30;
        riskLevel = 'medium';
      }

      // Check for suspicious patterns
      if (/[<>'"&]/.test(code)) {
        threats.push('Beta code contains suspicious characters');
        securityScore -= 50;
        riskLevel = 'high';
      }

      // Rate limiting check (client-side preliminary)
      const lastAttempt = localStorage.getItem('ctea_last_beta_attempt');
      if (lastAttempt) {
        const timeSince = Date.now() - parseInt(lastAttempt);
        if (timeSince < 5000) { // 5 seconds
          threats.push('Beta code attempts too frequent');
          securityScore -= 20;
          riskLevel = 'medium';
        }
      }

      localStorage.setItem('ctea_last_beta_attempt', Date.now().toString());

      // Enhanced server-side validation with better error handling
      try {
        console.log('🌐 Calling Supabase RPC for beta code validation...');
        const { data: result, error } = await supabase.rpc('validate_beta_code', {
          p_code: code.trim().toUpperCase()
        });

        if (error) {
          console.error('🚨 Supabase RPC error:', error);
          threats.push('Server validation failed');
          securityScore -= 40;
          riskLevel = 'high';
          recommendations.push('Try the tea spill method instead');
        } else {
          console.log('📦 Server response:', result);
          
          // Handle the response properly - check if it's the expected format
          if (!result) {
            console.warn('⚠️ Empty response from server');
            threats.push('Invalid server response');
            securityScore -= 30;
            riskLevel = 'medium';
            recommendations.push('Try other access methods');
          } else if (typeof result === 'object' && result !== null && 'valid' in result) {
            // New format response - safely convert the type
            const validationResult = safeConvertToBetaCodeResponse(result);
            if (validationResult && !validationResult.valid) {
              console.log('❌ Beta code marked as invalid by server');
              threats.push('Invalid beta code');
              securityScore -= 30;
              riskLevel = 'medium';
              recommendations.push('Request a new beta code or try tea spilling');
            } else if (validationResult) {
              console.log('✅ Beta code validated successfully');
            } else {
              console.warn('⚠️ Could not parse server response');
              threats.push('Server response format error');
              securityScore -= 20;
              riskLevel = 'medium';
            }
          } else if (typeof result === 'boolean') {
            // Simple boolean response
            if (!result) {
              console.log('❌ Beta code validation returned false');
              threats.push('Invalid beta code');
              securityScore -= 30;
              riskLevel = 'medium';
              recommendations.push('Try other access methods');
            } else {
              console.log('✅ Beta code validated successfully (boolean)');
            }
          } else {
            console.warn('⚠️ Unexpected response format:', typeof result, result);
            threats.push('Unexpected server response format');
            securityScore -= 20;
            riskLevel = 'medium';
          }
        }
      } catch (rpcError: any) {
        console.error('🚨 RPC call failed:', rpcError);
        threats.push('Network validation failed');
        securityScore -= 30;
        riskLevel = 'high';
        recommendations.push('Check connection and try again');
      }

      const isValid = threats.length === 0 && securityScore >= 70;
      
      console.log('📊 Beta code validation result:', {
        isValid,
        securityScore,
        threats,
        riskLevel
      });

      return {
        isValid,
        securityScore,
        threats,
        recommendations,
        riskLevel
      };
    } catch (error: any) {
      console.error('💥 Beta code validation error:', error);
      return {
        isValid: false,
        securityScore: 0,
        threats: ['Validation system error: ' + error.message],
        recommendations: ['Try again later or use tea spill access'],
        riskLevel: 'critical'
      };
    }
  }

  public static validateAuthSession(): AuthValidationResult {
    const threats: string[] = [];
    const recommendations: string[] = [];
    let securityScore = 100;
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    try {
      // Check for session tampering indicators
      const sessionKeys = Object.keys(localStorage).filter(key => 
        key.includes('supabase') || key.includes('ctea')
      );

      if (sessionKeys.length > 10) {
        threats.push('Excessive session data detected');
        securityScore -= 20;
        riskLevel = 'medium';
      }

      // Check for suspicious timing patterns
      const accessTimes = JSON.parse(localStorage.getItem('ctea_access_times') || '[]');
      if (accessTimes.length > 0) {
        const rapidAccess = accessTimes.filter((time: number) => 
          Date.now() - time < 1000
        ).length;

        if (rapidAccess > 5) {
          threats.push('Rapid access pattern detected');
          securityScore -= 30;
          riskLevel = 'high';
        }
      }

      // Update access tracking
      const newAccessTimes = [...accessTimes, Date.now()].slice(-10);
      localStorage.setItem('ctea_access_times', JSON.stringify(newAccessTimes));

      return {
        isValid: securityScore >= 50,
        securityScore,
        threats,
        recommendations,
        riskLevel
      };
    } catch (error: any) {
      console.error('Session validation error:', error);
      return {
        isValid: false,
        securityScore: 0,
        threats: ['Session validation failed'],
        recommendations: ['Clear browser data and try again'],
        riskLevel: 'critical'
      };
    }
  }
}
