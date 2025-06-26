
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Coffee, Crown, Gift, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCryptoHumor } from '@/hooks/useCryptoHumor';
import { useScrollLock } from '@/hooks/useScrollLock';
import { trackEnteredJoinFlow, trackFunnelStep } from '@/utils/analytics';

// Optimized sub-components
import OptimizedFloatingElements from './OptimizedFloatingElements';
import TeaSpillModal from './TeaSpillModal';
import TipModal from './TipModal';
import ViralCTA from '@/components/ui/ViralCTA';
import ParallaxElement from '@/components/ui/ParallaxElement';
import JoinModal from '@/components/modals/JoinModal';
import SubmissionModal from './SubmissionModal';
import StickyCTABar from './StickyCTABar';
import TeaCup from './TeaCup';

interface ConsolidatedAppProps {
  onAccessGranted: () => void;
}

const ConsolidatedApp: React.FC<ConsolidatedAppProps> = ({ onAccessGranted }) => {
  // State management
  const [appPhase, setAppPhase] = useState<'gate' | 'landing' | 'onboarding'>('gate');
  const [showModals, setShowModals] = useState({
    spill: false,
    tip: false,
    join: false,
    submission: false
  });
  const [betaCode, setBetaCode] = useState('');
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const humor = useCryptoHumor(appPhase);

  // Lock scroll when modals are open
  const hasOpenModal = Object.values(showModals).some(Boolean);
  useScrollLock(hasOpenModal);

  // Check existing access
  useEffect(() => {
    const hasAccess = localStorage.getItem('ctea-beta-access');
    if (hasAccess) {
      setAppPhase('landing');
    }
  }, []);

  // Memoized handlers for performance
  const modalHandlers = useMemo(() => ({
    closeAll: () => setShowModals({ spill: false, tip: false, join: false, submission: false }),
    openSpill: () => {
      trackFunnelStep('spill_cta_clicked');
      setShowModals(prev => ({ ...prev, spill: true }));
    },
    openTip: () => setShowModals(prev => ({ ...prev, tip: true })),
    openJoin: () => {
      trackEnteredJoinFlow('hero_cta');
      setShowModals(prev => ({ ...prev, join: true }));
    },
    openSubmission: () => setShowModals(prev => ({ ...prev, submission: true }))
  }), []);

  const validateBetaCode = async () => {
    if (!betaCode.trim()) {
      toast({
        title: "Enter Beta Code",
        description: humor.getRandomErrorMessage()?.message || "Please enter your beta access code",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    const loadingMessage = humor.getRandomLoadingMessage();
    
    try {
      const { data, error } = await supabase.rpc('validate_beta_code', {
        code: betaCode.trim().toUpperCase()
      });

      if (error) throw error;

      const result = data as any;
      
      if (result?.valid) {
        localStorage.setItem('ctea-beta-access', 'true');
        localStorage.setItem('ctea-beta-code', betaCode.trim().toUpperCase());
        
        const successMessage = humor.getRandomSuccessMessage();
        toast({
          title: `${successMessage?.emoji || '🫖'} ${successMessage?.message || 'Welcome to CTea News!'}`,
          description: "Beta access granted. Welcome to the exclusive preview!",
        });
        
        setAppPhase('landing');
      } else {
        const errorMessage = humor.getRandomErrorMessage();
        toast({
          title: "Invalid Code",
          description: errorMessage?.message || "The beta code is invalid or expired. Try earning access instead!",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Beta validation error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSpillSuccess = () => {
    modalHandlers.closeAll();
    localStorage.setItem('ctea-beta-access', 'true');
    localStorage.setItem('ctea-beta-method', 'spill');
    
    const successMessage = humor.getRandomSuccessMessage();
    toast({
      title: `${successMessage?.emoji || '🫖'} ${successMessage?.message || 'Tea Spilled Successfully!'}`,
      description: "Welcome to CTea News beta! Your gossip earned you access.",
    });
    
    setAppPhase('landing');
  };

  const handleTipSuccess = () => {
    modalHandlers.closeAll();
    localStorage.setItem('ctea-beta-access', 'true');
    localStorage.setItem('ctea-beta-method', 'tip');
    
    toast({
      title: "Thanks for the Tip! 💰",
      description: "Welcome to CTea News beta! Your generosity is appreciated.",
    });
    
    setAppPhase('landing');
  };

  const handleAnonymousSpill = () => {
    setShowModals(prev => ({ ...prev, join: false, submission: true }));
  };

  const handleSignInSpill = () => {
    modalHandlers.closeAll();
    navigate('/auth');
  };

  const handleSubmission = async (data: { content: string; wallet?: string; email?: string }) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      modalHandlers.closeAll();
      
      const successMessage = humor.getRandomSuccessMessage();
      toast({
        title: `${successMessage?.emoji || '🫖'} ${successMessage?.message || 'Tea Spilled Successfully!'}`,
        description: "Your gossip is brewing and will appear in the feed shortly!",
      });
      
      trackFunnelStep('tea_submitted');
      navigate('/feed');
    }, 2000);
  };

  // Render based on current phase
  const renderGatePhase = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 cyber-grid" />
      <OptimizedFloatingElements />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl mx-auto text-center">
          <ParallaxElement speed={0.4} direction="up" delay={0.2} className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse">
              <Coffee className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider animate-neon-flicker">
              CTEA NEWS
            </h1>
            <div className="text-2xl md:text-3xl text-cyan-300 font-bold mb-2 tracking-widest animate-pulse-glow">
              {humor.getBetaMessage()?.message || 'BETA ACCESS REQUIRED'}
            </div>
            <div className="text-lg text-pink-300 italic animate-float">
              Web3's Hottest Gossip Feed
            </div>
          </ParallaxElement>

          {!showCodeEntry ? (
            <Card className="bg-black/50 backdrop-blur-lg border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20 neon-border">
              <CardContent className="p-8 space-y-6">
                <div className="text-xl text-white font-bold mb-6 tracking-wide animate-pulse-glow">
                  CHOOSE YOUR PATH TO ACCESS
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ViralCTA
                    variant="spill"
                    size="lg"
                    onClick={modalHandlers.openSpill}
                    className="h-32 shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 transition-all duration-300"
                    showParticles={true}
                    shakeOnHover={true}
                  >
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2" />
                      <div>SPILL TEA</div>
                      <div>FOR BETA ACCESS</div>
                      <div className="text-sm opacity-80 mt-1">Share crypto gossip</div>
                    </div>
                  </ViralCTA>

                  <ViralCTA
                    variant="connect"
                    size="lg"
                    onClick={modalHandlers.openTip}
                    className="h-32 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-300"
                    showParticles={true}
                    shakeOnHover={false}
                  >
                    <div className="text-center">
                      <Crown className="w-8 h-8 mx-auto mb-2" />
                      <div>BRIBE THE</div>
                      <div>GATEKEEPERS</div>
                      <div className="text-sm opacity-80 mt-1">Tip for instant access</div>
                    </div>
                  </ViralCTA>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <Button
                    variant="ghost"
                    onClick={() => setShowCodeEntry(true)}
                    className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-900/20 animate-pulse-glow"
                  >
                    Already have a beta code? Enter it here
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black/50 backdrop-blur-lg border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20 neon-border">
              <CardContent className="p-8">
                <div className="text-xl text-white font-bold mb-6 tracking-wide animate-pulse-glow">
                  ENTER BETA CODE
                </div>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter your beta code..."
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value)}
                    className="bg-black/30 border-cyan-400/50 text-white placeholder:text-cyan-300/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                    onKeyPress={(e) => e.key === 'Enter' && validateBetaCode()}
                  />
                  <div className="flex gap-3">
                    <ViralCTA
                      variant="spill"
                      size="md"
                      onClick={validateBetaCode}
                      disabled={isValidating}
                      className="flex-1"
                      showParticles={false}
                      shakeOnHover={false}
                    >
                      {isValidating ? 'Validating...' : 'Validate Code'}
                    </ViralCTA>
                    <Button
                      variant="ghost"
                      onClick={() => setShowCodeEntry(false)}
                      className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-900/20"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  const renderLandingPhase = () => (
    <div className="min-h-screen bg-background pb-sticky-cta">
      <OptimizedFloatingElements />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-vaporwave">
        <div className="relative z-base text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
          <ParallaxElement speed={0.4} direction="up" delay={0.2} className="mb-6">
            <div className="animate-float">
              <TeaCup className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-2xl" animated />
            </div>
          </ParallaxElement>

          <ParallaxElement speed={0.6} direction="up" delay={0.4}>
            <h1 className="text-5xl md:text-8xl font-headline font-bold text-white mb-6 leading-tight text-shadow-glow uppercase tracking-wider animate-pulse-glow">
              CTea Newsroom
            </h1>
          </ParallaxElement>

          <ParallaxElement speed={0.5} direction="up" delay={0.6}>
            <h2 className="text-2xl md:text-4xl text-white mb-4 font-headline font-bold uppercase tracking-widest text-shadow-glow">
              Web3's Gossip Feed
            </h2>
          </ParallaxElement>

          <ParallaxElement speed={0.4} direction="up" delay={0.8}>
            <p className="text-xl md:text-3xl text-pink-200 mb-10 font-bold italic font-headline text-shadow-glow">
              {humor.getBetaMessage()?.message || 'Where crypto\'s unspoken news gets surfaced'}
            </p>
          </ParallaxElement>

          <ParallaxElement speed={0.2} direction="up" delay={1.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <ViralCTA
                variant="spill"
                size="lg"
                onClick={modalHandlers.openJoin}
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
                onClick={() => navigate('/feed')}
                className="shadow-2xl animate-pulse-glow hover:shadow-teal-300/60 hover:scale-110"
                showParticles={true}
                shakeOnHover={false}
              >
                Connect Wallet
              </ViralCTA>
            </div>
          </ParallaxElement>
        </div>
      </section>

      <StickyCTABar 
        onSpillClick={modalHandlers.openJoin}
        onReadClick={() => navigate('/feed')}
      />
    </div>
  );

  return (
    <>
      {appPhase === 'gate' ? renderGatePhase() : renderLandingPhase()}

      {/* Modals */}
      <TeaSpillModal
        isOpen={showModals.spill}
        onClose={modalHandlers.closeAll}
        onSuccess={handleSpillSuccess}
      />

      <TipModal
        isOpen={showModals.tip}
        onClose={modalHandlers.closeAll}
        onSuccess={handleTipSuccess}
      />

      <JoinModal
        isOpen={showModals.join}
        onClose={modalHandlers.closeAll}
        onAnonymous={handleAnonymousSpill}
        onSignIn={handleSignInSpill}
      />

      <SubmissionModal
        isOpen={showModals.submission}
        onClose={modalHandlers.closeAll}
        onSubmit={handleSubmission}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default ConsolidatedApp;
