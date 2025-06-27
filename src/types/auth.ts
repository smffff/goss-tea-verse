
export type AccessLevel = 'guest' | 'authenticated' | 'beta' | 'admin';

export interface BetaCodeResult {
  success: boolean;
  message?: string;
  code?: string;
  error?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  blocked_reason?: string;
  remaining?: number;
}
