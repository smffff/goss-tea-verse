
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Code, Heart, Coins, CheckCircle, Zap, Crown, Shield, Users, Sparkles, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SpillTeaModal from '@/components/modals/SpillTeaModal';
import { motion } from 'framer-motion';

interface CTEANewsroomLandingProps {
  onAccessGranted: () => void;
}

const CTEANewsroomLanding: React.FC<CTEANewsroomLandingProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [selectedTipAmount, setSelectedTipAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSpillModal, setShowSpillModal] = useState(false);
  const { toast } = useToast();

  const quickTipAmounts = [1, 5, 10, 25];

  const handleBetaCode = async () => {
    if (!betaCode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter a beta access code",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (betaCode.length >= 6) {
        localStorage.setItem('ctea-beta-access', 'true');
        localStorage.setItem('ctea-beta-code', betaCode);
        toast({
          title: "Access Granted! 🎉",
          description: "Welcome to CTea Newsroom Beta!",
        });
        onAccessGranted();
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check your beta access code",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickTip = async (amount: number) => {
    setSelectedTipAmount(amount);
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('ctea-beta-access', 'true');
      localStorage.setItem('ctea-demo-mode', 'true');
      
      // Determine access level based on tip amount
      const accessLevel = amount >= 10 ? 'CONNOISSEUR' : 'SIPPER';
      localStorage.setItem('ctea-access-level', accessLevel);
      
      toast({
        title: `Thanks for the ${amount === 1 ? 'coffee' : 'generous tip'}! ☕`,
        description: `${accessLevel} access granted! The devs appreciate your support.`,
      });
      onAccessGranted();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setSelectedTipAmount(null);
    }
  };

  const handleSpillSuccess = () => {
    localStorage.setItem('ctea-beta-access', 'true');
    localStorage.setItem('ctea-demo-mode', 'true');
    localStorage.setItem('ctea-access-level', 'SIPPER');
    toast({
      title: "Great Tea! 🫖",
      description: "Your spill earned you SIPPER access!",
    });
    onAccessGranted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-ctea-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-ctea-purple/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-6xl">🫖</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent">
                CTea Newsroom
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-sm font-bold">
                  Beta 1.2 LIVE!
                </Badge>
                <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30 text-sm">
                  OG ACCESS
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Tagline */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              We Don't Report the News.{' '}
              <span className="bg-gradient-to-r from-pink-400 to-ctea-teal bg-clip-text text-transparent">
                We Stir It. 🫖
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The hottest crypto gossip platform where your tea spills earn you real rewards. 
              Join the exclusive beta and start stirring up the community.
            </p>
          </motion.div>

          {/* Security Badges */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
              <Shield className="w-4 h-4 mr-1" />
              Secured 🔒
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
              <Users className="w-4 h-4 mr-1" />
              Gated 👥
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1">
              <Zap className="w-4 h-4 mr-1" />
              Ready ⚡
            </Badge>
          </motion.div>
        </motion.div>

        {/* Access Methods Grid */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* Beta Code Access */}
          <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-ctea-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-ctea-teal" />
              </div>
              <CardTitle className="text-white">Beta Code Access</CardTitle>
              <p className="text-gray-400 text-sm">Got an exclusive code? Enter it here</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter beta code..."
                value={betaCode}
                onChange={(e) => setBetaCode(e.target.value)}
                className="bg-ctea-darker border-ctea-teal/30 text-white"
                disabled={isProcessing}
              />
              <Button
                onClick={handleBetaCode}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-ctea-teal to-cyan-400 hover:from-cyan-400 hover:to-ctea-teal text-white font-bold"
              >
                {isProcessing ? 'Verifying...' : 'Access Beta'}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Tip Access */}
          <Card className="bg-ctea-dark/80 border-orange-500/30 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-400" />
              </div>
              <CardTitle className="text-white">Buy Us Coffee</CardTitle>
              <p className="text-gray-400 text-sm">Support the devs, get instant access</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {quickTipAmounts.map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => handleQuickTip(amount)}
                    disabled={isProcessing}
                    variant={selectedTipAmount === amount ? "default" : "outline"}
                    className={`${
                      selectedTipAmount === amount 
                        ? 'bg-orange-500 text-white' 
                        : 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
                    } relative`}
                  >
                    {isProcessing && selectedTipAmount === amount && (
                      <div className="absolute inset-0 bg-orange-500/20 rounded animate-pulse"></div>
                    )}
                    ${amount}
                    {amount >= 10 && (
                      <Crown className="w-3 h-3 ml-1 text-yellow-400" />
                    )}
                  </Button>
                ))}
              </div>
              <div className="text-xs text-gray-500 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Coins className="w-3 h-3" />
                  $1-$9 = SIPPER Access
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Crown className="w-3 h-3 text-yellow-400" />
                  $10+ = CONNOISSEUR Access
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spill Tea Access */}
          <Card className="bg-ctea-dark/80 border-ctea-purple/30 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-ctea-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-ctea-purple" />
              </div>
              <CardTitle className="text-white">Spill Hot Tea</CardTitle>
              <p className="text-gray-400 text-sm">Share quality gossip to earn access</p>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setShowSpillModal(true)}
                className="w-full bg-gradient-to-r from-ctea-purple to-pink-500 hover:from-pink-500 hover:to-ctea-purple text-white font-bold"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Spill the Tea
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <div className="mt-3 text-xs text-gray-500 text-center">
                Quality spills = SIPPER Access
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Preview Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-ctea-dark/50 border border-ctea-teal/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-semibold mb-4">What's Inside Beta 1.2:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-gray-300">
                <div className="text-ctea-teal mb-1">🏠</div>
                Home Feed
              </div>
              <div className="text-gray-300">
                <div className="text-pink-400 mb-1">🫖</div>
                Spill Tea
              </div>
              <div className="text-gray-300">
                <div className="text-ctea-purple mb-1">📈</div>
                Trending
              </div>
              <div className="text-gray-300">
                <div className="text-yellow-400 mb-1">💰</div>
                $TEA Rewards
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            CTea Newsroom Beta 1.2 • Limited Access • Premium Gossip Platform
          </p>
        </div>
      </div>

      {/* Spill Tea Modal */}
      <SpillTeaModal
        isOpen={showSpillModal}
        onClose={() => setShowSpillModal(false)}
        onSuccess={handleSpillSuccess}
      />
    </div>
  );
};

export default CTEANewsroomLanding;
