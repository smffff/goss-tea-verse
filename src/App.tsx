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
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import SpillTea from "./pages/SpillTea";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound404 from "./pages/404";
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
                        {/* Core App Routes */}
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
                        
                        <Route path="/spill" element={
                          <ErrorBoundary componentName="SpillTea">
                            <SpillTea />
                          </ErrorBoundary>
                        } />
                        
                        <Route path="/leaderboard" element={
                          <ErrorBoundary componentName="Leaderboard">
                            <Leaderboard />
                          </ErrorBoundary>
                        } />
                        
                        <Route path="/about" element={
                          <ErrorBoundary componentName="About">
                            <About />
                          </ErrorBoundary>
                        } />
                        
                        <Route path="/faq" element={
                          <ErrorBoundary componentName="FAQ">
                            <FAQ />
                          </ErrorBoundary>
                        } />

                        {/* Legal Pages */}
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
                        
                        <Route path="/contact" element={
                          <ErrorBoundary componentName="Contact">
                            <Contact />
                          </ErrorBoundary>
                        } />

                        {/* Legacy Redirects */}
                        <Route path="/submit" element={<Navigate to="/spill" replace />} />
                        <Route path="/trends" element={<Navigate to="/feed" replace />} />
                        <Route path="/governance" element={<Navigate to="/about" replace />} />
                        <Route path="/token" element={<Navigate to="/about" replace />} />
                        <Route path="/campaigns" element={<Navigate to="/feed" replace />} />
                        <Route path="/features" element={<Navigate to="/about" replace />} />

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
                            <NotFound404 />
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
