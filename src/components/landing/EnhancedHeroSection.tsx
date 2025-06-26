
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Coffee, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import EnhancedSpillingTeaCup from '@/components/ui/EnhancedSpillingTeaCup';

interface EnhancedHeroSectionProps {
  onEnterClick: () => void;
}

const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ onEnterClick }) => {
  const [isSpilling, setIsSpilling] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const spillInterval = setInterval(() => {
      setIsSpilling(true);
      setTimeout(() => setIsSpilling(false), 3000);
    }, 10000);

    return () => clearInterval(spillInterval);
  }, []);

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Enhanced retro background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 107, 157, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 170, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-[#FF6B9D] opacity-30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            borderColor: ['#FF6B9D', '#00D4AA', '#FF9500', '#FF6B9D']
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#00D4AA] opacity-20 rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* TV scan lines effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-10"
          animate={{
            backgroundPosition: ['0px 0px', '0px 100vh']
          }}
          transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: 'linear-gradient(transparent 98%, rgba(0, 212, 170, 0.5) 100%)',
            backgroundSize: '100% 4px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="text-center max-w-6xl mx-auto relative z-10">
        <ParallaxElement speed={0.6} direction="up" delay={0.2}>
          <div className="mb-16 relative">
            <EnhancedSpillingTeaCup 
              size="hero" 
              className="mx-auto filter drop-shadow-2xl" 
              animated 
              isSpilling={isSpilling}
              onHover
              interactive
            />
            
            {/* Glow effect behind teacup */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-[#FF6B9D]/30 via-[#00D4AA]/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </ParallaxElement>

        <ParallaxElement speed={0.4} direction="up" delay={0.4}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-tight" 
              style={{ fontFamily: "'Luckiest Guy', cursive" }}
            >
              <motion.span 
                className="bg-gradient-to-r from-[#FF6B9D] via-[#00D4AA] to-[#FF9500] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                CTea
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-[#00D4AA] via-[#FF9500] to-[#FF6B9D] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
                }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Newsroom
              </motion.span>
            </motion.h1>
          </motion.div>
        </ParallaxElement>

        <ParallaxElement speed={0.3} direction="up" delay={0.6}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-12"
          >
            <motion.p 
              className="text-4xl md:text-5xl text-[#FF6B9D] mb-6 font-bold italic"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 107, 157, 0.5)',
                  '0 0 40px rgba(255, 107, 157, 0.8)',
                  '0 0 20px rgba(255, 107, 157, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="inline w-10 h-10 mr-3 animate-spin" />
              The Ultimate Crypto Gossip HQ
              <Sparkles className="inline w-10 h-10 ml-3 animate-spin" />
            </motion.p>
            
            <p className="text-2xl md:text-3xl text-white/90 mb-6 font-semibold">
              Where Web3 meets TMZ 🍵
            </p>
            
            <div className="space-y-3 text-lg md:text-xl text-white/80 max-w-4xl mx-auto">
              <p className="font-medium">
                Spill the hottest crypto tea, earn <span className="text-[#00D4AA] font-bold">$TEA</span> tokens, 
                and become the ultimate <span className="text-[#FF6B9D] font-bold">memefluencer</span>
              </p>
              
              {/* Meme taglines */}
              <motion.div 
                className="grid md:grid-cols-2 gap-3 mt-6 text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="bg-gradient-to-r from-[#FF6B9D]/20 to-[#FF9500]/20 rounded-full px-4 py-2 border border-[#FF6B9D]/30">
                  "Make CTea Great Again" 🇺🇸
                </div>
                <div className="bg-gradient-to-r from-[#00D4AA]/20 to-[#FF6B9D]/20 rounded-full px-4 py-2 border border-[#00D4AA]/30">
                  "Built for Degens, Not Regens" 🎯
                </div>
                <div className="bg-gradient-to-r from-[#FF9500]/20 to-[#00D4AA]/20 rounded-full px-4 py-2 border border-[#FF9500]/30">
                  "Proof of Spill, Not Proof of Work" ⚡
                </div>
                <div className="bg-gradient-to-r from-[#FF6B9D]/20 to-[#00D4AA]/20 rounded-full px-4 py-2 border border-[#FF6B9D]/30">
                  "Gasless Access (Unless You Count Social Gas)" 💨
                </div>
              </motion.div>
            </div>
          </motion.div>
        </ParallaxElement>

        <ParallaxElement speed={0.2} direction="up" delay={1}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="space-y-6"
          >
            <Button
              onClick={onEnterClick}
              className="bg-gradient-to-r from-[#FF6B9D] to-[#FF9500] hover:from-[#FF9500] hover:to-[#00D4AA] text-white text-2xl md:text-3xl px-20 py-8 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Coffee className="mr-4 w-10 h-10 animate-bounce" />
              Enter the Tea Zone
              <ArrowRight className="ml-4 w-10 h-10 group-hover:translate-x-3 transition-transform" />
            </Button>
            
            <motion.div
              className="flex items-center justify-center space-x-4 text-white/70"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-medium">Limited Beta Access • Invite Only • No Boring People</span>
              <Zap className="w-5 h-5 text-yellow-400" />
            </motion.div>
          </motion.div>
        </ParallaxElement>

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 text-5xl filter drop-shadow-lg"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            ☕
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4 text-4xl filter drop-shadow-lg"
            animate={{
              y: [0, -25, 0],
              rotate: [0, -20, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          >
            🫖
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-1/3 text-3xl filter drop-shadow-lg"
            animate={{
              y: [0, -15, 0],
              x: [0, 15, -15, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          >
            💰
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/5 text-3xl filter drop-shadow-lg"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 0.5 }}
          >
            🚀
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EnhancedHeroSection;
