
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { StepConfig } from './StepData';

interface StepCardProps {
  step: StepConfig;
  index: number;
  isLast: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, index, isLast }) => {
  return (
    <motion.div
      initial={{ 
        x: step.parallaxOffset, 
        opacity: 0, 
        scale: 0.8,
        rotateY: -15
      }}
      whileInView={{ 
        x: 0, 
        opacity: 1, 
        scale: 1,
        rotateY: 0
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative min-w-72 lg:min-w-0"
    >
      <Card className={`bg-gradient-to-br ${step.bgColor} border-4 border-white/30 hover:border-white/50 transition-all duration-300 h-full relative overflow-hidden`}
            style={{ 
              filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.3))',
              borderRadius: '20px'
            }}>
        
        {/* Comic book dots pattern */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
               backgroundSize: '10px 10px'
             }} />
        
        <CardContent className="p-6 text-center relative z-10">
          {/* Step Number Badge */}
          <motion.div 
            className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto border-4 border-white/50`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            style={{ filter: 'drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3))' }}
          >
            {index + 1}
          </motion.div>
          
          {/* Icon with Glow */}
          <motion.div 
            className="text-white mb-4 flex justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            style={{ 
              filter: `drop-shadow(0 0 15px ${step.color.includes('cyan') ? '#06b6d4' : step.color.includes('purple') ? '#a855f7' : step.color.includes('orange') ? '#f97316' : step.color.includes('green') ? '#10b981' : '#6366f1'})`
            }}
          >
            {step.icon}
          </motion.div>
          
          {/* Title with Comic Font */}
          <h3 className="text-xl font-bold text-white mb-3"
              style={{ 
                fontFamily: "'Anton', 'Impact', sans-serif",
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}>
            {step.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-200 text-sm leading-relaxed">
            {step.description}
          </p>

          {/* Comic-style "POW!" effect on hover */}
          <motion.div
            className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold opacity-0"
            whileHover={{ opacity: 1, scale: 1.1 }}
            style={{ 
              fontFamily: "'Anton', 'Impact', sans-serif",
              transform: 'rotate(15deg)'
            }}
          >
            POW!
          </motion.div>
        </CardContent>
      </Card>
      
      {/* Enhanced Arrow (except for last item) */}
      {!isLast && (
        <motion.div 
          className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight className="w-10 h-10 text-white/80" 
                      style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepCard;
