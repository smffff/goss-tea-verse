
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Coffee, Lock, Play, Eye, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { betaCodeService } from '@/services/betaCodeService';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface SimpleBetaLandingProps {
  onAccessGranted: () => void;
}

const SimpleBetaLanding: React.FC<SimpleBetaLandingProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [showTestCodes, setShowTestCodes] = useState(false);
  const { toast } = useToast();

  const testCodes = betaCodeService.getTestCodes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const result = await betaCodeService.validateCode(betaCode, true);
      
      if (result.valid) {
        toast({
          title: "Welcome to CTea! ☕",
          description: "You're now part of the hottest gossip network!",
        });
        onAccessGranted();
      } else {
        setError('Invalid beta code. Need access? Request an invite from the CTea team!');
      }
    } catch (error) {
      secureLog.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDemoMode = () => {
    betaCodeService.enableDemoMode();
    toast({
      title: "Demo Mode Activated! 🎭",
      description: "Exploring CTea with sample data",
    });
    onAccessGranted();
  };

  const handleTestCode = (code: string) => {
    setBetaCode(code);
    setShowTestCodes(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-ctea-purple rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-ctea-dark/90 border-ctea-teal/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
              CTea Newsroom
              <BrandedTeacupIcon size="sm" animated />
            </CardTitle>
            <p className="text-gray-400">Beta 1.2 • Where Crypto Twitter Spills ☕</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Primary Demo Access */}
            <div className="space-y-3">
              <Button
                onClick={handleDemoMode}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Try Demo Mode
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Experience CTea with sample data • No signup required
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-ctea-teal/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-ctea-dark px-2 text-gray-400">Or use beta code</span>
              </div>
            </div>

            {/* Beta Code Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Enter your beta code..."
                  value={betaCode}
                  onChange={(e) => setBetaCode(e.target.value)}
                  className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal font-mono text-center"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
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

            {/* Development Test Codes (only in dev) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="pt-4 border-t border-ctea-teal/20">
                <Button
                  variant="ghost"
                  onClick={() => setShowTestCodes(!showTestCodes)}
                  className="w-full text-ctea-teal hover:bg-ctea-teal/10 text-xs"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  {showTestCodes ? 'Hide' : 'Show'} Test Codes
                </Button>

                {showTestCodes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {testCodes.map((code) => (
                        <Badge
                          key={code}
                          variant="outline"
                          className="cursor-pointer border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10 font-mono text-xs justify-center py-1"
                          onClick={() => handleTestCode(code)}
                        >
                          {code}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Help Section */}
            <div className="pt-4 border-t border-ctea-teal/20 text-center">
              <p className="text-xs text-gray-400 mb-2">Need a beta code?</p>
              <p className="text-xs text-ctea-teal">
                Request access from the CTea team or try demo mode above!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SimpleBetaLanding;
