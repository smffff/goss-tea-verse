
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Eye, Lock, Wallet, Coffee, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BetaAccessProps {
  onAccessGranted: () => void;
}

const BetaAccess: React.FC<BetaAccessProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const { toast } = useToast();

  const handleBetaAccess = async () => {
    if (!betaCode.trim()) {
      toast({
        title: "Code Required, Degen! 🫖",
        description: "Drop that exclusive beta code to enter the tea zone.",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    // Simulate validation with style
    setTimeout(() => {
      if (betaCode.toLowerCase() === 'spill' || betaCode.toLowerCase() === 'beta' || betaCode.toLowerCase() === 'tea') {
        localStorage.setItem('ctea-beta-access', 'true');
        localStorage.setItem('ctea-beta-code', betaCode);
        toast({
          title: "Welcome to the Tea Zone! 🫖✨",
          description: "Beta access granted. Time to spill some legendary tea!",
        });
        onAccessGranted();
      } else {
        toast({
          title: "Invalid Code, Try Again! 💀",
          description: "That code ain't it, chief. Get the real one from the CTea crew.",
          variant: "destructive"
        });
      }
      setIsValidating(false);
    }, 2000);
  };

  const handleWalletConnect = async () => {
    setWalletConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      localStorage.setItem('ctea-wallet-connected', 'true');
      toast({
        title: "Wallet Connected! 💰",
        description: "VIP access unlocked. Welcome to the inner circle.",
      });
      onAccessGranted();
      setWalletConnecting(false);
    }, 2000);
  };

  const handleDemoMode = () => {
    localStorage.setItem('ctea-demo-mode', 'true');
    toast({
      title: "Demo Mode Activated! 🎭",
      description: "Exploring CTea with sample spicy content...",
    });
    onAccessGranted();
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 vaporwave-bg opacity-10" />
      
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-6"
            >
              <div className="text-6xl">🔐</div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-gothic font-bold mb-4 bg-gradient-to-r from-[#FF1E8B] via-[#00FF9D] to-[#FFFF00] bg-clip-text text-transparent">
              Choose Your Entry Method
            </h2>
            <p className="text-lg text-white/80 font-cyber">
              Multiple ways in, but only one leads to legendary status
            </p>
          </div>

          {/* Access Methods */}
          <div className="space-y-6">
            {/* VIP Wallet Connect */}
            <Card className="glass-morphism border-2 border-[#FFFF00]/30 animate-pulse-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <Crown className="w-6 h-6 text-[#FFFF00]" />
                  VIP Wallet Access
                  <Badge className="bg-[#FFFF00] text-black text-xs">RECOMMENDED</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-white/70 font-cyber">
                  Connect your wallet for instant VIP access + early token rewards
                </p>
                <Button
                  onClick={handleWalletConnect}
                  disabled={walletConnecting}
                  className="w-full bg-gradient-to-r from-[#FFFF00] to-[#00FF9D] hover:from-[#00FF9D] hover:to-[#FFFF00] text-black font-bold py-4 text-lg font-cyber"
                >
                  {walletConnecting ? (
                    <div className="flex items-center">
                      <Coffee className="w-5 h-5 animate-spin mr-2" />
                      Connecting Wallet...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Wallet className="w-5 h-5 mr-2" />
                      Connect Wallet & Enter
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Beta Code Access */}
            <Card className="glass-morphism border-2 border-[#FF1E8B]/30">
              <CardHeader className="text-center">
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5 text-[#FF1E8B]" />
                  Exclusive Beta Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter your exclusive beta code..."
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value)}
                    className="bg-black/50 border-[#FF1E8B]/30 text-white placeholder-gray-400 focus:border-[#FF1E8B] font-mono text-center text-lg font-cyber"
                    onKeyPress={(e) => e.key === 'Enter' && handleBetaAccess()}
                  />
                  <p className="text-xs text-gray-400 text-center font-cyber">
                    Got a code from the CTea crew? This is your golden ticket
                  </p>
                </div>
                
                <Button
                  onClick={handleBetaAccess}
                  disabled={isValidating}
                  className="w-full bg-gradient-to-r from-[#FF1E8B] to-[#8A2BE2] hover:from-[#8A2BE2] hover:to-[#FF1E8B] text-white font-bold py-3 font-cyber"
                >
                  {isValidating ? (
                    <div className="flex items-center">
                      <Sparkles className="w-4 h-4 animate-spin mr-2" />
                      Validating Code...
                    </div>
                  ) : (
                    'Validate & Enter'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Demo Access */}
            <Card className="glass-morphism border-2 border-[#8A2BE2]/30">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-white font-bold mb-2 font-cyber">Just Want to Browse?</h3>
                  <p className="text-sm text-white/60 mb-4 font-cyber">
                    Check out the demo with sample tea spillage
                  </p>
                  <Button
                    onClick={handleDemoMode}
                    variant="outline"
                    className="border-[#8A2BE2]/50 text-[#8A2BE2] hover:bg-[#8A2BE2]/10 font-cyber"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Enter Demo Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8 space-y-2"
          >
            <p className="text-sm text-white/60 font-cyber">
              🔥 Limited beta spots available • First come, first served
            </p>
            <p className="text-xs text-[#00FF9D] font-bold">
              Early access = Early token rewards = Early retirement (maybe)
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BetaAccess;
