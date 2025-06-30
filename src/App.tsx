import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { WalletProvider } from '@/contexts/WalletContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { UnifiedErrorBoundary } from '@/components/error/UnifiedErrorBoundary';
import { secureLog } from '@/utils/secureLogging';
import debugErrorLog from '@/utils/debugErrorLog';
import environmentCheck from '@/utils/environmentCheck';
import Layout from '@/components/Layout';
import './index.css';

// Lazy load pages for better performance
const Home = React.lazy(() => import('@/pages/Home'));
const Feed = React.lazy(() => import('@/pages/Feed'));
const SpillTea = React.lazy(() => import('@/components/SpillTea'));
const Landing = React.lazy(() => import('@/pages/Landing'));
const Submit = React.lazy(() => import('@/pages/Submit'));
const VIP = React.lazy(() => import('@/pages/VIP'));

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
    window.addEventListener('error', (event) => {
      secureLog.error('Global error caught:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      secureLog.error('Unhandled promise rejection:', event.reason);
    });

    // Run environment checks in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        environmentCheck.runAllChecks();
        
        // Check for existing error logs
        const errors = debugErrorLog.getErrors();
        if (errors.length > 0) {
          console.log('Previous errors found. Run debugErrorLog.printErrors() to view details.');
        }
      }, 2000);
    }

    // Add debugging utilities to window in development
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      (window as any).debugErrorLog = debugErrorLog;
      (window as any).environmentCheck = environmentCheck;
      console.log('Debug utilities available: window.debugErrorLog, window.environmentCheck');
    }
  }, []);

  return (
    <UnifiedErrorBoundary
      componentName="App"
      mode={process.env.NODE_ENV === 'development' ? 'development' : 'production'}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
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
                  <Route path="/submit" element={
                    <Layout>
                      <SpillTea />
                    </Layout>
                  } />
                  <Route path="/spill" element={
                    <Layout>
                      <SpillTea />
                    </Layout>
                  } />
                  <Route path="/vip" element={
                    <Layout>
                      <VIP />
                    </Layout>
                  } />
                  <Route path="*" element={<Landing />} />
                </Routes>
              </Suspense>
              
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'rgba(253, 249, 243, 0.95)',
                    border: '1px solid rgba(222, 31, 148, 0.3)',
                    color: '#1A1A1A',
                  },
                  className: 'bg-brand-background/95 border-brand-primary/30 text-brand-text',
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
