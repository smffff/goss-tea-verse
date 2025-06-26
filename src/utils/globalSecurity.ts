// Global Security Override
// This file must be imported first in main.tsx to override console methods

const isProduction = process.env.NODE_ENV === 'production' || 
                     window.location.hostname === 'cteanews.com' ||
                     window.location.hostname === 'www.cteanews.com';

const isDevelopment = process.env.NODE_ENV === 'development';

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
const sanitizeData = (data: any): any => {
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

// Override console methods in production
if (isProduction) {
  // Store original methods
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  // Override console.log - only show in development
  console.log = (...args: any[]) => {
    if (isDevelopment) {
      originalLog.apply(console, args);
    }
  };

  // Override console.error - sanitize in production
  console.error = (...args: any[]) => {
    if (isDevelopment) {
      originalError.apply(console, args);
    } else {
      const sanitizedArgs = args.map(arg => sanitizeData(arg));
      originalError.apply(console, sanitizedArgs);
    }
  };

  // Override console.warn - sanitize in production
  console.warn = (...args: any[]) => {
    if (isDevelopment) {
      originalWarn.apply(console, args);
    } else {
      const sanitizedArgs = args.map(arg => sanitizeData(arg));
      originalWarn.apply(console, sanitizedArgs);
    }
  };

  // Override console.info - only show in development
  console.info = (...args: any[]) => {
    if (isDevelopment) {
      originalInfo.apply(console, args);
    }
  };

  // Override console.debug - only show in development
  console.debug = (...args: any[]) => {
    if (isDevelopment) {
      originalDebug.apply(console, args);
    }
  };
}

// Export for use in other files
export const secureEnvironment = {
  isProduction,
  isDevelopment,
  sanitizeData,
  log: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name }
        : sanitizeData(error);
      console.error(message, sanitizedError);
    }
  },
  warn: (message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  }
};
