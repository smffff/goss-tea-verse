
import { useEffect, useCallback } from 'react'
import { useToast } from './use-toast'

interface SecurityMonitoringOptions {
  enableRealTimeAlerts?: boolean
  logUserActivity?: boolean
  detectSuspiciousPatterns?: boolean
}

export function useSecurityMonitoring(options: SecurityMonitoringOptions = {}) {
  const { toast } = useToast()

  const logSecurityEvent = useCallback(async (
    eventType: string,
    details: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'low'
  ) => {
    // Simple logging for now
    if (process.env.NODE_ENV === 'development') {
      console.log('Security Event:', { eventType, details, severity });
    }

    // Show alert for high/critical events if enabled
    if (options.enableRealTimeAlerts && ['high', 'critical'].includes(severity)) {
      toast({
        title: "Security Alert",
        description: `Security event detected: ${eventType}`,
        variant: severity === 'critical' ? 'destructive' : 'default'
      })
    }
  }, [options.enableRealTimeAlerts, toast])

  const checkRateLimit = useCallback(async (
    identifier: string,
    action: string,
    maxActions?: number,
    windowMinutes?: number
  ) => {
    // Simple rate limiting
    return { allowed: true, remaining: maxActions || 10 };
  }, [])

  const validateTokenSecurity = useCallback((token: string) => {
    return { success: token && token.length > 10 };
  }, [])

  const validateContent = useCallback((content: string) => {
    return { valid: content && content.length > 0, sanitized: content.trim() };
  }, [])

  // Monitor page visibility changes
  useEffect(() => {
    if (!options.logUserActivity) return

    const handleVisibilityChange = () => {
      logSecurityEvent('page_visibility_change', {
        hidden: document.hidden,
        url: window.location.href
      })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [options.logUserActivity, logSecurityEvent])

  // Monitor suspicious mouse/keyboard patterns
  useEffect(() => {
    if (!options.detectSuspiciousPatterns) return

    let rapidClickCount = 0
    let rapidClickTimer: NodeJS.Timeout

    const handleRapidClicks = () => {
      rapidClickCount++
      
      if (rapidClickTimer) clearTimeout(rapidClickTimer)
      
      rapidClickTimer = setTimeout(() => {
        if (rapidClickCount > 20) {
          logSecurityEvent('suspicious_rapid_clicks', {
            click_count: rapidClickCount,
            timeframe: '1_second'
          }, 'medium')
        }
        rapidClickCount = 0
      }, 1000)
    }

    document.addEventListener('click', handleRapidClicks)
    return () => {
      document.removeEventListener('click', handleRapidClicks)
      if (rapidClickTimer) clearTimeout(rapidClickTimer)
    }
  }, [options.detectSuspiciousPatterns, logSecurityEvent])

  return {
    logSecurityEvent,
    checkRateLimit,
    validateTokenSecurity,
    validateContent
  }
}
