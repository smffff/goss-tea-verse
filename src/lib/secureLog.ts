
// Secure logging utility
export const secureLog = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[INFO]', message, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error('[ERROR]', message, error);
  },
  warn: (message: string, data?: any) => {
    console.warn('[WARN]', message, data);
  }
};
