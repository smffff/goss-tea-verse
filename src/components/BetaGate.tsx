import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Lock, Coffee, Users, TrendingUp, Zap, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ParallaxElement from '@/components/ui/ParallaxElement';
import ViralCTA from '@/components/ui/ViralCTA';
import { betaCodeService } from '@/services/betaCodeService';
import { useToast } from '@/hooks/use-toast';

interface BetaGateProps {
  onAccessGranted: () => void;
}

const BetaGate: React.FC<BetaGateProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [showSpillForm, setShowSpillForm] = useState(false);
  const [spillContent, setSpillContent] = useState('');
  const [isSpilling, setIsSpilling] = useState(false);
  const { toast } = useToast();

  const handleBetaSubmit = async () => {
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const result = await betaCodeService.validateCode(betaCode, true);
      
      if (result.valid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', result.code || betaCode);
        toast({
          title: "Access Granted! ☕",
          description: "Welcome to CTea Newsroom Beta!",
        });
        onAccessGranted();
      } else {
        setError(result.error || 'Invalid beta code. Please check your code and try again.');
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSpillTea = async () => {
    if (!spillContent.trim()) {
      setError('Please enter some tea to spill!');
      return;
    }

    setIsSpilling(true);
    setError('');

    try {
      // First create a mock submission ID (in real app this would come from actual submission)
      const mockSubmissionId = crypto.randomUUID();
      
      // Generate beta code for the spill
      const result = await betaCodeService.generateCodeForSpill(mockSubmissionId);
      
      if (result.success && result.code) {
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', result.code);
        toast({
          title: "Tea Spilled Successfully! 🫖",
          description: `Your access code is: ${result.code}`,
        });
        onAccessGranted();
      } else {
        setError(result.error || 'Failed to generate access code');
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Spill tea error:', error);
      setError('Failed to spill tea. Please try again.');
    } finally {
      setIsSpilling(false);
    }
  };

  const handleBribe = () => {
    // For now, just give them a code - in production this would handle payment
    const testCodes = betaCodeService.getTestCodes();
    const randomCode = testCodes[Math.floor(Math.random() * testCodes.length)];
    setBetaCode(randomCode);
    toast({
      title: "Bribe Accepted! 💰",
      description: `Here's your access code: ${randomCode}`,
    });
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
                Where Crypto Twitter Comes to Spill ☕
              </p>
            </motion.div>

            {/* Beta Access Options */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              {/* Spill Tea Option */}
              <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg cursor-pointer hover:border-ctea-teal/60 transition-all" onClick={() => setShowSpillForm(!showSpillForm)}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ctea-teal to-green-400 rounded-full flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">🫖 Spill Your Tea</CardTitle>
                  <p className="text-gray-400 text-sm">Share gossip, get access</p>
                </CardHeader>
              </Card>

              {/* Bribe Option */}
              <Card className="bg-ctea-dark/80 border-pink-400/30 backdrop-blur-lg cursor-pointer hover:border-pink-400/60 transition-all" onClick={handleBribe}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">💸 Bribe the Gatekeepers</CardTitle>
                  <p className="text-gray-400 text-sm">Send tip, unlock access</p>
                </CardHeader>
              </Card>

              {/* Code Entry Option */}
              <Card className="bg-ctea-dark/80 border-yellow-400/30 backdrop-blur-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">🔑 Enter Access Code</CardTitle>
                  <p className="text-gray-400 text-sm">Already have a code?</p>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Spill Tea Form */}
            <AnimatePresence>
              {showSpillForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg max-w-md mx-auto">
                    <CardHeader>
                      <CardTitle className="text-white text-center">Share Your Tea ☕</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <textarea
                        value={spillContent}
                        onChange={(e) => setSpillContent(e.target.value)}
                        placeholder="What's the hot gossip? Share your crypto tea..."
                        className="w-full bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal rounded-lg p-3 min-h-[100px] resize-none"
                        maxLength={500}
                      />
                      <div className="text-xs text-gray-400 text-right">
                        {spillContent.length}/500 characters
                      </div>
                      <ViralCTA
                        variant="spill"
                        size="md"
                        onClick={handleSpillTea}
                        className="w-full"
                        showParticles={false}
                        shakeOnHover={false}
                        disabled={isSpilling || !spillContent.trim()}
                      >
                        {isSpilling ? 'Spilling Tea...' : 'Spill & Get Access'}
                      </ViralCTA>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Beta Code Entry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-white text-center">Beta Access</CardTitle>
                  <p className="text-gray-400 text-center">Enter your exclusive beta code</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Enter beta code..."
                      value={betaCode}
                      onChange={(e) => setBetaCode(e.target.value.toUpperCase())}
                      className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal text-center font-mono"
                      onKeyPress={(e) => e.key === 'Enter' && handleBetaSubmit()}
                    />
                    {error && (
                      <Alert className="border-red-500 bg-red-500/10">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <AlertDescription className="text-red-400">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <ViralCTA
                    variant="spill"
                    size="md"
                    onClick={handleBetaSubmit}
                    className="w-full"
                    showParticles={false}
                    shakeOnHover={false}
                    disabled={isVerifying}
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
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12"
            >
              <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-teal/20 rounded-lg p-6 text-center">
                <Users className="w-8 h-8 text-ctea-teal mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-400 text-sm">Join crypto's hottest gossip network</p>
              </div>
              <div className="bg-ctea-dark/40 backdrop-blur border border-pink-400/20 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Trending Alpha</h3>
                <p className="text-gray-400 text-sm">Stay ahead with insider intel</p>
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
