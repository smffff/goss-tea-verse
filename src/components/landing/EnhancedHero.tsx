
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coffee, Zap, Crown, Sparkles, AlertTriangle, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnhancedHeroProps {
  onEnterClick?: () => void;
}

const EnhancedHero: React.FC<EnhancedHeroProps> = ({ onEnterClick }) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [dramaDrop, setDramaDrop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dramaInterval = setInterval(() => {
      setDramaDrop(true);
      setTimeout(() => setDramaDrop(false), 1500);
    }, 4000);
    return () => clearInterval(dramaInterval);
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
      {/* Enhanced Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Chaotic Tea Particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -120, null],
              rotate: [0, 360, 720, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              delay: Math.random() * 8
            }}
          >
            {i % 4 === 0 ? '🫖' : i % 4 === 1 ? '☕' : i % 4 === 2 ? '💧' : '🔥'}
          </motion.div>
        ))}

        {/* Enhanced Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      {/* Main Hero Content */}
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Enhanced Animated Tea Cup Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "backOut" }}
          className="mb-12 relative"
        >
          <div className="relative inline-block">
            <motion.div 
              className="text-9xl md:text-[12rem] filter drop-shadow-2xl"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🫖
            </motion.div>
            
            {/* Dramatic Steam Animation */}
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
            
            {/* Enhanced Drip Animation */}
            {(isAnimating || dramaDrop) && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-3 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, transparent, #00FF9D, #FF1E8B)',
                  transformOrigin: 'top center'
                }}
                initial={{ height: 0, opacity: 1 }}
                animate={{ height: 60, opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
            )}
          </div>
        </motion.div>

        {/* Enhanced Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="hero-title text-7xl md:text-9xl lg:text-[12rem] font-gothic font-bold mb-8 leading-none">
            <motion.span 
              className="bg-gradient-to-r from-[#FF1E8B] via-[#00FF9D] to-[#FFFF00] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              CTea
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-[#00FF9D] via-[#8A2BE2] to-[#FF1E8B] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['100%', '0%', '100%']
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            >
              Newsroom
            </motion.span>
          </h1>
        </motion.div>

        {/* Enhanced Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-12"
        >
          <motion.p 
            className="hero-subtitle text-4xl md:text-5xl font-cyber font-bold mb-6"
            animate={{
              textShadow: [
                '0 0 30px #00FF9D60',
                '0 0 50px #FF1E8B80',
                '0 0 30px #00FF9D60'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="inline w-10 h-10 mr-3 animate-spin text-[#FFFF00]" />
            Spill Tea. Stack Clout. Stay Shady.
            <Flame className="inline w-10 h-10 ml-3 animate-bounce text-[#FF1E8B]" />
          </motion.p>
          
          <motion.p
            className="text-2xl md:text-3xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-8"
            animate={{
              textShadow: [
                '0 0 20px #00FF9D40',
                '0 0 30px #FF1E8B60',
                '0 0 20px #00FF9D40'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Web3's most exclusive anonymous gossip network where{' '}
            <span className="text-[#FF1E8B] font-bold">chaos meets clout</span>,{' '}
            <span className="text-[#00FF9D] font-bold">memes meet money</span>, and{' '}
            <span className="text-[#FFFF00] font-bold">degens meet destiny</span>.
          </motion.p>

          {/* Enhanced Exclusive Access Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto mb-12"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(135deg, #FF1E8B20, #00FF9D20), linear-gradient(135deg, #FF1E8B, #00FF9D)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'content-box, border-box'
            }}
          >
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-10 h-10 text-[#FFFF00] mr-4 animate-pulse" />
              <span className="text-3xl font-cyber font-bold text-[#FFFF00]">
                EXCLUSIVE BETA ACCESS
              </span>
              <Crown className="w-10 h-10 text-[#FFFF00] ml-4 animate-pulse" />
            </div>
            <motion.p 
              className="text-2xl text-[#FF1E8B] font-bold mb-3"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "We made apps for dumber sh*t. Why not gossip?"
            </motion.p>
            <p className="text-lg text-white/70 font-cyber">
              — The Builders, definitely high on hopium & chaos energy
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-8"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleMainCTA}
              className="relative overflow-hidden bg-gradient-to-r from-[#00FF9D] to-[#FF1E8B] hover:from-[#FF1E8B] hover:to-[#FFFF00] text-black font-bold px-20 py-10 rounded-3xl text-4xl md:text-5xl shadow-2xl group font-cyber"
              style={{
                boxShadow: '0 0 60px #00FF9D40, 0 0 120px #FF1E8B20'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              />
              <Zap className="mr-6 w-12 h-12 animate-bounce" />
              ENTER THE TEA ZONE
              <Coffee className="ml-6 w-12 h-12 group-hover:rotate-12 transition-transform" />
              
              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-4 border-[#FFFF00]"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          {/* Enhanced Beta Access Notice */}
          <motion.div
            className="glass-morphism rounded-2xl p-6 max-w-lg mx-auto border-4"
            animate={{
              borderColor: ['#FFFF00', '#FF1E8B', '#00FF9D', '#FFFF00'],
              boxShadow: [
                '0 0 30px #FFFF0040',
                '0 0 30px #FF1E8B40',
                '0 0 30px #00FF9D40',
                '0 0 30px #FFFF0040'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div className="flex items-center justify-center mb-3">
              <AlertTriangle className="w-8 h-8 text-[#FFFF00] mr-3 animate-pulse" />
              <p className="text-[#FFFF00] font-bold text-2xl font-cyber">
                LIMITED BETA ACCESS
              </p>
              <AlertTriangle className="w-8 h-8 text-[#FFFF00] ml-3 animate-pulse" />
            </div>
            <p className="text-white/90 text-lg font-cyber">
              Spill tea, connect wallet, or slide into our DMs. Your choice, degen.
            </p>
          </motion.div>

          {/* Enhanced Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-center space-y-3"
          >
            <motion.p 
              className="text-lg text-white/70 font-cyber"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🔥 Join 1,337+ anonymous tea spillers brewing maximum chaos
            </motion.p>
            <p className="text-sm text-[#00FF9D] font-bold">
              Beta 1.2 • Where Crypto Twitter Goes to Confess Their Sins
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHero;
