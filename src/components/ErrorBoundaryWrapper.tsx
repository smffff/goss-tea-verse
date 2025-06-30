
import React from 'react';
import UnifiedErrorBoundary from './error/UnifiedErrorBoundary';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  componentName?: string;
  fallback?: React.ReactNode;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({ 
  children, 
  componentName,
  fallback 
}) => {
  return (
    <UnifiedErrorBoundary componentName={componentName} fallback={fallback}>
      {children}
    </UnifiedErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
