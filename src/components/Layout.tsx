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
    <div className={`min-h-screen bg-gradient-dark retro-grid ${className}`}>
      {showNavigation && <Navigation />}
      <main className={`${showNavigation ? 'pt-16 sm:pt-20' : ''} ${showFooter ? 'pb-16' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout; 