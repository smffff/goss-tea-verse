import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { EnhancedSecurityService } from '@/services/enhancedSecurityService';
import { supabase } from '@/integrations/supabase/client';
import { SecureTokenManager } from '@/utils/enhancedSecurityUtils';

interface TeaSpillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TeaSpillModal: React.FC<TeaSpillModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [tea, setTea] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tea.trim() || tea.trim().length < 10) {
      toast({
        title: "More Tea Please!",
        description: "Please share at least 10 characters of juicy gossip",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get secure token
      const token = await SecureTokenManager.getOrCreateToken();
      
      // Validate submission security
      const securityCheck = await EnhancedSecurityService.validateSubmissionSecurity(
        tea,
        evidenceUrl ? [evidenceUrl] : [],
        'beta_tea_submission'
      );

      if (!securityCheck.overallValid) {
        toast({
          title: "Content Issue",
          description: "Please revise your submission and try again",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Submit to database
      const { data, error } = await supabase
        .from('tea_submissions')
        .insert({
          content: securityCheck.contentValidation.sanitized,
          category: 'beta_access',
          evidence_urls: securityCheck.urlValidation.valid.length > 0 ? securityCheck.urlValidation.valid : null,
          anonymous_token: token,
          status: 'approved',
          has_evidence: securityCheck.urlValidation.valid.length > 0,
          reactions: { hot: 0, cold: 0, spicy: 0 },
          average_rating: 0,
          rating_count: 0
        })
        .select();

      if (error) {
        throw error;
      }

      // Generate beta code for user - call the function directly
      const { data: betaData, error: betaError } = await supabase.rpc('generate_beta_access', {
        referrer_type: 'spill_tea',
        referrer_id: data[0]?.id
      });

      if (betaError) {
        console.error('Beta code generation error:', betaError);
      }

      // Handle the response as any since it's a custom function
      const betaResult = betaData as any;

      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: betaResult?.code ? `Your beta code: ${betaResult.code}` : "Access granted!",
      });

      onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again in a moment",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-pink-400 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white font-bold text-center">
            🫖 Spill Your Tea
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tea" className="text-pink-300 font-semibold">
              What's the crypto gossip?
            </Label>
            <Textarea
              id="tea"
              value={tea}
              onChange={(e) => setTea(e.target.value)}
              placeholder="Share some juicy crypto drama, rumors, or alpha..."
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
              maxLength={500}
            />
            <div className="text-xs text-gray-400 mt-1">
              {tea.length}/500 characters
            </div>
          </div>

          <div>
            <Label htmlFor="evidence" className="text-cyan-300 font-semibold">
              Evidence (Optional)
            </Label>
            <Input
              id="evidence"
              type="url"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="https://twitter.com/..."
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold"
            >
              {isSubmitting ? 'Spilling...' : 'Spill Tea'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeaSpillModal;
