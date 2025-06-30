
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { secureLog } from '@/utils/secureLogging';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import ErrorRedirectHandler from '@/components/ErrorRedirectHandler';
import AppInitializer from '@/components/AppInitializer';
import './index.css';

// Lazy load pages for better performance
const Landing = React.lazy(() => import('@/pages/Landing'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-brand-background flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4 animate-bounce">🫖</div>
      <div className="text-brand-text text-lg">Loading CTea News...</div>
      <div className="mt-4 w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  useEffect(() => {
    secureLog.info('CTea News App initializing');
    
    // Set up error tracking
    const handleError = (event: ErrorEvent) => {
      secureLog.error('Global error caught:', event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      secureLog.error('Unhandled promise rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <AppErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        storageKey="ctea-ui-theme"
      >
        <Router>
          <ErrorRedirectHandler>
            <AppInitializer>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="*" element={<Landing />} />
                </Routes>
              </Suspense>
              
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'rgba(11, 11, 23, 0.95)',
                    border: '1px solid rgba(255, 32, 82, 0.3)',
                    color: '#FFFFFF',
                  },
                }}
              />
            </AppInitializer>
          </ErrorRedirectHandler>
        </Router>
      </ThemeProvider>
    </AppErrorBoundary>
  );
};

export default App;
