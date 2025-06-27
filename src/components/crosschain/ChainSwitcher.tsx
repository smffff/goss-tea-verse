
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, AlertTriangle } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

const ChainSwitcher: React.FC = () => {
  const { isConnected, walletAddress, connectWallet, switchToAvalanche } = useWallet();
  const { toast } = useToast();

  const handleSwitchToAvalanche = async () => {
    try {
      if (!isConnected) {
        await connectWallet();
        return;
      }

      if (switchToAvalanche) {
        await switchToAvalanche();
      } else {
        toast({
          title: "Avalanche Network",
          description: "Chain switching functionality coming soon!",
        });
      }
    } catch (error) {
      toast({
        title: "Chain Switch Failed",
        description: "Unable to switch to Avalanche network. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="border-orange-500 text-orange-400">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Testnet
        </Badge>
        <span className="text-sm text-gray-400">Avalanche Fuji</span>
      </div>
      
      <Button
        onClick={handleSwitchToAvalanche}
        variant="outline"
        size="sm"
        className="border-red-500 text-red-400 hover:bg-red-500/10"
      >
        <Zap className="w-4 h-4 mr-2" />
        Switch to Avalanche
      </Button>
    </div>
  );
};

export default ChainSwitcher;
