
import React from 'react';
import UnifiedNavigation from './UnifiedNavigation';
import UnifiedFooter from './UnifiedFooter';
import FeedbackWidget from './FeedbackWidget';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className = '',
  showNavigation = true,
  showFooter = true
}) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-hero">
        {showNavigation && <UnifiedNavigation />}
        <main className={`container mx-auto px-4 py-8 ${className}`}>
          {children}
        </main>
        {showFooter && <UnifiedFooter />}
        <FeedbackWidget />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
