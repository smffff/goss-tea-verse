import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
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
      <div className="min-h-screen bg-gradient-to-br from-ctea-dark via-purple-900/20 to-ctea-dark">
        {showNavigation && <Navigation />}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        {showFooter && <Footer />}
        <FeedbackWidget />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
