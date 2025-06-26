// Production Environment Check
// This utility ensures sensitive information is never exposed in production

export const isProduction = process.env.NODE_ENV === 'production' || 
                           window.location.hostname === 'cteanews.com' ||
                           window.location.hostname === 'www.cteanews.com';

export const isDevelopment = process.env.NODE_ENV === 'development';

// Check if we're in a production-like environment
export const isProductionLike = () => {
  return isProduction || 
         window.location.hostname.includes('vercel.app') ||
         window.location.hostname.includes('netlify.app') ||
         window.location.hostname.includes('herokuapp.com') ||
         window.location.hostname.includes('railway.app');
};

// Secure environment utilities
export const secureEnvironment = {
  // Only log in development
  log: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  
  // Only show detailed errors in development
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      // In production, only log sanitized error info
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name }
        : typeof error === 'string' 
          ? error.substring(0, 100) 
          : 'Unknown error';
      console.error(message, sanitizedError);
    }
  },
  
  // Only show debug info in development
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  
  // Sanitize data for production logging
  sanitize: (data: any): any => {
    if (isProduction) {
      if (typeof data === 'string') {
        return data
          .replace(/password[=:]\s*\S+/gi, 'password=***')
          .replace(/token[=:]\s*\S+/gi, 'token=***')
          .replace(/key[=:]\s*\S+/gi, 'key=***')
          .replace(/secret[=:]\s*\S+/gi, 'secret=***')
          .substring(0, 200);
      }
      if (typeof data === 'object' && data !== null) {
        const sanitized: any = {};
        for (const [key, value] of Object.entries(data)) {
          if (['password', 'token', 'key', 'secret', 'auth'].includes(key.toLowerCase())) {
            sanitized[key] = '***';
          } else {
            sanitized[key] = secureEnvironment.sanitize(value);
          }
        }
        return sanitized;
      }
    }
    return data;
  }
};
