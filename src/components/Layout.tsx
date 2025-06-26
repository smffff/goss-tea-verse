
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  showBreadcrumb?: boolean;
  showFeedback?: boolean;
  submissionId?: string;
  pageTitle?: string;
  pageDescription?: string;
  variant?: 'default' | 'landing' | 'app' | 'minimal';
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className = '',
  showNavigation = true,
  showFooter = true,
  showBreadcrumb = true,
  pageTitle,
  pageDescription,
  variant = 'default'
}) => {
  return (
    <PageLayout
      className={className}
      showNavigation={showNavigation}
      showFooter={showFooter}
      showBreadcrumb={showBreadcrumb}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      variant={variant}
    >
      {children}
    </PageLayout>
  );
};

export default Layout;
