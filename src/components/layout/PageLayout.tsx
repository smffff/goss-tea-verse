
import React from 'react';
import { cn } from '@/lib/utils';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import UnifiedFooter from '@/components/UnifiedFooter';
import ErrorBoundary from '@/components/ErrorBoundary';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  pageTitle?: string;
  pageDescription?: string;
  variant?: 'default' | 'landing' | 'app' | 'minimal';
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  showNavigation = true,
  showFooter = true,
  pageTitle,
  pageDescription,
  variant = 'default'
}) => {
  // Set page title and description
  React.useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | ${BRAND_CONFIG.name}`;
    }
    
    if (pageDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', pageDescription);
      }
    }
  }, [pageTitle, pageDescription]);

  const getLayoutClasses = () => {
    switch (variant) {
      case 'landing':
        return 'min-h-screen bg-gradient-to-br from-newsprint via-pale-pink to-vintage-red-50';
      case 'app':
        return 'min-h-screen bg-gradient-to-br from-tabloid-black-900 via-tabloid-black-800 to-black';
      case 'minimal':
        return 'min-h-screen bg-background';
      default:
        return 'min-h-screen bg-gradient-to-br from-newsprint to-pale-pink';
    }
  };

  return (
    <ErrorBoundary componentName="PageLayout">
      <div className={cn(getLayoutClasses(), 'flex flex-col')}>
        {showNavigation && <UnifiedNavigation />}
        
        <main className={cn('flex-1', className)}>
          {children}
        </main>
        
        {showFooter && <UnifiedFooter />}
      </div>
    </ErrorBoundary>
  );
};

export default PageLayout;
