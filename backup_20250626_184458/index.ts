
// CTea Services - Unified Service Layer
// Created: 2025-01-26 - Consolidating service interfaces

import { UnifiedSecurityService } from './unifiedSecurityService';
import { EnhancedSecurityService } from './enhancedSecurityService';
import { betaCodeService } from './betaCodeService';
// Fix: Import TeaTokenService instead of teaTokenService
import { TeaTokenService } from './teaTokenService';

// Main service factory - single entry point for all services
export class ServiceFactory {
  private static _securityService: UnifiedSecurityService;
  
  static get security(): UnifiedSecurityService {
    if (!this._securityService) {
      this._securityService = UnifiedSecurityService.getInstance();
    }
    return this._securityService;
  }

  static get enhancedSecurity(): typeof EnhancedSecurityService {
    return EnhancedSecurityService;
  }

  static get betaCodes() {
    return betaCodeService;
  }

  // Fix: Use TeaTokenService instead of teaTokenService
  static get teaTokens() {
    return TeaTokenService;
  }
}

// Convenience exports for backward compatibility
export { UnifiedSecurityService } from './unifiedSecurityService';
export { EnhancedSecurityService } from './enhancedSecurityService';
export { betaCodeService } from './betaCodeService';
// Fix: Export TeaTokenService instead of teaTokenService
export { TeaTokenService } from './teaTokenService';

// Service interfaces for dependency injection
export interface ISecurityService {
  validateSubmissionSecurity(content: string, urls: string[], action?: string): Promise<any>;
  validateUrls(urls: string[]): { valid: string[]; invalid: string[] };
  checkRateLimit(action: string, maxAttempts: number, windowMinutes: number): any;
  getOrCreateSecureToken(): { valid: boolean; token: string };
}

export interface IBetaCodeService {
  generateCodeForSpill(spillId: string): Promise<any>;
  validateCode(code: string): Promise<any>;
}

// Export the main service factory as default
export default ServiceFactory;
