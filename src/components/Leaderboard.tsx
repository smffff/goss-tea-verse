import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Medal, Trophy, Star, TrendingUp, RefreshCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  badge: string;
  isRising?: boolean;
  avatar?: string;
  submissions: number;
  viralPosts: number;
}

interface LeaderboardProps {
  title?: string;
  period?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  maxEntries?: number;
  showRefresh?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  title = "Top Contributors", 
  period = 'weekly',
  maxEntries = 5,
  showRefresh = true
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock data for leaderboard
  const mockData: LeaderboardEntry[] = [
    { 
      rank: 1, 
      username: "SpillMaster3000", 
      score: 15420, 
      badge: "OG", 
      isRising: true,
      submissions: 47,
      viralPosts: 12
    },
    { 
      rank: 2, 
      username: "MemeLordSupreme", 
      score: 12350, 
      badge: "Meme Lord", 
      isRising: true,
      submissions: 38,
      viralPosts: 8
    },
    { 
      rank: 3, 
      username: "DramaQueenCT", 
      score: 11200, 
      badge: "Viral Queen",
      submissions: 42,
      viralPosts: 15
    },
    { 
      rank: 4, 
      username: "ChaosAgent", 
      score: 9800, 
      badge: "Chaos Agent",
      submissions: 29,
      viralPosts: 6
    },
    { 
      rank: 5, 
      username: "TeaSpiller", 
      score: 8500, 
      badge: "Drama King",
      submissions: 35,
      viralPosts: 9
    }
  ];

  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      // const response = await fetch('/api/leaderboard?period=' + period);
      // const data = await response.json();
      
      setEntries(mockData.slice(0, maxEntries));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [period, maxEntries]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboardData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'og': return 'bg-ctea-yellow text-ctea-dark';
      case 'meme lord': return 'bg-ctea-purple text-white';
      case 'drama king': return 'bg-ctea-pink text-white';
      case 'viral queen': return 'bg-ctea-teal text-ctea-dark';
      case 'chaos agent': return 'bg-ctea-orange text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-ctea-yellow" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-ctea-orange" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-400">#{rank}</span>;
  };

  const formatScore = (score: number) => {
    if (score >= 1000) {
      return (score / 1000).toFixed(1) + 'K';
    }
    return score.toString();
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <Badge variant="outline" className="text-ctea-teal border-ctea-teal">
            {period.toUpperCase()}
          </Badge>
        </div>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-ctea-teal border-ctea-teal">
            {period.toUpperCase()}
          </Badge>
          {showRefresh && (
            <Button
              size="sm"
              variant="ghost"
              onClick={fetchLeaderboardData}
              className="text-ctea-teal hover:bg-ctea-teal/10"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {entries.map((entry) => (
          <div 
            key={entry.rank} 
            className={`flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-ctea-dark/30 to-transparent border border-ctea-teal/20 hover:bg-ctea-dark/50 transition-all duration-200 ${entry.isRising ? 'animate-glow' : ''}`}
          >
            <div className="flex items-center gap-2">
              {getRankIcon(entry.rank)}
              {entry.isRising && <Star className="w-4 h-4 text-ctea-yellow animate-pulse" />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">{entry.username}</span>
                <Badge className={`text-xs ${getBadgeColor(entry.badge)}`}>
                  {entry.badge.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{formatScore(entry.score)} points</span>
                <span>{entry.submissions} submissions</span>
                <span className="text-ctea-pink">{entry.viralPosts} viral</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-ctea-teal">#{entry.rank}</div>
              {entry.isRising && (
                <TrendingUp className="w-4 h-4 text-ctea-yellow mx-auto mt-1" />
              )}
            </div>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No data available</p>
        </div>
      )}
    </Card>
  );
};

export default Leaderboard; 