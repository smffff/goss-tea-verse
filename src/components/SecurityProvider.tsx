
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSecurityMonitoring } from '../hooks/useSecurityMonitoring'
import { applySecurityHeaders, generateCSRFToken } from '../utils/securityHeaders'
import { SecurityService } from '../services/securityService'
import { secureLog } from '@/utils/secureLog'

interface SecurityContextType {
  csrfToken: string
  logSecurityEvent: (type: string, details: Record<string, unknown>, severity?: 'low' | 'medium' | 'high' | 'critical') => Promise<void>
  checkRateLimit: (identifier: string, action: string, maxActions?: number, windowMinutes?: number) => Promise<any>
  validateContent: (content: string) => Promise<{ valid: boolean; sanitized: string; threats: string[] }>
  isSecurityEnabled: boolean
}

const SecurityContext = createContext<SecurityContextType | null>(null)

export const useSecurity = () => {
  const context = useContext(SecurityContext)
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider')
  }
  return context
}

interface SecurityProviderProps {
  children: React.ReactNode
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('')
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(true)

  const {
    logSecurityEvent,
    checkRateLimit,
    validateContent: validateContentAsync
  } = useSecurityMonitoring({
    enableRealTimeAlerts: true,
    logUserActivity: true,
    detectSuspiciousPatterns: true
  })

  // Wrap the async validateContent to match expected interface
  const validateContent = async (content: string) => {
    try {
      return await validateContentAsync(content);
    } catch (error) {
      secureLog.error('Content validation failed', error);
      return {
        valid: false,
        sanitized: content.replace(/[<>]/g, ''),
        threats: ['Validation service unavailable']
      };
    }
  };

  useEffect(() => {
    // Initialize security
    const initSecurity = async () => {
      try {
        // Apply security headers
        applySecurityHeaders()

        // Generate CSRF token
        const token = generateCSRFToken()
        setCsrfToken(token)
        sessionStorage.setItem('csrf_token', token)

        // Log security initialization
        await logSecurityEvent('security_initialized', {
          csrf_token_generated: true,
          headers_applied: true,
          monitoring_enabled: true
        })

        setIsSecurityEnabled(true)
      } catch (error) {
        secureLog.error('Security initialization failed', error)
        await logSecurityEvent('security_init_failed', {
          error: error instanceof Error ? error.message : 'Unknown error'
        }, 'high')
        setIsSecurityEnabled(false)
      }
    }

    initSecurity()
  }, [logSecurityEvent])

  // Monitor for security threats
  useEffect(() => {
    const monitorThreats = () => {
      // Check for common attack patterns in URL
      const url = window.location.href
      const suspiciousPatterns = [
        /javascript:/i,
        /data:/i,
        /<script/i,
        /\.\./,
        /\/etc\/passwd/i,
        /union.*select/i
      ]

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(url)) {
          logSecurityEvent('suspicious_url_pattern', {
            url: window.location.href,
            pattern: pattern.toString()
          }, 'high')
          break
        }
      }
    }

    monitorThreats()
  }, [logSecurityEvent])

  const value: SecurityContextType = {
    csrfToken,
    logSecurityEvent,
    checkRateLimit,
    validateContent,
    isSecurityEnabled
  }

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  )
}
