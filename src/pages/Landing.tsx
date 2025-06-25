
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Coffee, Eye, Sparkles } from 'lucide-react';
import FloatingBadges from '@/components/ui/floating-badges';
import StickyCTABar from '@/components/StickyCTABar';
import JoinModal from '@/components/modals/JoinModal';
import SubmissionModal from '@/components/modals/SubmissionModal';
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-amber-100">
      {/* Floating Badges */}
      <FloatingBadges />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Retro newspaper texture overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gray-800 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Beta Badge */}
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-red-500 to-gray-800 text-white font-bold px-4 py-2 text-sm shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              SCANDAL BREWING
            </Badge>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom" 
              className="w-24 h-24 mx-auto mb-4 drop-shadow-lg"
            />
          </div>

          {/* Main Headline - Tabloid Style */}
          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-red-600 via-gray-900 to-red-600 bg-clip-text text-transparent mb-6 font-display leading-tight">
            CTea Newsroom
          </h1>

          {/* Tabloid Subheading */}
          <h2 className="text-xl md:text-3xl text-gray-800 mb-4 font-bold uppercase tracking-wide">
            EXCLUSIVE CRYPTO GOSSIP
          </h2>
          <p className="text-lg md:text-2xl text-red-600 mb-12 font-bold">
            Anonymous Tips • Hot Takes • Cold Hard Truth
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            The underground newsroom where crypto scandals break first. 
            Spill anonymously, earn credibility, watch the chaos unfold.
          </p>

          {/* Updated CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={handleSpillClick}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-4 text-lg border-0 shadow-xl transform hover:scale-105 transition-all"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Spill Tea
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleReadClick}
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-bold px-8 py-4 text-lg shadow-lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              Read What's Brewing
            </Button>
          </div>

          {/* How It Works - Tabloid Style */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'LEAK INFO', desc: 'Drop anonymous crypto intel', icon: '🕵️' },
              { step: '2', title: 'AI REACTS', desc: 'CTeaBot adds spicy commentary', icon: '🤖' },
              { step: '3', title: 'CROWD JUDGES', desc: 'Community votes: hot or cold', icon: '👥' },
              { step: '4', title: 'EARN CLOUT', desc: 'Build credibility & unlock rewards', icon: '🏆' }
            ].map((item) => (
              <div key={item.step} className="text-center p-6 bg-white/80 rounded-lg border-2 border-red-200 hover:border-red-400 transition-colors shadow-lg">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-gray-900 font-bold mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Teaser Section */}
      <section className="py-16 bg-gradient-to-r from-red-100 to-amber-100">
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
