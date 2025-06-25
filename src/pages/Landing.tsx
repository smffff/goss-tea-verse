import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Coffee, Eye, Sparkles } from 'lucide-react';
import FloatingBadges from '@/components/ui/floating-badges';
import StickyCTABar from '@/components/StickyCTABar';
import JoinModal from '@/components/modals/JoinModal';
import SubmissionModal from '@/components/SubmissionModal';
import TipModal from '@/components/modals/TipModal';
import LeaderboardTeaser from '@/components/LeaderboardTeaser';
import TabloidButton from '@/components/ui/TabloidButton';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useToast } from '@/hooks/use-toast';
import { track, trackEnteredJoinFlow, trackFunnelStep } from '@/utils/analytics';
import HeroSection from '@/components/Hero';
import Layout from '@/components/Layout';

const Landing = () => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Lock scroll when modals are open
  useScrollLock(showJoinModal || showSubmissionModal || showTipModal);

  const handleSpillClick = () => {
    trackFunnelStep('spill_cta_clicked');
    trackEnteredJoinFlow('hero_cta');
    setShowJoinModal(true);
  };

  const handleReadClick = () => {
    trackFunnelStep('read_cta_clicked');
    navigate('/feed');
  };

  const handleAnonymousSpill = () => {
    setShowJoinModal(false);
    setShowSubmissionModal(true);
    track('chose_anonymous_mode');
  };

  const handleSignInSpill = () => {
    setShowJoinModal(false);
    navigate('/auth');
    track('chose_signin_mode');
  };

  const handleSubmission = async (data: { content: string; wallet?: string; email?: string }) => {
    setIsSubmitting(true);
    
    console.log('Submission data:', data);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSubmissionModal(false);
      
      toast({
        title: "Tea Spilled Successfully! 🫖",
        description: "Your gossip is brewing and will appear in the feed shortly!",
      });
      
      trackFunnelStep('tea_submitted');
      navigate('/feed');
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-hero pb-sticky-cta">
        {/* Floating Badges */}
        <FloatingBadges />

        {/* Hero Section */}
        <HeroSection showDisclaimer={true} />

        {/* Leaderboard Teaser Section */}
        <section className="py-20 bg-gradient-to-r from-pale-pink to-newsprint relative z-base">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <LeaderboardTeaser />
            </div>
          </div>
        </section>

        {/* Sticky CTA Bar */}
        <StickyCTABar 
          onSpillClick={handleSpillClick}
          onReadClick={handleReadClick}
        />

        {/* Modals */}
        <JoinModal
          isOpen={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          onAnonymous={handleAnonymousSpill}
          onSignIn={handleSignInSpill}
        />

        <SubmissionModal
          isOpen={showSubmissionModal}
          onClose={() => setShowSubmissionModal(false)}
          onSubmit={handleSubmission}
          isLoading={isSubmitting}
        />

        <TipModal
          isOpen={showTipModal}
          onClose={() => setShowTipModal(false)}
        />
      </div>
    </Layout>
  );
};

export default Landing;
