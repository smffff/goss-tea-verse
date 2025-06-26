
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Heart, Share2, TrendingUp } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const LiveFeedDemoSection: React.FC = () => {
  const mockSpills = [
    {
      id: 1,
      content: "👀 Anonymous whale just dumped 69M $PEPE... coincidence? I think not. Check the wallet activity 📊",
      reactions: 420,
      comments: 69,
      shares: 42,
      credibility: 85,
      timeAgo: "2m ago"
    },
    {
      id: 2,
      content: "🔥 BREAKING: Major DeFi protocol about to announce partnership with... wait for it... McDonalds? 🍟",
      reactions: 1337,
      comments: 234,
      shares: 156,
      credibility: 72,
      timeAgo: "5m ago"
    },
    {
      id: 3,
      content: "💣 Insider tea: That 'diamond hands' influencer has been secretly paper handing since day 1 📄✋",
      reactions: 2069,
      comments: 420,
      shares: 311,
      credibility: 91,
      timeAgo: "12m ago"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ParallaxElement speed={0.3} direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-16" style={{ fontFamily: "'Anton', sans-serif" }}>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Live Feed Demo
            </span>
          </h2>
        </ParallaxElement>

        {/* Live Stats Ticker */}
        <motion.div
          className="bg-black/30 backdrop-blur-lg rounded-full px-6 py-3 mb-12 mx-auto w-fit border border-green-500/30"
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.3)",
              "0 0 40px rgba(34, 197, 94, 0.6)",
              "0 0 20px rgba(34, 197, 94, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center space-x-6 text-green-400 text-sm font-mono">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              LIVE
            </div>
            <span>1,337 Active Sippers</span>
            <span>•</span>
            <span>42 Spills/min</span>
            <span>•</span>
            <span>🔥 Trending: #DegenWinter</span>
          </div>
        </motion.div>

        {/* Mock Feed */}
        <div className="grid gap-6 max-w-2xl mx-auto">
          {mockSpills.map((spill, index) => (
            <motion.div
              key={spill.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-lg">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">Anonymous Sipper</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                        spill.credibility > 80 ? 'bg-green-500/20 text-green-400' :
                        spill.credibility > 60 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {spill.credibility}% Credible
                      </div>
                    </div>
                    <span className="text-white/60 text-xs">{spill.timeAgo}</span>
                  </div>

                  {/* Content */}
                  <p className="text-white mb-4 leading-relaxed">
                    {spill.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-white/60 hover:text-red-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{spill.reactions}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-white/60 hover:text-blue-400 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">{spill.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-white/60 hover:text-green-400 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">{spill.shares}</span>
                      </button>
                    </div>
                    <TrendingUp className="w-4 h-4 text-ctea-teal" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-white/80 mb-4">
            This is just a taste of the chaos... 
          </p>
          <p className="text-sm text-white/60">
            Real spills, real drama, real receipts. All anonymous, all AI-powered.
          </p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-8 text-2xl"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          delay: 1
        }}
      >
        📱
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-8 text-2xl"
        animate={{ 
          x: [0, 15, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          delay: 2
        }}
      >
        💬
      </motion.div>
    </section>
  );
};

export default LiveFeedDemoSection;
