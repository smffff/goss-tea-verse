
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Zap, Crown, Eye, Flame } from 'lucide-react';

const InfoBlocks: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Anonymous & Bulletproof',
      description: 'Military-grade privacy protection. Spill without the spooks finding you.',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#8A2BE2]'
    },
    {
      icon: Users,
      title: 'Community of Chaos',
      description: 'Vote, verify, and validate the wildest stories with your fellow degens.',
      color: '#FF1E8B',
      gradient: 'from-[#FF1E8B] to-[#FFFF00]'
    },
    {
      icon: Zap,
      title: 'Real-time Tea Flow',
      description: 'Breaking drama as it happens. Be first to know, first to profit.',
      color: '#FFFF00',
      gradient: 'from-[#FFFF00] to-[#FF1E8B]'
    },
    {
      icon: Crown,
      title: 'Clout Economy',
      description: 'Earn $TEA tokens for verified gossip. Turn drama into degen gains.',
      color: '#8A2BE2',
      gradient: 'from-[#8A2BE2] to-[#00FF9D]'
    },
    {
      icon: Eye,
      title: 'Intel Marketplace',
      description: 'Buy exclusive alpha, sell your secrets. The ultimate insider trading.',
      color: '#FF1E8B',
      gradient: 'from-[#FF1E8B] to-[#8A2BE2]'
    },
    {
      icon: Flame,
      title: 'Viral Launch Pad',
      description: 'Stories that break the internet start here. Be the main character.',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#FFFF00]'
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-gothic font-bold mb-6 bg-gradient-to-r from-[#FF1E8B] via-[#00FF9D] to-[#FFFF00] bg-clip-text text-transparent">
            Why CTea Hits Different
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-cyber">
            Built by degens, for degens. This isn't your grandma's group chat.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group"
            >
              <Card className="glass-morphism border-2 border-transparent hover:border-opacity-60 transition-all duration-300 h-full"
                    style={{ 
                      borderColor: `${feature.color}40`,
                      boxShadow: `0 0 30px ${feature.color}20`
                    }}>
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div
                    className="mb-6"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 font-cyber"
                      style={{ textShadow: `0 0 10px ${feature.color}60` }}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed flex-grow font-cyber">
                    {feature.description}
                  </p>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="h-1 mt-6 rounded-full"
                    style={{ backgroundColor: feature.color }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto border-2 border-[#FF1E8B]/30">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-gothic bg-gradient-to-r from-[#FF1E8B] to-[#00FF9D] bg-clip-text text-transparent">
              Ready to Become a Tea Tycoon?
            </h3>
            <p className="text-lg text-white/80 mb-6 font-cyber">
              Join the exclusive club of anonymous alphas who turn gossip into gains.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60 font-cyber">
              <span>🔥 Limited Beta Spots</span>
              <span>•</span>
              <span>💰 Early Token Rewards</span>
              <span>•</span>
              <span>👑 Founding Member Status</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoBlocks;
