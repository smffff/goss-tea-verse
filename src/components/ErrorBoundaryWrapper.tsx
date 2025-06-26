
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import FallbackPage from '@/pages/FallbackPage';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
  fallback,
  componentName = 'Component'
}) => {
  const defaultFallback = (
    <FallbackPage 
      error={`The ${componentName} encountered an error and needs to be refreshed.`}
      onRetry={() => window.location.reload()}
    />
  );

  return (
    <ErrorBoundary 
      componentName={componentName}
      fallback={fallback || defaultFallback}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
