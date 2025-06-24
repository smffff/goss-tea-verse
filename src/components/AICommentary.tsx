
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Zap, RefreshCw, Brain, Laugh, Flame } from 'lucide-react';

interface AICommentaryProps {
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  isGenerating?: boolean;
  onRegenerate?: () => void;
}

const AICommentary: React.FC<AICommentaryProps> = ({ 
  content, 
  type, 
  isGenerating = false, 
  onRegenerate 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (content && !isGenerating) {
      setIsTyping(true);
      setDisplayText('');
      
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < content.length) {
          setDisplayText(content.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 25);

      return () => clearInterval(typingInterval);
    }
  }, [content, isGenerating]);

  const getTypeConfig = () => {
    switch (type) {
      case 'spicy':
        return {
          icon: <Flame className="w-4 h-4" />,
          label: 'SPICY TAKE',
          gradient: 'from-ctea-orange to-ctea-pink',
          bgGradient: 'from-ctea-orange/20 to-ctea-pink/20',
          description: 'The hottest, most controversial takes'
        };
      case 'smart':
        return {
          icon: <Brain className="w-4 h-4" />,
          label: 'BIG BRAIN',
          gradient: 'from-ctea-purple to-ctea-teal',
          bgGradient: 'from-ctea-purple/20 to-ctea-teal/20',
          description: 'Deep analysis and thoughtful insights'
        };
      case 'memy':
        return {
          icon: <Laugh className="w-4 h-4" />,
          label: 'MEME LORD',
          gradient: 'from-ctea-teal to-ctea-yellow',
          bgGradient: 'from-ctea-teal/20 to-ctea-yellow/20',
          description: 'Pure internet chaos and humor'
        };
      case 'savage':
        return {
          icon: <Zap className="w-4 h-4" />,
          label: 'SAVAGE MODE',
          gradient: 'from-ctea-pink to-ctea-purple',
          bgGradient: 'from-ctea-pink/20 to-ctea-purple/20',
          description: 'No mercy, just pure roast energy'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <Card className={`p-4 bg-gradient-to-br ${config.bgGradient} border-ctea-teal/30 neon-border relative`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1">
          <Badge className={`bg-gradient-to-r ${config.gradient} text-white font-bold w-fit`}>
            <span className="flex items-center gap-1">
              {config.icon}
              {config.label}
            </span>
          </Badge>
          <span className="text-xs text-gray-400">{config.description}</span>
        </div>
        
        {onRegenerate && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onRegenerate}
            disabled={isGenerating}
            className="text-ctea-teal hover:text-ctea-teal/80 hover:bg-ctea-teal/10"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>
      
      <div className="relative">
        {isGenerating ? (
          <div className="flex items-center gap-2 text-gray-400">
            <Bot className="w-4 h-4 animate-pulse" />
            <span>CTeaBot is brewing a {type} take...</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-ctea-teal rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-ctea-teal rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-ctea-teal rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        ) : (
          <p className="text-white font-medium leading-relaxed">
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        )}
      </div>
      
      {!isGenerating && content && (
        <div className="absolute bottom-2 right-2">
          <div className="w-2 h-2 bg-ctea-teal rounded-full animate-pulse"></div>
        </div>
      )}
    </Card>
  );
};

export default AICommentary;
