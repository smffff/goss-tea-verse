
// Production-safe logging utility
interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  timestamp?: string;
}

class SecureLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private sanitizeData(data: any): any {
    if (!data) return data;
    
    if (typeof data === 'string') {
      // Remove sensitive patterns
      return data
        .replace(/password["\s]*[:=]["\s]*[^"\s,}]+/gi, 'password: [REDACTED]')
        .replace(/token["\s]*[:=]["\s]*[^"\s,}]+/gi, 'token: [REDACTED]')
        .replace(/key["\s]*[:=]["\s]*[^"\s,}]+/gi, 'key: [REDACTED]')
        .replace(/secret["\s]*[:=]["\s]*[^"\s,}]+/gi, 'secret: [REDACTED]');
    }
    
    if (typeof data === 'object') {
      const sanitized = { ...data };
      const sensitiveKeys = ['password', 'token', 'key', 'secret', 'private_key', 'wallet_private'];
      
      sensitiveKeys.forEach(key => {
        if (key in sanitized) {
          sanitized[key] = '[REDACTED]';
        }
      });
      
      return sanitized;
    }
    
    return data;
  }

  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  info(message: string, data?: any, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(this.formatMessage('info', message, context), this.sanitizeData(data));
    }
  }

  warn(message: string, data?: any, context?: LogContext) {
    if (this.isDevelopment) {
      console.warn(this.formatMessage('warn', message, context), this.sanitizeData(data));
    } else if (this.isProduction) {
      // In production, only log warnings without sensitive data
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error?: any, context?: LogContext) {
    const sanitizedError = this.sanitizeData(error);
    
    if (this.isDevelopment) {
      console.error(this.formatMessage('error', message, context), sanitizedError);
    } else {
      // Always log errors, but sanitized
      console.error(this.formatMessage('error', message, context), {
        message: error?.message || 'Unknown error',
        stack: error?.stack ? '[REDACTED]' : undefined
      });
    }
  }

  debug(message: string, data?: any, context?: LogContext) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, context), this.sanitizeData(data));
    }
  }

  // Security-specific logging
  security(event: string, details?: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') {
    const securityContext: LogContext = {
      component: 'SecurityLogger',
      action: event,
      timestamp: new Date().toISOString()
    };

    const sanitizedDetails = this.sanitizeData(details);
    
    if (severity === 'critical' || severity === 'high') {
      this.error(`SECURITY EVENT: ${event}`, sanitizedDetails, securityContext);
    } else {
      this.warn(`Security Event: ${event}`, sanitizedDetails, securityContext);
    }
  }
}

export const secureLog = new SecureLogger();
