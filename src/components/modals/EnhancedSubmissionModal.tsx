
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, X, Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';

interface EnhancedSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { content: string; wallet?: string; email?: string }) => Promise<void>;
}

const EnhancedSubmissionModal: React.FC<EnhancedSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [content, setContent] = useState('');
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      await onSubmit({ content, wallet, email });
      
      // Reset form
      setContent('');
      setWallet('');
      setEmail('');
      onClose();
    } catch (error) {
      secureLog.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ctea-dark border-ctea-teal/30 max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl text-white">Spill the Tea</DialogTitle>
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
        </DialogHeader>

        <Card className="bg-ctea-darker/50 border-ctea-teal/20">
          <CardContent className="p-6">
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
                      <Send className="w-4 h-4 mr-2" />
                      Spill the Tea
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center text-xs text-gray-500">
          <Sparkles className="w-3 h-3 mr-1" />
          Your submission will be reviewed before going live
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedSubmissionModal;
