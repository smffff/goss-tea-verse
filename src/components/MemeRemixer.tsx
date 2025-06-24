import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Sparkles, Download, Share2, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MemeRemixerProps {
  submissionId: string;
  content: string;
  category: string;
}

const MemeRemixer: React.FC<MemeRemixerProps> = ({
  submissionId,
  content,
  category
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [memeTemplate, setMemeTemplate] = useState<string>('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('drake');
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState<string>('');
  const { toast } = useToast();

  const memeTemplates = [
    { id: 'drake', name: 'Drake Hotline Bling', icon: '🕺', description: 'Drake approving/disapproving' },
    { id: 'distracted-boyfriend', name: 'Distracted Boyfriend', icon: '👀', description: 'Cheating/choosing between options' },
    { id: 'two-buttons', name: 'Two Buttons', icon: '🔘', description: 'Difficult choice meme' },
    { id: 'change-my-mind', name: 'Change My Mind', icon: '💭', description: 'Controversial opinion' },
    { id: 'one-does-not-simply', name: 'One Does Not Simply', icon: '🧙‍♂️', description: 'Impossible task' },
    { id: 'success-kid', name: 'Success Kid', icon: '👶', description: 'Achievement unlocked' }
  ];

  const generateMemeText = async () => {
    setIsGenerating(true);
    try {
      // Generate AI meme text based on content
      const { data, error } = await supabase.functions.invoke('generate-ai-commentary', {
        body: { 
          content: content,
          category: category,
          submissionId: submissionId,
          commentaryType: 'memy',
          generateMemeText: true
        }
      });

      if (error) throw error;

      if (data?.memeText) {
        const lines = data.memeText.split('\n');
        setTopText(lines[0] || '');
        setBottomText(lines[1] || '');
      }

    } catch (error) {
      console.error('Error generating meme text:', error);
      // Fallback to simple text generation
      setTopText('CT Drama');
      setBottomText('Be Like:');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMeme = async () => {
    if (!topText.trim() && !bottomText.trim()) {
      toast({
        title: "Add Some Text",
        description: "Please add top or bottom text to your meme.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // In a real implementation, this would call an image generation API
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate generated meme URL
      const mockMemeUrl = `https://api.memegen.link/${selectedTemplate}/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.png`;
      setGeneratedMemeUrl(mockMemeUrl);

      // Save meme to database
      await supabase
        .from('meme_generations')
        .insert({
          submission_id: submissionId,
          template_type: selectedTemplate,
          top_text: topText,
          bottom_text: bottomText,
          meme_url: mockMemeUrl,
          created_at: new Date().toISOString()
        });

      toast({
        title: "Meme Generated! 🎨",
        description: "Your viral meme is ready to share!",
      });

    } catch (error) {
      console.error('Error generating meme:', error);
      toast({
        title: "Generation Failed",
        description: "Couldn't generate meme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadMeme = () => {
    if (!generatedMemeUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedMemeUrl;
    link.download = `ctea-meme-${submissionId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Meme Downloaded! 📥",
      description: "Your meme has been saved to your device.",
    });
  };

  const shareMeme = () => {
    if (!generatedMemeUrl) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'CTea Meme',
        text: 'Check out this spicy crypto meme!',
        url: generatedMemeUrl
      });
    } else {
      navigator.clipboard.writeText(generatedMemeUrl);
      toast({
        title: "Link Copied! 📋",
        description: "Meme URL copied to clipboard.",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
          >
            <Palette className="w-4 h-4 mr-1" />
            Meme Remixer
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-ctea-darker/95 border-ctea-teal/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ctea-purple" />
              Meme Remixer - Create Viral Content
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Template Selection */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">Choose Meme Template:</h4>
              <div className="grid grid-cols-3 gap-3">
                {memeTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`p-3 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'bg-gradient-to-r from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/50'
                        : 'bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-purple/30'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{template.icon}</div>
                      <div className="text-white font-bold text-xs">{template.name}</div>
                      <div className="text-gray-400 text-xs">{template.description}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Meme Text:</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={generateMemeText}
                  disabled={isGenerating}
                  className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Generate
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Top Text:</label>
                  <Textarea
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Enter top text..."
                    className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder:text-gray-400"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Bottom Text:</label>
                  <Textarea
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Enter bottom text..."
                    className="bg-ctea-dark/50 border-ctea-teal/30 text-white placeholder:text-gray-400"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateMeme}
              disabled={isGenerating || (!topText.trim() && !bottomText.trim())}
              className="w-full bg-gradient-to-r from-ctea-purple to-ctea-pink text-white font-bold hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Meme...
                </>
              ) : (
                <>
                  <Palette className="w-4 h-4 mr-2" />
                  Generate Viral Meme
                </>
              )}
            </Button>

            {/* Generated Meme */}
            {generatedMemeUrl && (
              <div className="space-y-3">
                <h4 className="text-white font-medium">Your Meme:</h4>
                <Card className="p-4 bg-ctea-dark/50 border-ctea-purple/30">
                  <img 
                    src={generatedMemeUrl} 
                    alt="Generated meme" 
                    className="w-full rounded-lg mb-3"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={downloadMeme}
                      className="flex-1 bg-ctea-teal hover:bg-ctea-teal/80 text-white"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      onClick={shareMeme}
                      className="flex-1 bg-ctea-purple hover:bg-ctea-purple/80 text-white"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemeRemixer; 