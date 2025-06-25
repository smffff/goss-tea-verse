
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
    console.log('=== SUBMISSION START ===');
    console.log('SubmitTea handleSubmit called with data:', JSON.stringify(data, null, 2));
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('Already submitting, preventing duplicate submission');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate or get anonymous token
      let anonymousToken = localStorage.getItem('ctea_anonymous_token');
      if (!anonymousToken) {
        console.log('Generating new anonymous token');
        anonymousToken = Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        localStorage.setItem('ctea_anonymous_token', anonymousToken);
        console.log('New token generated and stored');
      } else {
        console.log('Using existing token from localStorage');
      }

      // Validate token format
      if (!anonymousToken || anonymousToken.length < 32) {
        throw new Error('Invalid anonymous token generated');
      }

      console.log('Token validation passed, length:', anonymousToken.length);

      // Prepare submission data with validation
      const submissionData = {
        content: data.tea.trim(),
        category: data.category || 'general',
        evidence_urls: data.evidence_urls && data.evidence_urls.length > 0 ? data.evidence_urls : null,
        anonymous_token: anonymousToken,
        status: 'pending'
      };

      console.log('Prepared submission data:', JSON.stringify(submissionData, null, 2));

      // Validate content before submission
      if (!submissionData.content || submissionData.content.length < 3) {
        throw new Error('Content must be at least 3 characters long');
      }

      if (submissionData.content.length > 2000) {
        throw new Error('Content must be less than 2000 characters');
      }

      console.log('Content validation passed');
      console.log('Attempting Supabase insertion...');

      // Insert into Supabase
      const { data: result, error } = await supabase
        .from('tea_submissions')
        .insert(submissionData)
        .select();

      console.log('Supabase response received');
      console.log('Result:', result);
      console.log('Error:', error);

      if (error) {
        console.error('Supabase insertion error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Submission failed: ${error.message}`);
      }

      if (!result || result.length === 0) {
        console.error('No result returned from Supabase insertion');
        throw new Error('Submission failed: No data returned');
      }

      console.log('=== SUBMISSION SUCCESS ===');
      console.log('Submission successful with result:', result[0]);

      toast({
        title: "Tea Submitted! ☕",
        description: "Your submission has been received. Check back soon to see it in the feed!",
      });

      // Redirect after successful submission
      setTimeout(() => {
        console.log('Redirecting to feed...');
        window.location.href = '/feed';
      }, 2000);

    } catch (error) {
      console.error('=== SUBMISSION ERROR ===');
      console.error('Full error object:', error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      console.log('Setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    console.log('Form closed, redirecting to home');
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
