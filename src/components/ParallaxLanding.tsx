
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Coffee, Sparkles, Crown, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import TeaCup from '@/components/TeaCup';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ParallaxLanding: React.FC = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedPath, setSelectedPath] = useState<'spill' | 'bribe' | 'code' | null>(null);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const middleY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);

  const handleAccessPath = (path: 'spill' | 'bribe' | 'code') => {
    setSelectedPath(path);
    setShowAccessModal(true);
  };

  const handleAccessSubmit = () => {
    if (selectedPath === 'code' && accessCode.toLowerCase() === 'tea') {
      toast({
        title: "Access Granted! 🫖",
        description: "Welcome to CTea Newsroom!",
      });
      navigate('/feed');
    } else if (selectedPath === 'spill') {
      toast({
        title: "Tea Spillers Welcome! ☕",
        description: "Your access code is: TEA",
      });
      setAccessCode('TEA');
      setTimeout(() => navigate('/feed'), 2000);
    } else if (selectedPath === 'bribe') {
      toast({
        title: "Bribe Accepted! 💰",
        description: "Your access code is: TEA",
      });
      setAccessCode('TEA');
      setTimeout(() => navigate('/feed'), 2000);
    } else {
      toast({
        title: "Invalid Code",
        description: "Try 'TEA' or choose another path!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a]">
      {/* Background Layer - VHS Grid (Slowest) */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300d1c1" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </motion.div>

      {/* Middle Layer - Floating Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: middleY }}
      >
        {/* Floating Emojis */}
        <ParallaxElement speed={0.3} direction="up" className="absolute top-20 left-10">
          <div className="text-6xl animate-float opacity-60">🫖</div>  
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down" className="absolute top-40 right-20">
          <div className="text-5xl animate-float opacity-70 animation-delay-1000">💅</div>
        </ParallaxElement>
        <ParallaxElement speed={0.2} direction="up" className="absolute bottom-40 left-20">
          <div className="text-4xl animate-float opacity-50 animation-delay-2000">👀</div>
        </ParallaxElement>
        <ParallaxElement speed={0.5} direction="right" className="absolute top-60 left-1/2">
          <div className="text-5xl animate-float opacity-60 animation-delay-1500">🔥</div>
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left" className="absolute bottom-60 right-10">
          <div className="text-4xl animate-float opacity-70 animation-delay-500">😤</div>
        </ParallaxElement>
      </motion.div>

      {/* Foreground Content */}
      <motion.div 
        className="relative z-10"
        style={{ y: foregroundY }}
      >
        {/* Panel 1: Hero */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <ParallaxElement speed={0.6} direction="up" delay={0.2}>
              <div className="mb-8 animate-float">
                <TeaCup className="w-32 h-32 md:w-48 md:h-48 mx-auto filter drop-shadow-2xl" animated />
              </div>
            </ParallaxElement>

            <ParallaxElement speed={0.4} direction="up" delay={0.4}>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" 
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                <span className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] bg-clip-text text-transparent">
                  CTea Newsroom
                </span>
              </h1>
            </ParallaxElement>

            <ParallaxElement speed={0.3} direction="up" delay={0.6}>
              <p className="text-2xl md:text-3xl text-[#00d1c1] mb-4 font-bold italic">
                Managed chaos, served hot.
              </p>
              <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
                Where the alpha is spicy and the memes are hot
              </p>
            </ParallaxElement>

            <ParallaxElement speed={0.2} direction="up" delay={0.8}>
              <Button
                onClick={() => setShowAccessModal(true)}
                className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:from-[#ff61a6] hover:to-[#00d1c1] text-white text-xl px-12 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl animate-pulse"
              >
                Enter the Newsroom
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </ParallaxElement>
          </div>
        </section>

        {/* Panel 2: Choose Your Chaos */}
        <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-transparent to-[#1b1b1b]/50">
          <div className="text-center max-w-5xl mx-auto">
            <ParallaxElement speed={0.3} direction="up">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-16" 
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                Choose Your <span className="text-[#ff61a6]">Chaos</span>
              </h2>
            </ParallaxElement>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ParallaxElement speed={0.4} direction="up" delay={0.2}>
                <div 
                  onClick={() => handleAccessPath('spill')}
                  className="bg-gradient-to-b from-[#00d1c1]/20 to-[#00d1c1]/5 border-2 border-[#00d1c1]/30 rounded-2xl p-8 cursor-pointer hover:border-[#00d1c1] hover:shadow-xl hover:shadow-[#00d1c1]/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-6xl mb-4">🫖</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Spill the Tea</h3>
                  <p className="text-white/70">Drop your hottest gossip and earn access</p>
                </div>
              </ParallaxElement>

              <ParallaxElement speed={0.4} direction="up" delay={0.4}>
                <div 
                  onClick={() => handleAccessPath('bribe')}
                  className="bg-gradient-to-b from-[#ff61a6]/20 to-[#ff61a6]/5 border-2 border-[#ff61a6]/30 rounded-2xl p-8 cursor-pointer hover:border-[#ff61a6] hover:shadow-xl hover:shadow-[#ff61a6]/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-6xl mb-4">💅</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Bribe the Gatekeepers</h3>
                  <p className="text-white/70">Show us your $TEA tokens for instant access</p>
                </div>
              </ParallaxElement>

              <ParallaxElement speed={0.4} direction="up" delay={0.6}>
                <div 
                  onClick={() => handleAccessPath('code')}
                  className="bg-gradient-to-b from-white/10 to-white/5 border-2 border-white/30 rounded-2xl p-8 cursor-pointer hover:border-white hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Enter Access Code</h3>
                  <p className="text-white/70">Already have the secret key?</p>
                </div>
              </ParallaxElement>
            </div>
          </div>
        </section>

        {/* Panel 3: $TEA Token Promo */}
        <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#1b1b1b]/50 to-transparent">
          <div className="text-center max-w-4xl mx-auto">
            <ParallaxElement speed={0.3} direction="up">
              <div className="bg-gradient-to-r from-[#00d1c1]/10 to-[#ff61a6]/10 border border-[#00d1c1]/30 rounded-3xl p-12">
                <div className="text-7xl mb-6">🚀</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" 
                    style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                  $TEA Token on AVAX
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Stake, sip, and earn your way to the top of the gossip leaderboard
                </p>
                <Button
                  className="bg-gradient-to-r from-[#ff61a6] to-[#00d1c1] hover:from-[#00d1c1] hover:to-[#ff61a6] text-white text-lg px-8 py-3 rounded-full font-bold"
                >
                  Claim $TEA Tokens
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </ParallaxElement>
          </div>
        </section>

        {/* Panel 4: Testimonials */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-6xl mx-auto">
            <ParallaxElement speed={0.3} direction="up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-16" 
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                What the <span className="text-[#00d1c1]">Streets</span> Are Saying
              </h2>
            </ParallaxElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ParallaxElement speed={0.4} direction="left" delay={0.2}>
                <div className="bg-gradient-to-br from-[#00d1c1]/5 to-transparent border border-[#00d1c1]/20 rounded-2xl p-6">
                  <div className="text-4xl mb-4">👀</div>
                  <p className="text-white/90 italic mb-4">"Finally, a place where I can spill without getting rekt"</p>
                  <p className="text-[#00d1c1] font-bold">- Anonymous Whale</p>
                </div>
              </ParallaxElement>

              <ParallaxElement speed={0.4} direction="right" delay={0.4}>
                <div className="bg-gradient-to-br from-[#ff61a6]/5 to-transparent border border-[#ff61a6]/20 rounded-2xl p-6">
                  <div className="text-4xl mb-4">🔥</div>
                  <p className="text-white/90 italic mb-4">"The alpha here is absolutely unhinged (in the best way)"</p>
                  <p className="text-[#ff61a6] font-bold">- Degen Trader</p>
                </div>
              </ParallaxElement>
            </div>
          </div>
        </section>

        {/* Panel 5: Buzzwords */}
        <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-t from-[#1b1b1b] to-transparent">
          <div className="text-center max-w-6xl mx-auto">
            <ParallaxElement speed={0.2} direction="up">
              <h2 className="text-3xl md:text-4xl text-white mb-12" 
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                CTea is...
              </h2>
            </ParallaxElement>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {['Gossip', 'Anon Leaks', 'Scandal', 'Memes', 'Alpha', 'Chaos'].map((word, index) => (
                <ParallaxElement key={word} speed={0.3} direction="up" delay={index * 0.1}>
                  <div className="bg-gradient-to-r from-[#00d1c1]/20 to-[#ff61a6]/20 border border-[#00d1c1]/30 rounded-full px-6 py-3 hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{word}</span>
                  </div>
                </ParallaxElement>
              ))}
            </div>

            <ParallaxElement speed={0.1} direction="up" delay={0.8}>
              <Button
                onClick={() => navigate('/feed')}
                className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:from-[#ff61a6] hover:to-[#00d1c1] text-white text-xl px-12 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Enter the Chaos
                <Coffee className="ml-2 w-6 h-6" />
              </Button>
            </ParallaxElement>
          </div>
        </section>
      </motion.div>

      {/* Access Modal */}
      <Dialog open={showAccessModal} onOpenChange={setShowAccessModal}>
        <DialogContent className="bg-gradient-to-br from-[#1b1b1b] to-[#2a1a2a] border-[#00d1c1]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
              {selectedPath === 'spill' && '🫖 Spill Your Tea'}
              {selectedPath === 'bribe' && '💅 Bribe Accepted'}
              {selectedPath === 'code' && '🔐 Enter Access Code'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedPath === 'code' ? (
              <div>
                <Label htmlFor="access-code" className="text-white">Access Code</Label>
                <Input
                  id="access-code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter your code..."
                  className="bg-white/10 border-[#00d1c1]/30 text-white placeholder:text-white/50"
                />
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-white/80 mb-4">
                  {selectedPath === 'spill' && "Thanks for wanting to spill the tea! Here's your access code:"}
                  {selectedPath === 'bribe' && "Your tribute has been noted! Here's your access code:"}
                </p>
                <div className="bg-[#00d1c1]/20 border border-[#00d1c1]/50 rounded-lg p-4">
                  <code className="text-[#00d1c1] text-2xl font-bold">TEA</code>
                </div>
              </div>
            )}

            <Button
              onClick={handleAccessSubmit}
              className="w-full bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:from-[#ff61a6] hover:to-[#00d1c1] text-white font-bold"
            >
              {selectedPath === 'code' ? 'Submit Code' : 'Enter Newsroom'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParallaxLanding;
