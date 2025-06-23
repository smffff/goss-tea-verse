
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Star, Flame, Shield } from 'lucide-react';

interface OGBadgeProps {
  type: 'og' | 'meme-lord' | 'drama-king' | 'viral-queen' | 'chaos-agent' | 'mod';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const OGBadge: React.FC<OGBadgeProps> = ({ 
  type, 
  size = 'md', 
  showLabel = true, 
  animated = false 
}) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'og':
        return {
          icon: <Crown className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />,
          label: 'OG',
          className: 'bg-gradient-to-r from-ctea-yellow to-ctea-orange text-ctea-dark font-bold',
          description: 'Original Gangster - Early Adopter'
        };
      case 'meme-lord':
        return {
          icon: <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />,
          label: 'MEME LORD',
          className: 'bg-gradient-to-r from-ctea-purple to-ctea-pink text-white font-bold',
          description: 'Master of Memes and Viral Content'
        };
      case 'drama-king':
        return {
          icon: <Flame className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />,
          label: 'DRAMA KING',
          className: 'bg-gradient-to-r from-ctea-pink to-ctea-orange text-white font-bold',
          description: 'Bringer of Chaos and Hot Takes'
        };
      case 'viral-queen':
        return {
          icon: <Star className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />,
          label: 'VIRAL QUEEN',
          className: 'bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold',
          description: 'Content That Breaks the Internet'
        };
      case 'chaos-agent':
        return {
          icon: <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />,
          label: 'CHAOS AGENT',
          className: 'bg-gradient-to-r from-ctea-orange to-ctea-pink text-white font-bold',
          description: 'Pure Unfiltered Chaos Energy'
        };
      case 'mod':
        return {
          icon: <Shield className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />,
          label: 'MOD',
          className: 'bg-gradient-to-r from-ctea-teal to-ctea-yellow text-ctea-dark font-bold',
          description: 'Community Moderator'
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <Badge 
      className={`${config.className} ${animated ? 'animate-pulse-slow' : ''} ${size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-base px-4 py-2' : 'text-sm px-3 py-1'}`}
      title={config.description}
    >
      <span className="flex items-center gap-1">
        {config.icon}
        {showLabel && config.label}
      </span>
    </Badge>
  );
};

export default OGBadge;
