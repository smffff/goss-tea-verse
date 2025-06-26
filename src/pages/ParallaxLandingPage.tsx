
import React from 'react';
import BrandedNavigation from '@/components/BrandedNavigation';
import ParallaxPortal from '@/components/landing/ParallaxPortal';
import EnhancedFooter from '@/components/ui/EnhancedFooter';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import MobileOptimizedNavigation from '@/components/ui/MobileOptimizedNavigation';

const ParallaxLandingPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <BrandedNavigation />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileOptimizedNavigation />
      </div>
      
      <ParallaxPortal />
      <EnhancedFooter />
      
      {/* Mobile FAB */}
      <div className="md:hidden">
        <FloatingActionButton />
      </div>
    </div>
  );
};

export default ParallaxLandingPage;
