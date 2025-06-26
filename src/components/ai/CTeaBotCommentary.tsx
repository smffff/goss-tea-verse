
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Brain, Zap, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CTeaBotCommentaryProps {
  submission: {
    id: string;
    content: string;
    category: string;
  };
  onCommentGenerated?: (comment: string, mode: string) => void;
}

const AI_MODES = {
  spicy: {
    icon: Flame,
    label: 'Spicy',
    color: 'bg-red-500/20 text-red-400 border-red-500/50',
    description: 'Sassy roasts and hot takes'
  },
  smart: {
    icon: Brain,
    label: 'Smart',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    description: 'Analytical insights and context'
  },
  memy: {
    icon: Zap,
    label: 'Meme',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    description: 'Crypto Twitter slang and memes'
  },
  savage: {
    icon: Sparkles,
    label: 'Savage',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    description: 'Brutally honest reality checks'
  }
};

const CTeaBotCommentary: React.FC<CTeaBotCommentaryProps> = ({
  submission,
  onCommentGenerated
}) => {
  const [selectedMode, setSelectedMode] = useState<keyof typeof AI_MODES>('spicy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastComment, setLastComment] = useState<string>('');
  const { toast } = useToast();

  const generateCommentary = async (mode: keyof typeof AI_MODES) => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-commentary-enhanced', {
        body: {
          content: submission.content,
          category: submission.category,
          submissionId: submission.id,
          commentaryType: mode
        }
      });

      if (error) throw error;

      if (data?.commentary) {
        setLastComment(data.commentary);
        onCommentGenerated?.(data.commentary, mode);
        
        toast({
          title: `${AI_MODES[mode].label} CTeaBot Response Generated! 🤖`,
          description: "AI commentary added to the tea spill",
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error generating AI commentary:', error);
      toast({
        title: "AI Commentary Failed",
        description: "CTeaBot is taking a tea break. Try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-ctea-teal" />
          <span className="text-sm font-medium text-white">CTeaBot Commentary</span>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {Object.entries(AI_MODES).map(([mode, config]) => {
            const Icon = config.icon;
            const isSelected = selectedMode === mode;
            
            return (
              <Button
                key={mode}
                variant="outline"
                size="sm"
                onClick={() => setSelectedMode(mode as keyof typeof AI_MODES)}
                className={`
                  ${isSelected ? config.color : 'border-gray-600 text-gray-400 hover:text-white'}
                  transition-all duration-200
                `}
              >
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
              </Button>
            );
          })}
        </div>

        {/* Generate Button */}
        <Button
          onClick={() => generateCommentary(selectedMode)}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-medium"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
              CTeaBot is brewing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate {AI_MODES[selectedMode].label} Take
            </>
          )}
        </Button>

        {/* Mode Description */}
        <p className="text-xs text-gray-400 mt-2 text-center">
          {AI_MODES[selectedMode].description}
        </p>

        {/* Last Generated Comment */}
        {lastComment && (
          <div className="mt-4 p-3 bg-black/30 rounded-lg border border-ctea-teal/20">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={AI_MODES[selectedMode].color}>
                CTeaBot • {AI_MODES[selectedMode].label}
              </Badge>
            </div>
            <p className="text-sm text-gray-300">{lastComment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CTeaBotCommentary;
