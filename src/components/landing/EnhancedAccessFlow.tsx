
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Wallet, Mail, Users, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import WalletIntegration from './WalletIntegration';
import EmailOTPFlow from './EmailOTPFlow';
import { BetaCodeService } from '@/services/betaCodeService';
import { useToast } from '@/hooks/use-toast';
import SpillSubmission from './access-modal/SpillSubmission';
import CodeSubmission from './access-modal/CodeSubmission';

interface EnhancedAccessFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EnhancedAccessFlow: React.FC<EnhancedAccessFlowProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState('spill');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [spillContent, setSpillContent] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const { toast } = useToast();

  const handleWalletSuccess = async (address: string) => {
    setIsLoading(true);
    try {
      // Mock wallet-based access - check $TEA balance
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('ctea-beta-access', 'granted');
      localStorage.setItem('ctea-access-method', 'wallet');
      localStorage.setItem('ctea-wallet-address', address);
      
      toast({
        title: "Wallet Access Granted! 💰",
        description: "Welcome to CTea Newsroom, degen!",
      });
      
      onSuccess();
    } catch (error) {
      setError('Wallet verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSuccess = async (email: string) => {
    setIsLoading(true);
    try {
      localStorage.setItem('ctea-beta-access', 'granted');
      localStorage.setItem('ctea-access-method', 'email');
      localStorage.setItem('ctea-user-email', email);
      
      toast({
        title: "Email Access Granted! 📧",
        description: "Welcome to the newsroom!",
      });
      
      onSuccess();
    } catch (error) {
      setError('Email verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpillSubmit = async () => {
    if (!spillContent.trim()) {
      setError('Please enter some tea to spill!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const mockSubmissionId = crypto.randomUUID();
      const result = await BetaCodeService.generateCodeForSpill(mockSubmissionId);
      
      if (result.success && result.code) {
        localStorage.setItem('ctea-beta-access', 'granted');
        localStorage.setItem('ctea-beta-code', result.code);
        localStorage.setItem('ctea-access-method', 'spill');
        
        toast({
          title: "Tea Spilled Successfully! 🫖",
          description: `Your access code: ${result.code}`,
        });
        
        onSuccess();
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
        localStorage.setItem('ctea-access-method', 'code');
        
        toast({
          title: "Access Granted! ☕",
          description: "Welcome to CTea Newsroom!",
        });
        
        onSuccess();
      } else {
        setError(result.error || 'Invalid access code');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(''), 5000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a] border-[#00D4AA]/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF6B9D] via-[#00D4AA] to-[#FF9500] bg-clip-text text-transparent mb-2" 
                style={{ fontFamily: "'Luckiest Guy', cursive" }}>
              Choose Your Access Path
            </h2>
            <p className="text-white/80">Multiple ways to join the ultimate crypto gossip HQ</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
              <TabsTrigger value="spill" className="data-[state=active]:bg-[#FF6B9D]/30">
                <Coffee className="w-4 h-4 mr-2" />
                Spill Tea
              </TabsTrigger>
              <TabsTrigger value="wallet" className="data-[state=active]:bg-[#00D4AA]/30">
                <Wallet className="w-4 h-4 mr-2" />
                Wallet
              </TabsTrigger>
              <TabsTrigger value="email" className="data-[state=active]:bg-[#FF9500]/30">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-purple-500/30">
                <Code className="w-4 h-4 mr-2" />
                Fren Code
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 min-h-[400px]">
              <TabsContent value="spill" className="space-y-4">
                <div className="text-center mb-6">
                  <Coffee className="w-16 h-16 mx-auto mb-4 text-[#FF6B9D]" />
                  <h3 className="text-xl font-bold mb-2">Spill Your Tea ☕</h3>
                  <p className="text-white/80 text-sm">
                    Share the hottest crypto gossip to unlock your access
                  </p>
                </div>
                <SpillSubmission
                  spillContent={spillContent}
                  setSpillContent={setSpillContent}
                  isLoading={isLoading}
                  onSubmit={handleSpillSubmit}
                  error={error}
                />
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4">
                <div className="text-center mb-6">
                  <Wallet className="w-16 h-16 mx-auto mb-4 text-[#00D4AA]" />
                  <h3 className="text-xl font-bold mb-2">Wallet Access 💰</h3>
                  <p className="text-white/80 text-sm">
                    Connect your wallet and verify $TEA holdings for instant access
                  </p>
                </div>
                <WalletIntegration
                  onSuccess={handleWalletSuccess}
                  onError={handleError}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <EmailOTPFlow
                  onSuccess={handleEmailSuccess}
                  onError={handleError}
                />
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                <div className="text-center mb-6">
                  <Users className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-bold mb-2">Friends & Frens Code 🤝</h3>
                  <p className="text-white/80 text-sm">
                    Got an invite code from a fren? Enter it here!
                  </p>
                </div>
                <CodeSubmission
                  accessCode={accessCode}
                  onAccessCodeChange={setAccessCode}
                  showCode={false}
                  setShowCode={() => {}}
                  isLoading={isLoading}
                  onSubmit={handleCodeSubmit}
                  error={error}
                />
              </TabsContent>
            </div>
          </Tabs>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAccessFlow;
