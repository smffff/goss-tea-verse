
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
          gradient: 'from-ctea-pink to-orange-500',
          bgGradient: 'from-ctea-pink/20 to-orange-500/20',
          description: 'The hottest, most controversial takes'
        };
      case 'smart':
        return {
          icon: <Brain className="w-4 h-4" />,
          label: 'BIG BRAIN',
          gradient: 'from-purple-500 to-blue-500',
          bgGradient: 'from-purple-500/20 to-blue-500/20',
          description: 'Deep analysis and thoughtful insights'
        };
      case 'memy':
        return {
          icon: <Laugh className="w-4 h-4" />,
          label: 'MEME LORD',
          gradient: 'from-green-500 to-yellow-500',
          bgGradient: 'from-green-500/20 to-yellow-500/20',
          description: 'Pure internet chaos and humor'
        };
      case 'savage':
        return {
          icon: <Zap className="w-4 h-4" />,
          label: 'SAVAGE MODE',
          gradient: 'from-ctea-pink to-red-500',
          bgGradient: 'from-ctea-pink/20 to-red-500/20',
          description: 'Cutting insights with no mercy'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <Card className={`p-4 bg-gradient-to-br ${config.bgGradient} border-gray-700 relative`}>
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
            className="text-ctea-pink hover:text-ctea-pink/80 hover:bg-ctea-pink/10"
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
              <div className="w-2 h-2 bg-ctea-pink rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-ctea-pink rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-ctea-pink rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
          <div className="w-2 h-2 bg-ctea-pink rounded-full animate-pulse"></div>
        </div>
      )}
    </Card>
  );
};

export default AICommentary;
