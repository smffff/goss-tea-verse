import '@/utils/analytics';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import { WalletProvider } from '@/components/WalletProvider';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import Hero from "./components/Hero";
import Layout from '@/components/Layout';
import UnderConstructionBanner from '@/components/UnderConstructionBanner';

// Core Pages
import Landing from '@/pages/Landing';
import Feed from '@/pages/Feed';
import SpillTea from '@/pages/SpillTea';
import Leaderboard from '@/pages/Leaderboard';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';
import Auth from '@/pages/Auth';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Settings from '@/pages/Settings';
import FallbackLanding from '@/pages/FallbackLanding';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.log('[QueryClient] Query failed:', error, 'Attempts:', failureCount);
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const isInBuildMode = true; // Set to false to hide the banner

const App = () => {
  console.log('[App] Component rendering');
  
  return (
    <>
      {isInBuildMode && <UnderConstructionBanner />}
      <Hero />
      <ErrorBoundary componentName="App">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <WalletProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Core App Routes - all wrapped in Layout */}
                    <Route path="/" element={<Layout><Landing /></Layout>} />
                    <Route path="/feed" element={<Layout><Feed /></Layout>} />
                    <Route path="/spill" element={<Layout><SpillTea /></Layout>} />
                    <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
                    <Route path="/about" element={<Layout><About /></Layout>} />
                    <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                    <Route path="/contact" element={<Layout><Contact /></Layout>} />
                    <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                    <Route path="/terms" element={<Layout><Terms /></Layout>} />
                    <Route path="/auth" element={<Layout><Auth /></Layout>} />
                    <Route path="/settings" element={<Layout><Settings /></Layout>} />

                    {/* Fallback Maintenance Route */}
                    <Route path="/maintenance" element={<FallbackLanding />} />

                    {/* Legacy Redirects - Fixed */}
                    <Route path="/submit" element={<Navigate to="/spill" replace />} />
                    <Route path="/submit-tea" element={<Navigate to="/spill" replace />} />
                    <Route path="/trends" element={<Navigate to="/feed" replace />} />
                    <Route path="/governance" element={<Navigate to="/about" replace />} />
                    <Route path="/token" element={<Navigate to="/about" replace />} />
                    <Route path="/campaigns" element={<Navigate to="/feed" replace />} />
                    <Route path="/features" element={<Navigate to="/about" replace />} />
                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={
                      <ProtectedRoute requireModerator>
                        <AdminLayout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<AdminDashboard />} />
                    </Route>
                    {/* Catch all - redirect to landing */}
                    <Route path="*" element={<Layout><NotFound /></Layout>} />
                  </Routes>
                </BrowserRouter>
              </WalletProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
