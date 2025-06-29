
import React from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
import UnifiedFooter from '@/components/UnifiedFooter';
import { Toaster } from '@/components/ui/toaster';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  className?: string;
  pageTitle?: string;
  pageDescription?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showNavigation = true, 
  showFooter = true,
  className = '',
  pageTitle,
  pageDescription
}) => {
  React.useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | ${BRAND_CONFIG.name}`;
    }
    
    if (pageDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', pageDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = pageDescription;
        document.head.appendChild(meta);
      }
    }
  }, [pageTitle, pageDescription]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a] ${className}`}>
      {showNavigation && <MainNavigation />}
      
      <main className="relative">
        {children}
      </main>
      
      {showFooter && <UnifiedFooter />}
      <Toaster />
    </div>
  );
};

export default Layout;
