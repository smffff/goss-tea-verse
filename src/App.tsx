
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import FallbackLanding from '@/components/FallbackLanding';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  // For now, show the fallback landing page while security fixes are being implemented
  const isMaintenanceMode = true;

  if (isMaintenanceMode) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <FallbackLanding />
          <Toaster />
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<FallbackLanding />} />
            <Route path="*" element={<FallbackLanding />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
