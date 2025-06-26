
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelArtBadgeProps {
  type: 'achievement' | 'rank' | 'streak' | 'special';
  title: string;
  value?: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PixelArtBadge: React.FC<PixelArtBadgeProps> = ({
  type,
  title,
  value,
  icon,
  rarity,
  className = '',
  size = 'md'
}) => {
  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-600'
  };

  const sizeClasses = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-20 h-20 text-sm',
    lg: 'w-24 h-24 text-base'
  };

  return (
    <motion.div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-lg border-2',
        `bg-gradient-to-br ${rarityColors[rarity]}`,
        sizeClasses[size],
        'shadow-lg hover:shadow-xl transition-all duration-300',
        'border-white/20 backdrop-blur-sm',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pixel effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="text-2xl mb-1">{icon}</div>
        {value && (
          <div className="font-bold text-white">{value}</div>
        )}
        <div className="text-white/80 font-medium leading-tight">
          {title}
        </div>
      </div>

      {/* Rarity glow effect */}
      <div className={cn(
        'absolute inset-0 rounded-lg blur-sm opacity-50',
        `bg-gradient-to-br ${rarityColors[rarity]}`
      )} />
    </motion.div>
  );
};

// Simple collection component for displaying multiple badges
const PixelArtBadgeCollection: React.FC = () => {
  const badges = [
    { type: 'achievement' as const, title: 'Tea Master', value: '100', icon: '🫖', rarity: 'legendary' as const },
    { type: 'rank' as const, title: 'Gossip King', value: '#1', icon: '👑', rarity: 'epic' as const },
    { type: 'streak' as const, title: 'Hot Streak', value: '7', icon: '🔥', rarity: 'rare' as const },
    { type: 'special' as const, title: 'Early Bird', value: '', icon: '🐦', rarity: 'common' as const }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PixelArtBadge {...badge} />
        </motion.div>
      ))}
    </div>
  );
};

export default PixelArtBadge;
export { PixelArtBadgeCollection };
