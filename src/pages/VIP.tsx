import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Sparkles, Star, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const VIP: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-background py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-highlight rounded-full flex items-center justify-center">
              <Crown className="w-10 h-10 text-brand-background" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-brand-text mb-6"
              style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
            <span className="bg-gradient-to-r from-brand-primary to-brand-highlight bg-clip-text text-transparent">
              VIP Access
            </span>
          </h1>
          
          <p className="text-xl text-brand-text/80 max-w-3xl mx-auto">
            Unlock exclusive features, early access to new features, and premium support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-brand-background border-brand-primary/20 hover:border-brand-primary/40 transition-all duration-300 h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-brand-background" />
                </div>
                <CardTitle className="text-brand-text">Early Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-text/70">
                  Get first access to new features, beta testing opportunities, and exclusive content.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-brand-background border-brand-highlight/20 hover:border-brand-highlight/40 transition-all duration-300 h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-highlight rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-brand-background" />
                </div>
                <CardTitle className="text-brand-text">Premium Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-text/70">
                  Priority customer support, direct access to the team, and personalized assistance.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-brand-background border-brand-secondary/20 hover:border-brand-secondary/40 transition-all duration-300 h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-brand-background" />
                </div>
                <CardTitle className="text-brand-text">Enhanced Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-text/70">
                  Advanced privacy features, enhanced security, and exclusive anonymous posting options.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-brand-primary to-brand-highlight p-8 rounded-2xl mb-8">
            <h2 className="text-3xl font-bold text-brand-background mb-4">
              Ready to Go VIP?
            </h2>
            <p className="text-brand-background/90 mb-6">
              Join the exclusive community of crypto insiders with premium access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-brand-background text-brand-primary hover:bg-brand-background/90 font-bold px-8 py-3 text-lg"
              >
                <Crown className="mr-2 h-5 w-5" />
                Upgrade Now
              </Button>
              <Link to="/feed">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-background text-brand-background hover:bg-brand-background hover:text-brand-primary font-bold px-8 py-3 text-lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Explore Feed
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VIP; 