
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TeaSpillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { content: string; wallet?: string; email?: string }) => void;
}

const TeaSpillModal: React.FC<TeaSpillModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsBetaAccess, setNeedsBetaAccess] = useState(false);
  const [betaCode, setBetaCode] = useState('');
  const { toast } = useToast();

  const generateBetaAccess = async (): Promise<string> => {
    try {
      // Simple beta code generation
      const codes = ['EARLY-BIRD', 'BETA-ACCESS', 'CTEA2024'];
      return codes[Math.floor(Math.random() * codes.length)];
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Beta access generation error:', error);
      return 'BETA-ACCESS';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some tea to spill!",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user needs beta access
      const hasAccess = localStorage.getItem('ctea-beta-access');
      
      if (!hasAccess) {
        const code = await generateBetaAccess();
        setBetaCode(code);
        setNeedsBetaAccess(true);
        toast({
          title: "Beta Access Required",
          description: `Use code: ${code}`,
        });
        setIsSubmitting(false);
        return;
      }

      await onSubmit({ content, wallet, email });
      
      // Reset form
      setContent('');
      setWallet('');
      setEmail('');
      onClose();
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBetaAccess = () => {
    if (betaCode) {
      localStorage.setItem('ctea-beta-access', 'granted');
      setNeedsBetaAccess(false);
      toast({
        title: "Access Granted! ☕",
        description: "You can now spill your tea!",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-ctea-dark border-ctea-teal/30 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Spill the Tea ☕</h2>
                    <p className="text-gray-400 text-sm">Share your insider knowledge</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="relative space-y-6">
              {needsBetaAccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Beta Access Required</h3>
                    <p className="text-gray-400 mb-4">Use this code to unlock access:</p>
                    <div className="bg-ctea-darker border border-ctea-teal/30 rounded-lg p-4 mb-4">
                      <code className="text-ctea-teal text-lg font-mono">{betaCode}</code>
                    </div>
                    <Button onClick={handleBetaAccess} className="bg-ctea-teal hover:bg-ctea-teal/80">
                      <Zap className="w-4 h-4 mr-2" />
                      Activate Access
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-white">Your Tea *</Label>
                    <Textarea
                      id="content"
                      placeholder="What's the hot gossip? Share your insider knowledge..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal min-h-[120px] resize-none"
                      maxLength={1000}
                    />
                    <div className="text-xs text-gray-400 text-right">
                      {content.length}/1000 characters
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wallet" className="text-white">Wallet (Optional)</Label>
                      <Input
                        id="wallet"
                        placeholder="Your wallet address for rewards..."
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !content.trim()}
                      className="flex-1 bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Spilling...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Coffee className="w-4 h-4 mr-2" />
                          Spill the Tea
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TeaSpillModal;
