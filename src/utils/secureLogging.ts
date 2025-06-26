// CTea Secure Logging Utility
// This utility ensures no sensitive information is exposed in production

export const isProduction = process.env.NODE_ENV === 'production' || 
                           window.location.hostname === 'cteanews.com' ||
                           window.location.hostname === 'www.cteanews.com';

export const isDevelopment = process.env.NODE_ENV === 'development';

// Sensitive patterns to detect and sanitize
const SENSITIVE_PATTERNS = [
  /password[=:]\s*\S+/gi,
  /token[=:]\s*\S+/gi,
  /key[=:]\s*\S+/gi,
  /secret[=:]\s*\S+/gi,
  /auth[=:]\s*\S+/gi,
  /api[_-]?key[=:]\s*\S+/gi,
  /private[_-]?key[=:]\s*\S+/gi,
  /access[_-]?token[=:]\s*\S+/gi,
  /session[_-]?id[=:]\s*\S+/gi,
  /user[_-]?id[=:]\s*\S+/gi,
  /email[=:]\s*\S+/gi,
  /phone[=:]\s*\S+/gi,
  /address[=:]\s*\S+/gi,
  /ssn[=:]\s*\S+/gi,
  /credit[_-]?card[=:]\s*\S+/gi,
  /cvv[=:]\s*\S+/gi,
  /pin[=:]\s*\S+/gi
];

// Sanitize sensitive data
export const sanitizeData = (data: any): any => {
  if (isProduction) {
    if (typeof data === 'string') {
      let sanitized = data;
      SENSITIVE_PATTERNS.forEach(pattern => {
        sanitized = sanitized.replace(pattern, (match) => {
          const [key] = match.split(/[=:]/);
          return `${key}=***`;
        });
      });
      return sanitized.substring(0, 200); // Limit length
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        const lowerKey = key.toLowerCase();
        if (['password', 'token', 'key', 'secret', 'auth', 'email', 'phone', 'address', 'ssn', 'credit', 'cvv', 'pin'].some(sensitive => lowerKey.includes(sensitive))) {
          sanitized[key] = '***';
        } else {
          sanitized[key] = sanitizeData(value);
        }
      }
      return sanitized;
    }
  }
  return data;
};

// Secure logging functions
export const secureLog = {
  // Only log in development
  info: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  
  // Log errors with sanitization in production
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name, stack: error.stack?.substring(0, 500) }
        : sanitizeData(error);
      console.error(message, sanitizedError);
    }
  },
  
  // Only warn in development
  warn: (message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },
  
  // Debug logging (development only)
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  
  // Security event logging (always logged but sanitized)
  security: (event: string, details?: any) => {
    const sanitizedDetails = sanitizeData(details);
    if (isDevelopment) {
      console.warn(`[SECURITY] ${event}`, sanitizedDetails);
    } else {
      console.warn(`[SECURITY] ${event}`, sanitizedDetails);
    }
  }
};

// Replace console methods globally in production
if (isProduction) {
  // Override console.log
  const originalLog = console.log;
  console.log = (...args: any[]) => {
    const sanitizedArgs = args.map(arg => sanitizeData(arg));
    originalLog.apply(console, sanitizedArgs);
  };
  
  // Override console.error (keep for errors but sanitize)
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const sanitizedArgs = args.map(arg => sanitizeData(arg));
    originalError.apply(console, sanitizedArgs);
  };
  
  // Override console.warn
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const sanitizedArgs = args.map(arg => sanitizeData(arg));
    originalWarn.apply(console, sanitizedArgs);
  };
}
