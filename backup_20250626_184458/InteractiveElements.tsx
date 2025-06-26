
import React from 'react';
import { motion } from 'framer-motion';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const InteractiveElements: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      viewport={{ once: true }}
      className="text-center mt-16"
    >
      <div className="flex justify-center items-center gap-4 text-white/70">
        <BrandedTeacupIcon size="md" animated className="animate-bounce" />
        <span className="text-lg font-bold" style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
          Ready to cause some chaos?
        </span>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <BrandedTeacupIcon size="md" animated className="animate-bounce" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InteractiveElements;
