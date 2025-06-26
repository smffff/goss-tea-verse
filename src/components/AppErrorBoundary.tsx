
import React from 'react';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import FallbackPage from '@/pages/FallbackPage';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
  const fallback = (
    <FallbackPage 
      error="The application encountered an error. Please refresh the page."
      onRetry={() => window.location.reload()}
    />
  );

  return (
    <ErrorBoundaryWrapper 
      componentName="App" 
      fallback={fallback}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
};

export default AppErrorBoundary;
