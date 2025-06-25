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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-vintage-red rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-tabloid-black rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-vintage-red rounded-full blur-3xl animate-pulse delay-2000"></div>
          {/* New neon accent */}
          <div className="absolute top-32 right-20 w-24 h-24 bg-neon-pink rounded-full blur-2xl animate-pulse delay-500 opacity-30"></div>
        </div>

        <div className="relative z-base text-center px-4 max-w-6xl mx-auto">
          {/* Breaking News Badge */}
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-vintage-red to-tabloid-black text-white font-headline font-bold px-6 py-3 text-base shadow-xl animate-headline-pulse uppercase tracking-wider">
              <Sparkles className="w-5 h-5 mr-2" />
              BREAKING: GOSSIP INCOMING
            </Badge>
          </div>

          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom" 
              className="w-28 h-28 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-2xl animate-float"
            />
          </div>

          {/* Main Headline - Enhanced Tabloid Style */}
          <h1 className="text-5xl md:text-8xl font-tabloid font-bold text-vintage-red mb-8 leading-tight animate-headline-pulse uppercase tracking-wider" 
              style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.3)' }}>
            CTea Newsroom
          </h1>

          {/* Tabloid Subheading */}
          <h2 className="text-2xl md:text-4xl text-tabloid-black mb-6 font-headline font-bold uppercase tracking-widest">
            Web3's Gossip Feed
          </h2>
          <p className="text-xl md:text-3xl text-vintage-red mb-12 font-bold italic font-headline">
            Where crypto's unspoken news gets surfaced
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-tabloid-black mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            Submit anonymous intel, vote on rumors, and catch early alpha. 
            The underground newsroom where crypto scandals break first.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <TabloidButton
              variant="spill"
              shake={true}
              onClick={handleSpillClick}
              className="shadow-2xl"
            >
              <Coffee className="w-6 h-6 mr-3" />
              Spill the Tea
              <ArrowRight className="w-6 h-6 ml-3" />
            </TabloidButton>
            
            <TabloidButton
              variant="read"
              onClick={handleReadClick}
              className="shadow-2xl"
            >
              <Eye className="w-6 h-6 mr-3" />
              Read What's Brewing
            </TabloidButton>
          </div>

          {/* Enhanced How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'SPILL THE TEA', desc: 'Drop anonymous crypto intel', icon: '🕵️', color: 'from-vintage-red to-vintage-red-700' },
              { step: '2', title: 'AI REACTS', desc: 'CTeaBot adds spicy commentary', icon: '🤖', color: 'from-tabloid-black to-tabloid-black-800' },
              { step: '3', title: 'CROWD JUDGES', desc: 'Community votes: 🔥 or 🧊', icon: '👥', color: 'from-neon-pink to-vintage-red' },
              { step: '4', title: 'EARN CLOUT', desc: 'Build credibility & unlock rewards', icon: '🏆', color: 'from-vintage-red to-tabloid-black' }
            ].map((item) => (
              <div key={item.step} className="text-center p-8 bg-pale-pink rounded-xl border-3 border-vintage-red/30 hover:border-vintage-red/60 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300">
                <div className="text-5xl mb-4 animate-float">{item.icon}</div>
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-tabloid text-2xl mx-auto mb-6 shadow-lg`}>
                  {item.step}
                </div>
                <h3 className="text-tabloid-black font-headline font-bold mb-3 uppercase tracking-wider text-lg">{item.title}</h3>
                <p className="text-tabloid-black/70 font-medium">{item.desc}</p>
              </div>
            ))}
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
