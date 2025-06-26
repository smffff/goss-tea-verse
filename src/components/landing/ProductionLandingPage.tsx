
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
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

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
      title: "Welcome to CTea! ☕",
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
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Smart credibility scoring, meme generation, and sentiment analysis powered by advanced AI.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Earn & Govern",
      description: "Stack $TEA tokens for quality content. Vote on platform direction. Become a meme legend.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Enterprise-grade security with anonymous posting. Your secrets stay secret.",
      color: "from-purple-500 to-pink-500"
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
        <title>CTea Newsroom - Where Crypto Twitter Spills the Real Tea</title>
        <meta name="description" content="Anonymous crypto gossip platform powered by AI. Share intel, earn tokens, stay shady. Join the ultimate Web3 gossip network." />
        <meta name="keywords" content="crypto gossip, anonymous sharing, Web3, blockchain news, crypto intel, meme culture, DeFi drama" />
        
        {/* Open Graph */}
        <meta property="og:title" content="CTea Newsroom - Where Crypto Twitter Spills the Real Tea" />
        <meta property="og:description" content="Anonymous crypto gossip platform powered by AI. Share intel, earn tokens, stay shady." />
        <meta property="og:image" content="https://cteanews.com/og-image.jpg" />
        <meta property="og:url" content="https://cteanews.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CTea Newsroom - Crypto Gossip HQ" />
        <meta name="twitter:description" content="Anonymous crypto gossip platform powered by AI" />
        <meta name="twitter:image" content="https://cteanews.com/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CTea Newsroom" />
        <link rel="canonical" href="https://cteanews.com" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black relative overflow-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-ctea-purple rounded-full blur-xl animate-pulse delay-2000"></div>
          </div>

          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Logo and Brand */}
                  <div className="mb-8">
                    <BrandedTeacupIcon 
                      size="hero" 
                      variant="spilling"
                      animated={true}
                      className="mx-auto mb-8"
                    />
                    
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white"
                        style={{ fontFamily: 'Luckiest Guy, cursive' }}>
                      <span className="bg-gradient-to-r from-ctea-teal to-pink-400 bg-clip-text text-transparent">
                        CTea Newsroom
                      </span>
                    </h1>
                    
                    <p className="text-2xl md:text-3xl font-bold mb-4 text-ctea-teal">
                      Where Crypto Twitter Spills the Real Tea
                    </p>
                  </div>

                  {/* Hero Copy */}
                  <div className="mb-12 space-y-6">
                    <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                      Web3's anonymous crypto gossip feed where <span className="text-pink-400 font-bold">memes meet intel</span>,{' '}
                      <span className="text-ctea-teal font-bold">AI meets chaos</span>, and{' '}
                      <span className="text-orange-400 font-bold">degens meet their destiny</span>.
                    </p>

                    {/* Live Stats */}
                    <div className="flex justify-center gap-8 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-ctea-teal">{userCount.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Active Spillers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-400">{spillCount.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Tea Spills</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-400">24/7</div>
                        <div className="text-sm text-gray-400">Pure Chaos</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="space-y-6">
                    <Button
                      onClick={handleGetStarted}
                      className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-orange-400 text-white font-bold px-12 py-6 rounded-2xl text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                      style={{ fontFamily: 'Luckiest Guy, cursive' }}
                    >
                      <Zap className="mr-3 w-8 h-8" />
                      Spill the Tea
                      <ArrowRight className="ml-3 w-8 h-8" />
                    </Button>

                    <div className="flex justify-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Anonymous
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        AI-Powered
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Token Rewards
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4" id="features">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Luckiest Guy, cursive' }}>
                Why Degens Choose CTea
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Finally, a platform built for chaos with enterprise-grade security
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-ctea-dark/40 border-ctea-teal/20 hover:border-ctea-teal/40 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-white`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Luckiest Guy, cursive' }}>
                What the Community Says
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-ctea-dark/40 border-ctea-teal/20">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-white mb-4 italic">"{testimonial.text}"</p>
                      <div>
                        <div className="text-ctea-teal font-semibold">{testimonial.author}</div>
                        <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Access Section */}
        <section className="py-20 px-4" id="access-section">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8"
                  style={{ fontFamily: 'Luckiest Guy, cursive' }}>
                Ready to Spill Some Tea?
              </h2>
              
              <div className="bg-gradient-to-r from-ctea-dark/60 to-black/60 backdrop-blur-lg border border-ctea-teal/30 rounded-2xl p-8 mb-8">
                <p className="text-xl text-white/90 mb-6">
                  Join the most exclusive crypto gossip network. Beta access is limited.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-bold px-8 py-4"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Request Beta Access
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-ctea-teal/50 text-ctea-teal hover:bg-ctea-teal/10 px-8 py-4"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Demo
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge variant="outline" className="border-ctea-teal/50 text-ctea-teal">
                  #CTeaApp
                </Badge>
                <Badge variant="outline" className="border-pink-400/50 text-pink-400">
                  #TEAToken
                </Badge>
                <Badge variant="outline" className="border-ctea-purple/50 text-ctea-purple">
                  #OnChainGossip
                </Badge>
                <Badge variant="outline" className="border-orange-400/50 text-orange-400">
                  #CryptoTea
                </Badge>
              </div>

              <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                Built for degeneracy, powered by chaos, fueled by your hottest takes.
                Join the revolution. Spill the tea. Stack the clout.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductionLandingPage;
