import React, { Component, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { secureLog } from '@/utils/secureLog';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

// Helper component to check admin status
const AdminErrorDetails: React.FC<{ error?: Error; errorInfo?: any }> = ({ error, errorInfo }) => {
  const { user, isAdmin } = useAuth();
  const isSuperAdmin = user?.email === 'stephanie@taskbytask.net';
  const hasAdminAccess = isAdmin || isSuperAdmin;

  if (!hasAdminAccess) {
    return null;
  }

  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded p-4 text-left">
      <p className="text-red-400 text-sm font-mono">
        {error?.message}
      </p>
      {process.env.NODE_ENV === 'development' && error?.stack && (
        <details className="mt-2">
          <summary className="text-xs text-red-300 cursor-pointer">Stack Trace</summary>
          <pre className="text-xs text-red-300 mt-1 whitespace-pre-wrap overflow-auto max-h-32">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
};

export class ProductionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    secureLog.error('Production error boundary caught error', {
      error: error.message,
      stack: error.stack,
      errorInfo
    });

    // Track error for analytics if available
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('production_error', {
        error: error.message,
        stack: error.stack,
        errorInfo
      });
    }

    this.setState({ errorInfo });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-slate-800 border-red-500/30">
            <CardContent className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <AlertTriangle className="w-16 h-16 text-red-400" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-gray-400">
                  We encountered an unexpected error. Don't worry, it's not your fault!
                </p>
              </div>

              {/* Admin-only error details */}
              <AdminErrorDetails error={this.state.error} errorInfo={this.state.errorInfo} />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleRetry}
                  className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white hover:opacity-90"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="border-gray-600 text-gray-400"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
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
