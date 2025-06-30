import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
}

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-background">
      {/* Mobile-specific optimizations */}
      <div className="block md:hidden">
        {/* Mobile header adjustments - using Tailwind classes instead of inline styles */}
        <style>{`
          @media (max-width: 768px) {
            .mobile-header {
              padding: 0.75rem 1rem;
            }
            .mobile-hero {
              padding: 2rem 1rem;
              min-height: 100vh;
            }
            .mobile-buttons {
              flex-direction: column;
              gap: 1rem;
              width: 100%;
            }
            .mobile-button {
              width: 100%;
              padding: 1rem;
              font-size: 1.125rem;
            }
            .mobile-text {
              font-size: 1.25rem;
              line-height: 1.4;
            }
            .mobile-title {
              font-size: 2.5rem;
              line-height: 1.2;
            }
            .mobile-subtitle {
              font-size: 1.5rem;
              line-height: 1.3;
            }
          }
        `}</style>
      </div>

      {/* Mobile navigation overlay */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-background/95 backdrop-blur-lg border-t border-brand-primary/20 p-4 md:hidden z-50">
        <div className="flex justify-around items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-brand-text hover:bg-brand-primary/10 flex flex-col items-center"
          >
            <span className="text-xs">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-brand-text hover:bg-brand-primary/10 flex flex-col items-center"
          >
            <span className="text-xs">📰</span>
            <span className="text-xs mt-1">Feed</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-brand-text hover:bg-brand-primary/10 flex flex-col items-center"
          >
            <span className="text-xs">💬</span>
            <span className="text-xs mt-1">Spill</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-brand-text hover:bg-brand-primary/10 flex flex-col items-center"
          >
            <span className="text-xs">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>

      {/* Main content with mobile padding */}
      <div className="pb-20 md:pb-0">
        {children}
      </div>

      {/* Mobile-specific CTA floating button */}
      <motion.div
        className="fixed bottom-20 right-4 md:hidden z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          size="lg"
          className="bg-brand-primary hover:bg-brand-primary/90 text-brand-background font-bold rounded-full w-14 h-14 p-0 shadow-lg"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default MobileOptimizedLayout;
