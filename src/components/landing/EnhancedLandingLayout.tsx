
import React from 'react';
import { motion } from 'framer-motion';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';
import MobileBottomNavigation from '@/components/navigation/MobileBottomNavigation';

interface EnhancedLandingLayoutProps {
  children: React.ReactNode;
}

const EnhancedLandingLayout: React.FC<EnhancedLandingLayoutProps> = ({ children }) => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <UnifiedNavigation />
      
      <main className="relative overflow-x-hidden">
        {children}
      </main>
      
      <MobileBottomNavigation />
    </motion.div>
  );
};

export default EnhancedLandingLayout;
