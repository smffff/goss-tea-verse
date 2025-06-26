
import React from 'react';
import { motion } from 'framer-motion';
import BrandedNavigation from '@/components/BrandedNavigation';
import EnhancedFooter from '@/components/ui/EnhancedFooter';
import FloatingSpillCTA from '@/components/ui/FloatingSpillCTA';

interface EnhancedLandingLayoutProps {
  children: React.ReactNode;
  showFloatingCTA?: boolean;
}

const EnhancedLandingLayout: React.FC<EnhancedLandingLayoutProps> = ({ 
  children, 
  showFloatingCTA = true 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      <BrandedNavigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {children}
      </motion.main>

      <EnhancedFooter />
      
      {showFloatingCTA && <FloatingSpillCTA />}
    </div>
  );
};

export default EnhancedLandingLayout;
