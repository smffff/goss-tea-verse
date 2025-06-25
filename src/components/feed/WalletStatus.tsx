
import React from 'react';
import { Card } from '@/components/ui/card';
import { useWallet } from '@/components/WalletProvider';

const WalletStatus = () => {
  const { wallet } = useWallet();

  if (!wallet.isConnected) return null;

  return (
    <div className="flex justify-center mb-6">
      <Card className="bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30 p-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-ctea-teal">{wallet.balance.tea}</div>
            <div className="text-xs text-gray-400">$TEA</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-ctea-purple">{wallet.balance.soap}</div>
            <div className="text-xs text-gray-400">$SOAP</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-ctea-yellow">{wallet.balance.eth}</div>
            <div className="text-xs text-gray-400">ETH</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletStatus;
