
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, BookOpen, Zap, Clock } from 'lucide-react';

interface ContentModeSelectorProps {
  currentMode: 'quick' | 'detailed';
  onModeChange: (mode: 'quick' | 'detailed') => void;
  className?: string;
}

const ContentModeSelector: React.FC<ContentModeSelectorProps> = ({
  currentMode,
  onModeChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm text-gray-400">View Mode:</span>
      
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={currentMode === 'quick' ? 'default' : 'outline'}
          onClick={() => onModeChange('quick')}
          className={`flex items-center gap-2 ${
            currentMode === 'quick'
              ? 'bg-gradient-ctea text-white'
              : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
          }`}
        >
          <Coffee className="w-4 h-4" />
          Just the Tea
          <Badge className="bg-white/20 text-xs">Quick</Badge>
        </Button>
        
        <Button
          size="sm"
          variant={currentMode === 'detailed' ? 'default' : 'outline'}
          onClick={() => onModeChange('detailed')}
          className={`flex items-center gap-2 ${
            currentMode === 'detailed'
              ? 'bg-gradient-ctea text-white'
              : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Spill it All
          <Badge className="bg-white/20 text-xs">Deep</Badge>
        </Button>
      </div>

      {/* Additional quick filters */}
      <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-ctea-teal/20">
        <Button
          size="sm"
          variant="ghost"
          className="text-ctea-yellow hover:bg-ctea-yellow/10"
        >
          <Zap className="w-4 h-4 mr-1" />
          Trending
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-ctea-purple hover:bg-ctea-purple/10"
        >
          <Clock className="w-4 h-4 mr-1" />
          Latest
        </Button>
      </div>
    </div>
  );
};

export default ContentModeSelector;
