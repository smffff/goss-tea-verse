import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, Shield, Zap, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Submit: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-background py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-highlight rounded-full flex items-center justify-center">
              <Coffee className="w-10 h-10 text-brand-background" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-brand-text mb-6"
              style={{ fontFamily: 'Satoshi Variable, sans-serif' }}>
            <span className="bg-gradient-to-r from-brand-primary to-brand-highlight bg-clip-text text-transparent">
              Spill the Tea
            </span>
          </h1>
          
          <p className="text-xl text-brand-text/80 max-w-3xl mx-auto">
            Share your crypto gossip anonymously. Your secrets are safe with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-brand-background border-brand-primary/20">
            <CardHeader>
              <CardTitle className="text-brand-text flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-primary" />
                Anonymous Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-brand-text">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a catchy title for your tea..."
                  className="border-brand-primary/20 focus:border-brand-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-brand-text">Your Tea</Label>
                <Textarea
                  id="content"
                  placeholder="Spill the details... What's the latest crypto gossip?"
                  rows={6}
                  className="border-brand-primary/20 focus:border-brand-primary resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="text-brand-text">Category</Label>
                <select
                  id="category"
                  className="w-full p-3 border border-brand-primary/20 rounded-md focus:border-brand-primary focus:outline-none bg-brand-background text-brand-text"
                >
                  <option value="">Select a category</option>
                  <option value="defi">DeFi Drama</option>
                  <option value="memecoin">Memecoin Madness</option>
                  <option value="vc">VC Gossip</option>
                  <option value="protocol">Protocol News</option>
                  <option value="cex">CEX Drama</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 p-4 bg-brand-highlight/10 rounded-lg">
                <Shield className="w-5 h-5 text-brand-primary" />
                <span className="text-sm text-brand-text/80">
                  Your submission is completely anonymous. We don't track your identity.
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-brand-primary hover:bg-brand-primary/90 text-brand-background font-bold px-8 py-3 text-lg flex-1"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Submit Tea
                </Button>
                <Link to="/feed" className="flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background font-bold px-8 py-3 text-lg w-full"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Browse Feed
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-brand-background" />
              </div>
              <h3 className="font-bold text-brand-text mb-2">Anonymous</h3>
              <p className="text-sm text-brand-text/70">Your identity is protected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-brand-background" />
              </div>
              <h3 className="font-bold text-brand-text mb-2">Instant</h3>
              <p className="text-sm text-brand-text/70">Posts go live immediately</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-6 h-6 text-brand-background" />
              </div>
              <h3 className="font-bold text-brand-text mb-2">Rewarded</h3>
              <p className="text-sm text-brand-text/70">Earn tokens for quality content</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Submit; 