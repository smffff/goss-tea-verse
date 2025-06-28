
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLogging';

interface SecurityValidationResult {
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

interface TokenValidationResult {
  valid: boolean;
  securityScore: number;
}

interface ContentValidationResult {
  valid: boolean;
  sanitized: string;
  errors?: string[];
  risk_level?: string;
  security_score?: number;
}

interface RateLimitResult {
  allowed: boolean;
  blocked_reason?: string;
  security_violation?: boolean;
}

export class SecurityService {
  private static tokenCache = new Map<string, { token: string; expires: number }>();

  /**
   * Get or create a secure token with caching
   */
  static async getSecureToken(): Promise<string> {
    const cacheKey = 'anonymous_token';
    const cached = this.tokenCache.get(cacheKey);
    
    if (cached && cached.expires > Date.now()) {
      return cached.token;
    }

    try {
      const { data, error } = await supabase.rpc('generate_anonymous_token');
      
      if (error || !data) {
        const fallbackToken = `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.tokenCache.set(cacheKey, { token: fallbackToken, expires: Date.now() + 3600000 });
        return fallbackToken;
      }

      const token = typeof data === 'string' ? data : `token_${Date.now()}`;
      this.tokenCache.set(cacheKey, { token, expires: Date.now() + 3600000 });
      return token;
    } catch (error) {
      secureLog.error('Token generation failed:', error);
      const fallbackToken = `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.tokenCache.set(cacheKey, { token: fallbackToken, expires: Date.now() + 3600000 });
      return fallbackToken;
    }
  }

  /**
   * Validate token security
   */
  static async validateToken(token: string): Promise<TokenValidationResult> {
    try {
      const { data, error } = await supabase.rpc('validate_token_enhanced', { token });

      if (error || !data) {
        return { valid: false, securityScore: 0 };
      }

      if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        const result = data as Record<string, any>;
        return {
          valid: result.valid || false,
          securityScore: result.security_score || 0
        };
      }

      return { valid: false, securityScore: 0 };
    } catch (error) {
      secureLog.error('Token validation error:', error);
      return { valid: false, securityScore: 0 };
    }
  }

  /**
   * Validate content with server-side security checks
   */
  static async validateContent(content: string, maxLength: number = 1000): Promise<ContentValidationResult> {
    try {
      const { data, error } = await supabase.rpc('validate_content_server_side', {
        content,
        max_length: maxLength
      });

      if (error || !data) {
        return this.fallbackContentValidation(content, maxLength);
      }

      if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        return data as ContentValidationResult;
      }

      return this.fallbackContentValidation(content, maxLength);
    } catch (error) {
      secureLog.error('Content validation error:', error);
      return this.fallbackContentValidation(content, maxLength);
    }
  }

