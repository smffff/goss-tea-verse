
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Coffee, Zap } from 'lucide-react';
import EnhancedRealTimeFeed from '@/components/feed/EnhancedRealTimeFeed';
import SpillTeaModal from '@/components/modals/SpillTeaModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';

interface LiveTeaAppProps {
  onLogout?: () => void;
}

const LiveTeaApp: React.FC<LiveTeaAppProps> = ({ onLogout }) => {
  const [showSpillModal, setShowSpillModal] = useState(false);
  const [feedRefreshKey, setFeedRefreshKey] = useState(0);

  const handleSpillSuccess = useCallback(() => {
    // Refresh the feed by updating the key instead of reloading the page
    setFeedRefreshKey(prev => prev + 1);
    setShowSpillModal(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      <UnifiedNavigation />
      
      {/* Quick Action Header */}
      <div className="bg-ctea-dark/80 backdrop-blur-lg border-b border-ctea-teal/30 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🫖</div>
              <h1 className="text-xl font-bold text-white">CTea Live</h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-400/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">LIVE</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSpillModal(true)}
                className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Spill Tea
              </Button>
              
              {onLogout && (
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <EnhancedRealTimeFeed key={feedRefreshKey} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-ctea-teal" />
                    Live Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Users</span>
                    <span className="text-ctea-teal font-bold">247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tea Spilled Today</span>
                    <span className="text-ctea-teal font-bold">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Hot Takes</span>
                    <span className="text-orange-400 font-bold">34</span>
                  </div>
                </CardContent>
              </Card>

              {/* How to Access */}
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Access Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Beta Access Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Spill Quality Tea</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Tip the Devs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">○</span>
                    <span className="text-gray-400">Hold $TEA Tokens</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Spill Tea Modal */}
      <SpillTeaModal
        isOpen={showSpillModal}
        onClose={() => setShowSpillModal(false)}
        onSuccess={handleSpillSuccess}
      />
    </div>
  );
};

export default LiveTeaApp;
