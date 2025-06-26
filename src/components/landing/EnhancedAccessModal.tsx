
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Coffee, Sparkles, Wallet, Code, Send, Eye, EyeOff } from 'lucide-react';
import { BetaCodeService } from '@/services/betaCodeService';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import SpillingTeaCup from '@/components/ui/SpillingTeaCup';

interface EnhancedAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPath: 'spill' | 'bribe' | 'code' | null;
  accessCode: string;
  onAccessCodeChange: (code: string) => void;
  onSubmit: () => void;
}

const EnhancedAccessModal: React.FC<EnhancedAccessModalProps> = ({
  isOpen,
  onClose,
  selectedPath,
  accessCode,
  onAccessCodeChange,
  onSubmit
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [spillContent, setSpillContent] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [step, setStep] = useState<'input' | 'generated' | 'success'>('input');
  const { toast } = useToast();

  const getModalConfig = () => {
    switch (selectedPath) {
      case 'spill':
        return {
          title: 'Spill Your Tea ☕',
          icon: Coffee,
          gradient: 'from-[#FF6B9D] to-[#FF9500]',
          description: 'Share the hottest crypto gossip to unlock your access'
        };
      case 'bribe':
        return {
          title: 'Bribe Accepted 💰',
          icon: Wallet,
          gradient: 'from-[#00D4AA] to-[#4DD9D4]',
          description: 'Send a tip to the tea masters for instant access'
        };
      case 'code':
        return {
          title: 'Enter Access Code 🔑',
          icon: Code,
          gradient: 'from-[#9B59B6] to-[#FF6B9D]',
          description: 'Already have a secret code? Enter it here'
        };
      default:
        return {
          title: 'Access Required',
          icon: Coffee,
          gradient: 'from-[#FF6B9D] to-[#FF9500]',
          description: 'Choose your path to access'
        };
    }
  };

  const config = getModalConfig();

  const handleSpillSubmit = async () => {
    if (!spillContent.trim()) {
      setError('Please enter some tea to spill!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create a mock submission ID for demo
      const mockSubmissionId = crypto.randomUUID();
      
      const result = await BetaCodeService.generateCodeForSpill(mockSubmissionId);
      
      if (result.success && result.code) {
        setGeneratedCode(result.code);
        setStep('generated');
        toast({
          title: "Tea Spilled Successfully! 🫖",
          description: "Your exclusive access code has been generated!",
        });
      } else {
        setError(result.error || 'Failed to generate access code');
      }
    } catch (error) {
      console.error('Spill tea error:', error);
      setError('Failed to spill tea. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBribeSubmit = async () => {
    if (!tipAmount || parseFloat(tipAmount) < 0.001) {
      setError('Minimum tip is 0.001 ETH');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate tip processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const testCodes = BetaCodeService.getTestCodes();
      const randomCode = testCodes[Math.floor(Math.random() * testCodes.length)];
      setGeneratedCode(randomCode);
      setStep('generated');
      
      toast({
        title: "Bribe Accepted! 💰",
        description: "The gatekeepers have blessed you with access!",
      });
    } catch (error) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await BetaCodeService.validateCode(accessCode, true);
      
      if (result.valid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', result.code || accessCode);
        setStep('success');
        toast({
          title: "Access Granted! ☕",
          description: "Welcome to CTea Newsroom!",
        });
        setTimeout(() => onSubmit(), 1500);
      } else {
        setError(result.error || 'Oops, that code\'s gone cold ☕️');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseGeneratedCode = async () => {
    if (!generatedCode) return;

    setIsLoading(true);
    try {
      const result = await BetaCodeService.validateCode(generatedCode, true);
      
      if (result.valid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', result.code || generatedCode);
        setStep('success');
        toast({
          title: "Welcome to the Newsroom! 🎉",
          description: "Time to spill some tea!",
        });
        setTimeout(() => onSubmit(), 1500);
      } else {
        setError('Code validation failed');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setStep('input');
    setError('');
    setGeneratedCode('');
    setSpillContent('');
    setTipAmount('');
    onAccessCodeChange('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetModal();
        onClose();
      }
    }}>
      <DialogContent className={`
        bg-gradient-to-br ${config.gradient} border-white/20 text-white max-w-lg max-h-[90vh] overflow-y-auto
        backdrop-blur-lg shadow-2xl
      `}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-3" 
                       style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <config.icon className="w-8 h-8" />
            {config.title}
          </DialogTitle>
          <p className="text-center text-white/80 text-sm mt-2">
            {config.description}
          </p>
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 mt-4"
            >
              {selectedPath === 'spill' && (
                <>
                  <div>
                    <Label htmlFor="spill-content" className="text-white font-semibold">
                      What's the tea? ☕
                    </Label>
                    <Textarea
                      id="spill-content"
                      value={spillContent}
                      onChange={(e) => setSpillContent(e.target.value)}
                      placeholder="Spill the hottest crypto gossip here... Who's dumping? Which project is actually a scam? What insider info do you have?"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/60 mt-2 min-h-[120px] resize-none"
                      maxLength={500}
                    />
                    <div className="text-xs text-white/60 text-right mt-1">
                      {spillContent.length}/500 characters
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSpillSubmit}
                    disabled={isLoading || !spillContent.trim()}
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
                  >
                    {isLoading ? (
                      <>
                        <SpillingTeaCup size="sm" className="mr-2" animated />
                        Brewing your code...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Spill the Tea & Get Code
                      </>
                    )}
                  </Button>
                </>
              )}

              {selectedPath === 'bribe' && (
                <>
                  <div>
                    <Label htmlFor="tip-amount" className="text-white font-semibold">
                      Tip Amount (ETH) 💰
                    </Label>
                    <Input
                      id="tip-amount"
                      type="number"
                      step="0.001"
                      min="0.001"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      placeholder="0.001"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/60 mt-2"
                    />
                    <p className="text-xs text-white/70 mt-1">
                      Minimum: 0.001 ETH • The gatekeepers appreciate generosity 
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-white/90 mb-2">💡 <strong>Bribe Benefits:</strong></p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li>• Instant access code generation</li>
                      <li>• VIP status in the newsroom</li>
                      <li>• Early access to premium features</li>
                      <li>• Support the tea infrastructure</li>
                    </ul>
                  </div>
                  
                  <Button
                    onClick={handleBribeSubmit}
                    disabled={isLoading || !tipAmount}
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Processing Bribe...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5 mr-2" />
                        Send Tip & Get Access
                      </>
                    )}
                  </Button>
                </>
              )}

              {selectedPath === 'code' && (
                <>
                  <div>
                    <Label htmlFor="access-code" className="text-white font-semibold">
                      Access Code 🔑
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="access-code"
                        type={showCode ? "text" : "password"}
                        value={accessCode}
                        onChange={(e) => onAccessCodeChange(e.target.value.toUpperCase())}
                        placeholder="Enter your secret code..."
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/60 font-mono text-center pr-12"
                        onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCode(!showCode)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                      >
                        {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-white/70 mt-1">
                      Got your code from spilling tea or tipping? Enter it here
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleCodeSubmit}
                    disabled={isLoading || !accessCode.trim()}
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
                  >
                    {isLoading ? (
                      <>
                        <Code className="w-5 h-5 mr-2 animate-pulse" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Code className="w-5 h-5 mr-2" />
                        Unlock Access
                      </>
                    )}
                  </Button>
                </>
              )}

              {error && (
                <Alert className="border-red-400 bg-red-400/10 backdrop-blur-sm">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}

          {step === 'generated' && (
            <motion.div
              key="generated"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center py-8 space-y-6"
            >
              <SpillingTeaCup size="lg" className="mx-auto" animated isSpilling />
              
              <h3 className="text-2xl font-bold text-white">
                🎉 Access Code Generated!
              </h3>
              
              <div className="bg-white/20 border border-white/40 rounded-xl p-6 backdrop-blur-sm">
                <p className="text-white/80 mb-4">Your exclusive access code:</p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-2xl font-bold text-center text-white tracking-wider">
                  {generatedCode}
                </div>
                <p className="text-xs text-white/60 mt-2">
                  Save this code - you'll need it to access the newsroom
                </p>
              </div>
              
              <Button
                onClick={handleUseGeneratedCode}
                disabled={isLoading}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Entering Newsroom...
                  </>
                ) : (
                  <>
                    <Coffee className="w-5 h-5 mr-2" />
                    Enter CTea Newsroom
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 space-y-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SpillingTeaCup size="lg" className="mx-auto" animated isSpilling />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-white">
                Welcome to CTea Newsroom! 🫖
              </h3>
              
              <p className="text-white/80">
                Redirecting you to the hottest tea in crypto...
              </p>
              
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAccessModal;
