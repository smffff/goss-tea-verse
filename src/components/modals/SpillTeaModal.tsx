
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
import { secureLog } from '@/utils/secureLogging';
import { EnhancedSecurityService } from '@/services/enhancedSecurityService';

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
      // Generate secure anonymous token
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      // Use enhanced security validation
      const securityValidation = await EnhancedSecurityService.validateContent(formData.content);

      if (!securityValidation.success) {
        await EnhancedSecurityService.logSecurityEvent(
          'content_validation_failed',
          { threats: securityValidation.threats, riskLevel: securityValidation.riskLevel },
          'high'
        );

        toast({
          title: "Content Validation Failed",
          description: `Security issues detected: ${securityValidation.threats.join(', ')}`,
          variant: "destructive"
        });
        return;
      }

      if (securityValidation.riskLevel === 'critical') {
        await EnhancedSecurityService.logSecurityEvent(
          'critical_content_blocked',
          { content: formData.content.substring(0, 100), riskLevel: securityValidation.riskLevel },
          'critical'
        );

        toast({
          title: "Content Blocked",
          description: "Content contains critical security threats and cannot be submitted.",
          variant: "destructive"
        });
        return;
      }

      // Use secure server-side submission function
      const { data: submissionResult, error } = await supabase
        .rpc('secure_submission_insert', {
          p_content: securityValidation.sanitized,
          p_anonymous_token: anonymousToken,
          p_category: formData.category
        });

      if (error) {
        throw new Error(`Secure submission failed: ${error.message}`);
      }

      if (!submissionResult?.success) {
        throw new Error(submissionResult?.error || 'Submission failed');
      }

      // Log successful secure submission
      await EnhancedSecurityService.logSecurityEvent(
        'secure_submission_success',
        { 
          submissionId: submissionResult.submission_id,
          securityScore: securityValidation.securityScore,
          riskLevel: securityValidation.riskLevel
        },
        'info'
      );

      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: "Your gossip has been securely submitted and is now live!",
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
      secureLog.error('Secure tea submission error:', error);
      
      await EnhancedSecurityService.logSecurityEvent(
        'submission_error',
        { error: error instanceof Error ? error.message : 'Unknown error' },
        'high'
      );

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
            Spill the Tea (Secure)
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
                  Securing & Spilling...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Securely Spill Tea
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
