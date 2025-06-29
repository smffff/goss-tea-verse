import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank: number;
  avatar?: string;
  badges?: string[];
}

interface LeaderboardData {
  entries: LeaderboardEntry[];
  totalParticipants: number;
  lastUpdated: string;
}

const EnhancedLeaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setIsLoading(true);
      // Mock data for now
      const mockData: LeaderboardData = {
        entries: [
          { id: '1', username: 'TeaMaster', score: 1250, rank: 1, badges: ['top-spiller'] },
          { id: '2', username: 'GossipQueen', score: 1100, rank: 2, badges: ['verified'] },
          { id: '3', username: 'CryptoWhisperer', score: 950, rank: 3, badges: ['early-adopter'] }
        ],
        totalParticipants: 342,
        lastUpdated: new Date().toISOString()
      };
      
      setLeaderboardData(mockData);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEntryClick = (entry: LeaderboardEntry) => {
    // Handle entry click
    console.log('Clicked on entry:', entry);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          CTea Leaderboard
        </h1>
        <p className="text-gray-400">Top tea spillers and gossip contributors</p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-ctea-dark/80 border-yellow-400/30 text-center">
          <CardContent className="p-6">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">{leaders[0]?.score || 1337}</div>
            <div className="text-sm text-gray-400">Top Earner</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-ctea-teal/30 text-center">
          <CardContent className="p-6">
            <Zap className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">420</div>
            <div className="text-sm text-gray-400">Tea Spills</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-pink-400/30 text-center">
          <CardContent className="p-6">
            <Star className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">89%</div>
            <div className="text-sm text-gray-400">Avg Credibility</div>
          </CardContent>
        </Card>
        <Card className="bg-ctea-dark/80 border-purple-400/30 text-center">
          <CardContent className="p-6">
            <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white">69</div>
            <div className="text-sm text-gray-400">Active Sippers</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-ctea-dark/80 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-xl">🏆 Top Tea Spillers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData?.entries.map((entry: LeaderboardEntry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-ctea-dark/50 border border-ctea-teal/30 rounded-lg hover:border-ctea-teal/50 transition-colors cursor-pointer"
                onClick={() => handleEntryClick(entry)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-ctea-teal/20 rounded-full text-ctea-teal font-bold text-sm">
                    {entry.rank}
                  </div>
                  <div>
                    <p className="text-white font-medium">{entry.username}</p>
                    <div className="flex space-x-1 mt-1">
                      {entry.badges?.map((badge: string) => (
                        <Badge key={badge} variant="outline" className="text-xs border-ctea-teal/50 text-ctea-teal">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{entry.score.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLeaderboard;
