import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PixelArtBadgeProps {
  type: 'achievement' | 'stat' | 'level' | 'powerup';
  title: string;
  value?: string | number;
  icon?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  className?: string;
  onClick?: () => void;
}

const PixelArtBadge: React.FC<PixelArtBadgeProps> = ({
  type,
  title,
  value,
  icon = '🏆',
  rarity = 'common',
  className = '',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const rarityColors = {
    common: 'border-gray-400 bg-gray-800',
    rare: 'border-blue-400 bg-blue-900',
    epic: 'border-purple-400 bg-purple-900',
    legendary: 'border-yellow-400 bg-yellow-900'
  };

  const rarityGlow = {
    common: 'shadow-gray-400/20',
    rare: 'shadow-blue-400/40',
    epic: 'shadow-purple-400/60',
    legendary: 'shadow-yellow-400/80'
  };

  const typeStyles = {
    achievement: 'bg-gradient-to-br from-green-800 to-green-600',
    stat: 'bg-gradient-to-br from-blue-800 to-blue-600',
    level: 'bg-gradient-to-br from-purple-800 to-purple-600',
    powerup: 'bg-gradient-to-br from-red-800 to-red-600'
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pixel Art Border */}
      <div className={`relative p-1 ${rarityColors[rarity]} ${rarityGlow[rarity]} shadow-lg`}>
        <div className={`w-16 h-16 ${typeStyles[type]} border-2 border-white relative overflow-hidden`}>
          {/* Pixel Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '4px 4px'
            }} />
          </div>

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            {icon}
          </div>

          {/* Rarity Indicator */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-white border border-black" />
        </div>

        {/* Title */}
        <div className="mt-2 text-center">
          <div className="text-white text-xs font-bold uppercase tracking-wider pixel-font">
            {title}
          </div>
          {value && (
            <div className="text-green-400 text-xs font-mono">
              {value}
            </div>
          )}
        </div>

        {/* Hover Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded border border-black font-bold"
            >
              {rarity.toUpperCase()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pixel Art Corner Decorations */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white border border-black" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-white border border-black" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-white border border-black" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white border border-black" />
      </div>

      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-lg ${rarityGlow[rarity]} blur-md`}
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

// Collection of badges for different achievements
export const AchievementBadges = () => {
  const achievements = [
    { type: 'achievement' as const, title: 'FIRST SPILL', value: '1', icon: '🫖', rarity: 'common' as const },
    { type: 'stat' as const, title: 'GOSSIP MASTER', value: '100+', icon: '👑', rarity: 'rare' as const },
    { type: 'level' as const, title: 'LEVEL 10', value: '10', icon: '⭐', rarity: 'epic' as const },
    { type: 'powerup' as const, title: 'AI FAVORITE', value: '50+', icon: '🤖', rarity: 'legendary' as const },
    { type: 'achievement' as const, title: 'ANONYMOUS', value: '25', icon: '🕵️', rarity: 'rare' as const },
    { type: 'stat' as const, title: 'TRENDING', value: '5x', icon: '🔥', rarity: 'epic' as const }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {achievements.map((achievement, index) => (
        <PixelArtBadge
          key={index}
          {...achievement}
          className="animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};

export default PixelArtBadge; 