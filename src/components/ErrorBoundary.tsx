import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, MessageSquare } from 'lucide-react';
import FeedbackModal from '@/components/FeedbackModal';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showFeedbackModal: boolean;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showFeedbackModal: false,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error(`[ErrorBoundary ${errorId}] Error caught:`, error);
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName = 'Unknown' } = this.props;
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error(`[ErrorBoundary] Error in ${componentName}:`, error);
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error(`[ErrorBoundary] Component stack:`, errorInfo.componentStack);
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error(`[ErrorBoundary] Error stack:`, error.stack);
    
    this.setState({
      error,
      errorInfo
    });

    // Log comprehensive error details
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    try {
      const errorData = {
        errorId: this.state.errorId,
        message: error.message || 'Unknown error',
        stack: error.stack || 'No stack trace',
        componentStack: errorInfo.componentStack || 'No component stack',
        componentName: this.props.componentName || 'Unknown',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        props: this.props
      };
      
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info(`[ErrorBoundary] Detailed error data:`, errorData);
      
      // Store in localStorage for debugging
      try {
        const existingErrors = JSON.parse(localStorage.getItem('ctea_error_log') || '[]');
        existingErrors.push(errorData);
        // Keep only last 10 errors
        if (existingErrors.length > 10) {
          existingErrors.splice(0, existingErrors.length - 10);
        }
        localStorage.setItem('ctea_error_log', JSON.stringify(existingErrors));
      } catch (storageError) {
        secureLog.warn('[ErrorBoundary] Could not store error in localStorage:', storageError);
      }
    } catch (logError) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('[ErrorBoundary] Failed to log error:', logError);
    }
  };

  handleReload = () => {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('[ErrorBoundary] User triggered page reload');
    window.location.reload();
  };

  handleReset = () => {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('[ErrorBoundary] User triggered error reset');
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showFeedbackModal: false,
      errorId: ''
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorDetails = `Error ID: ${this.state.errorId}\nComponent: ${this.props.componentName || 'Unknown'}\nError: ${this.state.error?.message || 'Unknown error'}\n\nStack Trace:\n${this.state.error?.stack || 'No stack trace'}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack || 'No component stack'}`;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-ctea-dark">
          <Card className="max-w-lg w-full p-8 bg-ctea-dark/90 border-red-500/30">
            <div className="text-center space-y-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-gray-400 mb-2">
                  We encountered an unexpected error. Don't worry, your data is safe.
                </p>
                <p className="text-sm text-gray-500">
                  Error ID: {this.state.errorId}
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-left">
                <p className="text-sm text-red-300 font-mono break-words">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
                {this.props.componentName && (
                  <p className="text-xs text-red-400 mt-2">
                    Component: {this.props.componentName}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex-1 border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                >
                  Try Again
                </Button>
                <Button
                  onClick={this.handleReload}
                  className="flex-1 bg-ctea-teal hover:bg-ctea-teal/80"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>

              <Button
                onClick={() => this.setState({ showFeedbackModal: true })}
                variant="outline"
                className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Report This Error
              </Button>
            </div>
          </Card>

          <FeedbackModal
            isOpen={this.state.showFeedbackModal}
            onClose={() => this.setState({ showFeedbackModal: false })}
            initialType="error"
            errorDetails={errorDetails}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
