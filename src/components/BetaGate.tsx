import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Coffee, Crown, Gift, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import TeaSpillModal from './TeaSpillModal';
import TipModal from './TipModal';

interface BetaGateProps {
  onAccessGranted: () => void;
}

const BetaGate: React.FC<BetaGateProps> = ({ onAccessGranted }) => {
  const [showSpillModal, setShowSpillModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [betaCode, setBetaCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user already has beta access
    const hasAccess = localStorage.getItem('ctea-beta-access');
    if (hasAccess) {
      onAccessGranted();
    }
  }, [onAccessGranted]);

  const validateBetaCode = async () => {
    if (!betaCode.trim()) {
      toast({
        title: "Enter Beta Code",
        description: "Please enter your beta access code",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    try {
      // Call the validate_beta_code function directly
      const { data, error } = await supabase.rpc('validate_beta_code', {
        code: betaCode.trim().toUpperCase()
      });

      if (error) {
        console.error('Beta code validation error:', error);
        toast({
          title: "Validation Failed",
          description: "Unable to validate beta code. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Handle the response as any since it's a custom function
      const result = data as any;
      
      if (result?.valid) {
        localStorage.setItem('ctea-beta-access', 'true');
        localStorage.setItem('ctea-beta-code', betaCode.trim().toUpperCase());
        toast({
          title: "Welcome to CTea News! 🫖",
          description: "Beta access granted. Welcome to the exclusive preview!",
        });
        onAccessGranted();
      } else {
        toast({
          title: "Invalid Code",
          description: "The beta code is invalid or expired. Try earning access instead!",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Beta validation error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSpillSuccess = () => {
    setShowSpillModal(false);
    localStorage.setItem('ctea-beta-access', 'true');
    localStorage.setItem('ctea-beta-method', 'spill');
    toast({
      title: "Tea Spilled Successfully! 🫖",
      description: "Welcome to CTea News beta! Your gossip earned you access.",
    });
    onAccessGranted();
  };

  const handleTipSuccess = () => {
    setShowTipModal(false);
    localStorage.setItem('ctea-beta-access', 'true');
    localStorage.setItem('ctea-beta-method', 'tip');
    toast({
      title: "Thanks for the Tip! 💰",
      description: "Welcome to CTea News beta! Your generosity is appreciated.",
    });
    onAccessGranted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-500 relative overflow-hidden">
      {/* Vaporwave Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse delay-2000" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Logo/Title */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse">
              <Coffee className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider" style={{
              textShadow: '0 0 20px cyan, 0 0 40px pink, 0 0 60px purple',
              fontFamily: 'Impact, Arial Black, sans-serif'
            }}>
              CTEA NEWS
            </h1>
            <div className="text-2xl md:text-3xl text-cyan-300 font-bold mb-2 tracking-widest">
              BETA ACCESS REQUIRED
            </div>
            <div className="text-lg text-pink-300 italic">
              Web3's Hottest Gossip Feed
            </div>
          </div>

          {!showCodeEntry ? (
            <Card className="bg-black/50 backdrop-blur-lg border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20">
              <CardContent className="p-8 space-y-6">
                <div className="text-xl text-white font-bold mb-6 tracking-wide">
                  CHOOSE YOUR PATH TO ACCESS
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Spill Tea Option */}
                  <Button
                    onClick={() => setShowSpillModal(true)}
                    className="h-32 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-2 border-pink-400 text-white font-bold text-lg tracking-wider shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2" />
                      <div>SPILL TEA</div>
                      <div>FOR BETA ACCESS</div>
                      <div className="text-sm opacity-80 mt-1">Share crypto gossip</div>
                    </div>
                  </Button>

                  {/* Bribe Option */}
                  <Button
                    onClick={() => setShowTipModal(true)}
                    className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-2 border-cyan-400 text-white font-bold text-lg tracking-wider shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-center">
                      <Crown className="w-8 h-8 mx-auto mb-2" />
                      <div>BRIBE THE</div>
                      <div>GATEKEEPERS</div>
                      <div className="text-sm opacity-80 mt-1">Tip for instant access</div>
                    </div>
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <Button
                    variant="ghost"
                    onClick={() => setShowCodeEntry(true)}
                    className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-900/20"
                  >
                    Already have a beta code? Enter it here
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black/50 backdrop-blur-lg border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20">
              <CardContent className="p-8">
                <div className="text-xl text-white font-bold mb-6 tracking-wide">
                  ENTER BETA CODE
                </div>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="BETA-CODE-HERE"
                    value={betaCode}
                    onChange={(e) => setBetaCode(e.target.value.toUpperCase())}
                    className="text-center text-lg font-mono bg-gray-900/50 border-cyan-400/50 text-white placeholder-gray-400"
                    maxLength={20}
                  />
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={validateBetaCode}
                      disabled={isValidating}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold"
                    >
                      {isValidating ? 'Validating...' : 'VALIDATE CODE'}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setShowCodeEntry(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 text-sm text-gray-400 max-w-md mx-auto">
            CTea News is in exclusive beta. Earn access by contributing quality content or supporting our development.
          </div>
        </div>
      </div>

      {/* Modals */}
      <TeaSpillModal
        isOpen={showSpillModal}
        onClose={() => setShowSpillModal(false)}
        onSuccess={handleSpillSuccess}
      />

      <TipModal
        isOpen={showTipModal}
        onClose={() => setShowTipModal(false)}
        onSuccess={handleTipSuccess}
      />
    </div>
  );
};

export default BetaGate;
