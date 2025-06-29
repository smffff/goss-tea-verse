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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-gradient-to-br from-[#1F003B] via-[#0E0E16] to-[#29001C]">
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
        {/* CTea Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "backOut" }}
          className="mb-12 relative"
        >
          <div className="relative inline-block">
            <motion.img 
              src="/assets/logo-ctea-spill.svg"
              alt="CTea Newsroom Logo"
              className="w-32 h-32 md:w-48 md:h-48 filter drop-shadow-2xl"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
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
                  background: 'linear-gradient(to bottom, transparent, #00FFE0, #FF4EAF)',
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
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-retro font-bold mb-8 leading-none text-text">
            <motion.span 
              className="bg-gradient-to-r from-brand via-accent to-brand bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              CTea
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-accent via-brand to-accent bg-clip-text text-transparent"
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
            className="text-2xl md:text-3xl font-cyber font-bold mb-6 text-text"
            animate={{
              textShadow: [
                '0 0 30px #00FFE060',
                '0 0 50px #FF4EAF80',
                '0 0 30px #00FFE060'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="inline w-8 h-8 md:w-10 md:h-10 mr-3 animate-spin text-accent" />
            Spill Tea. Stack Clout. Stay Shady.
            <Flame className="inline w-8 h-8 md:w-10 md:h-10 ml-3 animate-bounce text-brand" />
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-text/90 max-w-4xl mx-auto leading-relaxed mb-8"
            animate={{
              textShadow: [
                '0 0 20px #00FFE040',
                '0 0 30px #FF4EAF60',
                '0 0 20px #00FFE040'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Web3's most exclusive anonymous gossip network where{' '}
            <span className="text-brand font-bold">chaos meets clout</span>,{' '}
            <span className="text-accent font-bold">memes meet money</span>, and{' '}
            <span className="text-brand font-bold">tea spills become viral gold</span>.
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mb-16"
        >
          <motion.button
            onClick={handleMainCTA}
            className="bg-brand hover:bg-accent text-white px-8 py-4 rounded-full text-lg font-retro shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#00FFE0] hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 20px #FF4EAF40',
                '0 0 40px #00FFE080',
                '0 0 20px #FF4EAF40'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀 Beta Launch – Exclusive Access
          </motion.button>
        </motion.div>

        {/* Enhanced Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <motion.div 
            className="border border-accent p-6 rounded-xl shadow-md hover:shadow-accent transition-all duration-300 text-left bg-[#14141f]/80 backdrop-blur-sm"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-accent mb-3 text-2xl">🛡</div>
            <h3 className="font-retro text-lg mb-2 text-text">Anonymous & Secure</h3>
            <p className="text-sm text-text/80">Share news safely with military-grade encryption.</p>
          </motion.div>

          <motion.div 
            className="border border-brand p-6 rounded-xl shadow-md hover:shadow-brand transition-all duration-300 text-left bg-[#14141f]/80 backdrop-blur-sm"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-brand mb-3 text-2xl">🫖</div>
            <h3 className="font-retro text-lg mb-2 text-text">Community Driven</h3>
            <p className="text-sm text-text/80">Built by degens, for degens. Your voice matters.</p>
          </motion.div>

          <motion.div 
            className="border border-accent p-6 rounded-xl shadow-md hover:shadow-accent transition-all duration-300 text-left bg-[#14141f]/80 backdrop-blur-sm"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-accent mb-3 text-2xl">💀</div>
            <h3 className="font-retro text-lg mb-2 text-text">Chaos Guaranteed</h3>
            <p className="text-sm text-text/80">Maximum drama, minimum consequences.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHero;
