
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, MessageSquare } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showFeedbackModal: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showFeedbackModal: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showFeedbackModal: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Log error to our analytics/monitoring service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // Send error to monitoring service or database
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };
      
      console.log('Error logged:', errorData);
      // In production, send to error tracking service
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showFeedbackModal: false
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorDetails = `Error: ${this.state.error?.message}\n\nStack Trace:\n${this.state.error?.stack}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack}`;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-ctea-dark">
          <Card className="max-w-lg w-full p-8 bg-ctea-dark/90 border-red-500/30">
            <div className="text-center space-y-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-gray-400">
                  We encountered an unexpected error. Don't worry, your data is safe.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-left">
                <p className="text-sm text-red-300 font-mono">
                  {this.state.error?.message}
                </p>
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
