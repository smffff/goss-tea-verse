
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Image, Brain, Trophy, Shield } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const HowItWorksSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [1000, 2000], [100, -100]);
  const opacity = useTransform(scrollY, [900, 1200, 1800, 2100], [0, 1, 1, 0]);

  const steps = [
    {
      icon: <MessageSquare className="w-16 h-16" />,
      title: "Anonymous Gossip",
      description: "Share your hottest crypto intel without revealing identity",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-500/20 to-blue-500/20",
      parallaxOffset: -50
    },
    {
      icon: <Image className="w-16 h-16" />,
      title: "Meme Templating",
      description: "Auto-generate viral memes from your gossip drops",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
      parallaxOffset: -100
    },
    {
      icon: <Brain className="w-16 h-16" />,
      title: "AI Commentary",
      description: "Smart bots analyze and amplify your tea with spicy takes",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
      parallaxOffset: -150
    },
    {
      icon: <Trophy className="w-16 h-16" />,
      title: "On-Chain Reputation",
      description: "Build credibility and earn $TEA tokens for quality spills",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
      parallaxOffset: -200
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: "Moderated Queues",
      description: "Community governance keeps the chaos organized",
      color: "from-indigo-500 to-purple-600",
      bgColor: "from-indigo-500/20 to-purple-600/20",
      parallaxOffset: -250
    }
  ];

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6"
              style={{ 
                fontFamily: "'Anton', 'Impact', sans-serif",
                textShadow: '0 0 20px rgba(255, 75, 179, 0.5)'
              }}>
            How It Works
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From anonymous spill to viral chaos in 5 simple steps
          </p>
        </motion.div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Connection Line with Neon Glow */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 via-orange-500 via-green-500 to-indigo-500 transform -translate-y-1/2 z-0 hidden lg:block rounded-full"
               style={{ filter: 'drop-shadow(0 0 10px rgba(255, 75, 179, 0.6))' }} />
          
          {/* Horizontal Scroll Grid */}
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-5 gap-8 relative z-10 pb-6 lg:pb-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ 
                  x: step.parallaxOffset, 
                  opacity: 0, 
                  scale: 0.8,
                  rotateY: -15
                }}
                whileInView={{ 
                  x: 0, 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative min-w-72 lg:min-w-0"
              >
                {/* Comic-style Card */}
                <Card className={`bg-gradient-to-br ${step.bgColor} border-4 border-white/30 hover:border-white/50 transition-all duration-300 h-full relative overflow-hidden`}
                      style={{ 
                        filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.3))',
                        borderRadius: '20px'
                      }}>
                  
                  {/* Comic book dots pattern */}
                  <div className="absolute inset-0 opacity-10"
                       style={{
                         backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                         backgroundSize: '10px 10px'
                       }} />
                  
                  <CardContent className="p-6 text-center relative z-10">
                    {/* Step Number Badge */}
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto border-4 border-white/50`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      style={{ filter: 'drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3))' }}
                    >
                      {index + 1}
                    </motion.div>
                    
                    {/* Icon with Glow */}
                    <motion.div 
                      className="text-white mb-4 flex justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      style={{ 
                        filter: `drop-shadow(0 0 15px ${step.color.includes('cyan') ? '#06b6d4' : step.color.includes('purple') ? '#a855f7' : step.color.includes('orange') ? '#f97316' : step.color.includes('green') ? '#10b981' : '#6366f1'})`
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    
                    {/* Title with Comic Font */}
                    <h3 className="text-xl font-bold text-white mb-3"
                        style={{ 
                          fontFamily: "'Anton', 'Impact', sans-serif",
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                        }}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Comic-style "POW!" effect on hover */}
                    <motion.div
                      className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold opacity-0"
                      whileHover={{ opacity: 1, scale: 1.1 }}
                      style={{ 
                        fontFamily: "'Anton', 'Impact', sans-serif",
                        transform: 'rotate(15deg)'
                      }}
                    >
                      POW!
                    </motion.div>
                  </CardContent>
                </Card>
                
                {/* Enhanced Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-10 h-10 text-white/80" 
                                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex justify-center items-center gap-4 text-white/70">
            <BrandedTeacupIcon size="md" animated className="animate-bounce" />
            <span className="text-lg font-bold" style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
              Ready to cause some chaos?
            </span>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <BrandedTeacupIcon size="md" animated className="animate-bounce" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
