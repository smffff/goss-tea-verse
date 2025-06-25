import React, { useState } from 'react';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import UnifiedFooter from '@/components/UnifiedFooter';
import FeedbackWidget from '@/components/FeedbackWidget';
import ErrorBoundary from '@/components/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  showFeedback?: boolean;
  submissionId?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className = '',
  showNavigation = true,
  showFooter = true,
  showFeedback = false,
  submissionId = 'default'
}) => {
  // Build mode banner logic
  const [showBanner, setShowBanner] = useState(true);
  const buildMode = import.meta.env.VITE_BUILD_MODE === 'true';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-hero">
        {/* Build Mode Banner */}
        {buildMode && showBanner && (
          <div className="w-full z-[100] sticky top-0 left-0 flex items-center justify-between px-4 py-3 text-white font-bold text-sm md:text-base shadow-lg bg-gradient-to-r from-[#ff61a6] via-[#00d1c1] to-[#ffe478] animate-pulse border-b-4 border-[#ffe478]">
            <span className="flex items-center gap-2">
              <span role="img" aria-label="construction">🚧</span>
              This app is LIVE but still under construction. Expect bugs, leaks, and brilliance in motion. <span role="img" aria-label="nail-polish">💅</span>
            </span>
            <button
              onClick={() => setShowBanner(false)}
              className="ml-4 px-2 py-1 rounded bg-white/20 hover:bg-white/40 text-white transition-colors"
              aria-label="Dismiss build mode banner"
            >
              ✕
            </button>
          </div>
        )}
        {showNavigation && <UnifiedNavigation />}
        <main className={`container mx-auto px-4 py-8 ${className}`}>
          {children}
        </main>
        {showFooter && <UnifiedFooter />}
        {showFeedback && <FeedbackWidget submissionId={submissionId} />}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
