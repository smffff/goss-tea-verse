
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { secureLog } from '@/utils/secureLog';
import { reportError } from '@/utils/errorReporting';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
  showRetry?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = Date.now().toString();
    return { hasError: true, error, errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const context = this.props.componentName || 'EnhancedErrorBoundary';
    secureLog.error(`Error in ${context}:`, error);
    
    // Enhanced error reporting
    reportError('component_error', error, context, 'high', {
      errorInfo,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
          <div className="bg-ctea-dark/90 backdrop-blur-lg border border-red-500/30 rounded-lg p-8 max-w-md w-full text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Something Went Wrong</h2>
            <p className="text-gray-300 mb-4">
              {this.props.componentName || 'A component'} encountered an unexpected error.
            </p>
            {this.state.errorId && (
              <p className="text-xs text-gray-500 mb-6 font-mono">
                Error ID: {this.state.errorId}
              </p>
            )}
            {this.props.showRetry !== false && (
              <Button
                onClick={this.handleRetry}
                className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EnhancedErrorBoundary;
