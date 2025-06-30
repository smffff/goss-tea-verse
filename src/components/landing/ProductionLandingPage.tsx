
import React from 'react';
import LandingHeader from './LandingHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, Shield, Zap } from 'lucide-react';

const ProductionLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-background">
      <LandingHeader user={null} isAdmin={false} isModerator={false} />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-anton text-brand-text mb-6 leading-tight">
              Crypto Gossip.
              <br />
              <span className="brand-text-gradient">Anonymous Tips.</span>
              <br />
              AI Receipts.
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-text-secondary mb-8 max-w-2xl mx-auto">
              Web3's anonymous crypto gossip platform. Share intel, earn tokens, stay shady.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="btn-brand-primary text-lg px-8 py-4"
              >
                Start Spilling Tea
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background text-lg px-8 py-4"
              >
                View Latest Gossip
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-30 pointer-events-none"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-brand-neutral/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-anton text-brand-text text-center mb-12">
            Why CTea News?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-brand-background/50 card-hover">
              <Users className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-text mb-2">Anonymous Community</h3>
              <p className="text-brand-text-secondary">Share crypto gossip without revealing your identity. Stay safe while spilling tea.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-brand-background/50 card-hover">
              <Shield className="w-12 h-12 text-brand-accent-yellow mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-text mb-2">AI-Verified Intel</h3>
              <p className="text-brand-text-secondary">Our AI moderates content and verifies credible sources for quality gossip.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-brand-background/50 card-hover">
              <Zap className="w-12 h-12 text-brand-accent-lavender mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-text mb-2">Earn Tokens</h3>
              <p className="text-brand-text-secondary">Get rewarded for quality submissions and community engagement.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-anton text-brand-text mb-6">
            Ready to Join the Newsroom?
          </h2>
          <p className="text-xl text-brand-text-secondary mb-8 max-w-2xl mx-auto">
            Start sharing crypto gossip anonymously and earn rewards for quality intel.
          </p>
          
          <Button 
            size="lg"
            className="btn-brand-primary text-lg px-8 py-4"
          >
            Enter the Newsroom
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductionLandingPage;
