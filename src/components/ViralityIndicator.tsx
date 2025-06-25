
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Flame, Zap, Crown } from 'lucide-react';

interface ViralityIndicatorProps {
  memeability: number;
  viralPotential: number;
  engagementRate: number;
  isTrending?: boolean;
  isBoosted?: boolean;
  className?: string;
}

const ViralityIndicator: React.FC<ViralityIndicatorProps> = ({
  memeability,
  viralPotential,
  engagementRate,
  isTrending = false,
  isBoosted = false,
  className = ''
}) => {
  const getViralityLevel = () => {
    const avgScore = (memeability + viralPotential + engagementRate) / 3;
    if (avgScore >= 80) return { level: 'Viral', color: 'bg-ctea-pink', icon: Flame };
    if (avgScore >= 60) return { level: 'Hot', color: 'bg-ctea-orange', icon: TrendingUp };
    if (avgScore >= 40) return { level: 'Rising', color: 'bg-ctea-yellow', icon: Zap };
    return { level: 'Fresh', color: 'bg-ctea-teal', icon: TrendingUp };
  };

  const virality = getViralityLevel();
  const ViralIcon = virality.icon;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Virality Badge */}
      <Badge className={`${virality.color} text-white border-0 shadow-lg`}>
        <ViralIcon className="w-3 h-3 mr-1" />
        {virality.level}
      </Badge>

      {/* Additional Indicators */}
      {isTrending && (
        <Badge className="bg-gradient-to-r from-ctea-purple to-ctea-pink text-white border-0">
          📈 Trending
        </Badge>
      )}

      {isBoosted && (
        <Badge className="bg-gradient-to-r from-ctea-yellow to-ctea-orange text-black border-0">
          <Crown className="w-3 h-3 mr-1" />
          Boosted
        </Badge>
      )}

      {/* Meme Score */}
      {memeability > 70 && (
        <Badge className="bg-ctea-purple/20 text-ctea-purple border border-ctea-purple/30">
          🎭 Meme-worthy
        </Badge>
      )}
    </div>
  );
};

export default ViralityIndicator;
