
import React from 'react';
import BrandedNavigation from '@/components/BrandedNavigation';
import ParallaxPortal from '@/components/landing/ParallaxPortal';
import EnhancedFooter from '@/components/ui/EnhancedFooter';

const ParallaxLandingPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <BrandedNavigation />
      <ParallaxPortal />
      <EnhancedFooter />
    </div>
  );
};

export default ParallaxLandingPage;
