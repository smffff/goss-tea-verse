import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Flame, Laugh, Zap } from 'lucide-react';

interface AICommentarySelectorProps {
  onSelectType: (type: 'spicy' | 'smart' | 'memy' | 'wise') => void;
  isGenerating: boolean;
}

const AICommentarySelector = ({ onSelectType, isGenerating }: AICommentarySelectorProps) => {
  const commentaryTypes = [
    {
      type: 'spicy' as const,
      icon: <Flame className="w-4 h-4" />,
      label: 'Spicy',
      description: 'Hot takes that burn',
      gradient: 'from-ctea-orange to-ctea-pink'
    },
    {
      type: 'smart' as const,
      icon: <Brain className="w-4 h-4" />,
      label: 'Smart',
      description: 'Big brain analysis',
      gradient: 'from-ctea-purple to-ctea-teal'
    },
    {
      type: 'memy' as const,
      icon: <Laugh className="w-4 h-4" />,
      label: 'Memy',
      description: 'Pure chaos energy',
      gradient: 'from-ctea-teal to-ctea-yellow'
    },
    {
      type: 'wise' as const,
      icon: <Zap className="w-4 h-4" />,
      label: 'Wise',
      description: 'Cutting insights',
      gradient: 'from-ctea-pink to-ctea-purple'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {commentaryTypes.map(({ type, icon, label, description, gradient }) => (
        <Button
          key={type}
          variant="outline"
          size="sm"
          onClick={() => onSelectType(type)}
          disabled={isGenerating}
          className={`border-ctea-teal/30 text-white hover:bg-gradient-to-r hover:${gradient} hover:text-white transition-all duration-200 flex flex-col items-center gap-1 h-auto py-3`}
        >
          {icon}
          <span className="font-bold text-xs">{label}</span>
          <span className="text-xs opacity-75">{description}</span>
        </Button>
      ))}
    </div>
  );
};

export default AICommentarySelector;
