import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductionHeroSection: React.FC = () => {
  const handleSpillTea = () => {
    // Navigate to submit page
    window.location.href = '/submit';
  };

  const handleTipToUnlock = () => {
    // Open wallet modal or scroll to wallet section
    const walletSection = document.getElementById('wallet-section');
    if (walletSection) {
      walletSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoVIP = () => {
    // Navigate to VIP/premium section
    window.location.href = '/vip';
  };

  return (
    <section className="min-h-screen bg-brand-background bg-pattern flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-brand-highlight rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-brand-secondary rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/assets/logo-teacup-drip.svg" 
              alt="CTea News" 
              className="h-16 w-16 mx-auto mb-6 logo animate-wiggle"
            />
          </div>

          {/* Main Tagline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-brand-text"
              style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
            <span className="bg-gradient-to-r from-brand-primary to-brand-highlight bg-clip-text text-transparent text-glow">
              CTea News
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold mb-8 text-brand-secondary"
              style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
            Crypto gossip. Anonymous tips. AI receipts.
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-brand-text/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Web3's premier anonymous crypto gossip platform where{' '}
            <span className="text-brand-primary font-semibold">insiders spill tea</span>,{' '}
            <span className="text-brand-highlight font-semibold">AI provides receipts</span>, and{' '}
            <span className="text-brand-secondary font-semibold">degens find alpha</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={handleSpillTea}
              size="lg"
              className="btn-brand-primary px-8 py-3 text-lg"
            >
              Spill Tea
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              onClick={handleTipToUnlock}
              size="lg"
              variant="outline"
              className="border-brand-highlight text-brand-highlight hover:bg-brand-highlight hover:text-brand-background font-bold px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
            >
              Tip to Unlock
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              onClick={handleGoVIP}
              size="lg"
              className="btn-brand-highlight px-8 py-3 text-lg"
            >
              Go VIP
            </Button>
          </div>

          {/* Arena Social Link */}
          <div className="mb-8">
            <a 
              href="https://arena.cteanews.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors duration-200 hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Join the Arena Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Live Stats */}
          <div className="flex justify-center gap-8 text-brand-text/70">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-primary">420</div>
              <div className="text-sm">Active Spillers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-highlight">1,337</div>
              <div className="text-sm">Tea Spills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-secondary">24/7</div>
              <div className="text-sm">Pure Chaos</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductionHeroSection;
