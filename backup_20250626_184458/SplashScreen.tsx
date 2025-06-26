
import React from 'react';
import { motion } from 'framer-motion';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface SplashScreenProps {
  message?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  message = "Brewing your tea..." 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            rotateX: [0, 15, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto"
        >
          <BrandedTeacupIcon size="xl" variant="steaming" animated />
        </motion.div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">CTea Newsroom</h1>
          <p className="text-ctea-teal text-lg">{message}</p>
        </div>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center space-x-1"
        >
          <div className="w-2 h-2 bg-ctea-teal rounded-full"></div>
          <div className="w-2 h-2 bg-ctea-teal rounded-full animate-pulse delay-300"></div>
          <div className="w-2 h-2 bg-ctea-teal rounded-full animate-pulse delay-700"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
