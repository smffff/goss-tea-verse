
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import MainApp from '@/components/beta/MainApp';

function App() {
  return (
    <ErrorBoundaryWrapper componentName="App">
      <Router>
        <Routes>
          <Route path="/*" element={<MainApp />} />
        </Routes>
        <Toaster />
      </Router>
    </ErrorBoundaryWrapper>
  );
}

export default App;
