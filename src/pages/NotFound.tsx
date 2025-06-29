import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Coffee, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [easterEggClicked, setEasterEggClicked] = useState(false);

  const handleEasterEgg = () => {
    setEasterEggClicked(true);
    setTimeout(() => {
      alert('🫣 Not yet, but soon... The tip jar is brewing!');
      setEasterEggClicked(false);
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1F003B] via-[#0E0E16] to-[#29001C] text-text font-retro text-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "backOut" }}
        className="mb-8"
      >
        <motion.img 
          src="/assets/logo-ctea-spill.svg"
          alt="CTea"
          className="w-24 h-24 md:w-32 md:h-32 filter drop-shadow-2xl"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      {/* 404 Title */}
      <motion.h1 
        className="text-6xl sm:text-8xl md:text-9xl font-retro font-bold text-brand mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          textShadow: [
            '0 0 30px #FF4EAF60',
            '0 0 50px #00FFE080',
            '0 0 30px #FF4EAF60'
          ]
        }}
        transition={{ 
          duration: 1, 
          delay: 0.3,
          textShadow: { duration: 3, repeat: Infinity }
        }}
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-4xl font-retro font-bold text-accent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        No Tea Here
      </motion.h2>

      {/* Description */}
      <motion.p 
        className="text-text/70 mt-4 text-sm sm:text-base max-w-md mx-auto font-cyber"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        You're either early, wrong, or too deep in the thread. Head back and find some real shade to sip.
      </motion.p>

      {/* Action Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Button
          asChild
          className="bg-brand hover:bg-accent text-bg font-bold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_#00FFE0] hover:scale-105 font-retro"
        >
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            🍵 Back to Home
          </Link>
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-bg font-bold px-6 py-3 rounded-full transition-all duration-300 font-retro"
        >
          <Link to="/spill">
            <Coffee className="w-4 h-4 mr-2" />
            Spill Some Tea
          </Link>
        </Button>
      </motion.div>

      {/* Easter Egg */}
      <motion.p 
        onClick={handleEasterEgg}
        className={`mt-6 cursor-pointer text-accent hover:underline font-cyber text-sm transition-all duration-300 ${easterEggClicked ? 'scale-110' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="inline w-4 h-4 mr-1" />
        👀 Leak a tip anyway?
      </motion.p>

      {/* Fun Message */}
      <motion.p 
        className="text-xs text-text/50 mt-8 font-cyber"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Don't worry, there's plenty more tea to spill in the newsroom! 🫖
      </motion.p>
    </div>
  );
};

export default NotFound;
