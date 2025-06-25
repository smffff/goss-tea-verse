import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    content: string;
    wallet?: string;
    email?: string;
  }) => void;
  isLoading?: boolean;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [content, setContent] = useState('');
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.length < 20) {
      toast({
        title: "Content too short",
        description: "Your tea must be at least 20 characters long",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      content: content.trim(),
      wallet: wallet.trim() || undefined,
      email: email.trim() || undefined
    });

    // Reset form
    setContent('');
    setWallet('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-lg mx-4 bg-ctea-dark/95 border-[#00d1c1]/30 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#00d1c1]" />
            Spill Your Tea
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="content" className="text-white">
                What's the tea? *
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Spill the hottest crypto gossip, rumors, or alpha..."
                className="mt-2 bg-ctea-darker/50 border-[#00d1c1]/30 text-white placeholder-gray-400 min-h-[120px]"
                required
              />
              <p className="text-sm text-gray-400 mt-1">
                {content.length}/20 characters minimum
              </p>
            </div>

            <div>
              <Label htmlFor="wallet" className="text-white">
                Wallet Address (Optional)
              </Label>
              <Input
                id="wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x... (for future rewards)"
                className="mt-2 bg-ctea-darker/50 border-[#00d1c1]/30 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (for notifications)"
                className="mt-2 bg-ctea-darker/50 border-[#00d1c1]/30 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={content.length < 20 || isLoading}
                className="flex-1 bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:opacity-90 text-white font-bold"
              >
                {isLoading ? 'Spilling...' : 'Spill Tea'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionModal;
