
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Coffee, Sparkles } from 'lucide-react';
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
        title: "Not Enough Drama! 🫖",
        description: "Your tea needs to be at least 20 characters. Give us the full story!",
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
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-lg mx-4 bg-newsprint border-vintage-red/30 max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-vintage-red/20">
          <CardTitle className="text-white flex items-center gap-2">
            <Coffee className="w-6 h-6 text-vintage-red animate-teacup-shake" />
            <span className="font-tabloid text-2xl text-tabloid-black uppercase tracking-wider">
              Spill Your Tea
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-tabloid-black/60 hover:text-tabloid-black hover:bg-vintage-red/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <p className="text-tabloid-black font-headline text-lg">
              What's the hottest gossip you're sitting on? 🔥
            </p>
            <p className="text-tabloid-black/60 text-sm mt-2">
              Spill smart, spill often. The leaderboard never sleeps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="content" className="text-tabloid-black font-bold font-headline uppercase tracking-wide">
                Drop the Drama *
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Spill the hottest crypto tea... Who's doing what? Which project is sus? What alpha are the whales hiding? Give us ALL the details! 🫖"
                className="mt-2 bg-white border-vintage-red/30 text-tabloid-black placeholder-tabloid-black/50 min-h-[140px] focus:border-vintage-red resize-none font-medium"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-tabloid-black/60">
                  {content.length}/20 characters minimum
                </p>
                {content.length >= 20 && (
                  <div className="flex items-center gap-1 text-vintage-red">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-bold">Tea is brewing!</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="wallet" className="text-tabloid-black font-bold font-headline uppercase tracking-wide">
                Wallet Address (Optional)
              </Label>
              <Input
                id="wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x... (for future $TEA rewards & flex rights)"
                className="mt-2 bg-white border-vintage-red/30 text-tabloid-black placeholder-tabloid-black/50 focus:border-vintage-red"
              />
              <p className="text-xs text-tabloid-black/50 mt-1">
                Connect your wallet to earn $TEA when your tea goes viral
              </p>
            </div>

            <div>
              <Label htmlFor="email" className="text-tabloid-black font-bold font-headline uppercase tracking-wide">
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (for hot tea alerts)"
                className="mt-2 bg-white border-vintage-red/30 text-tabloid-black placeholder-tabloid-black/50 focus:border-vintage-red"
              />
              <p className="text-xs text-tabloid-black/50 mt-1">
                Get notified when your tea gets reactions or goes viral
              </p>
            </div>

            <div className="bg-vintage-red/10 border border-vintage-red/30 rounded-lg p-4">
              <p className="text-vintage-red text-sm font-bold text-center">
                🔥 Pro Tip: The spicier the tea, the bigger the tips. No basic gossip allowed!
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-tabloid-black/30 text-tabloid-black hover:bg-tabloid-black hover:text-white font-headline uppercase tracking-wide"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={content.length < 20 || isLoading}
                className="flex-1 bg-gradient-to-r from-vintage-red to-vintage-red-700 hover:from-vintage-red-600 hover:to-vintage-red-800 text-white font-bold font-headline uppercase tracking-wide transition-all hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Spilling...
                  </>
                ) : (
                  <>
                    <Coffee className="w-4 h-4 mr-2" />
                    Spill the Tea
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionModal;
