
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Download, Shuffle, Image as ImageIcon, Zap, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EnhancedMemeGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const memeTemplates = [
    {
      id: 'drake-pointing',
      name: 'Drake Pointing',
      url: '/placeholder-drake.jpg',
      topY: 140,
      bottomY: 400
    },
    {
      id: 'distracted-boyfriend',
      name: 'Distracted Boyfriend',
      url: '/placeholder-boyfriend.jpg',
      topY: 50,
      bottomY: 350
    },
    {
      id: 'woman-yelling-cat',
      name: 'Woman Yelling at Cat',
      url: '/placeholder-cat.jpg',
      topY: 50,
      bottomY: 300
    },
    {
      id: 'tea-spill',
      name: 'CTea Spill',
      url: '/placeholder-teaspill.jpg',
      topY: 80,
      bottomY: 320
    }
  ];

  const sampleTexts = [
    { top: 'WHEN DEFI YIELDS ARE HIGH', bottom: 'BUT YOU ALREADY APED INTO MEMES' },
    { top: 'ME: I\'LL HOLD FOREVER', bottom: 'ALSO ME: *SELLS AT 2X*' },
    { top: 'BEAR MARKET:', bottom: 'DIAMOND HANDS ACTIVATED' },
    { top: 'NEW PROTOCOL LAUNCHES', bottom: 'RUGS IN 24 HOURS' }
  ];

  const generateRandomMeme = () => {
    const randomSample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setTopText(randomSample.top);
    setBottomText(randomSample.bottom);
    setSelectedTemplate(Math.floor(Math.random() * memeTemplates.length));
  };

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsGenerating(true);

    // Set canvas size
    canvas.width = 500;
    canvas.height = 500;

    // Draw background placeholder
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw template placeholder
    const template = memeTemplates[selectedTemplate];
    ctx.fillStyle = '#333';
    ctx.fillRect(50, 50, 400, 400);

    // Add template name
    ctx.fillStyle = '#666';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(template.name, canvas.width / 2, canvas.height / 2);

    // Draw meme text
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = 'bold 36px Impact, Arial Black, sans-serif';
    ctx.textAlign = 'center';

    // Top text
    if (topText) {
      const words = topText.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 400 && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      lines.forEach((line, index) => {
        const y = template.topY + (index * 45);
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      });
    }

    // Bottom text
    if (bottomText) {
      const words = bottomText.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 400 && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      lines.forEach((line, index) => {
        const y = template.bottomY + (index * 45);
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      });
    }

    setIsGenerating(false);
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'ctea-meme.png';
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Meme Downloaded! 🎭",
      description: "Your CTea meme is ready to spread chaos!",
    });
  };

  useEffect(() => {
    drawMeme();
  }, [selectedTemplate, topText, bottomText]);

  return (
    <Card className="bg-gradient-to-br from-ctea-dark/50 to-black/50 border-ctea-teal/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-ctea-teal" />
          Viral Meme Generator
          <Badge className="bg-pink-500/20 text-pink-400">Beta</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Template Selection */}
        <div className="grid grid-cols-2 gap-2">
          {memeTemplates.map((template, index) => (
            <Button
              key={template.id}
              variant={selectedTemplate === index ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTemplate(index)}
              className={`${selectedTemplate === index ? 'bg-ctea-teal text-black' : 'border-gray-600 text-gray-400'}`}
            >
              <ImageIcon className="w-3 h-3 mr-1" />
              {template.name}
            </Button>
          ))}
        </div>

        {/* Text Inputs */}
        <div className="space-y-3">
          <Textarea
            placeholder="Top text..."
            value={topText}
            onChange={(e) => setTopText(e.target.value.toUpperCase())}
            className="bg-ctea-darker border-ctea-teal/30 text-white resize-none h-20"
            maxLength={50}
          />
          <Textarea
            placeholder="Bottom text..."
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value.toUpperCase())}
            className="bg-ctea-darker border-ctea-teal/30 text-white resize-none h-20"
            maxLength={50}
          />
        </div>

        {/* Canvas Preview */}
        <div className="bg-black/30 p-4 rounded-lg border border-ctea-teal/20">
          <canvas
            ref={canvasRef}
            className="w-full max-w-sm mx-auto border border-gray-600 rounded"
            style={{ maxHeight: '300px' }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={generateRandomMeme}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Random
          </Button>
          <Button
            onClick={downloadMeme}
            disabled={isGenerating || (!topText && !bottomText)}
            className="flex-1 bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Campaign Integration */}
        <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold text-sm">Monday Meme Dump</span>
          </div>
          <p className="text-gray-300 text-xs">
            Share your meme for 2x $TEA rewards! Use #MondayMemeDump
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMemeGenerator;
