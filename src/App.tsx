import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navigation from "./components/Navigation";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Feed from "./pages/Feed";
// import SubmitTea from "./pages/SubmitTea";
// import Campaigns from "./pages/Campaigns";
// import Features from "./pages/Features";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Simple debug component
const DebugApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#1a0d26', 
      color: 'white', 
      minHeight: '100vh',
      fontSize: '24px'
    }}>
      <h1>CTea Newsroom Debug</h1>
      <p>App component is loading...</p>
      <p>Background should be dark purple</p>
    </div>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1a0d26', 
          color: 'white', 
          minHeight: '100vh',
          fontSize: '24px'
        }}>
          <h1>Something went wrong</h1>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Temporarily remove React Router */}
          <div className="min-h-screen bg-gradient-dark retro-grid">
            {/* <Navigation /> */}
            <main className="relative z-10">
              <DebugApp />
              {/* <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/submit" element={<SubmitTea />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/features" element={<Features />} />
                <Route path="*" element={<NotFound />} />
              </Routes> */}
            </main>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
