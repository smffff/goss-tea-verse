
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
import { 
  getOrCreateSecureToken, 
  validateContentSecurity,
  sanitizeUrls,
  checkClientRateLimit
} from '@/utils/securityEnhanced';

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

  // Check for ?ref= parameter on component mount
  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
      setShowSpillForm(true);
      // Clean up URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('ref');
      const newUrl = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
      navigate(`/${newUrl}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const handleSpillSubmit = async (data: SubmissionData) => {
    if (isSubmitting || !data?.tea) {
      if (!data?.tea) {
        toast({
          title: "Submission Failed",
          description: "Please provide valid tea content",
          variant: "destructive"
        });
      }
      return;
    }

    // Client-side rate limiting
    if (!checkClientRateLimit('submission', 3, 60)) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait before submitting again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Enhanced content validation
      const validation = validateContentSecurity(data.tea);
      
      if (!validation.isValid) {
        throw new Error(`Content validation failed: ${validation.threats.join(', ')}`);
      }

      // Enhanced URL sanitization
      const sanitizedUrls = sanitizeUrls(data.evidence_urls || []);
      
      // Generate secure anonymous token
      const anonymousToken = getOrCreateSecureToken();

      // Prepare submission data with enhanced security
      const submissionData = {
        content: validation.sanitized,
        category: data.category || 'general',
        evidence_urls: sanitizedUrls.length > 0 ? sanitizedUrls : null,
        anonymous_token: anonymousToken,
        status: 'approved',
        has_evidence: sanitizedUrls.length > 0,
        reactions: { hot: 0, cold: 0, spicy: 0 },
        average_rating: 0,
        rating_count: 0
      };

      // Insert into Supabase with enhanced validation
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

      setShowSpillForm(false);
      setSuccessType('spill');
      setShowSuccessModal(true);

    } catch (error) {
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

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-ctea-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

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
