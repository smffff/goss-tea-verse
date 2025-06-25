
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-vintage-red rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-tabloid-black rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-vintage-red rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-base text-center px-4 max-w-6xl mx-auto">
          {/* Breaking News Badge */}
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-vintage-red to-tabloid-black text-white font-bold px-4 py-2 text-sm shadow-lg animate-breaking-news">
              <Sparkles className="w-4 h-4 mr-2" />
              BREAKING: GOSSIP INCOMING
            </Badge>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom" 
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 drop-shadow-lg animate-float"
            />
          </div>

          {/* Main Headline - Tabloid Style */}
          <h1 className="text-4xl md:text-7xl font-display font-bold text-vintage-red mb-6 leading-tight tabloid-headline animate-red-glow">
            CTea Newsroom
          </h1>

          {/* Tabloid Subheading */}
          <h2 className="text-xl md:text-3xl text-tabloid-black mb-4 font-bold uppercase tracking-wide font-display">
            Web3's Gossip Feed
          </h2>
          <p className="text-lg md:text-2xl text-vintage-red mb-12 font-bold italic">
            Where crypto's unspoken news gets surfaced
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-tabloid-black mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Submit anonymous intel, vote on rumors, and catch early alpha. 
            The underground newsroom where crypto scandals break first.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={handleSpillClick}
              className="btn-pill btn-pill-red text-white font-bold px-8 py-4 text-lg border-0 shadow-xl btn-tabloid-hover"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Spill the Tea
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleReadClick}
              className="btn-pill border-2 border-tabloid-black text-tabloid-black hover:bg-tabloid-black hover:text-white font-bold px-8 py-4 text-lg shadow-lg btn-tabloid-hover"
            >
              <Eye className="w-5 h-5 mr-2" />
              Read What's Brewing
            </Button>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'SPILL THE TEA', desc: 'Drop anonymous crypto intel', icon: '🕵️' },
              { step: '2', title: 'AI REACTS', desc: 'CTeaBot adds spicy commentary', icon: '🤖' },
              { step: '3', title: 'CROWD JUDGES', desc: 'Community votes: 🔥 or 🧊', icon: '👥' },
              { step: '4', title: 'EARN CLOUT', desc: 'Build credibility & unlock rewards', icon: '🏆' }
            ].map((item) => (
              <div key={item.step} className="text-center p-6 bg-pale-pink rounded-lg border-2 border-vintage-red/20 hover:border-vintage-red/40 transition-colors shadow-lg card-tabloid-hover">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="w-12 h-12 bg-gradient-to-r from-vintage-red to-tabloid-black rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-tabloid-black font-bold mb-2 uppercase tracking-wide font-display">{item.title}</h3>
                <p className="text-tabloid-black/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Teaser Section */}
      <section className="py-16 bg-gradient-to-r from-pale-pink to-newsprint relative z-base">
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
