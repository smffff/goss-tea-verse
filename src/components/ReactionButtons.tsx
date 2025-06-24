
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame, Snowflake } from 'lucide-react';

interface ReactionButtonsProps {
  reactions: { hot: number; cold: number; spicy: number };
  onReaction: (reactionType: 'hot' | 'cold' | 'spicy') => void;
}

const ReactionButtons = ({ reactions, onReaction }: ReactionButtonsProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onReaction('hot')}
        className="border-ctea-orange/30 text-ctea-orange hover:bg-ctea-orange/10"
      >
        <Flame className="w-4 h-4 mr-1" />
        Hot {reactions.hot || 0}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onReaction('cold')}
        className="border-ctea-cyan/30 text-ctea-cyan hover:bg-ctea-cyan/10"
      >
        <Snowflake className="w-4 h-4 mr-1" />
        Cold {reactions.cold || 0}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onReaction('spicy')}
        className="border-ctea-pink/30 text-ctea-pink hover:bg-ctea-pink/10"
      >
        🌶️ Spicy {reactions.spicy || 0}
      </Button>
    </div>
  );
};

export default ReactionButtons;
