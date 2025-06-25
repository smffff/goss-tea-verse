import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

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
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:bg-gradient-dark retro-grid ${className}`}>
      {showNavigation && <Navigation />}
      <main className={`${showNavigation ? 'pt-16 sm:pt-20' : ''} ${showFooter ? 'pb-16' : ''} px-4 md:px-8 py-6`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout; 