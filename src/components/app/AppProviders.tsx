import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import ProductionErrorBoundary from '@/components/error/ProductionErrorBoundary';
import { SecurityAuditProvider } from '@/components/security/SecurityAuditProvider';

// Create query client with production settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if ((error as any)?.status >= 400 && (error as any)?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

interface ProviderProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<ProviderProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <ProductionErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="ctea-theme"
          >
            <SecurityAuditProvider>
              <Router>
                {children}
              </Router>
            </SecurityAuditProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ProductionErrorBoundary>
    </HelmetProvider>
  );
};

export default AppProviders;
