
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Coffee, Zap, Trophy, Coins } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const HowItWorksSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [1000, 2000], [100, -100]);
  const opacity = useTransform(scrollY, [900, 1200, 1800, 2100], [0, 1, 1, 0]);

  const steps = [
    {
      icon: <BrandedTeacupIcon size="xl" variant="spilling" />,
      title: "Spill Tea",
      description: "Share your hottest crypto gossip anonymously",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Zap className="w-16 h-16" />,
      title: "AI Amplifies",
      description: "Our bots generate memes and commentary",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Trophy className="w-16 h-16" />,
      title: "Earn Clout",
      description: "Climb the leaderboard as a top sipper",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Coins className="w-16 h-16" />,
      title: "Stack $TEA",
      description: "Get rewarded with tokens for quality spills",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
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
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            How It Works
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From anonymous spill to viral meme in 4 simple steps
          </p>
        </motion.div>

        {/* Animated Tea Journey Path */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 via-orange-500 to-green-500 transform -translate-y-1/2 z-0 hidden md:block" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                <Card className={`bg-gradient-to-br ${step.color}/20 border-2 border-white/20 hover:border-white/40 transition-all duration-300 h-full`}>
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 mx-auto`}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="text-white mb-4 flex justify-center">
                      {step.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-white/60" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex justify-center items-center gap-4 text-white/60">
            <Coffee className="w-6 h-6 animate-bounce" />
            <span className="text-lg">Ready to start your chaos journey?</span>
            <Coffee className="w-6 h-6 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
