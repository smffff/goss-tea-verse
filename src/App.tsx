
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import { WalletProvider } from '@/components/WalletProvider';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import ErrorBoundary from '@/components/ErrorBoundary';

import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import SubmitTea from "./pages/SubmitTea";
import GovernancePage from "./pages/GovernancePage";
import TokenPage from "./pages/TokenPage";
import Trends from "./pages/Trends";
import Campaigns from "./pages/Campaigns";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";

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
          <ErrorBoundary componentName="AuthProvider">
            <AuthProvider>
              <ErrorBoundary componentName="WalletProvider">
                <WalletProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <ErrorBoundary componentName="Router">
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={
                          <ErrorBoundary componentName="Landing">
                            <Landing />
                          </ErrorBoundary>
                        } />
                        <Route path="/feed" element={
                          <ErrorBoundary componentName="Feed">
                            <Feed />
                          </ErrorBoundary>
                        } />
                        <Route path="/submit" element={
                          <ErrorBoundary componentName="SubmitTea">
                            <SubmitTea />
                          </ErrorBoundary>
                        } />
                        <Route path="/governance" element={
                          <ErrorBoundary componentName="GovernancePage">
                            <GovernancePage />
                          </ErrorBoundary>
                        } />
                        <Route path="/token" element={
                          <ErrorBoundary componentName="TokenPage">
                            <TokenPage />
                          </ErrorBoundary>
                        } />
                        <Route path="/trends" element={
                          <ErrorBoundary componentName="Trends">
                            <Trends />
                          </ErrorBoundary>
                        } />
                        <Route path="/campaigns" element={
                          <ErrorBoundary componentName="Campaigns">
                            <Campaigns />
                          </ErrorBoundary>
                        } />
                        <Route path="/features" element={
                          <ErrorBoundary componentName="Features">
                            <Features />
                          </ErrorBoundary>
                        } />
                        <Route path="/about" element={
                          <ErrorBoundary componentName="About">
                            <About />
                          </ErrorBoundary>
                        } />
                        <Route path="/contact" element={
                          <ErrorBoundary componentName="Contact">
                            <Contact />
                          </ErrorBoundary>
                        } />
                        <Route path="/privacy" element={
                          <ErrorBoundary componentName="Privacy">
                            <Privacy />
                          </ErrorBoundary>
                        } />
                        <Route path="/terms" element={
                          <ErrorBoundary componentName="Terms">
                            <Terms />
                          </ErrorBoundary>
                        } />
                        <Route path="/auth" element={
                          <ErrorBoundary componentName="Auth">
                            <Auth />
                          </ErrorBoundary>
                        } />
                        
                        {/* Protected Admin Routes */}
                        <Route path="/admin" element={
                          <ErrorBoundary componentName="AdminRoute">
                            <ProtectedRoute requireModerator>
                              <AdminLayout />
                            </ProtectedRoute>
                          </ErrorBoundary>
                        }>
                          <Route index element={
                            <ErrorBoundary componentName="AdminDashboard">
                              <AdminDashboard />
                            </ErrorBoundary>
                          } />
                        </Route>
                        
                        <Route path="*" element={
                          <ErrorBoundary componentName="NotFound">
                            <NotFound />
                          </ErrorBoundary>
                        } />
                      </Routes>
                    </ErrorBoundary>
                  </BrowserRouter>
                </WalletProvider>
              </ErrorBoundary>
            </AuthProvider>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
