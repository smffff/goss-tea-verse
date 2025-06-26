
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, TrendingUp, Settings, Coffee, Zap } from 'lucide-react';

const BetaUserDashboard: React.FC = () => {
  const betaCode = localStorage.getItem('ctea-beta-code') || 'DEMO-MODE';
  const isDemoMode = localStorage.getItem('ctea-demo-mode') === 'true';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-ctea-teal" />
          Beta User Dashboard
        </h1>
        <p className="text-gray-400">Your CTea Newsroom beta experience</p>
        <Badge className={`mt-2 ${
          isDemoMode ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'
        }`}>
          {isDemoMode ? '🎮 DEMO MODE' : '🔑 BETA ACCESS'} - {betaCode}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30">
          <CardContent className="p-6 text-center">
            <Coffee className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">25</div>
            <div className="text-sm text-gray-400">SOAP Tokens</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-pink-400/30">
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">5</div>
            <div className="text-sm text-gray-400">Tea Spills</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-yellow-400/30">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">87%</div>
            <div className="text-sm text-gray-400">Credibility</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-ctea-dark/80 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Zap className="w-5 h-5 text-ctea-teal" />
              Beta Features Unlocked
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">SOAP-Gated Content</span>
              <Badge className="bg-green-500/20 text-green-400">✅ Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">CTeaBot AI Assistant</span>
              <Badge className="bg-green-500/20 text-green-400">✅ Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Anonymous Spilling</span>
              <Badge className="bg-green-500/20 text-green-400">✅ Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Arena Integration</span>
              <Badge className="bg-yellow-500/20 text-yellow-400">🚧 Coming Soon</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">MemeOps Campaigns</span>
              <Badge className="bg-green-500/20 text-green-400">✅ Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-pink-400" />
              Beta Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 text-sm">
              Help us improve CTea Newsroom by sharing your feedback on the beta experience.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal">
                💭 Share Feedback
              </Button>
              <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-purple-400 hover:to-pink-400">
                🐛 Report Bug
              </Button>
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-orange-400 hover:to-yellow-400">
                💡 Suggest Feature
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-gradient-to-r from-ctea-dark/80 to-ctea-darker/80 border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-white text-center">🚀 Beta Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-green-400 font-bold">✅ Phase 1 - Complete</div>
              <div className="text-sm text-gray-300">Beta access, SOAP gating, CTeaBot</div>
            </div>
            <div className="space-y-2">
              <div className="text-yellow-400 font-bold">🚧 Phase 2 - In Progress</div>
              <div className="text-sm text-gray-300">Arena integration, advanced analytics</div>
            </div>
            <div className="space-y-2">
              <div className="text-blue-400 font-bold">📅 Phase 3 - Coming Soon</div>
              <div className="text-sm text-gray-300">Public launch, token distribution</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetaUserDashboard;
