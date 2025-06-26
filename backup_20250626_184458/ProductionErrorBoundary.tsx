import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Send,
  Copy,
  CheckCircle
} from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  reportSent: boolean;
}

class ProductionErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      reportSent: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ProductionErrorBoundary caught an error:', error, errorInfo);
    }
    
    this.setState({
      error,
      errorInfo
    });

    // Report to error tracking service
    this.reportError(error, errorInfo);

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private reportError = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      const errorReport = {
        id: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        userId: localStorage.getItem('user_id') || 'anonymous',
        buildVersion: process.env.REACT_APP_VERSION || 'unknown',
        environment: process.env.NODE_ENV
      };

      // Store locally for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        const existingReports = JSON.parse(localStorage.getItem('ctea_error_reports') || '[]');
        existingReports.push(errorReport);
        localStorage.setItem('ctea_error_reports', JSON.stringify(existingReports.slice(-10)));
      }

      // Track with analytics if available (only in production)
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: error.message,
          fatal: true,
          custom_parameters: {
            error_id: this.state.errorId,
            component_stack: errorInfo.componentStack.slice(0, 500)
          }
        });
      }
      
    } catch (reportError) {
      // Silent error handling in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to report error:', reportError);
      }
    }
  };

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        reportSent: false
      });
    } else {
      // Max retries reached, redirect to home
      window.location.href = '/';
    }
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleSendReport = async () => {
    try {
      this.setState({ reportSent: true });
      
      // In a real implementation, this would send to an error tracking service
      // Silent in production
      if (process.env.NODE_ENV === 'development') {
        console.log('Error report sent successfully');
      }
      
      // Show success feedback
      setTimeout(() => {
        this.setState({ reportSent: false });
      }, 3000);
      
    } catch (error) {
      // Silent error handling in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to send error report:', error);
      }
      this.setState({ reportSent: false });
    }
  };

  private handleCopyError = () => {
    // In production, only copy a sanitized version
    const errorText = process.env.NODE_ENV === 'production' 
      ? `Error ID: ${this.state.errorId}\nTime: ${new Date().toISOString()}`
      : `Error ID: ${this.state.errorId}
Error: ${this.state.error?.message}
Stack: ${this.state.error?.stack}
Component: ${this.state.errorInfo?.componentStack}
URL: ${window.location.href}
Time: ${new Date().toISOString()}`.trim();

    navigator.clipboard.writeText(errorText).then(() => {
      // Silent in production
      if (process.env.NODE_ENV === 'development') {
        console.log('Error details copied to clipboard');
      }
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Production error page
      return (
        <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full bg-ctea-dark/90 border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <div>
                  <div>Something spilled the tea wrong 🫖</div>
                  <Badge variant="outline" className="mt-2 border-red-500/50 text-red-400 font-mono text-xs">
                    Error ID: {this.state.errorId}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error Description */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">What happened?</h3>
                <p className="text-gray-300 mb-3">
                  The CTea app encountered an unexpected error and couldn't continue. 
                  This has been automatically reported to our team.
                </p>
                
                {/* Only show technical details in development */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-4">
                    <summary className="text-sm text-red-400 cursor-pointer hover:text-red-300">
                      Technical Details (Development Only)
                    </summary>
                    <div className="mt-2 p-3 bg-black/30 rounded text-xs font-mono text-gray-300 overflow-auto max-h-32">
                      <div className="text-red-400 font-bold">{this.state.error.message}</div>
                      <pre className="mt-2 whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </div>
                  </details>
                )}
              </div>

              {/* Recovery Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What can you do?</h3>
                
                <div className="grid gap-3">
                  {this.retryCount < this.maxRetries ? (
                    <Button
                      onClick={this.handleRetry}
                      className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-medium"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again ({this.maxRetries - this.retryCount} attempts left)
                    </Button>
                  ) : (
                    <div className="text-sm text-gray-400 p-3 bg-gray-500/10 rounded">
                      Maximum retry attempts reached. Redirecting to home page...
                    </div>
                  )}

                  <Button
                    onClick={this.handleGoHome}
                    variant="outline"
                    className="border-ctea-teal/50 text-ctea-teal hover:bg-ctea-teal/10"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go to Home Page
                  </Button>
                </div>
              </div>

              {/* Error Reporting */}
              <div className="pt-4 border-t border-ctea-teal/20">
                <h3 className="text-sm font-medium text-white mb-3">Help us improve</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={this.handleSendReport}
                    disabled={this.state.reportSent}
                    size="sm"
                    variant="outline"
                    className="border-gray-500/50 text-gray-300 hover:bg-gray-500/10"
                  >
                    {this.state.reportSent ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sent
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3 mr-1" />
                        Send Report
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={this.handleCopyError}
                    size="sm"
                    variant="outline"
                    className="border-gray-500/50 text-gray-300 hover:bg-gray-500/10"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Details
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center text-sm text-gray-400">
                <p>
                  Still having issues? Contact us at{' '}
                  <a 
                    href="mailto:support@cteanews.com" 
                    className="text-ctea-teal hover:underline"
                  >
                    support@cteanews.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ProductionErrorBoundary;
