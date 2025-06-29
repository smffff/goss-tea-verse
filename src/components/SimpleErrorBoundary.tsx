import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class SimpleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
          <div className="bg-ctea-dark/80 backdrop-blur-lg border border-ctea-teal/30 rounded-lg p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🫖</div>
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Tea Spilled</h2>
            <p className="text-gray-300 mb-6">
              Something went wrong, but don't worry - we're cleaning up the mess!
            </p>
            <button
              onClick={this.handleRetry}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Brew Fresh Tea
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimpleErrorBoundary; 