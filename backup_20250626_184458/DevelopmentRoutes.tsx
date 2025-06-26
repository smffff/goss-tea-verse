
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Coffee, Users, Trophy, Settings } from 'lucide-react';
import DevelopmentFeed from './DevelopmentFeed';
import DevelopmentSpillTea from './DevelopmentSpillTea';
import DevelopmentLeaderboard from './DevelopmentLeaderboard';
import BetaUserDashboard from './BetaUserDashboard';
import FeatureFlagPanel from './FeatureFlagPanel';

const DevelopmentRoutes: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Development Mode Banner */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-b border-yellow-500/30 p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
              🚧 DEVELOPMENT MODE
            </Badge>
            <span className="text-yellow-200 text-sm">
              Building CTea Newsroom v2.0 - Beta users only
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-ctea-teal" />
            <span className="text-ctea-teal text-sm font-mono">
              /dev routes active
            </span>
          </div>
        </div>
      </div>

      {/* Development Navigation */}
      <div className="bg-ctea-dark/50 border-b border-ctea-teal/20 p-4">
        <div className="container mx-auto">
          <nav className="flex items-center gap-6">
            <a 
              href="/dev/feed" 
              className="flex items-center gap-2 text-white hover:text-ctea-teal transition-colors"
            >
              <Coffee className="w-4 h-4" />
              Live Feed
            </a>
            <a 
              href="/dev/spill" 
              className="flex items-center gap-2 text-white hover:text-ctea-teal transition-colors"
            >
              <Users className="w-4 h-4" />
              Spill Tea
            </a>
            <a 
              href="/dev/leaderboard" 
              className="flex items-center gap-2 text-white hover:text-ctea-teal transition-colors"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </a>
            <a 
              href="/dev/dashboard" 
              className="flex items-center gap-2 text-white hover:text-ctea-teal transition-colors"
            >
              <Settings className="w-4 h-4" />
              Beta Dashboard
            </a>
          </nav>
        </div>
      </div>

      {/* Development Routes */}
      <Routes>
        <Route path="/feed" element={<DevelopmentFeed />} />
        <Route path="/spill" element={<DevelopmentSpillTea />} />
        <Route path="/leaderboard" element={<DevelopmentLeaderboard />} />
        <Route path="/dashboard" element={<BetaUserDashboard />} />
        <Route path="/flags" element={<FeatureFlagPanel />} />
        <Route path="/" element={<DevelopmentFeed />} />
      </Routes>
    </div>
  );
};

export default DevelopmentRoutes;
