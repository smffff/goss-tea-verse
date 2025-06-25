
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
  showFeedback?: boolean;
  submissionId?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className = '',
  showNavigation = true,
  showFooter = true,
  showFeedback = false,
  submissionId = 'default'
}) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-hero">
        {showNavigation && <UnifiedNavigation />}
        <main className={`container mx-auto px-4 py-8 ${className}`}>
          {children}
        </main>
        {showFooter && <UnifiedFooter />}
        {showFeedback && <FeedbackWidget submissionId={submissionId} />}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
