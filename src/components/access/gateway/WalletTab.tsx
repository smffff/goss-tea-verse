
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ExternalLink } from 'lucide-react';
import AccessLevelIndicator from '../AccessLevelIndicator';

const WalletTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <AccessLevelIndicator level="authenticated" />
      
      <div className="text-center py-6">
        <Wallet className="w-12 h-12 text-ctea-purple mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">Wallet Access</h3>
        <p className="text-gray-400 text-sm mb-4">
          Connect your wallet to access premium features
        </p>
        
        <div className="space-y-3">
          <Badge variant="outline" className="border-ctea-purple/30 text-ctea-purple">
            Coming Soon
          </Badge>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Token-gated content</p>
            <p>• OG holder benefits</p>
            <p>• Cross-chain rewards</p>
          </div>
          
          <Button
            variant="outline"
            className="w-full border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            disabled
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect Wallet (Soon)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletTab;
