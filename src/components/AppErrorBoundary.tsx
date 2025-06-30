
import React from 'react';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundaryWrapper componentName="App">
      {children}
    </ErrorBoundaryWrapper>
  );
};

export default AppErrorBoundary;
