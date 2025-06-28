
import React from 'react';
import { motion } from 'framer-motion';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
}

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#4A1A4A] to-[#050505] animate-gradient">
      {/* Mobile-first responsive container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced mobile navigation hint */}
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="bg-black/50 backdrop-blur-lg border border-[#00FF9D]/30 rounded-full px-4 py-2">
            <p className="text-[#00FF9D] text-sm font-cyber">
              Swipe for the full tea experience ☕
            </p>
          </div>
        </motion.div>

        {/* Main content with mobile optimization */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {children}
        </div>

        {/* Mobile-specific floating action hints */}
        <motion.div
          className="fixed bottom-4 right-4 z-40 md:hidden"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-[#FF1E8B] to-[#00FF9D] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🫖</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileOptimizedLayout;
