
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AIRatingBadgesProps {
  spiciness?: number | null;
  chaos?: number | null;
  relevance?: number | null;
  reaction?: string | null;
  className?: string;
  compact?: boolean;
}

const AIRatingBadges: React.FC<AIRatingBadgesProps> = ({
  spiciness,
  chaos,
  relevance,
  reaction,
  className = '',
  compact = false
}) => {
  const getRatingColor = (rating: number | null): string => {
    if (!rating) return 'bg-gray-500/20 text-gray-400';
    if (rating >= 8) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (rating >= 6) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (rating >= 4) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  const formatRating = (rating: number | null): string => {
    return rating ? `${rating}/10` : 'N/A';
  };

  if (compact) {
    return (
      <div className={`flex gap-1 ${className}`}>
        {spiciness && (
          <Badge className={`text-xs ${getRatingColor(spiciness)}`}>
            🔥 {spiciness}
          </Badge>
        )}
        {chaos && (
          <Badge className={`text-xs ${getRatingColor(chaos)}`}>
            😵‍💫 {chaos}
          </Badge>
        )}
        {relevance && (
          <Badge className={`text-xs ${getRatingColor(relevance)}`}>
            🎯 {relevance}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {reaction && (
        <div className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            <span className="text-xs text-gray-400">CTeaBot Analysis</span>
          </div>
          <p className="text-white text-sm italic">"{reaction}"</p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        <Badge className={`${getRatingColor(spiciness)} border`}>
          <span className="mr-1">🔥</span>
          Spiciness: {formatRating(spiciness)}
        </Badge>
        
        <Badge className={`${getRatingColor(chaos)} border`}>
          <span className="mr-1">😵‍💫</span>
          Chaos: {formatRating(chaos)}
        </Badge>
        
        <Badge className={`${getRatingColor(relevance)} border`}>
          <span className="mr-1">🎯</span>
          Relevance: {formatRating(relevance)}
        </Badge>
      </div>
    </div>
  );
};

export default AIRatingBadges;
