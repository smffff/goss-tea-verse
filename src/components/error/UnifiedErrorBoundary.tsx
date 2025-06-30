import React, { Component, ReactNode } from 'react';
import { secureLog } from '@/utils/secureLogging';

interface ErrorBoundaryErrorInfo {
  componentStack: string;
}

interface Props {
  children: ReactNode;
  componentName?: string;
  mode?: 'development' | 'production';
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorBoundaryErrorInfo;
}

export class UnifiedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorBoundaryErrorInfo) {
    this.setState({ errorInfo });
    
    // Log the error with more details
    secureLog.error('UnifiedErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      componentName: this.props.componentName,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    // Store error in localStorage for debugging
    try {
      const errorLog = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        componentName: this.props.componentName,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
      
      const existingErrors = JSON.parse(localStorage.getItem('ctea_error_log') || '[]');
      existingErrors.push(errorLog);
      // Keep only last 5 errors
      if (existingErrors.length > 5) {
        existingErrors.splice(0, existingErrors.length - 5);
      }
      localStorage.setItem('ctea_error_log', JSON.stringify(existingErrors));
    } catch (storageError) {
      console.warn('Could not store error in localStorage:', storageError);
    }
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDevelopment = this.props.mode === 'development' || process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            
            {isDevelopment && this.state.error ? (
              <div className="text-left mb-6">
                <p className="text-red-400 mb-2 font-mono text-sm">
                  Error: {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <details className="text-left mb-4">
                    <summary className="text-sm text-gray-400 cursor-pointer mb-2">Stack Trace</summary>
                    <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap overflow-auto max-h-32 bg-gray-800 p-2 rounded">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
                {this.state.errorInfo?.componentStack && (
                  <details className="text-left mb-4">
                    <summary className="text-sm text-gray-400 cursor-pointer mb-2">Component Stack</summary>
                    <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap overflow-auto max-h-32 bg-gray-800 p-2 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            ) : (
              <p className="text-gray-400 mb-6">
                The app encountered an error and needs to be refreshed.
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
              <button
                onClick={this.handleRefresh}
                className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Refresh App
              </button>
            </div>

            {isDevelopment && (
              <div className="mt-6 text-xs text-gray-500">
                <p>Error logged to console and localStorage for debugging.</p>
                <p>Check browser console for more details.</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default UnifiedErrorBoundary;
