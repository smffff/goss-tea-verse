import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Sparkles, Wallet, Code, Zap, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { betaCodeService } from '@/services/betaCodeService';

interface EnhancedChaosPanelProps {
  onAccessPath: (path: 'spill' | 'bribe' | 'code') => void;
}

const EnhancedChaosPanel: React.FC<EnhancedChaosPanelProps> = ({ onAccessPath }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { toast } = useToast();

  const accessPaths = [
    {
      id: 'spill',
      title: '🫖 Spill Your Tea',
      subtitle: 'Share gossip, get access',
      description: 'Drop the hottest crypto tea story and unlock your access code instantly',
      gradient: 'from-[#FF6B9D] to-[#FF9500]',
      icon: Coffee,
      hoverGradient: 'from-[#FF9500] to-[#00D4AA]',
      stats: '🔥 Most popular path',
      action: () => onAccessPath('spill')
    },
    {
      id: 'bribe',
      title: '💸 Bribe the Gatekeepers',
      subtitle: 'Tip for instant access',
      description: 'Send a tip to the tea masters and get your VIP access code',
      gradient: 'from-[#00D4AA] to-[#4DD9D4]',
      icon: Wallet,
      hoverGradient: 'from-[#4DD9D4] to-[#FF6B9D]',
      stats: '⚡ Instant unlock',
      action: () => onAccessPath('bribe')
    },
    {
      id: 'code',
      title: '🔑 Enter Access Code',
      subtitle: 'Already have a code?',
      description: 'Got your secret access code? Enter it here and join the newsroom',
      gradient: 'from-[#9B59B6] to-[#FF6B9D]',
      icon: Code,
      hoverGradient: 'from-[#FF6B9D] to-[#00D4AA]',
      stats: '🎯 Direct entry',
      action: () => onAccessPath('code')
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Retro background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              #FF6B9D 0px,
              #FF6B9D 2px,
              transparent 2px,
              transparent 20px
            ),
            repeating-linear-gradient(
              -45deg,
              #00D4AA 0px,
              #00D4AA 2px,
              transparent 2px,
              transparent 20px
            )
          `
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6" 
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <span className="bg-gradient-to-r from-[#FF6B9D] to-[#00D4AA] bg-clip-text text-transparent">
              Choose Your Path
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Three ways to enter the ultimate crypto gossip network
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center text-[#FF6B9D]">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-bold">1,337 Tea Spillers Online</span>
            </div>
            <div className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse" />
            <div className="flex items-center text-[#00D4AA]">
              <Zap className="w-5 h-5 mr-2" />
              <span className="text-sm font-bold">42 New Stories Today</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {accessPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card 
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-rotate-1
                  bg-gradient-to-br ${hoveredCard === path.id ? path.hoverGradient : path.gradient}
                  border-0 shadow-2xl group h-full
                `}
                onMouseEnter={() => setHoveredCard(path.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={path.action}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Retro scan lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse" />
                </div>

                <CardHeader className="text-center relative z-10 pb-4">
                  <div className="mx-auto mb-4 relative">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <path.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    {/* Floating sparkles */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6 text-white/80" />
                    </motion.div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {path.title}
                  </CardTitle>
                  <p className="text-white/90 font-semibold text-lg">{path.subtitle}</p>
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white mt-2">
                    {path.stats}
                  </div>
                </CardHeader>

                <CardContent className="text-center relative z-10 pb-8">
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    {path.description}
                  </p>
                  
                  <motion.div
                    className="w-full h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white"
                    whileHover={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      scale: 1.05 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Click to Continue →
                  </motion.div>
                </CardContent>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-white/60 mb-4">
            Still not sure? Here's what you're missing:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center text-[#FF6B9D]">
              <span className="w-2 h-2 bg-[#FF6B9D] rounded-full mr-2 animate-pulse" />
              Exclusive crypto alpha
            </div>
            <div className="flex items-center text-[#00D4AA]">
              <span className="w-2 h-2 bg-[#00D4AA] rounded-full mr-2 animate-pulse" />
              $TEA token rewards
            </div>
            <div className="flex items-center text-[#FF9500]">
              <span className="w-2 h-2 bg-[#FF9500] rounded-full mr-2 animate-pulse" />
              Anonymous tea spilling
            </div>
            <div className="flex items-center text-[#9B59B6]">
              <span className="w-2 h-2 bg-[#9B59B6] rounded-full mr-2 animate-pulse" />
              Memefluencer status
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedChaosPanel;
