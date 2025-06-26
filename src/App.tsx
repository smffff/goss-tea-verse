
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import ProductionErrorBoundary from '@/components/error/ProductionErrorBoundary';
import ProductionMonitor from '@/components/monitoring/ProductionMonitor';
import { SecurityAuditProvider } from '@/components/security/SecurityAuditProvider';
import EnhancedSecurityMonitor from '@/components/security/EnhancedSecurityMonitor';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load components for better performance
const ProductionLandingPage = React.lazy(() => import('@/components/landing/ProductionLandingPage'));
const SimpleBetaLanding = React.lazy(() => import('@/components/beta/SimpleBetaLanding'));
const Feed = React.lazy(() => import('@/pages/Feed'));
const EnhancedTeaFeed = React.lazy(() => import('@/components/EnhancedTeaFeed'));

// Create query client with production settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if ((error as any)?.status >= 400 && (error as any)?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  const [hasAccess, setHasAccess] = React.useState(false);
  const [isProduction] = React.useState(
    process.env.NODE_ENV === 'production' || 
    window.location.hostname === 'cteanews.com'
  );

  useEffect(() => {
    // Initialize analytics
    if (isProduction && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_TRACKING_ID', {
        page_title: 'CTea Newsroom',
        page_location: window.location.href,
      });

      // Track page view
      window.gtag('event', 'page_view', {
        page_title: 'CTea Newsroom - Home',
        page_location: window.location.href,
      });
    }

    // Check for existing access
    const existingAccess = localStorage.getItem('ctea-beta-access') === 'granted' ||
                          localStorage.getItem('ctea_access_method') ||
                          localStorage.getItem('ENABLE_DEV_ROUTES') === 'true';
    
    setHasAccess(existingAccess);

    // Performance monitoring
    if (isProduction) {
      // Monitor Core Web Vitals
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      }).catch(() => {
        // web-vitals not available, skip monitoring
      });
    }

    // Error tracking setup
    window.addEventListener('error', (event) => {
      if (isProduction && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: false,
        });
      }
    });

    window.addEventListener('unhandledrejection', (event) => {
      if (isProduction && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: event.reason?.message || 'Unhandled promise rejection',
          fatal: false,
        });
      }
    });

  }, [isProduction]);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  return (
    <HelmetProvider>
      <ProductionErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="ctea-theme">
            <SecurityAuditProvider>
              <Router>
                <Helmet>
                  <title>CTea Newsroom - Where Crypto Twitter Spills the Tea</title>
                  <meta name="description" content="Anonymous crypto gossip platform powered by AI. Share intel, earn tokens, stay shady." />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta name="theme-color" content="#00d1c1" />
                  
                  {/* Preconnect to external resources */}
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                  
                  {/* Favicon */}
                  <link rel="icon" type="image/svg+xml" href="/ctea-logo-icon.svg" />
                  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                  
                  {/* PWA */}
                  <link rel="manifest" href="/manifest.json" />
                  
                  {/* Analytics */}
                  {isProduction && (
                    <script
                      async
                      src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
                    />
                  )}
                  {isProduction && (
                    <script>
                      {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'GA_TRACKING_ID');
                      `}
                    </script>
                  )}
                </Helmet>

                <Suspense 
                  fallback={
                    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <Routes>
                    {/* Main Routes */}
                    <Route 
                      path="/" 
                      element={
                        hasAccess ? (
                          <ProductionLandingPage />
                        ) : (
                          <SimpleBetaLanding onAccessGranted={handleAccessGranted} />
                        )
                      } 
                    />
                    
                    {/* Protected Routes */}
                    {hasAccess && (
                      <>
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/enhanced-feed" element={<EnhancedTeaFeed />} />
                      </>
                    )}

                    {/* Redirect unknown routes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>

                {/* Global Components */}
                <Toaster />
                
                {/* Production Monitoring */}
                {isProduction && <ProductionMonitor />}
                
                {/* Security Monitoring (Development and Production) */}
                <EnhancedSecurityMonitor />
              </Router>
            </SecurityAuditProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ProductionErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
