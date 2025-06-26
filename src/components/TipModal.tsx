
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, ExternalLink, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Sample addresses - replace with real ones
  const tipAddresses = {
    eth: '0x742d35Cc6634C0532925a3b8D5C9E28C41Dc7b8e',
    sol: 'DJT5kfVjKxkCRhfKGFXZc9qSnxQjY6hfnGt7P6ZvqRyz',
    btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  };

  const tipAmounts = [
    { amount: 0.01, label: '$10', crypto: 'ETH' },
    { amount: 0.05, label: '$50', crypto: 'ETH' },
    { amount: 0.1, label: '$100', crypto: 'ETH' },
    { amount: 1, label: '$1000', crypto: 'ETH' }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} address copied to clipboard`,
    });
  };

  const handleConfirmTip = async () => {
    if (!selectedAmount) return;

    setIsProcessing(true);
    
    try {
      // Generate beta code
      const { data: betaData, error: betaError } = await supabase.rpc('generate_beta_access', {
        referrer_type: 'tip',
        referrer_id: null
      });

      if (betaError) {
        throw betaError;
      }

      toast({
        title: "Thanks for the Tip! 💰",
        description: betaData?.code ? `Your beta code: ${betaData.code}` : "Access granted!",
      });

      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      console.error('Tip processing error:', error);
      toast({
        title: "Processing Error",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-cyan-400 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white font-bold text-center">
            💰 Bribe the Gatekeepers
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Tip Amount Selection */}
          <div>
            <h3 className="text-cyan-300 font-semibold mb-3">Choose Your Bribe</h3>
            <div className="grid grid-cols-2 gap-3">
              {tipAmounts.map((tip) => (
                <Button
                  key={tip.amount}
                  variant={selectedAmount === tip.amount ? "default" : "outline"}
                  onClick={() => setSelectedAmount(tip.amount)}
                  className={`p-4 h-auto ${
                    selectedAmount === tip.amount 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">{tip.label}</div>
                    <div className="text-sm opacity-80">{tip.amount} {tip.crypto}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {selectedAmount && (
            <Card className="bg-gray-800 border-gray-600">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <div className="text-lg text-white font-bold mb-2">
                    Send {selectedAmount} ETH
                  </div>
                  <div className="text-sm text-gray-400 mb-4">
                    Once confirmed, you'll get instant beta access
                  </div>
                </div>

                {/* Address Display */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-900 p-3 rounded border border-gray-600">
                    <div className="flex-1">
                      <div className="text-xs text-cyan-300 font-semibold mb-1">ETH Address</div>
                      <div className="text-sm text-white font-mono break-all">
                        {tipAddresses.eth}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(tipAddresses.eth, 'ETH')}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-gray-700 border-2 border-dashed border-gray-500 rounded flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Wallet className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-xs">QR Code</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="flex-1 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmTip}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold"
                  >
                    {isProcessing ? 'Processing...' : 'I Sent the Tip'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-xs text-gray-400 text-center">
            Tips help fund development and server costs. Thank you for your support! 🙏
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipModal;
