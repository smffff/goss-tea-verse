
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Copy, Heart, QrCode } from 'lucide-react';
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
      network: 'ETH'
    },
    {
      name: 'Solana',
      address: 'DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC7D3',
      network: 'SOL'
    },
    {
      name: 'Bitcoin',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      network: 'BTC'
    }
  ];

  const copyToClipboard = async (address: string, network: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied!",
        description: `${network} wallet address copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-lg mx-4 bg-ctea-dark/95 border-[#ff61a6]/30 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ff61a6]" />
            Tip the Gatekeepers
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
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Support the platform gatekeepers who keep the tea flowing! 
              Your tips help maintain the community and reward quality moderation.
            </p>
            
            {/* QR Code Placeholder */}
            <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center mb-6">
              <div className="text-center">
                <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">QR Code</p>
                <p className="text-xs text-gray-500">Multi-wallet</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-center">Wallet Addresses</h3>
            
            {wallets.map((wallet) => (
              <div key={wallet.network} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#00d1c1] font-medium">{wallet.name}</span>
                  <span className="text-xs text-gray-400 bg-ctea-darker px-2 py-1 rounded">
                    {wallet.network}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-ctea-darker/50 border border-gray-600 rounded p-3">
                    <p className="text-white text-sm font-mono break-all">
                      {wallet.address}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(wallet.address, wallet.network)}
                    className="bg-[#ff61a6]/20 border-[#ff61a6]/30 text-[#ff61a6] hover:bg-[#ff61a6]/30"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-4">
              Every tip helps us maintain quality content and fair moderation. Thank you! ☕
            </p>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-[#ff61a6] to-[#00d1c1] hover:opacity-90 text-white font-bold w-full"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipModal;
