
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, Lock, Sparkles, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedBetaGateProps {
  onAccessGranted: () => void;
}

const EnhancedBetaGate: React.FC<EnhancedBetaGateProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const validateBetaCode = async (code: string): Promise<boolean> => {
    const validCodes = ['CTEA2024', 'BETA-ACCESS', 'EARLY-BIRD', 'SPILL-TEA'];
    return validCodes.includes(code.toUpperCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        toast({
          title: "Welcome to CTea! ☕",
          description: "You now have access to the hottest gossip platform.",
        });
        onAccessGranted();
      } else {
        setError('Invalid beta code. Request access below or try again.');
      }
    } catch (error) {
      console.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-ctea-dark/90 border-ctea-teal/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">CTea Newsroom</CardTitle>
            <p className="text-gray-400">Beta Access Required</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="betaCode" className="text-white">Beta Code</Label>
                <Input
                  id="betaCode"
                  placeholder="Enter your beta code..."
                  value={betaCode}
                  onChange={(e) => setBetaCode(e.target.value)}
                  className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80"
              >
                {isVerifying ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Access CTea
                  </div>
                )}
              </Button>
            </form>

            <div className="pt-4 border-t border-ctea-teal/20">
              <h3 className="text-white font-medium mb-3">Need Access?</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-ctea-darker/50 rounded">
                  <Users className="w-5 h-5 text-ctea-teal mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Join Community</p>
                </div>
                <div className="p-2 bg-ctea-darker/50 rounded">
                  <TrendingUp className="w-5 h-5 text-ctea-teal mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Follow Updates</p>
                </div>
                <div className="p-2 bg-ctea-darker/50 rounded">
                  <Sparkles className="w-5 h-5 text-ctea-teal mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Request Invite</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedBetaGate;
