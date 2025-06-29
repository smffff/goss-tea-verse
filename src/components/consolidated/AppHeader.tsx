import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const AppHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 mx-auto mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-ctea-dark rounded-full flex items-center justify-center">
          <img src="/ctea-logo-icon.png" alt="CTEA Logo" className="w-12 h-12 object-contain" />
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-gothic bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent mb-2">
        CTea Newsroom
      </h1>
      <p className="text-gray-300 text-lg">Where Gossip Meets Intelligence</p>
    </motion.div>
  );
};

export default AppHeader;
