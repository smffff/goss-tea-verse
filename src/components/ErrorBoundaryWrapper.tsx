
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

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
    <div className="min-h-[200px] flex items-center justify-center bg-pale-pink border border-vintage-red/30 rounded-lg">
      <div className="text-center p-6">
        <div className="text-vintage-red text-4xl mb-4">⚠️</div>
        <h3 className="text-tabloid-black font-bold mb-2">Oops! Something went wrong</h3>
        <p className="text-tabloid-black/70 text-sm">
          The {componentName} encountered an error. Please try refreshing the page.
        </p>
      </div>
    </div>
  );

  return (
    <ErrorBoundary componentName={componentName}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
