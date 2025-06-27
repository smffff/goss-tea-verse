
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WalletConnectOnboarding: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-white">Wallet Connection</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">Wallet integration coming soon!</p>
      </CardContent>
    </Card>
  );
};

export default WalletConnectOnboarding;
