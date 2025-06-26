
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Coffee, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UnifiedSecurityService } from '@/services/unifiedSecurityService';

interface SpillTeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SpillTeaModal: React.FC<SpillTeaModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    content: '',
    category: 'general',
    evidenceUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some tea to spill!",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate anonymous token for submission
      const anonymousToken = crypto.randomUUID();
      
      // Validate content with security service
      const securityCheck = await UnifiedSecurityService.validateSubmissionSecurity(
        formData.content,
        formData.evidenceUrl ? [formData.evidenceUrl] : [],
        'tea_submission'
      );

      if (!securityCheck.rateLimitCheck.allowed) {
        toast({
          title: "Rate Limit Exceeded",
          description: securityCheck.rateLimitCheck.blockedReason || "Please wait before submitting again.",
          variant: "destructive"
        });
        return;
      }

      if (!securityCheck.contentValidation.valid) {
        toast({
          title: "Content Validation Failed",
          description: `Issues detected: ${securityCheck.contentValidation.threats.join(', ')}`,
          variant: "destructive"
        });
        return;
      }

      // Submit to database
      const submissionData = {
        content: securityCheck.contentValidation.sanitized,
        category: formData.category,
        evidence_urls: formData.evidenceUrl ? [formData.evidenceUrl] : null,
        anonymous_token: anonymousToken,
        status: 'approved', // Auto-approve for live launch
        has_evidence: !!formData.evidenceUrl,
        reactions: { hot: 0, cold: 0, spicy: 0 },
        average_rating: 0,
        rating_count: 0,
        verification_score: 0
      };

      const { error } = await supabase
        .from('tea_submissions')
        .insert(submissionData);

      if (error) {
        throw new Error(`Submission failed: ${error.message}`);
      }

      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: "Your gossip is now live for everyone to see!",
      });

      // Reset form
      setFormData({
        content: '',
        category: 'general',
        evidenceUrl: ''
      });

      onSuccess();

    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark border-ctea-teal/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Coffee className="w-6 h-6 text-ctea-teal" />
            Spill Your Tea ☕
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="bg-ctea-darker border-ctea-teal/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-ctea-dark border-ctea-teal/30">
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="tech">Tech & DeFi</SelectItem>
                <SelectItem value="nft">NFTs</SelectItem>
                <SelectItem value="exchange">Exchanges</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="personalities">Crypto Personalities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Tea *</Label>
            <Textarea
              id="content"
              placeholder="Spill the tea... What's the latest gossip in crypto? 👀"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-400 min-h-[120px] resize-none"
              maxLength={1000}
              required
            />
            <div className="text-right text-sm text-gray-400">
              {formData.content.length}/1000
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidenceUrl">Evidence URL (optional)</Label>
            <Input
              id="evidenceUrl"
              type="url"
              placeholder="https://twitter.com/... or https://example.com/proof"
              value={formData.evidenceUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, evidenceUrl: e.target.value }))}
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.content.trim()}
              className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Spilling...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Spill Tea
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpillTeaModal;
