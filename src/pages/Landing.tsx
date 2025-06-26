
import React from 'react';
import ParallaxLanding from '@/components/ParallaxLanding';
import BrandedNavigation from '@/components/BrandedNavigation';

const Landing = () => {
  return (
    <div className="relative">
      <BrandedNavigation />
      <ParallaxLanding />
    </div>
  );
};

export default Landing;
