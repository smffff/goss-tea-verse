
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Users, Zap } from 'lucide-react';

const LaunchReadyBanner: React.FC = () => {
  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500/90 to-cyan-500/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-green-400/30"
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-6 h-6 text-white" />
        </motion.div>
        
        <div>
          <p className="text-white font-bold text-sm">Beta 1.2 LIVE!</p>
          <div className="flex items-center gap-2 text-xs text-green-100">
            <Shield className="w-3 h-3" />
            <span>Secured</span>
            <Users className="w-3 h-3" />
            <span>Gated</span>
            <Zap className="w-3 h-3" />
            <span>Ready</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LaunchReadyBanner;
