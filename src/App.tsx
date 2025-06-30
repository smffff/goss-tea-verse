import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { secureLog } from '@/utils/secureLogging';
import Layout from '@/components/Layout';
import AppErrorBoundary from '@/components/error/UnifiedErrorBoundary';
import ErrorRedirectHandler from '@/components/error/ProductionErrorBoundary';
import AppInitializer from '@/components/AppInitializer';
import './index.css';

// Lazy load pages for better performance
const Landing = React.lazy(() => import('@/pages/Landing'));
const Home = React.lazy(() => import('@/pages/Home'));
const Feed = React.lazy(() => import('@/pages/Feed'));
const SpillTea = React.lazy(() => import('@/pages/SpillTea'));
const Submit = React.lazy(() => import('@/pages/Submit'));
const Auth = React.lazy(() => import('@/pages/Auth'));
const Admin = React.lazy(() => import('@/pages/Admin'));
const About = React.lazy(() => import('@/pages/About'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const Team = React.lazy(() => import('@/pages/Team'));
const FAQ = React.lazy(() => import('@/pages/FAQ'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Privacy = React.lazy(() => import('@/pages/Privacy'));
const Terms = React.lazy(() => import('@/pages/Terms'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Leaderboard = React.lazy(() => import('@/pages/Leaderboard'));
const Tokenomics = React.lazy(() => import('@/pages/Tokenomics'));
const Roadmap = React.lazy(() => import('@/pages/Roadmap'));
const GovernancePage = React.lazy(() => import('@/pages/GovernancePage'));
const Campaigns = React.lazy(() => import('@/pages/Campaigns'));
const Features = React.lazy(() => import('@/pages/Features'));
const Trends = React.lazy(() => import('@/pages/Trends'));
const VIP = React.lazy(() => import('@/pages/VIP'));
const MemeOps = React.lazy(() => import('@/pages/MemeOps'));
const TokenPage = React.lazy(() => import('@/pages/TokenPage'));
const Investors = React.lazy(() => import('@/pages/Investors'));

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

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup function
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
                  {/* Main Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/spill" element={<SpillTea />} />
                  <Route path="/submit" element={<Submit />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* Content Pages */}
                  <Route path="/team" element={<Team />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/tokenomics" element={<Tokenomics />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/governance" element={<GovernancePage />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/trends" element={<Trends />} />
                  <Route path="/vip" element={<VIP />} />
                  <Route path="/memeops" element={<MemeOps />} />
                  <Route path="/token" element={<TokenPage />} />
                  <Route path="/investors" element={<Investors />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
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
