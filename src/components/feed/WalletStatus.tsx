
import React from 'react';
import { Card } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

const WalletStatus = () => {
  // Mock wallet data for now
  const isConnected = false;
  
  if (!isConnected) {
    return (
      <div className="flex justify-center mb-6">
        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Wallet className="w-4 h-4" />
            <span className="text-sm">Connect wallet to earn rewards</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-6">
      <Card className="bg-gradient-to-r from-teal-500/20 to-purple-500/20 border-teal-500/30 p-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-teal-400">0</div>
            <div className="text-xs text-gray-400">$TEA</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">0</div>
            <div className="text-xs text-gray-400">$SOAP</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletStatus;
