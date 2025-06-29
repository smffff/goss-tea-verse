import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import SimpleApp from '@/components/SimpleApp';
import SimpleErrorBoundary from '@/components/SimpleErrorBoundary';

function App() {
  return (
    <SimpleErrorBoundary>
      <Router>
        <SimpleApp />
        <Toaster />
      </Router>
    </SimpleErrorBoundary>
  );
}

export default App;
