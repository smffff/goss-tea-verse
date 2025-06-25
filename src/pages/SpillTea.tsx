
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SpillTeaForm from '@/components/SpillTeaForm';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getOrCreateSecureToken } from '@/utils/securityUtils';

interface SpillData {
  topic: string;
  teaText: string;
  mediaUrl?: string;
}

const SpillTea = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log('SpillTea - Component rendered, isSubmitting:', isSubmitting);

  const handleSubmit = async (data: SpillData) => {
    console.log('SpillTea - handleSubmit called with data:', data);
    
    if (isSubmitting) {
      console.log('SpillTea - Already submitting, preventing duplicate submission');
      return;
    }
    
    setIsSubmitting(true);
    console.log('SpillTea - Set isSubmitting to true');
    
    try {
      // Generate secure anonymous token
      const anonymousToken = getOrCreateSecureToken();
      console.log('SpillTea - Generated secure anonymous token');

      // Prepare submission data with visibility false by default for AI verification
      const submissionData = {
        content: data.teaText.trim(),
        category: data.topic || 'general',
        evidence_urls: data.mediaUrl ? [data.mediaUrl] : null,
        anonymous_token: anonymousToken,
        status: 'approved',
        visible: false, // Start as invisible until AI verification
        has_evidence: !!data.mediaUrl,
        reactions: { hot: 0, cold: 0, spicy: 0 },
        average_rating: 0,
        rating_count: 0
      };

      console.log('SpillTea - Prepared submission data:', submissionData);

      // Content validation
      if (!submissionData.content || submissionData.content.length < 3) {
        throw new Error('Tea must be at least 3 characters long');
      }

      if (submissionData.content.length > 2000) {
        throw new Error('Tea must be less than 2000 characters');
      }

      console.log('SpillTea - Content validation passed, inserting into Supabase');

      // Insert into Supabase
      const { data: result, error } = await supabase
        .from('tea_submissions')
        .insert(submissionData)
        .select();

      if (error) {
        console.error('SpillTea - Supabase insertion error:', error);
        throw new Error(`Submission failed: ${error.message}`);
      }

      if (!result || result.length === 0) {
        console.error('SpillTea - No data returned from Supabase');
        throw new Error('Submission failed: No data returned');
      }

      console.log('SpillTea - Submission successful:', result);
      const submissionId = result[0].id;

      // Trigger AI verification workflow
      try {
        console.log('SpillTea - Triggering AI verification for submission:', submissionId);
        
        const { data: aiResult, error: aiError } = await supabase.functions.invoke('generate-ai-commentary-enhanced', {
          body: { 
            content: submissionData.content,
            category: submissionData.category,
            submissionId: submissionId,
            commentaryType: 'spicy'
          }
        });

        if (aiError) {
          console.error('SpillTea - AI verification failed:', aiError);
          // Don't throw error here - submission is still valid, just needs manual review
        } else {
          console.log('SpillTea - AI verification completed:', aiResult);
        }
      } catch (aiError) {
        console.error('SpillTea - AI verification error:', aiError);
        // Continue - submission is still valid
      }

      toast({
        title: "✅ Your tea has been spilled!",
        description: "Your submission is being processed and will appear in the feed once verified.",
      });

      console.log('SpillTea - Navigating to feed...');
      navigate('/feed');

    } catch (error) {
      console.error('SpillTea - Submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: `Couldn't spill your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      console.log('SpillTea - Setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    console.log('SpillTea - handleClose called, navigating to /');
    navigate('/');
  };

  console.log('SpillTea - Rendering component');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Spill Your Tea ☕
            </h1>
            <p className="text-gray-400">
              Share the latest crypto gossip, rumors, and alpha with the community. Your submission will appear in the feed immediately!
            </p>
          </div>
          
          <SpillTeaForm
            onClose={handleClose}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SpillTea;
