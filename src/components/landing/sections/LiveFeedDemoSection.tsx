
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, Share2, Eye } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const LiveFeedDemoSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [2600, 3600], [100, -100]);
  const opacity = useTransform(scrollY, [2500, 2800, 3400, 3700], [0, 1, 1, 0]);

  const [visibleSpills, setVisibleSpills] = useState<number[]>([]);

  const mockSpills = [
    {
      id: 1,
      content: "🚨 BREAKING: Major DeFi protocol about to announce surprise partnership with... [REDACTED] 👀",
      author: "Anonymous Insider",
      reactions: 420,
      comments: 69,
      timestamp: "2m ago",
      tags: ["DeFi", "Partnership", "Alpha"]
    },
    {
      id: 2,
      content: "Heard at ETH Denver: Two massive VCs are secretly funding the same competitor projects 💀",
      author: "Conference Lurker",
      reactions: 337,
      comments: 42,
      timestamp: "5m ago",
      tags: ["VC", "Drama", "ETHDenver"]
    },
    {
      id: 3,
      content: "That 'decentralized' project? Their entire dev team works from the same WeWork 🤡",
      author: "Code Detective",
      reactions: 256,
      comments: 28,
      timestamp: "8m ago",
      tags: ["Decentralization", "Irony", "Web3"]
    },
    {
      id: 4,
      content: "CEO just bought a Lambo while their token is down 90%. The audacity 🏎️💀",
      author: "Wallet Watcher",
      reactions: 189,
      comments: 15,
      timestamp: "12m ago",
      tags: ["CEO", "Lifestyle", "Token"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSpills(prev => {
        if (prev.length < mockSpills.length) {
          return [...prev, prev.length];
        }
        return [];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
      style={{ y, opacity }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 flex items-center justify-center gap-4"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <Eye className="w-16 h-16 text-pink-400" />
            Live Feed Demo
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Watch the chaos unfold in real-time. This is what peak crypto culture looks like.
          </p>
        </motion.div>

        {/* Mock Phone/Feed Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/90 border-2 border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6B9D] to-[#00D4AA] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BrandedTeacupIcon size="md" variant="steaming" />
                  <div>
                    <div className="text-white font-bold">CTea Feed</div>
                    <div className="text-white/80 text-sm">🔴 Live</div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white">
                  {mockSpills.length} Spills
                </Badge>
              </div>
            </div>

            {/* Feed Content */}
            <CardContent className="p-4 h-96 overflow-hidden">
              <div className="space-y-4">
                <AnimatePresence>
                  {visibleSpills.map((spillIndex) => {
                    const spill = mockSpills[spillIndex];
                    return (
                      <motion.div
                        key={spill.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-pink-400/30 transition-colors"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {spill.author[0]}
                          </div>
                          <div className="flex-1">
                            <div className="text-white/80 text-sm font-medium">{spill.author}</div>
                            <div className="text-white/60 text-xs">{spill.timestamp}</div>
                          </div>
                        </div>
                        
                        <p className="text-white text-sm mb-3 leading-relaxed">
                          {spill.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {spill.tags.map((tag) => (
                            <Badge key={tag} className="bg-cyan-400/20 text-cyan-300 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-white/60 text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{spill.reactions}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{spill.comments}</span>
                            </div>
                            <Share2 className="w-4 h-4" />
                          </div>
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
          <p className="text-white/60 text-lg">
            This is just a taste. The real feed is <span className="text-pink-400 font-bold">much more chaotic</span> 🔥
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LiveFeedDemoSection;
