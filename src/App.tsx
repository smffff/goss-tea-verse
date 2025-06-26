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
import Landing from "./pages/Landing";
import SpillTea from "./pages/SpillTea";
import About from "./pages/About";
import Tokenomics from "./pages/Tokenomics";
import Roadmap from "./pages/Roadmap";
import Team from "./pages/Team";
import FAQ from "./pages/FAQ";
import MemeOps from "./pages/MemeOps";

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
                    <Route path="/" element={<Landing />} />
                    <Route path="/spill" element={<SpillTea />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/tokenomics" element={<Tokenomics />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/memeops" element={<MemeOps />} />
                    {/* Existing routes */}
                    <Route path="*" element={<Landing />} />
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
