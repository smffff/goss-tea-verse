export interface ErrorReport {
  id: string;
  type: string;
  timestamp: string;
  error: string;
  stack?: string;
  userAgent: string;
  url: string;
  component?: string;
  userId?: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

export class ErrorReportingService {
  private static sessionId = this.generateSessionId();

  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public static reportError(
    type: string,
    error: Error | string,
    component?: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    context?: Record<string, any>
  ): ErrorReport {
    const report: ErrorReport = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: new Date().toISOString(),
      error: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      userAgent: navigator.userAgent,
      url: window.location.href,
      component,
      sessionId: this.sessionId,
      severity,
      context
    };

    this.storeReport(report);
    this.logReport(report);
    
    return report;
  }

  private static storeReport(report: ErrorReport): void {
    try {
      const existing = this.getStoredReports();
      existing.push(report);
      
      // Keep only the last 50 reports
      if (existing.length > 50) {
        existing.splice(0, existing.length - 50);
      }
      
      localStorage.setItem('ctea_error_reports', JSON.stringify(existing));
    } catch (error) {
      console.error('Failed to store error report:', error);
    }
  }

  private static logReport(report: ErrorReport): void {
    const emoji = this.getSeverityEmoji(report.severity);
    console.group(`🫖 CTea Error Report ${emoji}`);
    console.log('ID:', report.id);
    console.log('Type:', report.type);
    console.log('Component:', report.component || 'Unknown');
    console.log('Severity:', report.severity.toUpperCase());
    console.log('Error:', report.error);
    if (report.stack) {
      console.log('Stack:', report.stack);
    }
    if (report.context) {
      console.log('Context:', report.context);
    }
    console.groupEnd();
  }

  private static getSeverityEmoji(severity: string): string {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '❓';
    }
  }

  public static getStoredReports(): ErrorReport[] {
    try {
      const stored = localStorage.getItem('ctea_error_reports');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to retrieve error reports:', error);
      return [];
    }
  }

  public static exportReports(): string {
    const reports = this.getStoredReports();
    const exportData = {
      exportedAt: new Date().toISOString(),
      sessionId: this.sessionId,
      totalReports: reports.length,
      reports
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  public static clearReports(): void {
    localStorage.removeItem('ctea_error_reports');
    console.log('🫖 CTea error reports cleared');
  }

  // Report specific error types with context
  public static reportSecurityError(error: Error | string, context?: Record<string, any>): ErrorReport {
    return this.reportError('security_error', error, 'SecurityService', 'high', context);
  }

  public static reportValidationError(error: Error | string, context?: Record<string, any>): ErrorReport {
    return this.reportError('validation_error', error, 'ValidationService', 'medium', context);
  }

  public static reportRateLimitError(error: Error | string, context?: Record<string, any>): ErrorReport {
    return this.reportError('rate_limit_error', error, 'RateLimitService', 'medium', context);
  }

  public static reportUIError(error: Error | string, component?: string, context?: Record<string, any>): ErrorReport {
    return this.reportError('ui_error', error, component, 'low', context);
  }
}

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  ErrorReportingService.reportError(
    'uncaught_error',
    event.error || event.message,
    'Global',
    'high',
    {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    }
  );
});

// Global handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  ErrorReportingService.reportError(
    'unhandled_promise_rejection',
    event.reason,
    'Global',
    'high',
    {
      promise: event.promise
    }
  );
});
