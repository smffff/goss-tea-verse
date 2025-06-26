import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Crown, Star, Medal, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeaderboardEntry {
  anonymous_token: string;
  total_posts: number;
  total_reactions_given: number;
  total_reactions_received: number;
  tea_points: number;
  current_xp: number;
  current_level: number;
  updated_at: string;
}

const EnhancedLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  const { toast } = useToast();

  console.log('EnhancedLeaderboard - Component rendered, period:', period);

  useEffect(() => {
    fetchLeaderboard();
  }, [period]);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      console.log('EnhancedLeaderboard - Fetching leaderboard data for period:', period);

      let query = supabase
        .from('user_progression')
        .select('*')
        .order('tea_points', { ascending: false });

      // Filter by time period
      if (period === 'weekly') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('updated_at', weekAgo.toISOString());
      } else if (period === 'monthly') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('updated_at', monthAgo.toISOString());
      }

      const { data, error } = await query.limit(50);

      if (error) {
        console.error('EnhancedLeaderboard - Error fetching leaderboard:', error);
        throw error;
      }

      console.log('EnhancedLeaderboard - Fetched leaderboard data:', data?.length || 0, 'entries');
      setLeaderboard(data || []);
    } catch (error) {
      console.error('EnhancedLeaderboard - Error in fetchLeaderboard:', error);
      toast({
        title: "Failed to Load Leaderboard",
        description: "Couldn't fetch the latest rankings. Please try again.",
        variant: "destructive"
      });
      setLeaderboard([]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateUsername = (token: string, index: number) => {
    // Generate a consistent username from the token
    const adjectives = ['Spicy', 'Cool', 'Hot', 'Fresh', 'Wild', 'Bold', 'Sassy', 'Fierce', 'Smooth', 'Sharp'];
    const nouns = ['TeaSpiller', 'GossipLord', 'DramaKing', 'RumorQueen', 'AlphaHunter', 'NewsBreaker', 'TruthTeller', 'ChatGuru'];
    
    const hash = token.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const adjIndex = Math.abs(hash) % adjectives.length;
    const nounIndex = Math.abs(hash >> 8) % nouns.length;
    
    return `${adjectives[adjIndex]}${nouns[nounIndex]}${Math.abs(hash) % 100}`;
  };

  const getAvatarUrl = (token: string) => {
    // Generate DiceBear avatar URL
    const seed = token.substring(0, 8);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`;
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRankBadge = (position: number) => {
    if (position <= 3) {
      const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-600'];
      return colors[position - 1];
    }
    return 'bg-gray-600';
  };

  const getEngagementBonus = (entry: LeaderboardEntry) => {
    // Calculate engagement bonus: high reactions received relative to posts
    const engagementRatio = entry.total_posts > 0 ? entry.total_reactions_received / entry.total_posts : 0;
    if (engagementRatio >= 10) return 10; // High engagement bonus
    if (engagementRatio >= 5) return 5; // Medium engagement bonus
    return 0;
  };

  const getTotalScore = (entry: LeaderboardEntry) => {
    // Calculate total score: 5 pts per post + 2 pts per reaction + engagement bonus
    const baseScore = (entry.total_posts * 5) + (entry.total_reactions_given * 2);
    const engagementBonus = getEngagementBonus(entry);
    return baseScore + engagementBonus;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="bg-ctea-darker/50 border-ctea-teal/30 p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
              </div>
              <div className="w-16 h-8 bg-gray-700 rounded animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          {['weekly', 'monthly', 'all-time'].map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p as 'weekly' | 'monthly' | 'all-time')}
              className={period === p ? 'bg-ctea-teal' : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'}
            >
              {p === 'all-time' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeaderboard}
          disabled={isLoading}
          className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboard.length === 0 ? (
          <Card className="bg-ctea-darker/50 border-ctea-teal/30 p-8 text-center">
            <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No Rankings Yet</h3>
            <p className="text-gray-400">
              Be the first to spill some tea and claim the top spot!
            </p>
          </Card>
        ) : (
          leaderboard.map((entry, index) => {
            const position = index + 1;
            const totalScore = getTotalScore(entry);
            const engagementBonus = getEngagementBonus(entry);
            const username = generateUsername(entry.anonymous_token, index);
            const avatarUrl = getAvatarUrl(entry.anonymous_token);

            return (
              <Card 
                key={entry.anonymous_token} 
                className={`bg-ctea-darker/50 border-ctea-teal/30 p-4 transition-all hover:border-ctea-teal/50 ${
                  position <= 3 ? 'ring-1 ring-ctea-yellow/20' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${getRankBadge(position)} flex items-center justify-center text-white font-bold text-sm`}>
                      {position}
                    </div>
                    {getRankIcon(position)}
                  </div>

                  {/* Avatar */}
                  <img
                    src={avatarUrl}
                    alt={`${username} avatar`}
                    className="w-12 h-12 rounded-full border-2 border-ctea-teal/30"
                  />

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{username}</h3>
                      {position <= 3 && (
                        <Badge className="bg-gradient-to-r from-ctea-yellow to-ctea-orange text-black text-xs">
                          Top {position}
                        </Badge>
                      )}
                      {entry.current_level > 1 && (
                        <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30 text-xs">
                          Level {entry.current_level}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {entry.total_posts} posts • {entry.total_reactions_given} reactions given • {entry.total_reactions_received} reactions received
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-ctea-teal">{totalScore}</div>
                    <div className="text-xs text-gray-400">points</div>
                    {engagementBonus > 0 && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mt-1">
                        <Award className="w-3 h-3 mr-1" />
                        +{engagementBonus} bonus
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <Card className="bg-ctea-dark/30 border-ctea-teal/20 p-4">
        <p className="text-center text-sm text-gray-400">
          Rankings update in real-time as users spill tea and give reactions. 
          Climb the leaderboard by being active and engaging with the community! ☕
        </p>
      </Card>
    </div>
  );
};

export default EnhancedLeaderboard;
