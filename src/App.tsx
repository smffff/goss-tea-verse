
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { WalletProvider } from '@/contexts/WalletContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { UnifiedErrorBoundary } from '@/components/error/UnifiedErrorBoundary';
import { performanceOptimizer } from '@/utils/performanceOptimizer';
import { secureLog } from '@/utils/secureLogging';
import './index.css';

// Lazy load components for better performance
const SimpleApp = React.lazy(() => import('@/components/SimpleApp'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4 animate-bounce">🫖</div>
      <div className="text-white text-lg">Loading CTea...</div>
      <div className="mt-4 w-8 h-8 border-4 border-ctea-teal border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
);

// Performance monitoring component
const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Initialize performance monitoring
    performanceOptimizer.monitorWebVitals();
    performanceOptimizer.optimizeImages();
    performanceOptimizer.setupLazyLoading();
    
    // Preload critical resources
    performanceOptimizer.preloadResources([
      '/assets/ctea-logo-full.png',
      '/assets/ctea-banner.png'
    ]);

    // Log performance metrics
    if (process.env.NODE_ENV === 'development') {
      performanceOptimizer.analyzeBundle();
    }

    return () => {
      performanceOptimizer.cleanup();
    };
  }, []);

  return null;
};

// Main App component with optimizations
const App: React.FC = () => {
  useEffect(() => {
    // Initialize app with performance optimizations
    secureLog.info('CTea App initializing with performance optimizations');
    
    // Set up error tracking
    window.addEventListener('error', (event) => {
      secureLog.error('Global error caught:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      secureLog.error('Unhandled promise rejection:', event.reason);
    });

    // Initialize performance optimizations
    performanceOptimizer.optimizeCSSDelivery();
    performanceOptimizer.optimizeJavaScript();

  }, []);

  return (
    <UnifiedErrorBoundary
      componentName="App"
      mode={process.env.NODE_ENV === 'development' ? 'development' : 'production'}
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">The app encountered an error and needs to be refreshed.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Refresh App
            </button>
          </div>
        </div>
      }
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Router>
          <WalletProvider>
            <AuthProvider>
              <PerformanceMonitor />
              
              <Suspense fallback={<LoadingSpinner />}>
                <SimpleApp />
              </Suspense>
              
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'rgba(17, 24, 39, 0.95)',
                    border: '1px solid rgba(20, 184, 166, 0.3)',
                    color: 'white',
                  },
                  className: 'bg-ctea-dark/95 border-ctea-teal/30 text-white',
                }}
              />
            </AuthProvider>
          </WalletProvider>
        </Router>
      </ThemeProvider>
    </UnifiedErrorBoundary>
  );
};

export default App;
