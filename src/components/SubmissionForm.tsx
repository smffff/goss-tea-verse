import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserProgression } from '@/hooks/useUserProgression';
import { supabase } from '@/integrations/supabase/client';
import CategorySelector from './CategorySelector';
import ContentTextarea from './ContentTextarea';
import EvidenceUrlManager from './EvidenceUrlManager';
import ImageUpload from './ImageUpload';
import { moderateText } from '@/lib/moderation';

const SubmissionForm = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('gossip');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>(['']);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { incrementPost } = useUserProgression();

  const generateAnonymousToken = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const result = moderateText(content);
    if (!result.clean) {
      toast({
        title: "Submission Blocked",
        description: result.reason,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const anonymousToken = generateAnonymousToken();
      const filteredEvidenceUrls = evidenceUrls.filter(url => url.trim() !== '');
      
      // Include image URL in evidence if provided
      const allEvidenceUrls = [...filteredEvidenceUrls];
      if (imageUrl) {
        allEvidenceUrls.push(imageUrl);
      }

      // Insert submission
      const { data: submission, error: submissionError } = await supabase
        .from('tea_submissions')
        .insert({
          content: content.trim(),
          category,
          evidence_urls: allEvidenceUrls.length > 0 ? allEvidenceUrls : null,
          has_evidence: allEvidenceUrls.length > 0,
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
        description: imageUrl 
          ? "Your submission with visual spice is live and earning you $TEA points!"
          : "Your submission is live and earning you $TEA points!",
      });

      // Reset form
      setContent('');
      setCategory('gossip');
      setEvidenceUrls(['']);
      setImageUrl('');
      
    } catch (error: unknown) {
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

        <CategorySelector 
          selectedCategory={category}
          onCategoryChange={setCategory}
        />

        <ContentTextarea 
          content={content}
          onContentChange={setContent}
        />

        <ImageUpload
          onImageUploaded={setImageUrl}
          onImageRemoved={() => setImageUrl('')}
          currentImage={imageUrl}
        />

        <EvidenceUrlManager 
          evidenceUrls={evidenceUrls}
          onUrlsChange={setEvidenceUrls}
        />

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
