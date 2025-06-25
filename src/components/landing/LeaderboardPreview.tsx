
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Flame } from 'lucide-react';

const LeaderboardPreview = () => {
  const leaderboardData = [
    { rank: 1, username: "SpillMaster3000", score: 15420, badge: "OG", isRising: true },
    { rank: 2, username: "MemeLordSupreme", score: 12350, badge: "Meme Lord", isRising: true },
    { rank: 3, username: "DramaQueenCT", score: 11200, badge: "Viral Queen" },
    { rank: 4, username: "ChaosAgent", score: 9800, badge: "Chaos Agent" },
    { rank: 5, username: "TeaSpiller", score: 8500, badge: "Drama King" }
  ];

  return (
    <section id="leaderboard" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            CTea Hall of Fame
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Top contributors and viral tea spillers. Will you make the cut?
          </p>
          
          {/* Live Activity Ticker */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent/10 to-accent2/10 px-6 py-3 rounded-full border border-accent/20 mb-8">
            <Flame className="w-5 h-5 text-accent2 animate-pulse" />
            <span className="text-sm font-bold text-accent">
              🔥 14 spills in the last hour
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent2/5 border-2 border-accent/20 shadow-xl">
            <div className="space-y-3">
              {leaderboardData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-accent/10">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-accent to-accent2 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-gradient-to-br from-accent/80 to-accent2/80 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {entry.username}
                        {entry.isRising && <TrendingUp className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{entry.badge}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{entry.score.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">points</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
