
import { supabase } from '../integrations/supabase/client'

export interface SecurityEvent {
  event_type: string
  user_id?: string
  anonymous_token?: string
  ip_address?: string
  user_agent?: string
  details: Record<string, unknown>
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export interface RateLimitCheck {
  allowed: boolean
  current_count: number
  max_actions: number
  remaining: number
  reset_time?: Date
  blocked_reason?: string
}

export interface TokenValidation {
  valid: boolean
  expired: boolean
  suspicious: boolean
  security_score: number
  warnings: string[]
}

export class SecurityService {
  // Enhanced rate limiting with IP tracking
  static async checkRateLimit(
    identifier: string, 
    action: string, 
    maxActions: number = 10, 
    windowMinutes: number = 60,
    ipAddress?: string
  ): Promise<RateLimitCheck> {
    try {
      const { data, error } = await supabase.rpc('check_enhanced_rate_limit_with_ip', {
        p_identifier: identifier,
        p_action: action,
        p_max_actions: maxActions,
        p_window_minutes: windowMinutes,
        p_ip_address: ipAddress
      })

      if (error) {
        console.error('Rate limit check error:', error)
        // Fail safe - allow if check fails but log it
        await this.logSecurityEvent({
          event_type: 'rate_limit_check_failed',
          details: { error: error.message, action, identifier: identifier.substring(0, 8) },
          severity: 'medium'
        })
        return { allowed: true, current_count: 0, max_actions: maxActions, remaining: maxActions }
      }

      return {
        allowed: data.allowed,
        current_count: data.current_count,
        max_actions: data.max_actions,
        remaining: data.remaining || 0,
        reset_time: data.reset_time ? new Date(data.reset_time) : undefined,
        blocked_reason: data.blocked_reason
      }
    } catch (error) {
      console.error('Rate limit service error:', error)
      return { allowed: true, current_count: 0, max_actions: maxActions, remaining: maxActions }
    }
  }

  // Enhanced token validation with expiry checks
  static validateTokenSecurity(token: string): TokenValidation {
    const warnings: string[] = []
    let securityScore = 100
    let suspicious = false

    // Basic validation
    if (!token || token.length < 32) {
      return {
        valid: false,
        expired: false,
        suspicious: true,
        security_score: 0,
        warnings: ['Token too short or missing']
      }
    }

    // Check token format
    if (!/^[A-Za-z0-9_-]+$/.test(token)) {
      securityScore -= 30
      warnings.push('Invalid token format')
    }

    // Check for suspicious patterns
    if (/^(test|debug|admin|root|system)/i.test(token)) {
      securityScore -= 50
      suspicious = true
      warnings.push('Suspicious token pattern detected')
    }

    // Check token age (if we can extract timestamp)
    const tokenKey = `ctea_token_${token.substring(0, 8)}`
    const stored = localStorage.getItem(tokenKey + '_created')
    if (stored) {
      const created = new Date(stored)
      const age = Date.now() - created.getTime()
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours

      if (age > maxAge) {
        return {
          valid: false,
          expired: true,
          suspicious: false,
          security_score: 0,
          warnings: ['Token expired']
        }
      }
    }

    return {
      valid: securityScore >= 50,
      expired: false,
      suspicious,
      security_score: securityScore,
      warnings
    }
  }

  // Enhanced security event logging
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      // Get client metadata
      const userAgent = navigator.userAgent
      const timestamp = new Date().toISOString()
      
      // Log to Supabase
      const { error } = await supabase.rpc('log_enhanced_security_event', {
        p_event_type: event.event_type,
        p_user_id: event.user_id,
        p_anonymous_token: event.anonymous_token,
        p_ip_address: event.ip_address,
        p_user_agent: userAgent,
        p_details: {
          ...event.details,
          timestamp,
          client_time: timestamp,
          url: window.location.href,
          referrer: document.referrer
        },
        p_severity: event.severity
      })

      if (error) {
        console.error('Security event logging failed:', error)
      }

      // Also log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[SECURITY] ${event.severity.toUpperCase()}: ${event.event_type}`, event.details)
      }
    } catch (error) {
      console.error('Security logging error:', error)
    }
  }

  // Content security validation
  static validateContent(content: string): { valid: boolean; sanitized: string; threats: string[] } {
    const threats: string[] = []
    let sanitized = content

    // XSS patterns
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /data:text\/html/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi
    ]

    for (const pattern of xssPatterns) {
      if (pattern.test(content)) {
        threats.push('XSS_ATTEMPT')
        break
      }
    }

    // SQL injection patterns
    const sqlPatterns = [
      /union\s+select/gi,
      /drop\s+table/gi,
      /insert\s+into/gi,
      /delete\s+from/gi,
      /--\s*$/gm,
      /\/\*.*?\*\//g
    ]

    for (const pattern of sqlPatterns) {
      if (pattern.test(content)) {
        threats.push('SQL_INJECTION_ATTEMPT')
        break
      }
    }

    // Sanitize content
    sanitized = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/`/g, '&#x60;')

    return {
      valid: threats.length === 0,
      sanitized,
      threats
    }
  }

  // IP-based suspicious activity detection
  static async checkSuspiciousActivity(
    identifier: string, 
    ipAddress?: string
  ): Promise<{ suspicious: boolean; reasons: string[] }> {
    const reasons: string[] = []

    try {
      // Check for rapid requests from same IP
      if (ipAddress) {
        const { data } = await supabase.rpc('check_ip_activity', {
          p_ip_address: ipAddress,
          p_window_minutes: 5
        })

        if (data && data.request_count > 50) {
          reasons.push('HIGH_FREQUENCY_REQUESTS')
        }
      }

      // Check for token pattern abuse
      const validation = this.validateTokenSecurity(identifier)
      if (validation.suspicious) {
        reasons.push('SUSPICIOUS_TOKEN_PATTERN')
      }

      return {
        suspicious: reasons.length > 0,
        reasons
      }
    } catch (error) {
      console.error('Suspicious activity check failed:', error)
      return { suspicious: false, reasons: [] }
    }
  }
}
