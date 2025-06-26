
// CTea Types - Centralized Type Definitions
// Created: 2025-01-26 - Consolidating scattered type definitions

// Core application types
export interface AppConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  rateLimits: {
    submissions: number;
    reactions: number;
    comments: number;
  };
  features: {
    aiCommentary: boolean;
    walletConnect: boolean;
    tokenRewards: boolean;
    realTimeChat: boolean;
    moderation: boolean;
  };
}

// Security types
export interface SecurityValidationResult {
  valid: boolean;
  sanitized: string;
  threats: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  securityScore: number;
}

export interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  maxActions: number;
  resetTime?: Date;
  blockedReason?: string;
}

// Re-export existing types for centralized access
export type { TeaSubmission } from './teaFeed';
export type { SubmissionData } from '../hooks/useSubmissionForm';
export type { SpillData } from '../hooks/useSpillTeaForm';
export type { Comment, CommentFormData } from './comments';
export type { WalletState, TokenBalance, EarlyAccessStatus } from './wallet';
export type { AuthContextType, WalletUser, AuthSession } from './auth';
export type { 
  GovernanceProposal, 
  UserVote, 
  NewProposal, 
  ProposalCategory 
} from './governance';
export type {
  TeaTransaction,
  WalletBalance,
  UseTeaTokensReturn
} from './teaTokens';
export type {
  AffiliatePartner,
  SponsoredPost,
  RevenueMetrics,
  TipTransaction,
  RevenueSettings,
  User
} from './revenue';

// Form validation types
export interface FormValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// UI component types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Event tracking types
export interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}
