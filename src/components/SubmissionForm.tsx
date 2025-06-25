import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Sparkles, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserProgression } from '@/hooks/useUserProgression';
import { supabase } from '@/integrations/supabase/client';
import { trackFormCompletion, trackTeaSpill } from '@/lib/analytics';
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

      // Track form completion
      trackFormCompletion();

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

      // Track successful tea spill
      trackTeaSpill();

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
    <Card className="card-responsive bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header - Mobile responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="icon-responsive text-ctea-teal" />
            <h3 className="text-lg sm:text-xl font-bold text-white">Spill the Tea ☕</h3>
          </div>
          <Badge className="bg-ctea-yellow text-ctea-dark font-bold badge-responsive self-start sm:self-auto">
            +10 $TEA Points
          </Badge>
        </div>

        {/* Category Selector - Mobile responsive */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
            <Sparkles className="icon-responsive text-ctea-purple" />
            Category
          </label>
          <CategorySelector 
            selectedCategory={category}
            onCategoryChange={setCategory}
          />
        </div>

        {/* Content Textarea - Mobile responsive */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
            <Send className="icon-responsive text-ctea-teal" />
            Your Hot Take
          </label>
          <ContentTextarea 
            content={content}
            onContentChange={setContent}
          />
          <p className="text-xs sm:text-sm text-gray-400">
            {content.length}/500 characters • Be spicy but respectful
          </p>
        </div>

        {/* Media Upload Section - Mobile responsive */}
        <div className="space-y-4">
          <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
            <ImageIcon className="icon-responsive text-ctea-pink" />
            Add Visual Spice (Optional)
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm text-gray-300 flex items-center gap-1">
                <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                Image/Meme
              </label>
              <ImageUpload
                onImageUploaded={setImageUrl}
                onImageRemoved={() => setImageUrl('')}
                currentImage={imageUrl}
              />
            </div>

            {/* Evidence Links */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm text-gray-300 flex items-center gap-1">
                <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                Evidence Links
              </label>
              <EvidenceUrlManager 
                evidenceUrls={evidenceUrls}
                onUrlsChange={setEvidenceUrls}
              />
            </div>
          </div>
        </div>

        {/* Submission Tips - Mobile responsive */}
        <div className="bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm sm:text-base font-medium text-white mb-2 flex items-center gap-2">
            <Sparkles className="icon-responsive text-ctea-yellow" />
            Pro Tips
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-ctea-teal">•</span>
              <span className="text-gray-300">Include specific details</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ctea-teal">•</span>
              <span className="text-gray-300">Add evidence when possible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ctea-teal">•</span>
              <span className="text-gray-300">Use engaging language</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ctea-teal">•</span>
              <span className="text-gray-300">Keep it anonymous</span>
            </div>
          </div>
        </div>

        {/* Submit Button - Mobile responsive */}
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="w-full bg-gradient-ctea text-white font-bold py-3 sm:py-4 hover:opacity-90 disabled:opacity-50 btn-responsive-lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              <span className="text-sm sm:text-base">Spilling Tea...</span>
            </>
          ) : (
            <>
              <Send className="icon-responsive mr-2" />
              <span className="text-sm sm:text-base">Spill This Tea ☕</span>
            </>
          )}
        </Button>

        {/* Character Count & Status - Mobile responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <span>Characters: {content.length}/500</span>
            <span>Category: {category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Evidence: {evidenceUrls.filter(url => url.trim() !== '').length + (imageUrl ? 1 : 0)} items</span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default SubmissionForm;
