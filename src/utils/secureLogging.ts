
// Secure logging utility to prevent sensitive information exposure in production

export type LogContext = string | number | object | boolean | null | undefined | unknown;

interface LogContextObject {
  [key: string]: any;
}

export const secureLog = {
  info: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`ℹ️ ${message}`, context ? sanitizeForLogging(context) : '');
    }
  },
  
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${message}`, error);
    } else {
      // In production, only log sanitized error messages
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name }
        : typeof error === 'string' 
          ? error.substring(0, 100) 
          : 'Unknown error';
      console.error(`❌ ${message}`, sanitizedError);
    }
  },
  
  warn: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ ${message}`, context ? sanitizeForLogging(context) : '');
    } else {
      console.warn(`⚠️ ${message}`);
    }
  },
  
  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐛 [DEBUG] ${message}`, context ? sanitizeForLogging(context) : '');
    }
  },

  security: (message: string, context?: LogContext) => {
    const sanitizedContext = context ? sanitizeForLogging(context) : '';
    console.warn(`🔐 [SECURITY] ${message}`, sanitizedContext);
  }
};

// Sanitize sensitive data for production logging
export const sanitizeForLogging = (data: any): any => {
  if (process.env.NODE_ENV === 'production') {
    if (typeof data === 'string') {
      // Remove potential sensitive patterns
      return data
        .replace(/password[=:]\s*\S+/gi, 'password=***')
        .replace(/token[=:]\s*\S+/gi, 'token=***')
        .replace(/key[=:]\s*\S+/gi, 'key=***')
        .replace(/secret[=:]\s*\S+/gi, 'secret=***')
        .replace(/auth[=:]\s*\S+/gi, 'auth=***')
        .substring(0, 200); // Limit length
    }
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (['password', 'token', 'key', 'secret', 'auth', 'wallet_address'].some(sensitive => 
          key.toLowerCase().includes(sensitive))) {
          sanitized[key] = '***';
        } else if (typeof value === 'string' && value.length > 50) {
          sanitized[key] = value.substring(0, 50) + '...';
        } else {
          sanitized[key] = sanitizeForLogging(value);
        }
      }
      return sanitized;
    }
  }
  return data;
};

export default secureLog;
