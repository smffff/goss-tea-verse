
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import SubmissionModal from '@/components/SubmissionModal';
import SubmissionSuccessModal from '@/components/SubmissionSuccessModal';
import TippingModal from '@/components/TippingModal';
import LandingNavigation from '@/components/landing/LandingNavigation';
import TrendingTicker from '@/components/landing/TrendingTicker';
import HeroSection from '@/components/landing/HeroSection';
import LeaderboardPreview from '@/components/landing/LeaderboardPreview';
import SocialProofSection from '@/components/landing/SocialProofSection';
import AboutSection from '@/components/landing/AboutSection';
import MeetTheBuilder from '@/components/landing/MeetTheBuilder';
import LandingHeader from '@/components/landing/LandingHeader';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
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

const Landing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSpillForm, setShowSpillForm] = useState(false);
  const [showTippingModal, setShowTippingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState<'spill' | 'vip'>('spill');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAdmin, isModerator } = useAuth();
  const { toast } = useToast();

  // Check for ?ref= parameter on component mount
  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
      setShowSpillForm(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('ref');
      const newUrl = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
      navigate(`/${newUrl}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const handleSpillSubmit = async (data: SubmissionData) => {
    console.log('Landing - handleSpillSubmit called with data:', data);
    
    if (isSubmitting) {
      console.log('Landing - Already submitting, preventing duplicate submission');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate secure anonymous token
      const anonymousToken = getOrCreateSecureToken();

      // Prepare submission data
      const submissionData = {
        content: data.tea.trim(),
        category: data.category || 'general',
        evidence_urls: data.evidence_urls && data.evidence_urls.length > 0 ? data.evidence_urls : null,
        anonymous_token: anonymousToken,
        status: 'approved',
        has_evidence: data.evidence_urls && data.evidence_urls.length > 0,
        reactions: { hot: 0, cold: 0, spicy: 0 },
        average_rating: 0,
        rating_count: 0
      };

      // Validate content
      if (!submissionData.content || submissionData.content.length < 3) {
        throw new Error('Content must be at least 3 characters long');
      }

      if (submissionData.content.length > 2000) {
        throw new Error('Content must be less than 2000 characters');
      }

      // Insert into Supabase
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

      console.log('Landing - Submission successful');
      setShowSpillForm(false);
      setSuccessType('spill');
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Landing - Submission error:', error);
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVipTip = () => {
    setShowTippingModal(false);
    setSuccessType('vip');
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  const handleViewFeed = () => {
    setShowSuccessModal(false);
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      <LandingHeader 
        user={user}
        isAdmin={isAdmin}
        isModerator={isModerator}
      />
      <LandingNavigation />
      <TrendingTicker />
      <HeroSection 
        onSpillFormOpen={() => setShowSpillForm(true)}
        onTippingModalOpen={() => setShowTippingModal(true)}
      />
      <LeaderboardPreview />
      <SocialProofSection />
      <AboutSection />
      <MeetTheBuilder />

      <SubmissionModal
        isOpen={showSpillForm}
        onClose={() => setShowSpillForm(false)}
        onSubmit={handleSpillSubmit}
        isLoading={isSubmitting}
      />

      <TippingModal
        isOpen={showTippingModal}
        onClose={() => setShowTippingModal(false)}
      />

      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        successType={successType}
        onViewFeed={handleViewFeed}
      />

      <Footer />
    </div>
  );
};

export default Landing;
