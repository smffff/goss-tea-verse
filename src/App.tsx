
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { WalletProvider } from '@/contexts/WalletContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { UnifiedErrorBoundary } from '@/components/error/UnifiedErrorBoundary';
import { secureLog } from '@/utils/secureLogging';
import Layout from '@/components/Layout';
import './index.css';

// Lazy load pages for better performance
const Home = React.lazy(() => import('@/pages/Home'));
const Feed = React.lazy(() => import('@/pages/Feed'));
const SpillTea = React.lazy(() => import('@/components/SpillTea'));
const Landing = React.lazy(() => import('@/pages/Landing'));

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

const App: React.FC = () => {
  useEffect(() => {
    secureLog.info('CTea App initializing');
    
    // Set up error tracking
    window.addEventListener('error', (event) => {
      secureLog.error('Global error caught:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      secureLog.error('Unhandled promise rejection:', event.reason);
    });
  }, []);

  return (
    <UnifiedErrorBoundary
      componentName="App"
      mode={process.env.NODE_ENV === 'development' ? 'development' : 'production'}
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
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/home" element={
                    <Layout>
                      <Home />
                    </Layout>
                  } />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/spill" element={
                    <Layout>
                      <SpillTea />
                    </Layout>
                  } />
                  <Route path="*" element={<Landing />} />
                </Routes>
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
