
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
import { useEffect, useState } from "react";
import BetaGate from "@/components/BetaGate";

// Pages
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import SpillTea from "./pages/SpillTea";
import About from "./pages/About";
import Tokenomics from "./pages/Tokenomics";
import Roadmap from "./pages/Roadmap";
import Team from "./pages/Team";
import FAQ from "./pages/FAQ";
import MemeOps from "./pages/MemeOps";

const queryClient = new QueryClient();

function App() {
  const [hasBetaAccess, setHasBetaAccess] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    // Setup global error handling
    setupGlobalErrorHandler();
    
    // Check for existing beta access
    const betaAccess = localStorage.getItem('ctea-beta-access');
    setHasBetaAccess(!!betaAccess);
    setIsCheckingAccess(false);
  }, []);

  const handleAccessGranted = () => {
    setHasBetaAccess(true);
  };

  if (isCheckingAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-500 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!hasBetaAccess) {
    return (
      <EnhancedErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BetaGate onAccessGranted={handleAccessGranted} />
          </TooltipProvider>
        </QueryClientProvider>
      </EnhancedErrorBoundary>
    );
  }

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
                    <Route path="/feed" element={<Feed />} />
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
