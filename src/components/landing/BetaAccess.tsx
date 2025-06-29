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
            <h2 className="text-4xl md:text-5xl font-retro font-bold mb-4 bg-gradient-to-r from-brand via-accent to-brand bg-clip-text text-transparent">
              Choose Your Entry Method
            </h2>
            <p className="text-lg text-text/80 font-cyber">
              Multiple ways in, but only one leads to legendary status
            </p>
          </div>

          {/* Access Methods */}
          <div className="space-y-6">
            {/* VIP Wallet Connect */}
            <Card className="border-2 border-accent/30 bg-[#14141f]/80 backdrop-blur-sm animate-pulse-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-text flex items-center justify-center gap-2">
                  <Crown className="w-6 h-6 text-accent" />
                  VIP Wallet Access
                  <Badge className="bg-accent text-bg text-xs font-retro">RECOMMENDED</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-text/70 font-cyber">
                  Connect your wallet for instant VIP access + early token rewards
                </p>
                <Button
                  onClick={handleWalletConnect}
                  disabled={walletConnecting}
                  className="w-full bg-gradient-to-r from-accent to-brand hover:from-brand hover:to-accent text-bg font-bold py-4 text-lg font-retro"
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
            <Card className="border-2 border-brand/30 bg-[#14141f]/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-text flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5 text-brand" />
                  Exclusive Beta Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter beta code"
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value)}
                    className="bg-bg/50 border-brand/30 text-text placeholder-text/40 focus:border-brand focus:ring-brand/20 font-retro text-center text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleBetaAccess()}
                  />
                  <p className="text-xs text-text/40 text-center font-cyber">
                    Got a code from the CTea crew? This is your golden ticket
                  </p>
                </div>
                
                <Button
                  onClick={handleBetaAccess}
                  disabled={isValidating}
                  className="w-full bg-gradient-to-r from-brand to-accent hover:from-accent hover:to-brand text-bg font-bold py-3 font-retro"
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
            <Card className="border-2 border-accent/30 bg-[#14141f]/80 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-text font-bold mb-2 font-retro">Just Want to Browse?</h3>
                  <p className="text-sm text-text/60 mb-4 font-cyber">
                    Check out the demo with sample tea spillage
                  </p>
                  <Button
                    onClick={handleDemoMode}
                    variant="outline"
                    className="border-accent/50 text-accent hover:bg-accent/10 font-retro"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Enter Demo Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-text/60 font-cyber text-sm">
              🔥 Join 1,337+ anonymous tea spillers brewing maximum chaos
            </p>
            <p className="text-accent font-bold text-xs mt-2 font-retro">
              Beta 1.2 • Where Crypto Twitter Goes to Confess Their Sins
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BetaAccess;
