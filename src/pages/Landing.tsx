
import React from 'react';
import EnhancedProductionLandingPage from '@/components/landing/EnhancedProductionLandingPage';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';

const Landing: React.FC = () => {
  return (
    <ErrorBoundaryWrapper componentName="Landing">
      <EnhancedProductionLandingPage />
    </ErrorBoundaryWrapper>
  );
};

export default Landing;
