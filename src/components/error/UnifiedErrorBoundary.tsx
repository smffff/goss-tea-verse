
import React, { Component, ReactNode } from 'react';
import { secureLog } from '@/utils/secureLogging';

interface ErrorInfo {
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
  errorInfo?: ErrorInfo;
}

export class UnifiedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    secureLog.error('UnifiedErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      componentName: this.props.componentName
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              {this.props.mode === 'development' ? this.state.error?.message : 'The app encountered an error and needs to be refreshed.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Refresh App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default UnifiedErrorBoundary;
