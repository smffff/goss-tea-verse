import React from 'react';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import UnifiedFooter from '@/components/UnifiedFooter';
import FeedbackWidget from '@/components/FeedbackWidget';
import ErrorBoundary from '@/components/ErrorBoundary';

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
