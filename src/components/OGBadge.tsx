import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Star, Flame, Shield } from 'lucide-react';
import { useCrossChain } from '@/contexts/CrossChainContext';

interface OGBadgeProps {
  type?: 'og' | 'meme-lord' | 'drama-king' | 'viral-queen' | 'chaos-agent' | 'mod';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  forceType?: boolean; // Override cross-chain detection
}

const OGBadge: React.FC<OGBadgeProps> = ({ 
  type: propType, 
  size = 'md', 
  showLabel = true, 
  animated = false,
  forceType = false
}) => {
  const { crossChainUser } = useCrossChain();
  
  // Determine badge type based on OG status or prop
  const getBadgeType = () => {
    if (forceType && propType) return propType;
    
    if (crossChainUser?.ogStatus.isOG) {
      // Map OG tiers to badge types
      switch (crossChainUser.ogStatus.tier) {
        case 'legend': return 'og';
        case 'connoisseur': return 'viral-queen';
        case 'sipper': return 'meme-lord';
        default: return propType || 'og';
      }
    }
    
    return propType || 'og';
  };

  const type = getBadgeType();

  const getBadgeConfig = () => {
    switch (type) {
      case 'og': {
        const ogTier = crossChainUser?.ogStatus.tier || 'sipper';
        const ogBalance = crossChainUser?.ogStatus.balance || 0;
        
        return {
          icon: <Crown className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />,
          label: ogTier === 'legend' ? 'OG LEGEND' : ogTier === 'connoisseur' ? 'OG CONNOISSEUR' : 'OG SIPPER',
          className: ogTier === 'legend' 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold' 
            : ogTier === 'connoisseur'
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold'
            : 'bg-gradient-to-r from-blue-400 to-teal-400 text-white font-bold',
          description: `OG ${ogTier} - ${ogBalance.toLocaleString()} $TEA on Avalanche`
        };
      }
      
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
