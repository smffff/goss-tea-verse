

export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ContentValidationResult {
  valid: boolean;
  sanitized?: string;
  errors: string[];
  warnings: string[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  blocked_reason?: string;
}

export interface BetaCodeValidationResponse {
  valid: boolean;
  reason?: string;
}

export interface AuthValidationResult {
  isValid: boolean;
  securityScore: number;
  threats: string[];
  recommendations: string[];
  riskLevel: ThreatLevel;
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
  requirements: Record<string, boolean>;
}

