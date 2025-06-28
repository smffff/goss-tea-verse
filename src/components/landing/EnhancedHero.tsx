
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coffee, Zap, Crown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnhancedHeroProps {
  onEnterClick?: () => void;
}

const EnhancedHero: React.FC<EnhancedHeroProps> = ({ onEnterClick }) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMainCTA = () => {
    if (onEnterClick) {
      onEnterClick();
    } else {
      navigate('/feed');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Tea Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100, null],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {i % 3 === 0 ? '🫖' : i % 3 === 1 ? '☕' : '💧'}
          </motion.div>
        ))}

        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      {/* Main Hero Content */}
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Animated Tea Cup Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 relative"
        >
          <div className="relative inline-block">
            <div className="text-8xl md:text-9xl animate-float">
              🫖
            </div>
            {/* Steam Animation */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl opacity-60"
                  animate={{
                    y: [-10, -50],
                    opacity: [0.6, 0],
                    scale: [1, 1.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  style={{ left: `${i * 20 - 20}px` }}
                >
                  💨
                </motion.div>
              ))}
            </div>
            {/* Drip Animation */}
            {isAnimating && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-2 bg-gradient-to-b from-transparent via-[#00FF9D] to-[#FF1E8B] rounded-full"
                initial={{ height: 0, opacity: 1 }}
                animate={{ height: 40, opacity: 0 }}
                transition={{ duration: 2 }}
              />
            )}
          </div>
        </motion.div>

        {/* Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-gothic font-bold mb-6 leading-tight animate-glow">
            <span className="bg-gradient-to-r from-[#FF1E8B] via-[#00FF9D] to-[#FFFF00] bg-clip-text text-transparent">
              CTea
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#00FF9D] via-[#8A2BE2] to-[#FF1E8B] bg-clip-text text-transparent">
              Newsroom
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <p className="hero-subtitle text-3xl md:text-4xl font-cyber font-bold mb-4 text-shadow-glow">
            <Sparkles className="inline w-8 h-8 mr-2 animate-spin text-[#FFFF00]" />
            Spill Tea. Stack Clout. Stay Shady.
            <Sparkles className="inline w-8 h-8 ml-2 animate-spin text-[#FFFF00]" />
          </p>
          
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6"
            animate={{
              textShadow: [
                '0 0 20px #00FF9D40',
                '0 0 30px #FF1E8B60',
                '0 0 20px #00FF9D40'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Web3's most exclusive anonymous gossip network where{' '}
            <span className="text-[#FF1E8B] font-bold">memes meet intel</span>,{' '}
            <span className="text-[#00FF9D] font-bold">chaos meets clout</span>, and{' '}
            <span className="text-[#FFFF00] font-bold">degens meet destiny</span>.
          </motion.p>

          {/* Exclusive Access Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="glass-morphism rounded-xl p-6 max-w-3xl mx-auto mb-8 animate-pulse-glow"
          >
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-[#FFFF00] mr-3" />
              <span className="text-2xl font-cyber font-bold text-[#FFFF00]">
                EXCLUSIVE BETA ACCESS
              </span>
              <Crown className="w-8 h-8 text-[#FFFF00] ml-3" />
            </div>
            <p className="text-lg text-[#FF1E8B] font-bold mb-2">
              "We made apps for dumber sh*t. Why not gossip?"
            </p>
            <p className="text-sm text-white/60 font-cyber">
              — The Builders, probably high on hopium & vibe checks
            </p>
          </motion.div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleMainCTA}
              className="relative overflow-hidden bg-gradient-to-r from-[#00FF9D] to-[#FF1E8B] hover:from-[#FF1E8B] hover:to-[#FFFF00] text-black font-bold px-16 py-8 rounded-2xl text-3xl md:text-4xl shadow-2xl group font-cyber animate-pulse-glow"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Zap className="mr-4 w-10 h-10 animate-bounce" />
              ENTER THE TEA ZONE
              <Coffee className="ml-4 w-10 h-10 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>

          {/* Beta Access Notice */}
          <motion.div
            className="glass-morphism rounded-xl p-4 max-w-md mx-auto border-2 border-[#FFFF00]/40"
            animate={{
              borderColor: ['#FFFF00', '#FF1E8B', '#00FF9D', '#FFFF00']
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="text-[#FFFF00] font-bold text-lg mb-1 font-cyber">
              💀 LIMITED BETA ACCESS 💀
            </p>
            <p className="text-white/80 text-sm">
              Spill tea, connect wallet, or bribe your way in. Your choice, degen.
            </p>
          </motion.div>

          {/* Social Proof Teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-white/60 font-cyber">
              🔥 Join 1,337+ anonymous tea spillers already brewing chaos
            </p>
            <p className="text-xs text-[#00FF9D] font-bold">
              Beta 1.2 • Where Crypto Twitter Goes to Confess
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHero;
