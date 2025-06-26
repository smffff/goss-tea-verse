import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Coffee, Eye, Sparkles } from 'lucide-react';
import FloatingBadges from '@/components/ui/floating-badges';
import FloatingEmojis from '@/components/ui/FloatingEmojis';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import ViralCTA from '@/components/ui/ViralCTA';
import ParallaxElement from '@/components/ui/ParallaxElement';
import StickyCTABar from '@/components/StickyCTABar';
import JoinModal from '@/components/modals/JoinModal';
import SubmissionModal from '@/components/SubmissionModal';
import TipModal from '@/components/modals/TipModal';
import LeaderboardTeaser from '@/components/LeaderboardTeaser';
import TabloidButton from '@/components/ui/TabloidButton';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useToast } from '@/hooks/use-toast';
import { track, trackEnteredJoinFlow, trackFunnelStep } from '@/utils/analytics';
import TeaCup from '@/components/TeaCup';

// Build Mode Banner
const BuildModeBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('buildBannerDismissed')) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-center bg-gradient-to-r from-pink-400 via-purple-400 to-teal-300 text-white py-2 px-4 shadow-lg animate-fadeInUp">
      <span className="font-bold text-shadow-glow text-base flex items-center gap-2">
        ⚠️ The tea's still brewing — occasional bugs may occur.
      </span>
      <button
        className="ml-4 px-3 py-1 rounded-full bg-white/20 hover:bg-white/40 transition text-white font-bold text-xs border border-white/30"
        onClick={() => {
          setVisible(false);
          localStorage.setItem('buildBannerDismissed', '1');
        }}
      >
        Dismiss
      </button>
    </div>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // Add animation state for hero
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

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
    <div className="min-h-screen bg-background pb-sticky-cta">
      <BuildModeBanner />
      <ScrollProgressBar />
      
      {/* Floating Elements */}
      <FloatingBadges />
      <FloatingEmojis />

      {/* Hero Section with Enhanced Parallax */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-vaporwave transition-all duration-700 ${heroVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}>
        {/* Enhanced Vaporwave background overlays with parallax */}
        <ParallaxElement speed={0.3} direction="up" className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-400 rounded-full blur-3xl animate-pulse"></div>
        </ParallaxElement>
        
        <ParallaxElement speed={0.5} direction="down" className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </ParallaxElement>
        
        <ParallaxElement speed={0.2} direction="up" className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </ParallaxElement>

        <div className="relative z-base text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
          {/* Teacup Icon with Enhanced Parallax */}
          <ParallaxElement speed={0.4} direction="up" delay={0.2} className="mb-6">
            <div className="animate-float" style={{ zIndex: 2 }}>
              <TeaCup className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-2xl" animated />
            </div>
          </ParallaxElement>

          {/* Main Headline with Parallax */}
          <ParallaxElement speed={0.6} direction="up" delay={0.4}>
            <h1 className="text-5xl md:text-8xl font-headline font-bold text-white mb-6 leading-tight text-shadow-glow uppercase tracking-wider animate-pulse-glow">
              CTea Newsroom
            </h1>
          </ParallaxElement>

          {/* Tagline with Parallax */}
          <ParallaxElement speed={0.5} direction="up" delay={0.6}>
            <h2 className="text-2xl md:text-4xl text-white mb-4 font-headline font-bold uppercase tracking-widest text-shadow-glow">
              Web3's Gossip Feed
            </h2>
          </ParallaxElement>

          <ParallaxElement speed={0.4} direction="up" delay={0.8}>
            <p className="text-xl md:text-3xl text-pink-200 mb-10 font-bold italic font-headline text-shadow-glow">
              Where crypto's unspoken news gets surfaced
            </p>
          </ParallaxElement>

          {/* Description with Parallax */}
          <ParallaxElement speed={0.3} direction="up" delay={1.0}>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Submit anonymous intel, vote on rumors, and catch early alpha. The underground newsroom where crypto scandals break first.
            </p>
          </ParallaxElement>

          {/* Enhanced CTA Buttons with Viral CTAs */}
          <ParallaxElement speed={0.2} direction="up" delay={1.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <ViralCTA
                variant="spill"
                size="lg"
                onClick={handleSpillClick}
                className="shadow-2xl animate-pulse-glow hover:animate-teacup-shake hover:shadow-pink-400/60 hover:scale-110"
                showParticles={true}
                shakeOnHover={true}
              >
                <span className="mr-3">🫖</span>
                Spill Gossip
              </ViralCTA>
              
              <ViralCTA
                variant="connect"
                size="lg"
                onClick={handleReadClick}
                className="shadow-2xl animate-pulse-glow hover:shadow-teal-300/60 hover:scale-110"
                showParticles={true}
                shakeOnHover={false}
              >
                Connect Wallet
              </ViralCTA>
            </div>
          </ParallaxElement>

          {/* Enhanced How It Works with Parallax */}
          <ParallaxElement speed={0.1} direction="up" delay={1.4}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: '1', title: 'SPILL THE TEA', desc: 'Drop anonymous crypto intel', icon: '🕵️', color: 'from-vintage-red to-vintage-red-700' },
                { step: '2', title: 'AI REACTS', desc: 'CTeaBot adds spicy commentary', icon: '🤖', color: 'from-tabloid-black to-tabloid-black-800' },
                { step: '3', title: 'CROWD JUDGES', desc: 'Community votes: 🔥 or 🧊', icon: '👥', color: 'from-neon-pink to-vintage-red' },
                { step: '4', title: 'EARN CLOUT', desc: 'Build credibility & unlock rewards', icon: '🏆', color: 'from-vintage-red to-tabloid-black' }
              ].map((item, index) => (
                <ParallaxElement
                  key={item.step}
                  speed={0.2}
                  direction="up"
                  delay={1.6 + index * 0.1}
                  className="text-center p-8 bg-pale-pink rounded-xl border-3 border-vintage-red/30 hover:border-vintage-red/60 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
                >
                  <div className="text-5xl mb-4 animate-float">{item.icon}</div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-tabloid text-2xl mx-auto mb-6 shadow-lg`}>
                    {item.step}
                  </div>
                  <h3 className="text-tabloid-black font-headline font-bold mb-3 uppercase tracking-wider text-lg">{item.title}</h3>
                  <p className="text-tabloid-black/70 font-medium">{item.desc}</p>
                </ParallaxElement>
              ))}
            </div>
          </ParallaxElement>
        </div>
      </section>

      {/* Leaderboard Teaser Section with Parallax */}
      <ParallaxElement speed={0.3} direction="up">
        <section className="py-20 bg-gradient-to-r from-pale-pink to-newsprint relative z-base">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <LeaderboardTeaser />
            </div>
          </div>
        </section>
      </ParallaxElement>

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
        isSubmitting={isSubmitting}
      />

      <TipModal
        isOpen={showTipModal}
        onClose={() => setShowTipModal(false)}
      />
    </div>
  );
};

export default Landing;
