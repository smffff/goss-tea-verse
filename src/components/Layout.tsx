
import React from 'react';
import StickyNavigation from '@/components/navigation/StickyNavigation';
import UnifiedFooter from '@/components/UnifiedFooter';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showNavigation = true, 
  showFooter = true,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a] ${className}`}>
      {showNavigation && <StickyNavigation />}
      
      <main className="relative">
        {children}
      </main>
      
      {showFooter && <UnifiedFooter />}
      <Toaster />
    </div>
  );
};

export default Layout;
