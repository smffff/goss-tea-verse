
/**
 * Enhanced error handling with security considerations
 */

export interface ErrorDetails {
  message: string
  code?: string
  stack?: string
  context?: Record<string, unknown>
  severity: 'low' | 'medium' | 'high' | 'critical'
  sensitive?: boolean
}

export class SecureErrorHandler {
  private static isDevelopment = process.env.NODE_ENV === 'development'

  static sanitizeError(error: Error | unknown): ErrorDetails {
    if (error instanceof Error) {
      // Don't expose stack traces in production
      const stack = this.isDevelopment ? error.stack : undefined
      
      // Sanitize sensitive information from error messages
      let message = error.message
      
      // Remove potential sensitive data patterns
      message = message.replace(/password=[\w\d]+/gi, 'password=***')
      message = message.replace(/token=[\w\d]+/gi, 'token=***')
      message = message.replace(/key=[\w\d]+/gi, 'key=***')
      message = message.replace(/secret=[\w\d]+/gi, 'secret=***')
      
      // Detect if error might contain sensitive information
      const sensitive = /(?:password|token|key|secret|auth|credential)/i.test(error.message)
      
      return {
        message: sensitive && !this.isDevelopment ? 'An error occurred' : message,
        stack,
        severity: this.determineSeverity(error),
        sensitive
      }
    }

    return {
      message: 'An unknown error occurred',
      severity: 'medium'
    }
  }

  private static determineSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    const message = error.message.toLowerCase()
    
    if (message.includes('security') || message.includes('unauthorized') || message.includes('forbidden')) {
      return 'critical'
    }
    
    if (message.includes('network') || message.includes('timeout') || message.includes('connection')) {
      return 'high'
    }
    
    if (message.includes('validation') || message.includes('invalid')) {
      return 'medium'
    }
    
    return 'low'
  }

  static async logError(error: Error | unknown, context?: Record<string, unknown>): Promise<void> {
    const errorDetails = this.sanitizeError(error)
    
    // Log to console in development
    if (this.isDevelopment) {
      console.error('[ERROR]', errorDetails)
    }

    try {
      // Send to logging service (implement your preferred service)
      await this.sendToLoggingService({
        ...errorDetails,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError)
    }
  }

  private static async sendToLoggingService(errorData: any): Promise<void> {
    // Implementation depends on your logging service
    // For now, we'll use Supabase edge function
    try {
      const response = await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      })
      
      if (!response.ok) {
        throw new Error(`Logging failed: ${response.status}`)
      }
    } catch (error) {
      // Fallback logging
      console.warn('Error logging service unavailable:', error)
    }
  }

  static createUserFriendlyMessage(error: Error | unknown): string {
    const errorDetails = this.sanitizeError(error)
    
    // Return generic messages for sensitive errors in production
    if (errorDetails.sensitive && !this.isDevelopment) {
      return 'Something went wrong. Please try again later.'
    }
    
    // Map common error patterns to user-friendly messages
    const message = errorDetails.message.toLowerCase()
    
    if (message.includes('network') || message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.'
    }
    
    if (message.includes('unauthorized') || message.includes('forbidden')) {
      return 'Access denied. Please log in and try again.'
    }
    
    if (message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.'
    }
    
    if (message.includes('validation')) {
      return 'Please check your input and try again.'
    }
    
    return errorDetails.message
  }
}

// Global error handler
export function setupGlobalErrorHandler(): void {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    SecureErrorHandler.logError(event.reason, {
      type: 'unhandled_promise_rejection',
      promise: event.promise
    })
  })

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    SecureErrorHandler.logError(event.error, {
      type: 'uncaught_error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })
}
