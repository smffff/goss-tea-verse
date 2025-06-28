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

export interface BetaCodeValidationResponse {
  valid: boolean;
  message?: string;
}

export interface SecurityValidationResult {
  success: boolean;
  tokenValid: boolean;
  contentValid: boolean;
  rateLimitPassed: boolean;
  securityScore: number;
  errors: string[];
  warnings: string[];
  sanitizedContent?: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface TokenValidationResult {
  valid: boolean;
  security_score?: number;
}

export interface ContentValidationResult {
  valid: boolean;
  errors?: string[];
  sanitized?: string;
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
  security_score?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  blocked_reason?: string;
  security_violation?: boolean;
}

export interface FallbackValidationResult {
  valid: boolean;
  errors: string[];
  sanitized: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  security_score: number;
}
