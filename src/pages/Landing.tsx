
import React from 'react';
import ParallaxLanding from '@/components/ParallaxLanding';
import BrandedNavigation from '@/components/BrandedNavigation';
import EnhancedFooter from '@/components/ui/EnhancedFooter';

const Landing = () => {
  return (
    <div className="relative">
      <BrandedNavigation />
      <ParallaxLanding />
      <EnhancedFooter />
    </div>
  );
};

export default Landing;
