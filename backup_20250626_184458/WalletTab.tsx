
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AccessLevelIndicator from '../AccessLevelIndicator';

const WalletTab: React.FC = () => {
  const { toast } = useToast();

  const handleWalletConnect = () => {
    toast({
      title: "Wallet Connect Coming Soon! 🔗",
      description: "Token ownership verification will be available soon. Try other access methods for now!",
    });
  };

  return (
    <div className="space-y-4">
      <AccessLevelIndicator level="authenticated" />
      <div className="text-center space-y-4">
        <h3 className="text-white font-bold">Token Ownership Verification</h3>
        <p className="text-gray-400 text-sm">
          Connect your wallet to verify $TEA token ownership for instant access.
        </p>
        <Button
          onClick={handleWalletConnect}
          className="w-full bg-gradient-to-r from-ctea-purple to-pink-400 hover:from-ctea-purple/80 hover:to-pink-400/80"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet (Coming Soon)
        </Button>
        <p className="text-xs text-gray-500">
          MetaMask, WalletConnect, and more supported
        </p>
      </div>
    </div>
  );
};

export default WalletTab;
