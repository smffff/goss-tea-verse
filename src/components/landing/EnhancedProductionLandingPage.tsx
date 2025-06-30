
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, Shield, Zap, Coffee, Star } from 'lucide-react';
import EnhancedLandingHeader from './EnhancedLandingHeader';

const EnhancedProductionLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-brand-neutral to-brand-background overflow-hidden">
      <EnhancedLandingHeader />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0 
            }}
            animate={{
              y: [null, -100, null],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Coffee className="w-8 h-8 text-brand-primary" />
          </motion.div>
        ))}
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            {/* Main Logo */}
            <div className="mb-8">
              <motion.img
                src="/lovable-uploads/ctea-logo-main.png"
                alt="CTea News"
                className="h-24 md:h-32 mx-auto mb-6 filter drop-shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            
            {/* Dynamic Title */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-anton text-brand-text mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                className="brand-text-gradient inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                Crypto Gossip.
              </motion.span>
              <br />
              <motion.span 
                className="text-brand-accent-yellow"
                animate={{ textShadow: ['0 0 20px #FFD93D', '0 0 40px #FFD93D', '0 0 20px #FFD93D'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Anonymous Tips.
              </motion.span>
              <br />
              <span className="text-brand-accent-lavender">AI Receipts.</span>
            </motion.h1>
            
            {/* Enhanced Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-brand-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Web3's hottest anonymous crypto gossip platform. 
              <span className="text-brand-primary font-bold"> Share intel</span>, 
              <span className="text-brand-accent-yellow font-bold"> earn tokens</span>, 
              <span className="text-brand-accent-lavender font-bold"> stay legendary</span>.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="btn-brand-primary text-lg px-8 py-4 shadow-lg brand-hover"
                >
                  <Zap className="mr-2 w-5 h-5" />
                  Start Spilling Tea
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-brand-accent-yellow text-brand-accent-yellow hover:bg-brand-accent-yellow hover:text-brand-background text-lg px-8 py-4 shadow-lg transition-all duration-300"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  View Latest Gossip
                </Button>
              </motion.div>
            </motion.div>

            {/* Beta Badge */}
            <motion.div 
              className="inline-flex items-center bg-gradient-to-r from-brand-primary/20 to-brand-accent-yellow/20 border border-brand-primary/30 rounded-full px-6 py-3 mb-16"
              animate={{ 
                borderColor: ['#FF2052', '#FFD93D', '#A67CFF', '#FF2052'],
                boxShadow: ['0 0 20px #FF205240', '0 0 30px #FFD93D40', '0 0 25px #A67CFF40', '0 0 20px #FF205240']
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Star className="w-4 h-4 text-brand-accent-yellow mr-2 animate-spin" />
              <span className="text-brand-text font-bold text-sm">BETA BREW ACTIVE</span>
              <Coffee className="w-4 h-4 text-brand-primary ml-2 animate-bounce" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Spilling Cup */}
        <motion.div 
          className="absolute bottom-10 right-10 hidden lg:block"
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <img 
            src="/lovable-uploads/ctea-spilling-cup.png"
            alt="Spilling Tea Cup"
            className="h-32 opacity-30 filter drop-shadow-lg"
          />
        </motion.div>
      </section>
      
      {/* Enhanced Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-brand-neutral/30 via-brand-background/50 to-brand-neutral/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-anton text-brand-text text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why CTea News <span className="text-brand-primary">Hits Different</span>?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Anonymous Community",
                description: "Share crypto gossip without revealing your identity. Stay safe while spilling that premium tea.",
                color: "text-brand-primary",
                bgColor: "from-brand-primary/10 to-brand-primary/5"
              },
              {
                icon: Shield,
                title: "AI-Verified Intel",
                description: "Our AI moderates content and verifies credible sources for the highest quality gossip.",
                color: "text-brand-accent-yellow",
                bgColor: "from-brand-accent-yellow/10 to-brand-accent-yellow/5"
              },
              {
                icon: Zap,
                title: "Earn Tokens",
                description: "Get rewarded for quality submissions and community engagement. Make gossip profitable.",
                color: "text-brand-accent-lavender",
                bgColor: "from-brand-accent-lavender/10 to-brand-accent-lavender/5"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`text-center p-8 rounded-2xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm border border-white/10 card-hover group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <feature.icon className={`w-16 h-16 ${feature.color} mx-auto mb-6 group-hover:animate-bounce`} />
                <h3 className="text-2xl font-bold text-brand-text mb-4">{feature.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-primary/5 via-brand-background to-brand-accent-lavender/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-anton text-brand-text mb-6">
              Ready to Join the <span className="brand-text-gradient">Newsroom</span>?
            </h2>
            <p className="text-xl text-brand-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Start sharing crypto gossip anonymously and earn rewards for premium intel. 
              The tea is hot, the tokens are flowing.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-brand-primary via-brand-accent-yellow to-brand-accent-lavender hover:from-brand-accent-lavender hover:via-brand-primary hover:to-brand-accent-yellow text-brand-background font-anton text-xl px-12 py-6 rounded-2xl shadow-2xl"
                style={{
                  boxShadow: '0 0 40px rgba(255, 32, 82, 0.4), 0 0 60px rgba(255, 217, 61, 0.2)'
                }}
              >
                <Coffee className="mr-3 w-6 h-6" />
                Enter the Newsroom
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>

            {/* Fun Quote */}
            <motion.div 
              className="mt-12 bg-brand-background/50 backdrop-blur-lg border border-brand-primary/20 rounded-2xl p-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg italic text-brand-text mb-2">
                "Finally, a use case for all that crypto drama we've been collecting"
              </p>
              <p className="text-sm text-brand-text-secondary">
                — Every DeFi Degen, 2024
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedProductionLandingPage;
