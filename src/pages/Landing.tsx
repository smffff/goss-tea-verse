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
    <div className="min-h-screen bg-gradient-hero pb-sticky-cta">
      {/* Floating Badges */}
      <FloatingBadges />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-vaporwave-gradient pb-12 md:pb-24">
        {/* Vaporwave Gradient Background */}
        <div className="absolute inset-0 z-0 bg-vaporwave-gradient pointer-events-none" />
        {/* Soft Glow Overlay */}
        <div className="absolute inset-0 z-0" style={{boxShadow:'0 0 120px 40px #fff4, 0 0 240px 80px #ffb6ff88'}} />
        {/* Animated BREAKING Banner */}
        <div className="absolute top-8 right-1/2 translate-x-1/2 md:right-12 md:translate-x-0 z-20 animate-breaking-scroll">
          <div className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-headline font-bold rounded-full shadow-lg uppercase tracking-widest text-base md:text-lg border-4 border-black animate-pulse-slow">
            <span role="img" aria-label="alert">🚨</span> BREAKING: GOSSIP INCOMING <span role="img" aria-label="alert">🚨</span>
          </div>
        </div>
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 max-w-3xl mx-auto text-center">
          {/* Animated Teacup Logo */}
          <img 
            src="/ctea-logo-icon.svg" 
            alt="Goss Tea Verse Logo" 
            className="w-28 h-28 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-2xl animate-teacup-wiggle"
            style={{animationDelay:'0.2s'}}
          />
          {/* Tabloid Headline */}
          <h1 className="font-tabloid font-extrabold uppercase text-5xl md:text-7xl text-white mb-4 leading-tight mx-auto neon-glow" style={{textShadow:'0 0 16px #fff, 0 0 32px #ff4c7b, 2px 2px 0 #000'}}>
            Spill Tea. Stack Clout. Stay Shady.
          </h1>
          {/* Subheadline */}
          <p className="font-headline text-xl md:text-2xl text-white mb-8 max-w-xl mx-auto" style={{textShadow:'0 0 8px #ffb6ff, 0 2px 16px #fff'}}>
            Anonymous, viral, and a little bit dangerous.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <TabloidButton
              variant="spill"
              shake={true}
              onClick={handleSpillClick}
              className="shadow-2xl text-lg px-8 py-4 bg-red-600 hover:bg-red-700 border-4 border-black font-extrabold neon-glow"
            >
              🫖 Spill the Tea
            </TabloidButton>
            <TabloidButton
              variant="read"
              onClick={handleReadClick}
              className="shadow-2xl text-lg px-8 py-4 bg-black hover:bg-red-700 text-white border-4 border-white font-extrabold neon-glow"
            >
              🎤 Read What's Brewing
            </TabloidButton>
          </div>
        </div>
      </section>

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
  );
};

export default Landing;
