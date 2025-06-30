
import React from 'react';
import ProductionLandingPage from '@/components/landing/ProductionLandingPage';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';

const Landing: React.FC = () => {
  return (
    <ErrorBoundaryWrapper componentName="Landing">
      <ProductionLandingPage />
    </ErrorBoundaryWrapper>
  );
};

export default Landing;
