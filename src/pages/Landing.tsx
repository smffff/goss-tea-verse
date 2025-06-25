
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
  const { user, isAdmin, isModerator, loading } = useAuth();
  const { toast } = useToast();

  console.log('[Landing] Component rendered, auth state:', { 
    user: user?.email, 
    isAdmin, 
    isModerator, 
    loading,
    showSpillForm,
    isSubmitting 
  });

  // Check for ?ref= parameter on component mount
  useEffect(() => {
    console.log('[Landing] Effect running, checking ref parameter');
    
    try {
      const refParam = searchParams.get('ref');
      if (refParam) {
        console.log('[Landing] Found ref parameter:', refParam, 'opening spill form');
        setShowSpillForm(true);
        
        // Clean up URL
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('ref');
        const newUrl = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
        navigate(`/${newUrl}`, { replace: true });
      }
    } catch (error) {
      console.error('[Landing] Error processing ref parameter:', error);
    }
  }, [searchParams, navigate]);

  const handleSpillSubmit = async (data: SubmissionData) => {
    console.log('[Landing] handleSpillSubmit called with data:', data);
    
    if (isSubmitting) {
      console.log('[Landing] Already submitting, preventing duplicate submission');
      return;
    }
    
    if (!data || !data.tea) {
      console.error('[Landing] Invalid submission data:', data);
      toast({
        title: "Submission Failed",
        description: "Please provide valid tea content",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('[Landing] Starting submission process');
      
      // Generate secure anonymous token
      const anonymousToken = getOrCreateSecureToken();
      console.log('[Landing] Generated anonymous token');

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

      console.log('[Landing] Prepared submission data:', submissionData);

      // Validate content
      if (!submissionData.content || submissionData.content.length < 3) {
        throw new Error('Content must be at least 3 characters long');
      }

      if (submissionData.content.length > 2000) {
        throw new Error('Content must be less than 2000 characters');
      }

      console.log('[Landing] Content validation passed, inserting into Supabase');

      // Insert into Supabase
      const { data: result, error } = await supabase
        .from('tea_submissions')
        .insert(submissionData)
        .select();

      if (error) {
        console.error('[Landing] Supabase insertion error:', error);
        throw new Error(`Submission failed: ${error.message}`);
      }

      if (!result || result.length === 0) {
        console.error('[Landing] No data returned from Supabase');
        throw new Error('Submission failed: No data returned');
      }

      console.log('[Landing] Submission successful:', result);
      setShowSpillForm(false);
      setSuccessType('spill');
      setShowSuccessModal(true);

    } catch (error) {
      console.error('[Landing] Submission error:', error);
      toast({
        title: "Submission Failed",
        description: `Couldn't submit your tea: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive"
      });
    } finally {
      console.log('[Landing] Setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  const handleVipTip = () => {
    console.log('[Landing] VIP tip action triggered');
    setShowTippingModal(false);
    setSuccessType('vip');
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    console.log('[Landing] Success modal closed');
    setShowSuccessModal(false);
  };

  const handleViewFeed = () => {
    console.log('[Landing] Navigating to feed from success modal');
    setShowSuccessModal(false);
    navigate('/feed');
  };

  const handleSpillFormOpen = () => {
    console.log('[Landing] Spill form opened');
    setShowSpillForm(true);
  };

  const handleTippingModalOpen = () => {
    console.log('[Landing] Tipping modal opened');
    setShowTippingModal(true);
  };

  // Show loading state while auth is initializing
  if (loading) {
    console.log('[Landing] Showing loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ctea-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('[Landing] Rendering main landing page');

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
        onSpillFormOpen={handleSpillFormOpen}
        onTippingModalOpen={handleTippingModalOpen}
      />
      <LeaderboardPreview />
      <SocialProofSection />
      <AboutSection />
      <MeetTheBuilder />

      <SubmissionModal
        isOpen={showSpillForm}
        onClose={() => {
          console.log('[Landing] Spill form closed');
          setShowSpillForm(false);
        }}
        onSubmit={handleSpillSubmit}
        isLoading={isSubmitting}
      />

      <TippingModal
        isOpen={showTippingModal}
        onClose={() => {
          console.log('[Landing] Tipping modal closed');
          setShowTippingModal(false);
        }}
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