  /**
   * Check rate limits
   */
  static async checkRateLimit(
    token: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 60
  ): Promise<RateLimitResult> {
    try {
      const { data, error } = await supabase.rpc('check_rate_limit_ultimate', {
        p_token: token,
        p_action: action,
        p_max_actions: maxActions,
        p_window_minutes: windowMinutes
      });

      if (error || !data) {
        return { allowed: false, blocked_reason: 'Rate limit service unavailable' };
      }

      if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        return data as RateLimitResult;
      }

      return { allowed: false, blocked_reason: 'Invalid rate limit response' };
    } catch (error) {
      secureLog.error('Rate limit error:', error);
      return { allowed: false, blocked_reason: 'Rate limit service error' };
    }
  }

  /**
   * Comprehensive security validation for submissions
   */
  static async validateSubmissionSecurity(
    content: string,
    action: string = 'submission'
  ): Promise<SecurityValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let securityScore = 100;
    let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    try {
      // Get secure token
      const token = await this.getSecureToken();

      // Validate token
      const tokenValidation = await this.validateToken(token);
      const tokenValid = tokenValidation.valid;
      
      if (!tokenValid) {
        errors.push('Invalid security token');
        securityScore -= 50;
        threatLevel = 'high';
      }

      // Validate content
      const contentValidation = await this.validateContent(content);
      const contentValid = contentValidation.valid;
      
      if (!contentValid) {
        errors.push(...(contentValidation.errors || ['Content validation failed']));
        securityScore = Math.min(securityScore, contentValidation.security_score || 0);
        
        const riskLevel = contentValidation.risk_level;
        if (riskLevel === 'critical') {
          threatLevel = 'critical';
        } else if (riskLevel === 'high' && threatLevel !== 'critical') {
          threatLevel = 'high';
        } else if (riskLevel === 'medium' && threatLevel === 'low') {
          threatLevel = 'medium';
        }
      }

      // Check rate limit
      const rateLimitResult = await this.checkRateLimit(token, action);
      const rateLimitPassed = rateLimitResult.allowed;
      
      if (!rateLimitPassed) {
        errors.push(rateLimitResult.blocked_reason || 'Rate limit exceeded');
        if (rateLimitResult.security_violation) {
          threatLevel = 'critical';
          securityScore = 0;
        }
      }

      return {
        success: errors.length === 0,
        tokenValid,
        contentValid,
        rateLimitPassed,
        securityScore,
        errors,
        warnings,
        sanitizedContent: contentValidation.sanitized,
        threatLevel
      };
    } catch (error) {
      secureLog.error('Security validation failed:', error);
      return {
        success: false,
        tokenValid: false,
        contentValid: false,
        rateLimitPassed: false,
        securityScore: 0,
        errors: ['Security validation service unavailable'],
        warnings: [],
        threatLevel: 'critical'
      };
    }
  }

  /**
   * Fallback content validation
   */
  private static fallbackContentValidation(content: string, maxLength: number): ContentValidationResult {
    const errors: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    
    if (!content || content.trim().length === 0) {
      errors.push('Content cannot be empty');
      return { valid: false, errors, sanitized: '', risk_level: 'low', security_score: 0 };
    }
    
    if (content.length > maxLength) {
      errors.push(`Content exceeds maximum length of ${maxLength} characters`);
      riskLevel = 'high';
    }
    
    // Basic XSS detection
    if (/<script|javascript:|data:|vbscript:|on\w+\s*=/.test(content)) {
      errors.push('Content contains potentially dangerous elements');
      riskLevel = 'critical';
    }
    
    // Basic sanitization
    const sanitized = content
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '');
    
    return {
      valid: errors.length === 0,
      errors,
      sanitized,
      risk_level: riskLevel,
      security_score: errors.length === 0 ? 70 : 20
    };
  }

  /**
   * Secure submission creation
   */
  static async createSecureSubmission(
    content: string,
    category: string = 'general',
    evidenceUrls: string[] = []
  ): Promise<{ success: boolean; submissionId?: string; error?: string }> {
    try {
      const token = await this.getSecureToken();
      
      const { data, error } = await supabase.rpc('secure_submission_insert', {
        p_content: content,
        p_anonymous_token: token,
        p_category: category,
        p_evidence_urls: evidenceUrls.length > 0 ? evidenceUrls : null
      });

      if (error) {
        secureLog.error('Secure submission failed:', error);
        return { success: false, error: 'Submission failed' };
      }

      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const result = data as Record<string, any>;
        if (result.success) {
          return { success: true, submissionId: result.submission_id };
        } else {
          return { success: false, error: result.error || 'Submission failed' };
        }
      }

      return { success: false, error: 'Invalid response' };
    } catch (error) {
      secureLog.error('Submission creation error:', error);
      return { success: false, error: 'Service unavailable' };
    }
  }

  /**
   * Secure reaction creation
   */
  static async createSecureReaction(
    submissionId: string,
    reactionType: 'hot' | 'cold' | 'spicy'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const token = await this.getSecureToken();
      
      const { data, error } = await supabase.rpc('secure_reaction_insert', {
        p_submission_id: submissionId,
        p_anonymous_token: token,
        p_reaction_type: reactionType
      });

      if (error) {
        secureLog.error('Secure reaction failed:', error);
        return { success: false, error: 'Reaction failed' };
      }

      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const result = data as Record<string, any>;
        return { success: result.success || false, error: result.error };
      }

      return { success: false, error: 'Invalid response' };
    } catch (error) {
      secureLog.error('Reaction creation error:', error);
      return { success: false, error: 'Service unavailable' };
    }
  }
}
