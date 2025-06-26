
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Sparkles, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  textAreas: {
    x: number;
    y: number;
    width: number;
    height: number;
    defaultText: string;
  }[];
  campaign?: 'monday-dump' | 'tuesday-tea' | 'general';
}

const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: 'drake-pointing',
    name: 'Drake Pointing',
    imageUrl: '/meme-templates/drake.jpg',
    textAreas: [
      { x: 50, y: 20, width: 200, height: 50, defaultText: 'Traditional Finance' },
      { x: 50, y: 120, width: 200, height: 50, defaultText: 'CTea Gossip Network' }
    ],
    campaign: 'monday-dump'
  },
  {
    id: 'distracted-boyfriend',
    name: 'Distracted Boyfriend',
    imageUrl: '/meme-templates/distracted.jpg',
    textAreas: [
      { x: 10, y: 10, width: 100, height: 30, defaultText: 'Crypto Twitter' },
      { x: 200, y: 10, width: 100, height: 30, defaultText: 'CTea Newsroom' },
      { x: 300, y: 10, width: 100, height: 30, defaultText: 'Old Gossip Sites' }
    ],
    campaign: 'tuesday-tea'
  },
  {
    id: 'tea-spill',
    name: 'Tea Spill Classic',
    imageUrl: '/meme-templates/tea-spill.jpg',
    textAreas: [
      { x: 50, y: 200, width: 300, height: 60, defaultText: 'When you hear exclusive alpha on CTea' }
    ],
    campaign: 'general'
  }
];

const CAMPAIGNS = {
  'monday-dump': {
    name: 'Monday Meme Dump',
    color: 'bg-purple-500/20 text-purple-400',
    hashtag: '#MondayMemeDump'
  },
  'tuesday-tea': {
    name: 'Tuesday Tea Time',
    color: 'bg-green-500/20 text-green-400',
    hashtag: '#TuesdayTeaTime'
  },
  'general': {
    name: 'General Memes',
    color: 'bg-blue-500/20 text-blue-400',
    hashtag: '#CTeaMemes'
  }
};

const EnhancedMemeGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate>(MEME_TEMPLATES[0]);
  const [textInputs, setTextInputs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setTextInputs(selectedTemplate.textAreas.map(area => area.defaultText));
  }, [selectedTemplate]);

  const generateMeme = async () => {
    setIsGenerating(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 400, 400);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 400);

      // Add template-specific styling
      ctx.fillStyle = '#00d1c1';
      ctx.fillRect(0, 0, 400, 50);
      
      // Add title
      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('CTea Newsroom Meme', 200, 30);

      // Add text areas
      selectedTemplate.textAreas.forEach((area, index) => {
        if (textInputs[index]) {
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          
          const text = textInputs[index];
          const x = area.x + area.width / 2;
          const y = area.y + area.height / 2 + 100; // Offset for header
          
          ctx.strokeText(text, x, y);
          ctx.fillText(text, x, y);
        }
      });

      // Add campaign branding
      if (selectedTemplate.campaign) {
        const campaign = CAMPAIGNS[selectedTemplate.campaign];
        ctx.fillStyle = '#00d1c1';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(campaign.hashtag, 390, 390);
      }

      toast({
        title: "Meme Generated! 🎭",
        description: "Your viral masterpiece is ready for the crypto-sphere!",
      });
    } catch (error) {
      console.error('Error generating meme:', error);
      toast({
        title: "Meme Generation Failed",
        description: "The meme machine broke. Try again!",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `ctea-meme-${selectedTemplate.id}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Meme Downloaded! 📥",
      description: "Share it everywhere and spread the CTea chaos!",
    });
  };

  const shareMeme = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'ctea-meme.png', { type: 'image/png' });
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'CTea Newsroom Meme',
            text: `Check out this spicy meme from CTea! ${selectedTemplate.campaign ? CAMPAIGNS[selectedTemplate.campaign].hashtag : '#CTeaMemes'}`,
            files: [file]
          });
        } else {
          // Fallback to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          toast({
            title: "Meme Copied! 📋",
            description: "Paste it wherever the internet needs more chaos!",
          });
        }
      });
    } catch (error) {
      console.error('Error sharing meme:', error);
      toast({
        title: "Sharing Failed",
        description: "Manual share mode activated - download and spread the chaos yourself!",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-ctea-dark/50 to-black/50 border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-ctea-teal" />
          Enhanced Meme Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Choose Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MEME_TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all
                  ${selectedTemplate.id === template.id 
                    ? 'border-ctea-teal bg-ctea-teal/10' 
                    : 'border-gray-600 hover:border-gray-500'
                  }
                `}
              >
                <h4 className="text-sm font-medium text-white mb-1">{template.name}</h4>
                {template.campaign && (
                  <Badge className={CAMPAIGNS[template.campaign].color}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {CAMPAIGNS[template.campaign].name}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Text Inputs */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Customize Text</h3>
          <div className="space-y-2">
            {selectedTemplate.textAreas.map((area, index) => (
              <Input
                key={index}
                value={textInputs[index] || ''}
                onChange={(e) => {
                  const newInputs = [...textInputs];
                  newInputs[index] = e.target.value;
                  setTextInputs(newInputs);
                }}
                placeholder={`Text area ${index + 1}`}
                className="bg-black/50 border-gray-600 text-white"
              />
            ))}
          </div>
        </div>

        {/* Canvas Preview */}
        <div className="text-center">
          <canvas
            ref={canvasRef}
            className="border border-gray-600 rounded-lg max-w-full h-auto"
            style={{ maxWidth: '300px' }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={generateMeme}
            disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-medium"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Meme
              </>
            )}
          </Button>
          
          <Button
            onClick={downloadMeme}
            variant="outline"
            className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black"
          >
            <Download className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={shareMeme}
            variant="outline"
            className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Campaign Info */}
        {selectedTemplate.campaign && (
          <div className="p-3 rounded-lg bg-gradient-to-r from-ctea-teal/10 to-green-400/10 border border-ctea-teal/30">
            <p className="text-sm text-ctea-teal">
              🎯 <strong>{CAMPAIGNS[selectedTemplate.campaign].name}</strong> campaign active! 
              Share with {CAMPAIGNS[selectedTemplate.campaign].hashtag} for maximum viral potential.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedMemeGenerator;
