
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

const App = () => {
  console.log('[App] Component rendering');
  
  return (
    <ErrorBoundary componentName="App">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <WalletProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Core App Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/spill" element={<SpillTea />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/settings" element={<Settings />} />

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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </WalletProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
