
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Lock, Coffee, Users, TrendingUp, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import ViralCTA from '@/components/ui/ViralCTA';

interface BetaGateProps {
  onAccessGranted: () => void;
}

const BetaGate: React.FC<BetaGateProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const validateBetaCode = async (code: string): Promise<boolean> => {
    try {
      // Simple validation - in production you might want to check against a database table
      const validCodes = ['CTEA2024', 'BETA-ACCESS', 'EARLY-BIRD'];
      return validCodes.includes(code.toUpperCase());
    } catch (error) {
      console.error('Beta code validation error:', error);
      return false;
    }
  };

  const handleBetaSubmit = async () => {
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const isValid = await validateBetaCode(betaCode);
      
      if (isValid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        onAccessGranted();
      } else {
        setError('Invalid beta code. Please check your code and try again.');
      }
    } catch (error) {
      console.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-ctea-purple rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Parallax Elements */}
      <ParallaxElement speed={0.5} direction="up" className="absolute top-20 left-10">
        <Coffee className="w-12 h-12 text-ctea-teal opacity-30" />
      </ParallaxElement>
      <ParallaxElement speed={0.3} direction="down" className="absolute top-40 right-20">
        <Sparkles className="w-8 h-8 text-pink-400 opacity-40" />
      </ParallaxElement>
      <ParallaxElement speed={0.7} direction="up" className="absolute bottom-32 left-20">
        <Zap className="w-10 h-10 text-yellow-400 opacity-35" />
      </ParallaxElement>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-ctea-dark rounded-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-ctea-teal" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent mb-4">
                CTea Newsroom
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light">
                Where Gossip Meets Intelligence
              </p>
            </motion.div>

            {/* Beta Access Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg max-w-md mx-auto mb-8">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">Beta Access Required</CardTitle>
                  <p className="text-gray-400">Enter your exclusive beta code to continue</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Enter beta code..."
                      value={betaCode}
                      onChange={(e) => setBetaCode(e.target.value)}
                      className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal"
                      onKeyPress={(e) => e.key === 'Enter' && handleBetaSubmit()}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                  <ViralCTA
                    variant="spill"
                    size="md"
                    onClick={handleBetaSubmit}
                    className="w-full"
                    showParticles={false}
                    shakeOnHover={false}
                  >
                    {isVerifying ? 'Verifying...' : 'Access The Tea'}
                  </ViralCTA>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-teal/20 rounded-lg p-6 text-center">
                <Users className="w-8 h-8 text-ctea-teal mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-400 text-sm">Join thousands of gossip enthusiasts</p>
              </div>
              <div className="bg-ctea-dark/40 backdrop-blur border border-pink-400/20 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Trending Stories</h3>
                <p className="text-gray-400 text-sm">Stay ahead of the curve</p>
              </div>
              <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-purple/20 rounded-lg p-6 text-center">
                <Sparkles className="w-8 h-8 text-ctea-purple mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">AI Powered</h3>
                <p className="text-gray-400 text-sm">Smart content curation</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BetaGate;
