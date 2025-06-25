
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Crown } from 'lucide-react';
import Footer from '@/components/Footer';
import SubmissionModal from '@/components/SubmissionModal';
import TippingModal from '@/components/TippingModal';
import LandingNavigation from '@/components/landing/LandingNavigation';
import TrendingTicker from '@/components/landing/TrendingTicker';
import HeroSection from '@/components/landing/HeroSection';
import LeaderboardPreview from '@/components/landing/LeaderboardPreview';
import SocialProofSection from '@/components/landing/SocialProofSection';
import AboutSection from '@/components/landing/AboutSection';
import MeetTheBuilder from '@/components/landing/MeetTheBuilder';
import LandingHeader from '@/components/landing/LandingHeader';
import LiveStats from '@/components/landing/LiveStats';
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
    if (successType === 'spill') {
      // Navigate to feed after successful submission
      navigate('/feed');
    }
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

      {/* Unified Submission Modal */}
      <SubmissionModal
        isOpen={showSpillForm}
        onClose={() => setShowSpillForm(false)}
        onSubmit={handleSpillSubmit}
        isLoading={isSubmitting}
      />

      {/* Tipping Modal */}
      <TippingModal
        isOpen={showTippingModal}
        onClose={() => setShowTippingModal(false)}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-ctea-dark/95 backdrop-blur-md border border-ctea-teal/30 rounded-lg p-8 max-w-md w-full">
            <div className="text-center space-y-4">
              {successType === 'spill' ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Tea Spilled! ☕</h3>
                  <p className="text-gray-300">
                    Your submission is now live in the feed! Click below to see the community reactions.
                  </p>
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 mt-4">
                    <p className="text-sm text-green-300">
                      💡 Pro tip: Follow us on Twitter for real-time updates and exclusive alpha drops.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSuccessClose}
                      className="flex-1 bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      View in Feed
                    </button>
                    <button
                      onClick={() => setShowSuccessModal(false)}
                      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Crown className="w-16 h-16 text-yellow-500 mx-auto" />
                  <h3 className="text-xl font-bold text-white">VIP Access Granted!</h3>
                  <p className="text-gray-300">
                    Tip sent? DM us your transaction hash for instant access to exclusive features.
                  </p>
                  <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mt-4">
                    <p className="text-sm text-yellow-300">
                      🚀 You'll receive priority access to all new features and exclusive community channels.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="mt-6 bg-gradient-to-r from-ctea-yellow to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Got It!
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Landing;
