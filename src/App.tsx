
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { WalletProvider } from "@/components/WalletProvider";
import { SecurityProvider } from "@/components/SecurityProvider";
import { EnhancedErrorBoundary } from "@/components/EnhancedErrorBoundary";
import { setupGlobalErrorHandler } from "@/utils/errorHandler";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import SpillTea from "./pages/SpillTea";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Setup global error handling
    setupGlobalErrorHandler();
  }, []);

  return (
    <EnhancedErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SecurityProvider>
          <AuthProvider>
            <WalletProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/spill" element={<SpillTea />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </WalletProvider>
          </AuthProvider>
        </SecurityProvider>
      </QueryClientProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;
