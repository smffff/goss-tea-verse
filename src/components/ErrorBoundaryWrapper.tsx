
import React, { Component, ReactNode } from 'react';
import FallbackPage from '@/pages/FallbackPage';

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in ${this.props.componentName || 'component'}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <FallbackPage 
          error={this.state.error?.message || 'An unexpected error occurred'}
          onRetry={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;
