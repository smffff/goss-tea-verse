import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Copy, Heart, Crown, Sparkles, Mail, ExternalLink } from 'lucide-react';
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
      address: '0x32ae402ce8a388a3f27a8668ad33bcf4cab4fadb',
      network: 'ETH',
      emoji: '💎',
      description: 'ETH, USDC, USDT, and all ERC-20 tokens'
    },
    {
      name: 'Avalanche',
      address: '0x32ae402ce8a388a3f27a8668ad33bcf4cab4fadb',
      network: 'AVAX',
      emoji: '🔺',
      description: 'AVAX and C-Chain tokens'
    },
    {
      name: 'Tron',
      address: 'TYqMDoQaqoAm6ttKbSKKVmbC2yt4YHq2nu',
      network: 'TRX',
      emoji: '🔮',
      description: 'TRX, USDT-TRC20, and TRC-20 tokens'
    },
    {
      name: 'Solana',
      address: 'CCazM2Rx6p1KfZawjckUVr1wQTJY87swyo1yN52GAQqa',
      network: 'SOL',
      emoji: '🌞',
      description: 'SOL and SPL tokens'
    },
    {
      name: 'Bitcoin',
      address: 'bc1qej...tgazdc',
      network: 'BTC',
      emoji: '₿',
      description: 'Bitcoin only'
    },
    {
      name: 'Sui',
      address: '0x161bc8a40d44',
      network: 'SUI',
      emoji: '💧',
      description: 'SUI and Sui ecosystem tokens'
    }
  ];

  const copyToClipboard = async (address: string, network: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied! 📋",
        description: `${network} address copied. Send your tip and email proof to tips@ctea.news!`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed 😤",
        description: "Couldn't copy address. Please copy manually.",
        variant: "destructive"
      });
    }
  };

  const openEmailClient = () => {
    const subject = encodeURIComponent('Tip Verification - CTea Newsroom');
    const body = encodeURIComponent(`Hi!\n\nI just sent a tip to support CTea Newsroom development.\n\nTransaction details:\n- Network: [Enter network name]\n- Amount: [Enter amount sent]\n- Transaction Hash: [Paste transaction hash]\n- Wallet Address Used: [Your wallet address]\n\nPlease verify and grant me VIP access!\n\nThanks!`);
    window.open(`mailto:tips@ctea.news?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-2xl mx-4 bg-newsprint border-vintage-red/30 max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-vintage-red/20">
          <CardTitle className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-vintage-red animate-pulse" />
            <div>
              <span className="font-tabloid text-2xl text-tabloid-black uppercase tracking-wider">
                Support CTea Development
              </span>
              <p className="text-sm text-tabloid-black/60 font-medium normal-case tracking-normal">
                Real crypto tips for real VIP access
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
                Send Real Tips, Get Real Access
              </h3>
            </div>
            <p className="text-tabloid-black/70 mb-4 font-medium">
              Choose any supported network below, send any amount, then email us proof for instant VIP access!
            </p>
            
            {/* VIP Benefits Banner */}
            <div className="bg-gradient-to-r from-vintage-red/10 to-neon-pink/10 border border-vintage-red/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-vintage-red" />
                <span className="font-bold text-vintage-red font-headline uppercase">VIP Benefits</span>
                <Sparkles className="w-5 h-5 text-vintage-red" />
              </div>
              <p className="text-sm text-tabloid-black/70 font-medium">
                💡 Any amount gets VIP status • Priority support • Exclusive content • Developer gratitude
              </p>
            </div>
          </div>

          {/* Wallet Addresses */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-tabloid-black mb-4 font-headline uppercase tracking-wider text-center">
              Choose Your Network & Send Tips
            </h3>
            
            <div className="grid gap-4">
              {wallets.map((wallet) => (
                <div key={wallet.network} className="bg-white/50 border border-vintage-red/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{wallet.emoji}</span>
                      <div>
                        <span className="text-vintage-red font-bold font-headline">{wallet.name}</span>
                        <p className="text-xs text-tabloid-black/60">{wallet.description}</p>
                      </div>
                    </div>
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
          </div>

          {/* Email Verification Section */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-600 font-bold mb-3 font-headline uppercase flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Step 2: Email Verification
            </h4>
            <div className="space-y-2 text-sm text-tabloid-black/70 font-medium mb-4">
              <p>1. Send any amount to any address above</p>
              <p>2. Take screenshot of your transaction</p>
              <p>3. Email proof to <strong className="text-vintage-red">tips@ctea.news</strong></p>
              <p>4. Get VIP access within 24 hours!</p>
            </div>
            <Button
              onClick={openEmailClient}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white font-bold"
            >
              <Mail className="w-4 h-4 mr-2" />
              Open Email Template
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* VIP Benefits Detail */}
          <div className="bg-vintage-red/10 border border-vintage-red/30 rounded-lg p-4">
            <h4 className="text-vintage-red font-bold mb-2 font-headline uppercase flex items-center gap-2">
              <Crown className="w-4 h-4" />
              What You Get:
            </h4>
            <ul className="text-sm text-tabloid-black/70 space-y-1 font-medium">
              <li>• Instant VIP access (no more gates!)</li>
              <li>• Priority customer support</li>
              <li>• Exclusive VIP-only content and features</li>
              <li>• Custom profile badges</li>
              <li>• Direct developer communication channel</li>
              <li>• Early access to new features</li>
              <li>• Our eternal gratitude and good karma ✨</li>
            </ul>
          </div>

          <div className="text-center pt-4 border-t border-vintage-red/20">
            <p className="text-sm text-tabloid-black/60 mb-4 font-medium">
              Every tip directly supports development and keeps the tea flowing hot! ☕
            </p>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-vintage-red to-neon-pink hover:opacity-90 text-white font-bold w-full font-headline uppercase tracking-wide"
            >
              Got It, Time to Send Tips! 💸
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipModal;
