
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Crown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import TippingModal from '@/components/TippingModal';
import LandingNavigation from '@/components/landing/LandingNavigation';
import TrendingTicker from '@/components/landing/TrendingTicker';
import HeroSection from '@/components/landing/HeroSection';
import LeaderboardPreview from '@/components/landing/LeaderboardPreview';
import SocialProofSection from '@/components/landing/SocialProofSection';
import AboutSection from '@/components/landing/AboutSection';
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
      {/* Simplified Authentication Bar */}
      <div className="bg-ctea-dark/95 backdrop-blur-lg border-b border-ctea-teal/20 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-ctea-teal text-sm font-medium">
            ☕ The Ultimate Crypto Gossip Platform
          </div>
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">Welcome back!</span>
                {(isAdmin || isModerator) && (
                  <Link to="/admin">
                    <Button size="sm" variant="outline" className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link to="/feed">
                  <Button size="sm" className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold">
                    Enter App
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline" className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

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
