
import React from 'react';
import UnifiedErrorBoundary from './error/UnifiedErrorBoundary';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  componentName?: string;
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({ 
  children, 
  componentName 
}) => {
  return (
    <UnifiedErrorBoundary componentName={componentName}>
      {children}
    </UnifiedErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
