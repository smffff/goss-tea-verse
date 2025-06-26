
import React from 'react';

// Error handling utilities
export const handleError = (error: Error, context?: string) => {
  console.error(`Error in ${context || 'unknown context'}:`, error);
  
  // In production, you would send this to an error reporting service
  if (process.env.NODE_ENV === 'production') {
    // Send to error reporting service
  }
};

export const createErrorBoundary = (fallbackComponent: React.ComponentType<any>) => {
  return class ErrorBoundary extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: any) {
      handleError(error, 'ErrorBoundary');
    }

    render() {
      if ((this.state as any).hasError) {
        return React.createElement(fallbackComponent);
      }

      return (this.props as any).children;
    }
  };
};
