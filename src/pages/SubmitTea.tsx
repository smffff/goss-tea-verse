import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SubmissionForm from '@/components/SubmissionForm';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { performSubmissionSecurityCheck } from '@/utils/security';
import { betaCodeService } from '@/services/betaCodeService';

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

  const handleSubmit = async (data: SubmissionData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Perform comprehensive security check - AWAIT the promise
      const securityCheck = await performSubmissionSecurityCheck(
        data.tea,
        data.evidence_urls,
        'tea_submission'
      );

      // Check rate limiting
      if (!securityCheck.rateLimitOk) {
        throw new Error('Rate limit exceeded. Please wait before submitting again.');
      }

      // Validate content security
      if (!securityCheck.content.isValid) {
        throw new Error(`Content validation failed: ${securityCheck.content.threats.join(', ')}`);
      }

      const submissionData = {
        content: securityCheck.content.sanitized,
        category: data.category || 'general',
        evidence_urls: securityCheck.urls.length > 0 ? securityCheck.urls : null,
        anonymous_token: securityCheck.token,
        status: 'approved',
        has_evidence: securityCheck.urls.length > 0,
        reactions: { hot: 0, cold: 0, spicy: 0 },
        average_rating: 0,
        rating_count: 0,
        ...(data.isAnonymous ? {} : {
          contact_email: data.email?.trim() || null,
          contact_wallet: data.wallet?.trim() || null
        })
      };

      const { data: result, error } = await supabase
        .from('tea_submissions')
        .insert(submissionData)
        .select();

      if (error) {
        throw new Error(`Submission failed: ${error.message}`);
      }

      if (!result || result.length === 0) {
        throw new Error('Submission failed: No data returned');
      }

      // Generate beta code for successful submission
      try {
        const codeResult = await betaCodeService.generateCodeForSpill(result[0].id);
        if (codeResult.success && codeResult.code) {
          toast({
            title: "Tea Spilled Successfully! 🫖",
            description: `Your access code is: ${codeResult.code}`,
            duration: 10000,
          });
        }
      } catch (codeError) {
        console.log('Beta code generation failed:', codeError);
        // Don't fail the submission if code generation fails
      }

      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: "Your gossip is brewing and will appear in the feed shortly!",
      });

      navigate('/feed');

    } catch (error) {
      console.error('Submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: `${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Layout>
      <ErrorBoundaryWrapper componentName="SubmitTea">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-tabloid-black mb-4">
                Spill Your Tea ☕
              </h1>
              <p className="text-tabloid-black/70 text-lg">
                Share the latest crypto gossip, rumors, and alpha with the community.
              </p>
            </div>
            
            <SubmissionForm
              onClose={handleClose}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </ErrorBoundaryWrapper>
    </Layout>
  );
};

export default SubmitTea;
