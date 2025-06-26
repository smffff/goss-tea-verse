
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Copy, Heart, QrCode, Crown, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();

  if (!isOpen) return null;

  const wallets = [
    {
      name: 'Ethereum',
      address: '0x742d35Cc6634C0532925a3b8D020d6bb55aAc',
      network: 'ETH',
      emoji: '💎'
    },
    {
      name: 'Solana',
      address: 'DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC7D3',
      network: 'SOL',
      emoji: '🌞'
    },
    {
      name: 'Bitcoin',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      network: 'BTC',
      emoji: '₿'
    }
  ];

  const copyToClipboard = async (address: string, network: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied! 📋",
        description: `${network} address copied. Now go make it rain! 💰`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed 😤",
        description: "Couldn't copy address. Technology is so unreliable these days...",
        variant: "destructive"
      });
    }
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
          <CardTitle className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-vintage-red animate-pulse" />
            <div>
              <span className="font-tabloid text-2xl text-tabloid-black uppercase tracking-wider">
                Tip the Gatekeepers
              </span>
              <p className="text-sm text-tabloid-black/60 font-medium normal-case tracking-normal">
                Skip the queue, earn VIP status
              </p>
            </div>
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
        
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <div className="mb-4">
              <Crown className="w-12 h-12 text-vintage-red mx-auto mb-2 animate-float" />
              <h3 className="font-tabloid text-xl text-tabloid-black uppercase tracking-wider mb-2">
                Buy Your Way to the Front
              </h3>
            </div>
            <p className="text-tabloid-black/70 mb-4 font-medium">
              Why wait in line like a peasant? Tip the gatekeepers and get instant VIP access to the hottest tea!
            </p>
            
            {/* VIP Benefits Banner */}
            <div className="bg-gradient-to-r from-vintage-red/10 to-neon-pink/10 border border-vintage-red/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-vintage-red" />
                <span className="font-bold text-vintage-red font-headline uppercase">VIP Perks Unlocked</span>
                <Sparkles className="w-5 h-5 text-vintage-red" />
              </div>
              <p className="text-sm text-tabloid-black/70 font-medium">
                💡 Any amount gets you VIP status. Higher tips = more exclusive access + eternal bragging rights.
              </p>
            </div>
          </div>

          {/* Wallet Addresses */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-tabloid-black mb-4 font-headline uppercase tracking-wider text-center">
              Send Tips To These Wallets
            </h3>
            
            {wallets.map((wallet) => (
              <div key={wallet.network} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-vintage-red font-bold font-headline flex items-center gap-2">
                    {wallet.emoji} {wallet.name}
                  </span>
                  <span className="text-xs text-tabloid-black/50 bg-pale-pink px-2 py-1 rounded font-medium">
                    {wallet.network}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white border border-vintage-red/20 rounded p-3">
                    <p className="text-tabloid-black text-sm font-mono break-all">
                      {wallet.address}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(wallet.address, wallet.network)}
                    className="bg-vintage-red/20 border border-vintage-red/30 text-vintage-red hover:bg-vintage-red hover:text-white transition-all"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-4">
            <h4 className="text-neon-pink font-bold mb-2 font-headline uppercase">After You Send:</h4>
            <ol className="text-sm text-tabloid-black/70 space-y-1 font-medium">
              <li>1. Screenshot your transaction (flex those gas fees)</li>
              <li>2. Email it to <span className="text-vintage-red font-bold">tips@ctea.news</span></li>
              <li>3. Get instant VIP access within 24 hours</li>
              <li>4. Start flexing on all the non-VIP peasants</li>
            </ol>
          </div>

          {/* VIP Benefits */}
          <div className="bg-vintage-red/10 border border-vintage-red/30 rounded-lg p-4">
            <h4 className="text-vintage-red font-bold mb-2 font-headline uppercase flex items-center gap-2">
              <Crown className="w-4 h-4" />
              VIP Benefits (Worth Every Sat):
            </h4>
            <ul className="text-sm text-tabloid-black/70 space-y-1 font-medium">
              <li>• Priority access to breaking news & alpha drops</li>
              <li>• Exclusive VIP-only tea channels</li>
              <li>• Custom profile badges that make others jealous</li>
              <li>• Early access to new features (before the masses)</li>
              <li>• Direct line to the gatekeepers for premium gossip</li>
            </ul>
          </div>

          <div className="text-center pt-4 border-t border-vintage-red/20">
            <p className="text-sm text-tabloid-black/60 mb-4 font-medium">
              Every tip helps us keep the tea hot and the gossip flowing. Thank you for supporting premium drama! ☕
            </p>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-vintage-red to-neon-pink hover:opacity-90 text-white font-bold w-full font-headline uppercase tracking-wide"
            >
              Got It, Let Me Send Tips!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipModal;
