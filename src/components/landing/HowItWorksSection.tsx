
import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Palette, Bot, Shield, Eye, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const HowItWorksSection: React.FC = () => {
  const steps = [
    { 
      icon: Ghost, 
      title: "Anonymous Gossip", 
      description: "Spill tea without revealing identity",
      color: "from-purple-500 to-pink-500",
      offset: 0
    },
    { 
      icon: Palette, 
      title: "Meme Remixing", 
      description: "Turn drama into viral content",
      color: "from-pink-500 to-orange-500",
      offset: 50
    },
    { 
      icon: Bot, 
      title: "AI Commentary", 
      description: "Smart analysis and credibility scoring",
      color: "from-orange-500 to-yellow-500",
      offset: 100
    },
    { 
      icon: Shield, 
      title: "Reputation Badges", 
      description: "Build credibility with verified spills",
      color: "from-green-500 to-cyan-500",
      offset: 150
    },
    { 
      icon: Eye, 
      title: "Mod Queues", 
      description: "Community-driven content curation",
      color: "from-cyan-500 to-blue-500",
      offset: 200
    },
    { 
      icon: Zap, 
      title: "Viral Amplification", 
      description: "Push trending content to the masses",
      color: "from-blue-500 to-purple-500",
      offset: 250
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ParallaxElement speed={0.3} direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-16" style={{ fontFamily: "'Anton', sans-serif" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
        </ParallaxElement>

        {/* Horizontal Parallax Icons */}
        <div className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="mb-16 flex items-center"
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                bounce: 0.3
              }}
              viewport={{ once: true }}
            >
              <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} w-full`}>
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-2xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </motion.div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'ml-8 text-left' : 'mr-8 text-right'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-white/80 max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-8 text-4xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        >
          💫
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-8 text-3xl"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            delay: 2
          }}
        >
          🔥
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
