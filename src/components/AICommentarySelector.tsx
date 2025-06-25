
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AICommentarySelectorProps {
  onSelectType: (type: 'spicy' | 'smart' | 'memy' | 'savage') => void;
  isGenerating: boolean;
}

const AICommentarySelector: React.FC<AICommentarySelectorProps> = ({
  onSelectType,
  isGenerating
}) => {
  const commentaryTypes = [
    {
      type: 'spicy' as const,
      label: '🌶️ Spicy Take',
      description: 'Hot and controversial',
      color: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    {
      type: 'smart' as const,
      label: '🧠 Smart Analysis',
      description: 'Deep and analytical',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      type: 'memy' as const,
      label: '😂 Meme Mode',
      description: 'Funny and viral',
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    },
    {
      type: 'savage' as const,
      label: '🔥 Savage Roast',
      description: 'Brutal but fair',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {commentaryTypes.map((commentary) => (
        <Button
          key={commentary.type}
          onClick={() => onSelectType(commentary.type)}
          disabled={isGenerating}
          variant="outline"
          className={`h-auto p-4 flex flex-col items-start gap-2 ${commentary.color} hover:opacity-80`}
        >
          <div className="font-bold text-sm">{commentary.label}</div>
          <div className="text-xs opacity-70">{commentary.description}</div>
        </Button>
      ))}
    </div>
  );
};

export default AICommentarySelector;
