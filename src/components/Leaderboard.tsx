
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Leaderboard: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-white">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">Coming soon in the next update!</p>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
