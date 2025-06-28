
// Security Service Types
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
  security_violation?: boolean;
}

export interface TokenValidationResult {
  valid: boolean;
  token: string;
  expiresAt?: string;
  securityScore?: number;
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
  strength: 'weak' | 'medium' | 'strong';
  issues: string[];
}

export interface BetaCodeValidationResult {
  isValid: boolean;
  exists: boolean;
  used: boolean;
  expired: boolean;
}

export interface SessionValidationResult {
  valid: boolean;
  expiresAt?: string;
  securityFlags?: string[];
}

export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SecurityEventData {
  eventType: string;
  threatLevel: ThreatLevel;
  details: Record<string, unknown>;
  userId?: string;
  ipAddress?: string;
}
