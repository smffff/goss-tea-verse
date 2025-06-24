import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Camera, Link2, Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserProgression } from '@/hooks/useUserProgression';
import { supabase } from '@/integrations/supabase/client';

const SubmissionForm = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('gossip');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { incrementPost } = useUserProgression();

  const categories = [
    { id: 'gossip', label: 'Hot Gossip', emoji: '☕' },
    { id: 'drama', label: 'Pure Drama', emoji: '🎭' },
    { id: 'rumors', label: 'Wild Rumors', emoji: '👂' },
    { id: 'exposed', label: 'Exposed', emoji: '👀' },
    { id: 'memes', label: 'Meme Drama', emoji: '🐸' }
  ];

  const generateAnonymousToken = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const addEvidenceField = () => {
    setEvidenceUrls([...evidenceUrls, '']);
  };

  const updateEvidenceUrl = (index: number, value: string) => {
    const newUrls = [...evidenceUrls];
    newUrls[index] = value;
    setEvidenceUrls(newUrls);
  };

  const removeEvidenceField = (index: number) => {
    if (evidenceUrls.length > 1) {
      setEvidenceUrls(evidenceUrls.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const anonymousToken = generateAnonymousToken();
      const filteredEvidenceUrls = evidenceUrls.filter(url => url.trim() !== '');

      // Insert submission
      const { data: submission, error: submissionError } = await supabase
        .from('tea_submissions')
        .insert({
          content: content.trim(),
          category,
          evidence_urls: filteredEvidenceUrls.length > 0 ? filteredEvidenceUrls : null,
          has_evidence: filteredEvidenceUrls.length > 0,
          anonymous_token: anonymousToken,
          status: 'approved' // Auto-approve for demo
        })
        .select()
        .single();

      if (submissionError) throw submissionError;

      // Increment user progression for posting
      await incrementPost();

      // Generate AI commentary
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('generate-ai-commentary', {
        body: { 
          content: content.trim(),
          category,
          submissionId: submission.id
        }
      });

      if (aiError) {
        console.error('AI commentary error:', aiError);
      }

      toast({
        title: "Tea Spilled Successfully! ☕",
        description: "Your submission is live and earning you $TEA points!",
      });

      // Reset form
      setContent('');
      setCategory('gossip');
      setEvidenceUrls(['']);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Spill Failed",
        description: "Couldn't submit your tea. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-ctea-teal" />
          <h3 className="text-xl font-bold text-white">Spill the Tea ☕</h3>
          <Badge className="bg-ctea-yellow text-ctea-dark font-bold">+10 $TEA Points</Badge>
        </div>

        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Choose Your Drama Category</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                className={`cursor-pointer transition-all ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-ctea-pink to-ctea-purple text-white'
                    : 'bg-ctea-dark border-ctea-teal/30 text-gray-300 hover:bg-ctea-teal/20'
                }`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.emoji} {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <Label htmlFor="content" className="text-white font-medium">
            Spill the Details (Be Spicy 🌶️)
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Drop the hottest tea you've got... Don't hold back! 💀"
            className="min-h-[120px] bg-ctea-darker/50 border-ctea-teal/30 text-white placeholder:text-gray-400 focus:border-ctea-pink resize-none"
            maxLength={2000}
          />
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Be anonymous, be bold!</span>
            <span className="text-gray-400">{content.length}/2000</span>
          </div>
        </div>

        {/* Evidence URLs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-ctea-teal" />
            <Label className="text-white font-medium">Evidence (Optional)</Label>
            <Badge variant="outline" className="border-ctea-yellow text-ctea-yellow text-xs">+5 Bonus Points</Badge>
          </div>
          {evidenceUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-1 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-gray-400" />
                <Input
                  value={url}
                  onChange={(e) => updateEvidenceUrl(index, e.target.value)}
                  placeholder="Paste link to screenshots, tweets, etc..."
                  className="bg-ctea-darker/50 border-ctea-teal/30 text-white placeholder:text-gray-400"
                />
              </div>
              {evidenceUrls.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEvidenceField(index)}
                  className="border-ctea-pink/30 text-ctea-pink hover:bg-ctea-pink/10"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEvidenceField}
            className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
          >
            + Add More Evidence
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="w-full bg-gradient-ctea text-white font-bold py-3 hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Spilling Tea...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Spill This Tea ☕
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default SubmissionForm;
