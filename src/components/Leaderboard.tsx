import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeaderboardProps {
  title?: string;
  period?: string;
  maxEntries?: number;
  showRefresh?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title = 'Leaderboard', period, maxEntries, showRefresh }) => {
  return (
    <Card className="bg-slate-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">Coming soon in the next update!</p>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
