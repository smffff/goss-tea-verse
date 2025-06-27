
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Code, Heart, Coins, CheckCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SpillTeaModal from '@/components/modals/SpillTeaModal';

interface SimpleBetaLandingProps {
  onAccessGranted: () => void;
}

const SimpleBetaLanding: React.FC<SimpleBetaLandingProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSpillModal, setShowSpillModal] = useState(false);
  const { toast } = useToast();

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
      // Simulate code validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, accept any code that looks like a beta code
      if (betaCode.length >= 6) {
        localStorage.setItem('ctea-beta-access', 'true');
        localStorage.setItem('ctea-beta-code', betaCode);
        toast({
          title: "Access Granted! 🎉",
          description: "Welcome to CTea Beta!",
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

  const handleTip = async () => {
    const amount = parseFloat(tipAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid tip amount",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('ctea-beta-access', 'true');
      localStorage.setItem('ctea-demo-mode', 'true');
      toast({
        title: "Thanks for the tip! ☕",
        description: "Access granted! The devs appreciate your support.",
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
    }
  };

  const handleSpillSuccess = () => {
    localStorage.setItem('ctea-beta-access', 'true');
    localStorage.setItem('ctea-demo-mode', 'true');
    toast({
      title: "Great Tea! 🫖",
      description: "Your spill earned you beta access!",
    });
    onAccessGranted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🫖</div>
          <h1 className="text-4xl font-bold text-white mb-4">CTea Beta Access</h1>
          <p className="text-gray-300 text-lg">
            The hottest crypto gossip platform. Choose your way in:
          </p>
        </div>

        {/* Access Methods */}
        <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white text-center">Get Beta Access</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-ctea-darker">
                <TabsTrigger value="code" className="text-white data-[state=active]:bg-ctea-teal">
                  <Code className="w-4 h-4 mr-2" />
                  Beta Code
                </TabsTrigger>
                <TabsTrigger value="spill" className="text-white data-[state=active]:bg-ctea-purple">
                  <Coffee className="w-4 h-4 mr-2" />
                  Spill Tea
                </TabsTrigger>
                <TabsTrigger value="tip" className="text-white data-[state=active]:bg-orange-500">
                  <Heart className="w-4 h-4 mr-2" />
                  Tip Devs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="space-y-4">
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Have a Beta Code?</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Enter your exclusive beta access code below
                  </p>
                </div>
                <div className="space-y-3">
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
                </div>
              </TabsContent>

              <TabsContent value="spill" className="space-y-4">
                <div className="text-center py-4">
                  <Zap className="w-12 h-12 text-ctea-purple mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Share Hot Gossip</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Spill some quality tea to earn access
                  </p>
                </div>
                <Button
                  onClick={() => setShowSpillModal(true)}
                  className="w-full bg-gradient-to-r from-ctea-purple to-pink-500 hover:from-pink-500 hover:to-ctea-purple text-white font-bold"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Spill the Tea
                </Button>
              </TabsContent>

              <TabsContent value="tip" className="space-y-4">
                <div className="text-center py-4">
                  <Coins className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Support the Devs</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Buy us coffee and get instant access
                  </p>
                </div>
                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Tip amount ($)"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    className="bg-ctea-darker border-orange-400/30 text-white"
                    disabled={isProcessing}
                    min="1"
                    step="0.01"
                  />
                  <Button
                    onClick={handleTip}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-bold"
                  >
                    {isProcessing ? 'Processing...' : 'Send Tip & Access'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            CTea Beta • The future of crypto gossip is here
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

export default SimpleBetaLanding;
