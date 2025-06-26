
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MessageCircle, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const LiveFeedDemoSection: React.FC = () => {
  const [currentSpill, setCurrentSpill] = useState(0);
  
  const mockSpills = [
    {
      text: "🚨 BREAKING: Major DeFi protocol about to announce something BIG...",
      author: "CryptoWhispers",
      reactions: 420,
      trending: true
    },
    {
      text: "That influencer's NFT collection? 👀 Let's just say the team chat is SPICY",
      author: "Anonymous Ape",
      reactions: 1337,
      trending: false
    },
    {
      text: "Plot twist: The 'rug pull' was actually a social experiment 🧪",
      author: "DegenDetective",
      reactions: 69,
      trending: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpill((prev) => (prev + 1) % mockSpills.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      {/* Quote Bubble 1 */}
      <motion.div
        className="absolute top-20 left-8 md:left-16 z-10"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          delay: 1
        }}
      >
        <div className="w-24 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl shadow-xl flex items-center justify-center">
          <span className="text-white font-bold text-xs">GOSSIP</span>
        </div>
        <div className="absolute -bottom-2 left-6 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rotate-45"></div>
      </motion.div>

      {/* Quote Bubble 2 */}
      <motion.div
        className="absolute top-32 right-8 md:right-16 z-10"
        animate={{ 
          y: [0, 12, 0],
          rotate: [0, -2, 2, 0]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          delay: 2
        }}
      >
        <div className="w-20 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-xl flex items-center justify-center">
          <span className="text-white font-bold text-xs">TEA</span>
        </div>
        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rotate-45"></div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center">
        <ParallaxElement speed={0.3} direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8" style={{ fontFamily: "'Anton', sans-serif" }}>
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Live Feed Preview
            </span>
          </h2>
        </ParallaxElement>

        <ParallaxElement speed={0.2} direction="up" delay={0.4}>
          <p className="text-xl text-white/90 mb-12 font-semibold">
            See the chaos unfold in real-time
          </p>
        </ParallaxElement>

        {/* Simulated Feed */}
        <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-ctea-teal/30 shadow-2xl max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Badge className="bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold">
              LIVE FEED
            </Badge>
            <div className="flex items-center gap-2 text-ctea-teal">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">1,337 online</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-ctea-dark/50 to-ctea-darker/50 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {mockSpills[currentSpill].author[0]}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-bold text-sm">
                      {mockSpills[currentSpill].author}
                    </span>
                    {mockSpills[currentSpill].trending && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        TRENDING
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-white/90 mb-3">
                    {mockSpills[currentSpill].text}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {mockSpills[currentSpill].reactions}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      Viral
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Feed indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {mockSpills.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentSpill ? 'bg-ctea-teal' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveFeedDemoSection;
