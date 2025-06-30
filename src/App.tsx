
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UnifiedAuthProvider } from "@/hooks/useUnifiedAuth";
import { WalletProvider } from "@/components/WalletProvider";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";

// Lazy load components
const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/Home"));
const SimpleAuth = lazy(() => import("./pages/SimpleAuth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <UnifiedAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ErrorBoundaryWrapper componentName="App">
              <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-brand-background via-brand-neutral to-brand-darker flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/auth" element={<SimpleAuth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundaryWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </UnifiedAuthProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
