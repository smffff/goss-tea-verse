
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Sparkles, Zap, Heart, TrendingUp } from 'lucide-react';

interface ViralCTAProps {
  variant?: 'spill' | 'connect' | 'join' | 'trending';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  showParticles?: boolean;
  shakeOnHover?: boolean;
  disabled?: boolean;
}

const ViralCTA: React.FC<ViralCTAProps> = ({
  variant = 'spill',
  size = 'md',
  onClick,
  className = '',
  children,
  showParticles = true,
  shakeOnHover = true,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const variants = {
    spill: {
      bg: 'bg-gradient-to-r from-pink-500 to-purple-600',
      hover: 'hover:from-pink-600 hover:to-purple-700',
      shadow: 'shadow-pink-400/30',
      icon: Sparkles
    },
    connect: {
      bg: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      hover: 'hover:from-cyan-600 hover:to-blue-700',
      shadow: 'shadow-cyan-400/30',
      icon: Zap
    },
    join: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
      hover: 'hover:from-green-600 hover:to-emerald-700',
      shadow: 'shadow-green-400/30',
      icon: Heart
    },
    trending: {
      bg: 'bg-gradient-to-r from-orange-500 to-red-600',
      hover: 'hover:from-orange-600 hover:to-red-700',
      shadow: 'shadow-orange-400/30',
      icon: TrendingUp
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const currentVariant = variants[variant];
  const IconComponent = currentVariant.icon;

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    if (showParticles) {
      generateParticles();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParticles([]);
  };

  const generateParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    }));
    setParticles(newParticles);
  };

  return (
    <div className="relative inline-block">
      <motion.div
        className={`relative overflow-hidden rounded-xl ${currentVariant.bg} ${!disabled ? currentVariant.hover : ''} ${currentVariant.shadow} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={!disabled ? { 
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onHoverStart={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        animate={shakeOnHover && isHovered && !disabled ? {
          x: [-2, 2, -2, 2, 0],
          transition: { duration: 0.3 }
        } : {}}
      >
        <Button
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          className={`relative z-10 w-full h-full ${currentVariant.bg} ${!disabled ? currentVariant.hover : ''} border-0 text-white font-bold tracking-wider shadow-lg transition-all duration-300`}
          variant="ghost"
        >
          <IconComponent className="w-5 h-5 mr-2 animate-pulse" />
          {children}
        </Button>

        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          animate={{
            x: isHovered && !disabled ? ['0%', '100%'] : '0%'
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Particles */}
        <AnimatePresence>
          {showParticles && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 0
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isHovered && !disabled
              ? '0 0 30px rgba(255,255,255,0.3)' 
              : '0 0 0px rgba(255,255,255,0)'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default ViralCTA;
