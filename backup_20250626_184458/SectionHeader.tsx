
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-6"
          style={{ 
            fontFamily: "'Anton', 'Impact', sans-serif",
            textShadow: '0 0 20px rgba(255, 75, 179, 0.5)'
          }}>
        How It Works
      </h2>
      <p className="text-xl text-white/80 max-w-3xl mx-auto">
        From anonymous spill to viral chaos in 5 simple steps
      </p>
    </motion.div>
  );
};

export default SectionHeader;
