
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rocket, Users, TrendingUp, Sparkles, MessageCircle } from 'lucide-react';
import CTeaBotCommentary from '@/components/ai/CTeaBotCommentary';
import TeaRewardSystem from '@/components/tokens/TeaRewardSystem';
import EnhancedMemeGenerator from '@/components/memes/EnhancedMemeGenerator';
import PerformanceMonitor from '@/components/monitoring/PerformanceMonitor';

interface LaunchMetrics {
  betaUsers: number;
  dailySpills: number;
  tokenVolume: number;
  viralScore: number;
}

const LaunchDashboard: React.FC = () => {
  const metrics: LaunchMetrics = {
    betaUsers: 1247,
    dailySpills: 89,
    tokenVolume: 15420,
    viralScore: 8.7
  };

  const mockSubmission = {
    id: '1',
    content: 'Breaking: Major DeFi protocol about to announce revolutionary staking mechanism. Source close to team confirms 40% APY incoming! 🚀',
    category: 'defi'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Rocket className="w-8 h-8 text-ctea-teal" />
            CTea Beta 1.2/3 Launch Dashboard
          </h1>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-lg px-4 py-2">
            🚀 LAUNCH READY - 95% Complete
          </Badge>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-500/20 to-ctea-teal/20 border-green-500/50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.betaUsers}</div>
              <div className="text-sm text-green-400">Beta Users</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.dailySpills}</div>
              <div className="text-sm text-blue-400">Daily Spills</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.tokenVolume.toLocaleString()}</div>
              <div className="text-sm text-yellow-400">$TEA Volume</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border-pink-500/50">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.viralScore}/10</div>
              <div className="text-sm text-pink-400">Viral Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* AI Commentary Demo */}
            <Card className="bg-gradient-to-br from-ctea-dark/50 to-black/50 border-ctea-teal/30">
              <CardHeader>
                <CardTitle className="text-white">🤖 AI Commentary System</CardTitle>
              </CardHeader>
              <CardContent>
                <CTeaBotCommentary 
                  submission={mockSubmission}
                  onCommentGenerated={(comment, mode) => {
                    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info(`Generated ${mode} comment:`, comment);
                  }}
                />
              </CardContent>
            </Card>

            {/* Token Rewards */}
            <TeaRewardSystem />

            {/* Performance Monitor */}
            <PerformanceMonitor />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Meme Generator */}
            <EnhancedMemeGenerator />

            {/* Launch Checklist */}
            <Card className="bg-gradient-to-br from-ctea-dark/50 to-black/50 border-ctea-teal/30">
              <CardHeader>
                <CardTitle className="text-white">📋 Launch Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { task: 'AI Commentary System', status: 'complete' },
                    { task: 'Token Reward Integration', status: 'complete' },
                    { task: 'Meme Generator + Campaigns', status: 'complete' },
                    { task: 'Performance Monitoring', status: 'complete' },
                    { task: 'Beta Access System', status: 'complete' },
                    { task: 'Security Hardening', status: 'in-progress' },
                    { task: 'Discord Integration', status: 'pending' },
                    { task: 'Final Testing', status: 'pending' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded border border-gray-700">
                      <span className="text-white">{item.task}</span>
                      <Badge className={
                        item.status === 'complete' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-bold">
                  🚀 LAUNCH BETA 1.2/3
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Launch Status */}
        <Card className="bg-gradient-to-r from-green-500/20 to-ctea-teal/20 border-green-500/50">
          <CardContent className="p-6 text-center">
            <Rocket className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              CTea Newsroom Beta 1.2/3 Ready for Launch! 🫖
            </h2>
            <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
              All critical systems implemented: AI commentary with 4 personality modes, 
              dual-token rewards ($TEA & $SOAP), viral meme campaigns, and performance monitoring. 
              Ready for Q3 2025 MVP launch goals!
            </p>
            <div className="flex justify-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 px-4 py-2">
                🎯 On Track for Launch
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 px-4 py-2">
                📈 95% Feature Complete
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 px-4 py-2">
                🔥 Beta Users Engaged
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchDashboard;
