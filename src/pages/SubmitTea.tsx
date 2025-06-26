
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SubmissionForm from '@/components/SubmissionForm';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SecurityServiceUnified } from '@/services/securityServiceUnified';
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
      // Use unified security service for comprehensive validation
      const securityCheck = await SecurityServiceUnified.validateSubmissionSecurity(
        data.tea,
        data.evidence_urls,
        'tea_submission'
      );

      // Check overall security validation
      if (!securityCheck.overallValid) {
        let errorMessage = 'Submission failed security validation';
        
        if (!securityCheck.rateLimitCheck.allowed) {
          errorMessage = securityCheck.rateLimitCheck.blockedReason || 'Rate limit exceeded. Please wait before submitting again.';
        } else if (!securityCheck.contentValidation.valid) {
          errorMessage = `Content validation failed: ${securityCheck.contentValidation.threats.join(', ')}`;
        } else if (securityCheck.urlValidation.invalid.length > 0) {
          errorMessage = 'Some evidence URLs are invalid or suspicious';
        }
        
        throw new Error(errorMessage);
      }

      // Check if content has critical security risks
      if (securityCheck.contentValidation.riskLevel === 'critical') {
        throw new Error('Content contains critical security threats and cannot be submitted');
      }

      const submissionData = {
        content: securityCheck.contentValidation.sanitized,
        category: data.category || 'general',
        evidence_urls: securityCheck.urlValidation.valid.length > 0 ? securityCheck.urlValidation.valid : null,
        anonymous_token: securityCheck.tokenValidation.token,
        status: securityCheck.contentValidation.riskLevel === 'high' ? 'pending' : 'approved',
        has_evidence: securityCheck.urlValidation.valid.length > 0,
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
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('Beta code generation failed:', codeError);
        // Don't fail the submission if code generation fails
      }

      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: "Your gossip is brewing and will appear in the feed shortly!",
      });

      navigate('/feed');

    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Submission error:', error);
      
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
