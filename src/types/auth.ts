
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
  user_metadata?: any;
  app_metadata?: any;
}

export interface AuthSession {
  user: WalletUser | null;
  access_token?: string;
}

export interface AuthContextType {
  user: WalletUser | null;
  session: AuthSession | null;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  disconnect: () => void;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  refreshBalance: () => Promise<void>;
}
