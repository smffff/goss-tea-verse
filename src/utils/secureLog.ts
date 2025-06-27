
// Secure logging utility with proper error handling
interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
  timestamp: string;
}

export type LogContext = string | number | object | boolean | null | undefined;

class SecureLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  
  info(message: string, data?: LogContext) {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, data);
    }
    this.storeLog('info', message, data);
  }

  warn(message: string, data?: LogContext) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    }
    this.storeLog('warn', message, data);
  }

  error(message: string, data?: LogContext) {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, data);
    }
    this.storeLog('error', message, data);
  }

  private storeLog(level: 'info' | 'warn' | 'error', message: string, data?: LogContext) {
    try {
      const logEntry: LogEntry = {
        level,
        message,
        data,
        timestamp: new Date().toISOString()
      };

      // Store in sessionStorage for debugging
      const existingLogs = sessionStorage.getItem('ctea_logs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(logEntry);
      
      // Keep only last 100 logs
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      sessionStorage.setItem('ctea_logs', JSON.stringify(logs));
    } catch (error) {
      // Fallback to console if storage fails
      console.error('Failed to store log:', error);
    }
  }
}

export const secureLog = new SecureLogger();
