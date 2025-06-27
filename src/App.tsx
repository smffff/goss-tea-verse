
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import EnhancedMainApp from '@/components/beta/EnhancedMainApp';

function App() {
  return (
    <ErrorBoundaryWrapper componentName="App">
      <Router>
        <Routes>
          <Route path="/*" element={<EnhancedMainApp />} />
        </Routes>
        <Toaster />
      </Router>
    </ErrorBoundaryWrapper>
  );
}

export default App;
