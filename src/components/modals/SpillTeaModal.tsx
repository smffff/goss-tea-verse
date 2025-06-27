
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
import { secureLog } from '@/utils/secureLogging';

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
      onClose();
    } catch (error) {
      secureLog.error('Tea submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark border-ctea-teal/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-white">
            <Coffee className="w-6 h-6 text-ctea-teal" />
            Spill the Tea
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">What's the tea? *</Label>
            <Textarea
              id="content"
              placeholder="Spill all the gossip here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal min-h-[120px] resize-none"
              maxLength={1000}
            />
            <div className="text-xs text-gray-400 text-right">
              {formData.content.length}/1000 characters
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-ctea-darker border-ctea-teal/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="celebrity">Celebrity</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidence" className="text-white">Evidence URL (Optional)</Label>
            <Input
              id="evidence"
              type="url"
              placeholder="https://example.com/proof"
              value={formData.evidenceUrl}
              onChange={(e) => setFormData({ ...formData, evidenceUrl: e.target.value })}
              className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.content.trim()}
              className="flex-1 bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Spilling...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Spill the Tea
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpillTeaModal;
