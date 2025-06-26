
import React from 'react';
import { motion } from 'framer-motion';
import SpillingTeaCup from '@/components/ui/SpillingTeaCup';

const SuccessScreen: React.FC = () => {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8 space-y-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <SpillingTeaCup size="lg" className="mx-auto" animated isSpilling />
      </motion.div>
      
      <h3 className="text-3xl font-bold text-white">
        Welcome to CTea Newsroom! 🫖
      </h3>
      
      <p className="text-white/80">
        Redirecting you to the hottest tea in crypto...
      </p>
      
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </motion.div>
  );
};

export default SuccessScreen;
