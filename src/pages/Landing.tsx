
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Crown } from 'lucide-react';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import TippingModal from '@/components/TippingModal';
import LandingNavigation from '@/components/landing/LandingNavigation';
import TrendingTicker from '@/components/landing/TrendingTicker';
import HeroSection from '@/components/landing/HeroSection';
import LeaderboardPreview from '@/components/landing/LeaderboardPreview';
import SocialProofSection from '@/components/landing/SocialProofSection';
import AboutSection from '@/components/landing/AboutSection';
import LandingHeader from '@/components/landing/LandingHeader';
import { useAuth } from '@/hooks/useAuth';

const Landing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSpillForm, setShowSpillForm] = useState(false);
  const [showTippingModal, setShowTippingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState<'spill' | 'vip'>('spill');
  const { user, isAdmin, isModerator } = useAuth();

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

  const handleSpillSubmit = (data: { tea: string; email: string; wallet: string }) => {
    console.log('Tea spilled:', data);
    setShowSpillForm(false);
    setSuccessType('spill');
    setShowSuccessModal(true);
  };

  const handleVipTip = () => {
    setShowTippingModal(false);
    setSuccessType('vip');
    setShowSuccessModal(true);
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

      {/* Spill Tea Modal */}
      <Modal
        isOpen={showSpillForm}
        onClose={() => setShowSpillForm(false)}
        title="Spill Your Tea ☕"
        showForm={true}
        onSubmit={handleSpillSubmit}
        submitButtonText="Spill Tea"
      />

      {/* Tipping Modal */}
      <TippingModal
        isOpen={showTippingModal}
        onClose={() => setShowTippingModal(false)}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={successType === 'spill' ? "Tea Spilled! ☕" : "VIP Access Granted! 👑"}
      >
        <div className="text-center space-y-4">
          {successType === 'spill' ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-white">Thanks for spilling!</h3>
              <p className="text-gray-300">
                Check your inbox for beta access. We'll review your submission and get back to you within 24 hours.
              </p>
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-300">
                  💡 Pro tip: Follow us on Twitter for real-time updates and exclusive alpha drops.
                </p>
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
            </>
          )}
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default Landing;
