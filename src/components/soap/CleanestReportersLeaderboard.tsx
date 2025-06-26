
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Droplets, Crown, Medal, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface CleanReporter {
  rank: number;
  wallet: string;
  soapEarned: number;
  credibilityScore: number;
  weeklyGrowth: number;
}

const CleanestReportersLeaderboard: React.FC = () => {
  const [reporters, setReporters] = useState<CleanReporter[]>([]);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockReporters: CleanReporter[] = [
      { rank: 1, wallet: '0x1337...beef', soapEarned: 420, credibilityScore: 98, weeklyGrowth: 15 },
      { rank: 2, wallet: '0x8008...5318', soapEarned: 350, credibilityScore: 94, weeklyGrowth: 12 },
      { rank: 3, wallet: '0xdead...cafe', soapEarned: 280, credibilityScore: 89, weeklyGrowth: 8 },
      { rank: 4, wallet: '0xf00d...babe', soapEarned: 220, credibilityScore: 85, weeklyGrowth: 5 },
      { rank: 5, wallet: '0xc0de...1337', soapEarned: 180, credibilityScore: 82, weeklyGrowth: 3 },
    ];
    setReporters(mockReporters);
  }, [timeframe]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-400" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-gray-500 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400/20 to-orange-500/20 border-yellow-400/30';
      case 2: return 'from-gray-300/20 to-gray-500/20 border-gray-400/30';
      case 3: return 'from-orange-400/20 to-red-500/20 border-orange-400/30';
      default: return 'from-cyan-400/20 to-blue-500/20 border-cyan-400/30';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-cyan-400/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Droplets className="w-6 h-6 text-cyan-400" />
          Cleanest Reporters
        </CardTitle>
        <div className="flex gap-2">
          <Button
            onClick={() => setTimeframe('weekly')}
            variant={timeframe === 'weekly' ? 'default' : 'outline'}
            size="sm"
            className={timeframe === 'weekly' ? 'bg-cyan-500 text-black' : 'border-cyan-400/50 text-cyan-400'}
          >
            Weekly
          </Button>
          <Button
            onClick={() => setTimeframe('monthly')}
            variant={timeframe === 'monthly' ? 'default' : 'outline'}
            size="sm"
            className={timeframe === 'monthly' ? 'bg-cyan-500 text-black' : 'border-cyan-400/50 text-cyan-400'}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {reporters.map((reporter, index) => (
          <motion.div
            key={reporter.wallet}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-r ${getRankColor(reporter.rank)} p-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getRankIcon(reporter.rank)}
                  <div>
                    <div className="text-white font-mono text-sm">
                      {reporter.wallet}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>Score: {reporter.credibilityScore}%</span>
                      {reporter.weeklyGrowth > 0 && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{reporter.weeklyGrowth}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">
                    {reporter.soapEarned} $SOAP
                  </div>
                  <div className="text-xs text-gray-500">
                    {timeframe} earned
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CleanestReportersLeaderboard;
