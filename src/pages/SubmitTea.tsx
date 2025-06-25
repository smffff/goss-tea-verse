
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SubmissionForm from '@/components/SubmissionForm';
import { useToast } from '@/hooks/use-toast';
import BetaDisclaimer from '@/components/BetaDisclaimer';
import { supabase } from '@/integrations/supabase/client';
import { getOrCreateSecureToken } from '@/utils/securityUtils';

interface SubmissionData {
  tea: string;
  email: string;
  wallet: string;
  category: string;
  evidence_urls: string[];
  isAnonymous: boolean;
}

const SubmitTea = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log('SubmitTea - Component rendered, isSubmitting:', isSubmitting);

  const handleSubmit = async (data: SubmissionData) => {
    console.log('SubmitTea - handleSubmit called with data:', data);
    
    if (isSubmitting) {
      console.log('SubmitTea - Already submitting, preventing duplicate submission');
      return;
    }
    
    setIsSubmitting(true);
    console.log('SubmitTea - Set isSubmitting to true');
    
    try {
      // Generate secure anonymous token with proper validation
      const anonymousToken = getOrCreateSecureToken();
      console.log('SubmitTea - Generated secure anonymous token');

      // Prepare submission data with enhanced security
      const submissionData = {
        content: data.tea.trim(),
        category: data.category || 'general',
        evidence_urls: data.evidence_urls && data.evidence_urls.length > 0 ? data.evidence_urls : null,
        anonymous_token: anonymousToken,
        status: 'approved', // Changed from 'pending' to 'approved' for immediate visibility
        has_evidence: data.evidence_urls && data.evidence_urls.length > 0,
        reactions: { hot: 0, cold: 0, spicy: 0 },
        average_rating: 0,
        rating_count: 0
      };

      console.log('SubmitTea - Prepared submission data:', submissionData);

      // Enhanced content validation
      if (!submissionData.content || submissionData.content.length < 3) {
        console.error('SubmitTea - Content validation failed: too short');
        throw new Error('Content must be at least 3 characters long');
      }

      if (submissionData.content.length > 2000) {
        console.error('SubmitTea - Content validation failed: too long');
        throw new Error('Content must be less than 2000 characters');
      }

      // Check for potentially malicious content
      const suspiciousPatterns = [
        /<script[^>]*>/i,
        /javascript:/i,
        /data:text\/html/i,
        /vbscript:/i,
        /on\w+\s*=/i
      ];

      if (suspiciousPatterns.some(pattern => pattern.test(submissionData.content))) {
        console.error('SubmitTea - Malicious content detected');
        throw new Error('Content contains potentially harmful elements');
      }

      console.log('SubmitTea - Inserting into Supabase...');
      // Insert into Supabase with enhanced validation
      const { data: result, error } = await supabase
        .from('tea_submissions')
        .insert(submissionData)
        .select();

      if (error) {
        console.error('SubmitTea - Supabase insertion error:', error);
        throw new Error(`Submission failed: ${error.message}`);
      }

      if (!result || result.length === 0) {
        console.error('SubmitTea - No data returned from Supabase');
        throw new Error('Submission failed: No data returned');
      }

      console.log('SubmitTea - Submission successful:', result);

      toast({
        title: "Tea Submitted! ☕",
        description: "Your submission is now live in the feed! Check it out and see the community reactions.",
      });

      console.log('SubmitTea - Navigating to enhanced feed immediately...');
      // Navigate to enhanced feed immediately to see the new submission
      navigate('/enhanced-feed');

    } catch (error) {
      console.error('SubmitTea - Submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      console.log('SubmitTea - Setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    console.log('SubmitTea - handleClose called, navigating to /');
    navigate('/');
  };

  console.log('SubmitTea - Rendering component');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Spill Your Tea ☕
            </h1>
            <BetaDisclaimer variant="inline" className="justify-center mb-4" />
            <p className="text-gray-400">
              Share the latest crypto gossip, rumors, and alpha with the community. Your submission will appear in the feed immediately!
            </p>
          </div>
          
          <SubmissionForm
            onClose={handleClose}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SubmitTea;
