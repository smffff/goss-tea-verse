
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Coffee } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import SpillingTeaCup from '@/components/ui/SpillingTeaCup';

interface EnhancedHeroPanelProps {
  onEnterClick: () => void;
}

const EnhancedHeroPanel: React.FC<EnhancedHeroPanelProps> = ({ onEnterClick }) => {
  const [isSpilling, setIsSpilling] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const spillInterval = setInterval(() => {
      setIsSpilling(true);
      setTimeout(() => setIsSpilling(false), 2000);
    }, 8000);

    return () => clearInterval(spillInterval);
  }, []);

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Retro background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border-4 border-[#FF6B9D] opacity-20 rotate-45"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-24 h-24 border-4 border-[#00D4AA] opacity-15 rotate-12"
          style={{ y: y2 }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#FF9500] opacity-10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="text-center max-w-5xl mx-auto relative z-10">
        <ParallaxElement speed={0.6} direction="up" delay={0.2}>
          <div className="mb-12 relative">
            <SpillingTeaCup 
              size="xl" 
              className="mx-auto filter drop-shadow-2xl" 
              animated 
              isSpilling={isSpilling}
            />
            
            {/* Retro TV scan lines effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#00D4AA]/5 to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        </ParallaxElement>

        <ParallaxElement speed={0.4} direction="up" delay={0.4}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight" 
                style={{ fontFamily: "'Luckiest Guy', cursive" }}>
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
            </h1>
          </motion.div>
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
            <p className="text-lg text-white/70 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
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
            className="space-y-4"
          >
            <Button
              onClick={onEnterClick}
              className="bg-gradient-to-r from-[#FF6B9D] to-[#FF9500] hover:from-[#FF9500] hover:to-[#00D4AA] text-white text-xl md:text-2xl px-16 py-6 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Coffee className="mr-3 w-8 h-8 animate-bounce" />
              Enter the Tea Zone
              <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <p className="text-sm text-white/60 animate-pulse">
              🔥 Limited Beta Access • Invite Only • No Boring People
            </p>
          </motion.div>
        </ParallaxElement>

        {/* Floating retro elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 text-4xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            ☕
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4 text-3xl"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -15, 15, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          >
            🫖
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/3 text-2xl"
            animate={{
              y: [0, -10, 0],
              x: [0, 10, -10, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          >
            💰
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EnhancedHeroPanel;
