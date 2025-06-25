
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

      // Prepare submission data
      const submissionData = {
        content: data.teaText.trim(),
        category: data.topic || 'general',
        evidence_urls: data.mediaUrl ? [data.mediaUrl] : null,
        anonymous_token: anonymousToken,
        status: 'approved',
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

      toast({
        title: "✅ Your tea has been spilled!",
        description: "Your submission is now live in the feed! Check it out and see the community reactions.",
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
