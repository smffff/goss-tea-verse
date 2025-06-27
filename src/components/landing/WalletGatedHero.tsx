
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WalletGatedHero: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-cyan-500/30">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">CTea Wallet Hero</h2>
        <p className="text-gray-300">Wallet-gated features coming soon!</p>
      </CardContent>
    </Card>
  );
};

export default WalletGatedHero;
