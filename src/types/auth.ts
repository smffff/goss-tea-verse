
export type AccessLevel = 'guest' | 'authenticated' | 'beta' | 'admin';

export interface UserMetadata {
  [key: string]: string | number | boolean | null;
}

export interface AppMetadata {
  [key: string]: string | number | boolean | null;
}

export interface WalletUser {
  id: string;
  wallet_address: string;
  token_balance: number;
  email?: string;
  anonymous_token?: string;
  verification_level?: string;
  is_verified?: boolean;
  email_confirmed_at?: string | null;
  last_sign_in_at?: string | null;
  user_metadata?: UserMetadata;
  app_metadata?: AppMetadata;
}

export interface AuthSession {
  user: WalletUser | null;
  access_token?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string | { message: string } | null;
  user?: WalletUser;
}

export interface AuthContextType {
  user: WalletUser | null;
  session: AuthSession | null;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  disconnect: () => void;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  refreshBalance: () => Promise<void>;
}

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
