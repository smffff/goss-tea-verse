
// CTea Services - Unified Service Layer
// Created: 2025-01-26 - Consolidating service interfaces

import { UnifiedSecurityService } from './unifiedSecurityService';
import { SecurityService } from './securityService';
import { betaCodeService } from './betaCodeService';
import { TeaTokenService } from './teaTokenService';

// Main service factory - single entry point for all services
export class ServiceFactory {
  static get security() {
    return UnifiedSecurityService;
  }

  static get auth() {
    return SecurityService;
  }

  static get betaCodes() {
    return betaCodeService;
  }

  static get teaTokens() {
    return TeaTokenService;
  }
}

// Convenience exports for backward compatibility
export { UnifiedSecurityService } from './unifiedSecurityService';
export { SecurityService } from './securityService';
export { betaCodeService } from './betaCodeService';
export { TeaTokenService } from './teaTokenService';

// Service interfaces for dependency injection
export interface ISecurityService {
  validateSubmissionSecurity(content: string, urls: string[], action?: string): Promise<any>;
  validateUrls(urls: string[]): { valid: string[]; invalid: string[] };
  checkRateLimit(action: string, maxAttempts: number, windowMinutes: number): any;
}

export interface IBetaCodeService {
  generateCodeForSpill(spillId: string): Promise<any>;
  validateCode(code: string): Promise<any>;
}

// Export the main service factory as default
export default ServiceFactory;
