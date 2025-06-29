import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ProductionParallaxPortal from '@/components/landing/ProductionParallaxPortal';
import SimpleApp from '@/components/SimpleApp';
import SimpleErrorBoundary from '@/components/SimpleErrorBoundary';

function App() {
  return (
    <SimpleErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<ProductionParallaxPortal />} />
          <Route path="/feed" element={<SimpleApp />} />
          <Route path="/newsroom" element={<SimpleApp />} />
        </Routes>
        <Toaster />
      </Router>
    </SimpleErrorBoundary>
  );
}

export default App;
