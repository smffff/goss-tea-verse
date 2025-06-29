
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import EnhancedLandingPage from '@/components/landing/EnhancedLandingPage';
import SimpleApp from '@/components/SimpleApp';
import SimpleErrorBoundary from '@/components/SimpleErrorBoundary';

function App() {
  return (
    <SimpleErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<EnhancedLandingPage />} />
          <Route path="/feed" element={<SimpleApp />} />
          <Route path="/newsroom" element={<SimpleApp />} />
        </Routes>
        <Toaster />
      </Router>
    </SimpleErrorBoundary>
  );
}

export default App;
