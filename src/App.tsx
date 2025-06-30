
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
const AuthCallback = lazy(() => import("./pages/AuthCallback"));

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
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  {/* Add other routes as needed */}
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
