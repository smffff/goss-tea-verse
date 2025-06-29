import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Coffee, Sparkles, Zap, Shield, Users, Crown, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParallaxElement from '@/components/ui/ParallaxElement';
import { useToast } from '@/hooks/use-toast';

const EnhancedLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpilling, setIsSpilling] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '50%']);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const handleEnterClick = () => {
    navigate('/feed');
  };

  const handleDemoAccess = () => {
    localStorage.setItem('ctea-demo-mode', 'true');
    toast({
      title: "Demo Access Granted! ✨",
      description: "Welcome to the CTea experience!",
    });
    navigate('/feed');
  };

  const handleWalletConnect = () => {
    toast({
      title: "Wallet Connect Coming Soon! 🔗",
      description: "Token ownership verification will be available soon. Try demo mode for now!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#100C2A] via-[#1a0d26] via-[#2D1B69] to-[#0a0a0a] overflow-x-hidden">
      {/* Enhanced Vaporwave Background Parallax Layer */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0">
          {/* Enhanced Retro Grid with Neon Glow */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 75, 179, 0.4) 2px, transparent 2px),
                linear-gradient(90deg, rgba(0, 216, 164, 0.4) 2px, transparent 2px)
              `,
              backgroundSize: '120px 120px',
              filter: 'drop-shadow(0 0 10px rgba(255, 75, 179, 0.3))'
            }}
          />
          
          {/* Enhanced Cosmic Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4FB3]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D8A4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-[#9C27B0]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-60"
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🫖
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-5xl opacity-70"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          💅
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-4xl opacity-50"
          animate={{ y: [0, -25, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        >
          👀
        </motion.div>
        <motion.div
          className="absolute top-60 left-1/2 text-5xl opacity-60"
          animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
        >
          🔥
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="text-center max-w-6xl mx-auto relative z-10">
          <ParallaxElement speed={0.6} direction="up" delay={0.2}>
            <motion.div
              className="mb-12 relative"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-9xl md:text-[12rem] filter drop-shadow-2xl">
                🫖
              </div>
              
              {/* Steam Animation */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl opacity-70"
                    animate={{
                      y: [-15, -80],
                      opacity: [0.7, 0],
                      scale: [1, 2],
                      x: [0, Math.random() * 20 - 10]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4
                    }}
                    style={{ left: `${i * 15 - 30}px` }}
                  >
                    💨
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ParallaxElement>

          <ParallaxElement speed={0.4} direction="up" delay={0.4}>
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-[#FF6B9D] via-[#00D4AA] to-[#FF9500] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                CTea
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-[#00D4AA] via-[#FF9500] to-[#FF6B9D] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['100%', '0%', '100%']
                }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
              >
                Newsroom
              </motion.span>
            </motion.h1>
          </ParallaxElement>

          <ParallaxElement speed={0.3} direction="up" delay={0.6}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-8"
            >
              <p className="text-3xl md:text-4xl text-[#FF6B9D] mb-4 font-bold italic">
                <Sparkles className="inline w-8 h-8 mr-2 animate-spin" />
                The Ultimate Crypto Gossip HQ
                <Sparkles className="inline w-8 h-8 ml-2 animate-spin" />
              </p>
              <p className="text-xl md:text-2xl text-white/90 mb-4 font-semibold">
                Where Web3 meets TMZ
              </p>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                Spill the hottest crypto tea, earn $TEA tokens, and become the ultimate 
                <span className="text-[#00D4AA] font-bold"> memefluencer</span> in the game
              </p>
            </motion.div>
          </ParallaxElement>

          <ParallaxElement speed={0.2} direction="up" delay={1}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDemoAccess}
                  className="bg-gradient-to-r from-[#FF6B9D] to-[#FF9500] hover:from-[#FF9500] hover:to-[#00D4AA] text-white text-xl md:text-2xl px-8 py-6 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <Coffee className="mr-3 w-8 h-8 animate-bounce" />
                  Try Demo Mode
                  <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <Button
                  onClick={handleWalletConnect}
                  variant="outline"
                  className="border-2 border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA]/10 text-xl md:text-2xl px-8 py-6 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl"
                >
                  <Wallet className="mr-3 w-8 h-8" />
                  Connect Wallet
                  <Badge className="ml-2 bg-[#00D4AA] text-black text-xs">Soon</Badge>
                </Button>
              </div>
              
              <p className="text-sm text-white/60 animate-pulse">
                🔥 Limited Beta Access • Invite Only • No Boring People
              </p>
            </motion.div>
          </ParallaxElement>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <ParallaxElement speed={0.3} direction="up">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6"
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                Why <span className="text-[#00D4AA]">CTea</span>?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                The ultimate platform for anonymous news sharing and community-driven journalism
              </p>
            </div>
          </ParallaxElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ParallaxElement speed={0.4} direction="up" delay={0.2}>
              <Card className="bg-gradient-to-br from-[#FF6B9D]/20 to-[#FF6B9D]/5 border-2 border-[#FF6B9D]/30 hover:border-[#FF6B9D] hover:shadow-xl hover:shadow-[#FF6B9D]/20 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <Shield className="w-12 h-12 text-[#FF6B9D] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Anonymous & Secure</h3>
                  <p className="text-gray-300">Share news safely with military-grade security and complete anonymity</p>
                </CardContent>
              </Card>
            </ParallaxElement>

            <ParallaxElement speed={0.4} direction="up" delay={0.4}>
              <Card className="bg-gradient-to-br from-[#00D4AA]/20 to-[#00D4AA]/5 border-2 border-[#00D4AA]/30 hover:border-[#00D4AA] hover:shadow-xl hover:shadow-[#00D4AA]/20 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-[#00D4AA] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
                  <p className="text-gray-300">Vote, verify, and validate news together with AI-powered commentary</p>
                </CardContent>
              </Card>
            </ParallaxElement>

            <ParallaxElement speed={0.4} direction="up" delay={0.6}>
              <Card className="bg-gradient-to-br from-[#FF9500]/20 to-[#FF9500]/5 border-2 border-[#FF9500]/30 hover:border-[#FF9500] hover:shadow-xl hover:shadow-[#FF9500]/20 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <Zap className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Earn $TEA</h3>
                  <p className="text-gray-300">Get rewarded with $TEA tokens for quality content and engagement</p>
                </CardContent>
              </Card>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <ParallaxElement speed={0.2} direction="up">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8"
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                Ready to <span className="text-[#FF6B9D]">Spill</span>?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Join the ultimate crypto gossip community. Where the alpha is spicy and the memes are hot.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={handleDemoAccess}
                  className="bg-gradient-to-r from-[#FF6B9D] to-[#FF9500] hover:from-[#FF9500] hover:to-[#00D4AA] text-white text-2xl px-12 py-6 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl"
                >
                  <Coffee className="mr-3 w-8 h-8" />
                  Enter the Tea Zone
                  <ArrowRight className="ml-3 w-8 h-8" />
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-white/60">
                <Crown className="w-6 h-6" />
                <span>Beta Access Required</span>
                <span>•</span>
                <span>Invite Only</span>
                <span>•</span>
                <span>No Boring People</span>
              </div>
            </motion.div>
          </ParallaxElement>
        </div>
      </section>
    </div>
  );
};

export default EnhancedLandingPage;
