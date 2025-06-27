import React, { Component, ErrorInfo, ReactNode } from 'react';
import { secureLog } from '@/utils/secureLogging';
import AdminGuard from '@/components/access/AdminGuard';

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class DebugErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    secureLog.error(`Error in ${this.props.componentName || 'Component'}:`, { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <AdminGuard showAccessDenied={false}>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 m-4">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-400 mb-2">
                {this.props.componentName || 'Component'} Failed to Render
              </h3>
              <p className="text-red-300 text-sm mb-4">
                {this.state.error?.message || 'Unknown error occurred'}
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                <details className="text-left mb-4">
                  <summary className="text-sm text-red-300 cursor-pointer">Stack Trace</summary>
                  <pre className="text-xs text-red-300 mt-2 whitespace-pre-wrap overflow-auto max-h-32">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Try Again
              </button>
            </div>
          </div>
        </AdminGuard>
      );
    }

    return this.props.children;
  }
}

export default DebugErrorBoundary;
