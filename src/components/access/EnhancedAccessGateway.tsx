
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Coffee, Send, Key, Crown, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';
import { EnhancedAuthValidation } from '@/services/security/enhancedAuthValidation';
import type { AccessLevel } from './AccessControlProvider';

interface EnhancedAccessGatewayProps {
  onAccessGranted: (level: AccessLevel) => void;
}

const EnhancedAccessGateway: React.FC<EnhancedAccessGatewayProps> = ({
  onAccessGranted
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'spill'>('spill');
  const [betaCode, setBetaCode] = useState('');
  const [spillContent, setSpillContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBetaCodeSubmit = useCallback(async () => {
    if (!betaCode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter a beta access code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const validation = await EnhancedAuthValidation.validateBetaCode(betaCode);
      
      if (validation.isValid) {
        localStorage.setItem('ctea-access-level', 'beta');
        localStorage.setItem('ctea-beta-code', betaCode);
        
        toast({
          title: "Access Granted! 🎉",
          description: "Welcome to CTea Newsroom!",
        });
        
        onAccessGranted('beta');
      } else {
        toast({
          title: "Invalid Code",
          description: "This code is not valid or has expired",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [betaCode, onAccessGranted, toast]);

  const handleSpillSubmit = useCallback(async () => {
    if (!spillContent.trim()) {
      toast({
        title: "Content Required",
        description: "Please share some tea to get access!",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate access code
      const accessCode = `TEA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      localStorage.setItem('ctea-access-level', 'guest');
      localStorage.setItem('ctea-peek-start', Date.now().toString());
      localStorage.setItem('ctea-spill-code', accessCode);
      
      toast({
        title: "Tea Accepted! ☕",
        description: `Your preview access is ready! Code: ${accessCode}`,
        duration: 8000,
      });
      
      onAccessGranted('guest');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Could not process your tea. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [spillContent, onAccessGranted, toast]);

  const handleSneak = useCallback(() => {
    localStorage.setItem('ctea-access-level', 'guest');
    localStorage.setItem('ctea-peek-start', Date.now().toString());
    
    toast({
      title: "Welcome to CTea! 👀",
      description: "You have 5 minutes to explore!",
    });
    
    onAccessGranted('guest');
  }, [onAccessGranted, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <BrandedTeacupIcon size="xl" variant="bounce" />
          
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              CTea Newsroom
            </h1>
            <p className="text-ctea-teal font-semibold">
              Beta 1.2 is LIVE!
            </p>
            <p className="text-gray-400 text-sm">
              Where Crypto Twitter Comes to Spill
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/50">
              🔒 Secured
            </Badge>
            <Badge className="bg-pink-400/20 text-pink-400 border-pink-400/50">
              👥 Gated
            </Badge>
            <Badge className="bg-green-400/20 text-green-400 border-green-400/50">
              ⚡ Ready
            </Badge>
          </div>
        </div>

        {/* Access Methods */}
        <Card className="bg-ctea-dark/60 border-ctea-teal/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex space-x-1">
              <Button
                onClick={() => setActiveTab('spill')}
                variant={activeTab === 'spill' ? 'default' : 'ghost'}
                className={activeTab === 'spill' ? 'bg-ctea-teal text-white' : 'text-gray-400'}
                size="sm"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Spill Tea
              </Button>
              <Button
                onClick={() => setActiveTab('code')}
                variant={activeTab === 'code' ? 'default' : 'ghost'}
                className={activeTab === 'code' ? 'bg-ctea-teal text-white' : 'text-gray-400'}
                size="sm"
              >
                <Key className="w-4 h-4 mr-2" />
                Beta Code
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {activeTab === 'spill' && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    What's the hottest crypto tea? ☕
                  </label>
                  <Textarea
                    placeholder="Spill the tea... Which project is sus? Who's dumping? Share your alpha!"
                    value={spillContent}
                    onChange={(e) => setSpillContent(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                    rows={4}
                    maxLength={500}
                  />
                  <div className="text-xs text-white/60 text-right mt-1">
                    {spillContent.length}/500
                  </div>
                </div>

                <Button
                  onClick={handleSpillSubmit}
                  disabled={isLoading || !spillContent.trim()}
                  className="w-full bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Brewing Code...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Spill & Get Access
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {activeTab === 'code' && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Enter Beta Access Code 🔑
                  </label>
                  <Input
                    placeholder="TEA-XXXXX"
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value.toUpperCase())}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    maxLength={20}
                  />
                </div>

                <Button
                  onClick={handleBetaCodeSubmit}
                  disabled={isLoading || !betaCode.trim()}
                  className="w-full bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Unlock Full Access
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            <div className="pt-4 border-t border-white/10">
              <Button
                onClick={handleSneak}
                variant="outline"
                className="w-full border-white/20 text-white/80 hover:bg-white/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Just Take a Peek (5 min preview)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>On-chain gossip meets meme warfare.</p>
          <p>CTea News is where rumors get receipts.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedAccessGateway;
