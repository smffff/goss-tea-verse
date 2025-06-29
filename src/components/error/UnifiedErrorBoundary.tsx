import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Send,
  Copy,
  CheckCircle,
  RefreshCcw
} from 'lucide-react';
import { secureLog } from '@/utils/secureLogging';
import { reportError } from '@/utils/errorReporting';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  componentName?: string;
  showRetry?: boolean;
  mode?: 'production' | 'development' | 'debug';
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
  showFeedbackModal: boolean;
}

export class UnifiedErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      errorId: this.generateErrorId(),
      showFeedbackModal: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, componentName, mode } = this.props;
    
    // Log error
    secureLog.error(`Error in ${componentName || 'Component'}:`, { error, errorInfo });
    
    // Report to error service
    reportError({
      error,
      errorInfo,
      componentName: componentName || 'Unknown',
      errorId: this.state.errorId,
      mode: mode || 'production'
    });

    // Call custom error handler
    if (onError) {
      onError(error, errorInfo);
    }

    this.setState({ errorInfo });
  }

  private generateErrorId = (): string => {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  private handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorId: this.generateErrorId()
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleCopyError = async () => {
    const errorDetails = `Error ID: ${this.state.errorId}\nComponent: ${this.props.componentName || 'Unknown'}\nError: ${this.state.error?.message || 'Unknown error'}\n\nStack Trace:\n${this.state.error?.stack || 'No stack trace'}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack || 'No component stack'}`;
    
    try {
      await navigator.clipboard.writeText(errorDetails);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy error details:', error);
    }
  };

  private renderProductionFallback = () => (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
      <Card className="bg-ctea-dark/90 backdrop-blur-lg border border-red-500/30 rounded-lg p-8 max-w-lg w-full">
        <CardContent className="text-center space-y-6">
          <div className="text-6xl mb-4">🫖</div>
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Tea Spilled</h2>
          <p className="text-gray-300 mb-6">
            Something went wrong, but don't worry - we're cleaning up the mess!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={this.handleRetry}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={this.handleReload}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  private renderDevelopmentFallback = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-ctea-dark">
      <Card className="max-w-2xl w-full p-8 bg-ctea-dark/90 border-red-500/30">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-bold text-white">
              Development Error
            </h2>
            <Badge variant="destructive">DEV</Badge>
          </div>
          
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-300 font-mono break-words mb-2">
              {this.state.error?.message || 'Unknown error occurred'}
            </p>
            {this.props.componentName && (
              <p className="text-xs text-red-400">
                Component: {this.props.componentName}
              </p>
            )}
            <p className="text-xs text-red-400 mt-2">
              Error ID: {this.state.errorId}
            </p>
          </div>

          {this.state.error?.stack && (
            <details className="text-left">
              <summary className="text-sm text-red-300 cursor-pointer mb-2">Stack Trace</summary>
              <pre className="text-xs text-red-300 whitespace-pre-wrap overflow-auto max-h-32 bg-red-900/20 p-2 rounded">
                {this.state.error.stack}
              </pre>
            </details>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={this.handleRetry}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={this.handleCopyError}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Error
            </Button>
            <Button
              variant="outline"
              onClick={this.handleReload}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Reload
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { mode = 'production' } = this.props;

      switch (mode) {
        case 'development':
          return this.renderDevelopmentFallback();
        case 'debug':
          return this.renderDevelopmentFallback();
        case 'production':
        default:
          return this.renderProductionFallback();
      }
    }

    return this.props.children;
  }
}

export default UnifiedErrorBoundary; 