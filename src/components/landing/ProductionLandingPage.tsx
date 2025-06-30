import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Coffee, 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  Sparkles,
  ArrowRight,
  Star,
  MessageCircle,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LandingHeader from './LandingHeader';
import ProductionHeroSection from './ProductionHeroSection';

const ProductionLandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userCount, setUserCount] = useState(420);
  const [spillCount, setSpillCount] = useState(1337);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate live user count updates
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
      setSpillCount(prev => prev + Math.floor(Math.random() * 5));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    // Track engagement
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'get_started_click', {
        event_category: 'engagement',
        event_label: 'hero_cta'
      });
    }
    
    toast({
      title: "Welcome to CTea News! ☕",
      description: "Preparing your exclusive access...",
    });
    
    // Scroll to access section or show modal
    const accessSection = document.getElementById('access-section');
    if (accessSection) {
      accessSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Anonymous Intel",
      description: "Share crypto gossip without revealing your identity. Perfect for industry insiders and degens alike.",
      color: "from-brand-primary to-brand-highlight"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Smart credibility scoring, meme generation, and sentiment analysis powered by advanced AI.",
      color: "from-brand-highlight to-brand-secondary"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Earn & Govern",
      description: "Stack $TEA tokens for quality content. Vote on platform direction. Become a meme legend.",
      color: "from-brand-secondary to-brand-primary"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Enterprise-grade security with anonymous posting. Your secrets stay secret.",
      color: "from-brand-primary to-brand-highlight"
    }
  ];

  const testimonials = [
    {
      text: "Finally, a place where I can spill the real tea without getting doxxed",
      author: "Anonymous VC",
      role: "Tier 1 Fund"
    },
    {
      text: "The AI commentary is scary accurate. It's like having insider knowledge",
      author: "Crypto Degen",
      role: "Professional Shitposter"
    },
    {
      text: "Best source for alpha that you won't find on CT. Pure chaos and I love it",
      author: "Protocol Founder",
      role: "Top 10 TVL"
    }
  ];

  return (
    <>
      <Helmet>
        <title>CTea News - Crypto Gossip. Anonymous Tips. AI Receipts.</title>
        <meta name="description" content="Anonymous crypto gossip platform powered by AI. Share intel, earn tokens, stay shady. Join the ultimate Web3 gossip network." />
        <meta name="keywords" content="crypto gossip, anonymous sharing, Web3, blockchain news, crypto intel, meme culture, DeFi drama" />
        
        {/* Open Graph */}
        <meta property="og:title" content="CTea News - Crypto Gossip. Anonymous Tips. AI Receipts." />
        <meta property="og:description" content="Anonymous crypto gossip platform powered by AI. Share intel, earn tokens, stay shady." />
        <meta property="og:image" content="https://cteanews.com/og-image.jpg" />
        <meta property="og:url" content="https://cteanews.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CTea News - Crypto Gossip HQ" />
        <meta name="twitter:description" content="Anonymous crypto gossip platform powered by AI" />
        <meta name="twitter:image" content="https://cteanews.com/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CTea News" />
        <link rel="canonical" href="https://cteanews.com" />
      </Helmet>

      <div className="min-h-screen bg-brand-background relative overflow-hidden">
        {/* Header */}
        <LandingHeader user={null} isAdmin={false} isModerator={false} />
        
        {/* Hero Section */}
        <ProductionHeroSection />

        {/* Features Section */}
        <section className="py-20 px-4 bg-brand-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-6"
                  style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
                Why CTea News?
              </h2>
              <p className="text-xl text-brand-text/80 max-w-3xl mx-auto">
                The ultimate platform for crypto insiders to share intel, earn rewards, and stay anonymous.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-brand-background border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-brand-background`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-brand-text mb-3">{feature.title}</h3>
                      <p className="text-brand-text/70">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-brand-background/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-6"
                  style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
                What Insiders Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="bg-brand-background border-brand-highlight/20 hover:border-brand-highlight/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Star className="w-5 h-5 text-brand-highlight fill-current" />
                        <Star className="w-5 h-5 text-brand-highlight fill-current" />
                        <Star className="w-5 h-5 text-brand-highlight fill-current" />
                        <Star className="w-5 h-5 text-brand-highlight fill-current" />
                        <Star className="w-5 h-5 text-brand-highlight fill-current" />
                      </div>
                      <p className="text-brand-text/90 mb-4 italic">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold text-brand-text">{testimonial.author}</p>
                        <p className="text-sm text-brand-text/70">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-brand-primary to-brand-highlight">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-background mb-6"
                style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
              Ready to Spill the Tea?
            </h2>
            <p className="text-xl text-brand-background/90 mb-8">
              Join thousands of crypto insiders sharing anonymous intel and earning rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-brand-background text-brand-primary hover:bg-brand-background/90 font-bold px-8 py-3 text-lg"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-background text-brand-background hover:bg-brand-background hover:text-brand-primary font-bold px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductionLandingPage;
