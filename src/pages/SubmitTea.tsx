
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SubmissionForm from '@/components/SubmissionForm';
import { useToast } from '@/hooks/use-toast';
import BetaDisclaimer from '@/components/BetaDisclaimer';
import { supabase } from '@/integrations/supabase/client';

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

  const handleSubmit = async (data: SubmissionData) => {
    console.log('SubmitTea handleSubmit called with:', data);
    setIsSubmitting(true);
    
    try {
      // Generate anonymous token for submissions
      let anonymousToken = localStorage.getItem('ctea_anonymous_token');
      if (!anonymousToken) {
        anonymousToken = Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        localStorage.setItem('ctea_anonymous_token', anonymousToken);
      }

      console.log('Submitting to Supabase with token:', anonymousToken);

      // Submit directly to Supabase table instead of using functions
      const submissionData = {
        content: data.tea,
        category: data.category,
        evidence_urls: data.evidence_urls.length > 0 ? data.evidence_urls : null,
        anonymous_token: anonymousToken,
        status: 'pending'
      };

      console.log('Submission data:', submissionData);

      const { data: result, error } = await supabase
        .from('tea_submissions')
        .insert(submissionData)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Submission successful:', result);

      toast({
        title: "Tea Submitted! ☕",
        description: "Your submission has been received. Check back soon to see it in the feed!",
      });

      // Optional: redirect to feed after successful submission
      setTimeout(() => {
        window.location.href = '/feed';
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Redirect back to home or feed
    window.location.href = '/';
  };

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
              Share the latest crypto gossip, rumors, and alpha with the community
            </p>
          </div>
          
          <SubmissionForm
            isOpen={true}
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
