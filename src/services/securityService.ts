
import { supabase } from '@/integrations/supabase/client'

interface RateLimitResult {
  allowed: boolean
  current_count: number
  max_actions: number
  remaining: number
  reset_time: string | null
  blocked_reason: string | null
}

interface IPActivityResult {
  request_count: number
  is_suspicious: boolean
  last_request: string
}

interface SecurityEvent {
  event_type: string
  details: Record<string, unknown>
  severity: 'low' | 'medium' | 'high' | 'critical'
  user_id?: string
  ip_address?: string
  user_agent?: string
}

export class SecurityService {
  // Enhanced rate limiting with IP tracking
  static async checkRateLimit(
    identifier: string,
    action: string,
    maxActions: number = 10,
    windowMinutes: number = 15
  ): Promise<RateLimitResult> {
    try {
      // Use correct parameter name for the RPC function
      const { data, error } = await supabase.rpc('check_enhanced_rate_limit', {
        p_token: identifier,
        p_action: action,
        p_max_actions: maxActions,
        p_window_minutes: windowMinutes
      })

      if (error) {
        console.error('Rate limit check error:', error)
        // Fail open - allow the request but log the error
        return {
          allowed: true,
          current_count: 0,
          max_actions: maxActions,
          remaining: maxActions,
          reset_time: null,
          blocked_reason: null
        }
      }

      // Proper type handling with unknown first
      const result = data as unknown as RateLimitResult | null
      if (!result) {
        return {
          allowed: true,
          current_count: 0,
          max_actions: maxActions,
          remaining: maxActions,
          reset_time: null,
          blocked_reason: null
        }
      }

      return result
    } catch (error) {
      console.error('Rate limiting service error:', error)
      return {
        allowed: true,
        current_count: 0,
        max_actions: maxActions,
        remaining: maxActions,
        reset_time: null,
        blocked_reason: null
      }
    }
  }

  // Enhanced security event logging
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      // Use admin_audit_log table which exists in the database
      const { error } = await supabase.from('admin_audit_log').insert({
        admin_email: event.user_id || 'anonymous',
        action: event.event_type,
        details: event.details as any, // Cast to match Json type
        ip_address: event.ip_address || 'unknown',
        user_agent: event.user_agent || 'unknown',
        target_table: 'security_log'
      })

      if (error) {
        console.error('Security event logging failed:', error)
      }
    } catch (error) {
      console.error('Security logging service error:', error)
    }
  }

  // Token security validation
  static validateTokenSecurity(token: string): { valid: boolean; issues: string[] } {
    const issues: string[] = []

    if (!token || token.length < 32) {
      issues.push('Token too short')
    }

    if (!/^[A-Za-z0-9_-]+$/.test(token)) {
      issues.push('Invalid token format')
    }

    // Check for common weak patterns
    if (/^(.)\1+$/.test(token)) {
      issues.push('Token contains repeating pattern')
    }

    if (/^(123|abc|test)/i.test(token)) {
      issues.push('Token contains predictable pattern')
    }

    return {
      valid: issues.length === 0,
      issues
    }
  }

  // Content validation and sanitization
  static validateContent(content: string): { valid: boolean; sanitized: string; threats: string[] } {
    const threats: string[] = []
    let sanitized = content

    // XSS patterns
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi
    ]

    for (const pattern of xssPatterns) {
      if (pattern.test(content)) {
        threats.push('Potential XSS attempt')
        sanitized = sanitized.replace(pattern, '')
      }
    }

    // SQL injection patterns
    const sqlPatterns = [
      /union\s+(all\s+)?select/gi,
      /insert\s+into/gi,
      /delete\s+from/gi,
      /update\s+\w+\s+set/gi,
      /drop\s+(table|database)/gi
    ]

    for (const pattern of sqlPatterns) {
      if (pattern.test(content)) {
        threats.push('Potential SQL injection')
      }
    }

    // Path traversal
    if (/\.\.\//.test(content)) {
      threats.push('Path traversal attempt')
    }

    return {
      valid: threats.length === 0,
      sanitized: sanitized.trim(),
      threats
    }
  }

  // Check IP activity patterns
  static async checkIPActivity(ipAddress: string): Promise<IPActivityResult> {
    try {
      // For now, return a mock result since the RPC function doesn't exist
      // In production, this would check actual IP activity patterns
      return {
        request_count: 0,
        is_suspicious: false,
        last_request: new Date().toISOString()
      }
    } catch (error) {
      console.error('IP activity check error:', error)
      return {
        request_count: 0,
        is_suspicious: false,
        last_request: new Date().toISOString()
      }
    }
  }

  // Enhanced CSRF token validation
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    if (!token || !sessionToken || token.length !== sessionToken.length) {
      return false
    }
    
    // Constant-time comparison
    let result = 0
    for (let i = 0; i < token.length; i++) {
      result |= token.charCodeAt(i) ^ sessionToken.charCodeAt(i)
    }
    
    return result === 0
  }

  // Security headers validation
  static validateSecurityHeaders(headers: Headers): { valid: boolean; missing: string[] } {
    const requiredHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy'
    ]

    const missing = requiredHeaders.filter(header => !headers.get(header))

    return {
      valid: missing.length === 0,
      missing
    }
  }
}
