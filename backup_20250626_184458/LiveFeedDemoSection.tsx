
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, Share2, Eye, Zap } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const LiveFeedDemoSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [2600, 3600], [100, -100]);
  const opacity = useTransform(scrollY, [2500, 2800, 3400, 3700], [0, 1, 1, 0]);

  const [visibleSpills, setVisibleSpills] = useState<number[]>([]);
  const [floatingQuotes, setFloatingQuotes] = useState<Array<{id: number, text: string, x: number, y: number}>>([]);

  const mockSpills = [
    {
      id: 1,
      content: "🚨 BREAKING: Major DeFi protocol about to announce surprise partnership with... [REDACTED] 👀",
      author: "Anonymous Insider",
      reactions: 420,
      comments: 69,
      timestamp: "2m ago",
      tags: ["DeFi", "Partnership", "Alpha"],
      avatar: "🕵️"
    },
    {
      id: 2,
      content: "Heard at ETH Denver: Two massive VCs are secretly funding the same competitor projects 💀",
      author: "Conference Lurker",
      reactions: 337,
      comments: 42,
      timestamp: "5m ago",
      tags: ["VC", "Drama", "ETHDenver"],
      avatar: "👁️"
    },
    {
      id: 3,
      content: "That 'decentralized' project? Their entire dev team works from the same WeWork 🤡",
      author: "Code Detective",
      reactions: 256,
      comments: 28,
      timestamp: "8m ago",
      tags: ["Decentralization", "Irony", "Web3"],
      avatar: "🔍"
    },
    {
      id: 4,
      content: "CEO just bought a Lambo while their token is down 90%. The audacity 🏎️💀",
      author: "Wallet Watcher",
      reactions: 189,
      comments: 15,
      timestamp: "12m ago",
      tags: ["CEO", "Lifestyle", "Token"],
      avatar: "👀"
    }
  ];

  const floatingMemeQuotes = [
    "\"This is financial advice\" 💀",
    "\"Not rugpull, just feature\" 🤡",
    "\"Diamond hands activated\" 💎",
    "\"Wen moon? Wen lambo?\" 🚀",
    "\"WAGMI... right?\" 😅",
    "\"Just DCA bro\" 📈",
    "\"Trust the process\" 🙏",
    "\"This is the way\" ⭐"
  ];

  useEffect(() => {
    const spillInterval = setInterval(() => {
      setVisibleSpills(prev => {
        if (prev.length < mockSpills.length) {
          return [...prev, prev.length];
        }
        return [];
      });
    }, 3000);

    return () => clearInterval(spillInterval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const newQuote = {
        id: Date.now(),
        text: floatingMemeQuotes[Math.floor(Math.random() * floatingMemeQuotes.length)],
        x: Math.random() * 80 + 10, // 10-90% of screen width
        y: Math.random() * 60 + 20  // 20-80% of screen height
      };
      
      setFloatingQuotes(prev => [...prev.slice(-4), newQuote]); // Keep only last 5
    }, 4000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Floating Meme Quotes */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <AnimatePresence>
          {floatingQuotes.map((quote) => (
            <motion.div
              key={quote.id}
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                x: `${quote.x}vw`,
                y: `${quote.y}vh`
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
                y: `${quote.y - 20}vh`
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 8, ease: "easeOut" }}
              className="absolute bg-black/40 backdrop-blur-sm border border-pink-400/30 rounded-2xl px-4 py-2 text-pink-400 text-sm font-bold"
              style={{ 
                filter: 'drop-shadow(0 0 10px rgba(255, 75, 179, 0.4))',
                fontFamily: "'Anton', 'Impact', sans-serif"
              }}
            >
              {quote.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* "The Feed is Watching" overlay */}
      <motion.div
        className="absolute top-8 right-8 bg-red-500/20 backdrop-blur-sm border-2 border-red-500/50 rounded-xl px-6 py-3 text-red-400 font-bold"
        animate={{ 
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ 
          filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.5))',
          fontFamily: "'Anton', 'Impact', sans-serif"
        }}
      >
        <Eye className="w-5 h-5 inline mr-2" />
        THE FEED IS WATCHING
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 flex items-center justify-center gap-4"
              style={{ 
                fontFamily: "'Anton', 'Impact', sans-serif",
                textShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
              }}>
            <Eye className="w-16 h-16 text-pink-400" />
            Live Feed Demo
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Watch the chaos unfold in real-time. This is what peak crypto culture looks like.
          </p>
        </motion.div>

        {/* Enhanced Mock Phone/Feed Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto relative"
        >
          {/* Phone Shadow */}
          <div className="absolute inset-0 bg-black/50 blur-xl transform translate-y-8 scale-110 rounded-3xl" />
          
          <Card className="bg-gradient-to-br from-gray-900/90 to-black/95 border-4 border-white/30 overflow-hidden relative"
                style={{ 
                  borderRadius: '30px',
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))'
                }}>
            
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-[#FF6B9D] via-[#00D4AA] to-[#FF9C39] p-4 relative overflow-hidden">
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <BrandedTeacupIcon size="md" variant="steaming" />
                  </motion.div>
                  <div>
                    <div className="text-white font-bold text-lg" 
                         style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                      CTea Feed
                    </div>
                    <div className="text-white/90 text-sm flex items-center gap-1">
                      <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      Live
                    </div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                  {mockSpills.length} Spills
                </Badge>
              </div>
            </div>

            {/* Enhanced Feed Content */}
            <CardContent className="p-4 h-96 overflow-hidden relative">
              {/* Simulated scrolling gossip snippets */}
              <motion.div
                className="absolute top-0 left-4 right-4 text-pink-400 text-xs font-bold opacity-60"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
              >
                🚨 BREAKING: Insider reveals $1B acquisition deal... 🚨
              </motion.div>
              
              <motion.div
                className="absolute top-8 left-4 right-4 text-cyan-400 text-xs font-bold opacity-60"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 2 }}
                style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
              >
                💀 DRAMA ALERT: Celebrity crypto influencer caught using bot farms... 💀
              </motion.div>

              <div className="space-y-4 relative z-10">
                <AnimatePresence>
                  {visibleSpills.map((spillIndex) => {
                    const spill = mockSpills[spillIndex];
                    return (
                      <motion.div
                        key={spill.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9, rotateX: 10 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-2xl p-4 hover:border-pink-400/40 transition-all duration-300 relative overflow-hidden"
                        style={{ filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.3))' }}
                      >
                        {/* Comic-style dots pattern */}
                        <div className="absolute inset-0 opacity-5"
                             style={{
                               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                               backgroundSize: '8px 8px'
                             }} />
                        
                        <div className="flex items-start gap-3 mb-3 relative z-10">
                          <motion.div 
                            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg border-2 border-white/30"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            {spill.avatar}
                          </motion.div>
                          <div className="flex-1">
                            <div className="text-white/90 text-sm font-bold" 
                                 style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                              {spill.author}
                            </div>
                            <div className="text-white/60 text-xs">{spill.timestamp}</div>
                          </div>
                        </div>
                        
                        <p className="text-white text-sm mb-3 leading-relaxed relative z-10">
                          {spill.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {spill.tags.map((tag) => (
                            <Badge key={tag} className="bg-cyan-400/20 text-cyan-300 text-xs border border-cyan-400/30">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-white/60 text-sm relative z-10">
                          <div className="flex items-center gap-4">
                            <motion.div 
                              className="flex items-center gap-1 cursor-pointer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart className="w-4 h-4 text-pink-400" />
                              <span>{spill.reactions}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center gap-1 cursor-pointer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MessageCircle className="w-4 h-4 text-cyan-400" />
                              <span>{spill.comments}</span>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 15 }}
                              whileTap={{ scale: 0.9 }}
                              className="cursor-pointer"
                            >
                              <Share2 className="w-4 h-4 text-green-400" />
                            </motion.div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 px-2 py-1 rounded-full text-xs text-yellow-400 border border-yellow-400/30"
                          >
                            <Zap className="w-3 h-3 inline mr-1" />
                            +5 $TEA
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/70 text-lg mb-4">
            This is just a taste. The real feed is <span className="text-pink-400 font-bold text-xl">much more chaotic</span> 🔥
          </p>
          <p className="text-white/50 text-sm font-mono">
            Real users, real drama, real rewards. Welcome to the chaos. 🫖
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LiveFeedDemoSection;
