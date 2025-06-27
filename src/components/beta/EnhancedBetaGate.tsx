
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const EnhancedBetaGate: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-cyan-500/30">
      <CardContent className="p-6">
        <p className="text-gray-300">Beta access features coming soon!</p>
      </CardContent>
    </Card>
  );
};

export default EnhancedBetaGate;
