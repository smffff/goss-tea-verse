import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  anonymous_token: string;
  total_submissions: number;
  total_reactions_given: number;
  total_reactions_received: number;
  credibility_score: number;
  tea_tokens_earned: number;
  rank: number;
}

const EnhancedLeaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // Query tea_submissions with proper aggregation
      const { data, error } = await supabase
        .from('tea_submissions')
        .select(`
          anonymous_token,
          created_at
        `);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        // Use mock data if query fails
        setLeaders(getMockLeaderboard());
        return;
      }

      // Process data to create leaderboard entries
      const processedData = data ? processLeaderboardData(data) : getMockLeaderboard();
      setLeaders(processedData);
    } catch (error) {
      console.error('Error in fetchLeaderboard:', error);
      setLeaders(getMockLeaderboard());
    } finally {
      setLoading(false);
    }
  };

  const processLeaderboardData = (data: any[]): LeaderboardEntry[] => {
    // Group by anonymous_token and count submissions
    const tokenCounts = data.reduce((acc: any, submission: any) => {
      const token = submission.anonymous_token;
      if (!acc[token]) {
        acc[token] = {
          anonymous_token: token,
          total_submissions: 0,
          total_reactions_given: 0,
          total_reactions_received: 0,
          credibility_score: Math.floor(Math.random() * 30) + 70, // Mock score
          tea_tokens_earned: 0,
          rank: 0
        };
      }
      acc[token].total_submissions++;
      acc[token].tea_tokens_earned += 5; // 5 tokens per submission
      return acc;
    }, {});

    // Convert to array and sort by submissions
    const sorted = Object.values(tokenCounts)
      .sort((a: any, b: any) => b.total_submissions - a.total_submissions)
      .map((entry: any, index: number) => ({
        ...entry,
        rank: index + 1
      }));

    return sorted.slice(0, 10); // Top 10
  };

  const getMockLeaderboard = (): LeaderboardEntry[] => {
    return [
      { anonymous_token: "whale_42", total_submissions: 67, total_reactions_given: 45, total_reactions_received: 89, credibility_score: 95, tea_tokens_earned: 1337, rank: 1 },
      { anonymous_token: "sipper_23", total_submissions: 54, total_reactions_given: 38, total_reactions_received: 72, credibility_score: 92, tea_tokens_earned: 1200, rank: 2 },
      { anonymous_token: "gossip_lord", total_submissions: 48, total_reactions_given: 35, total_reactions_received: 65, credibility_score: 89, tea_tokens_earned: 1100, rank: 3 },
      { anonymous_token: "alpha_spiller", total_submissions: 41, total_reactions_given: 31, total_reactions_received: 58, credibility_score: 87, tea_tokens_earned: 950, rank: 4 },
      { anonymous_token: "rumor_mill", total_submissions: 36, total_reactions_given: 28, total_reactions_received: 51, credibility_score: 85, tea_tokens_earned: 800, rank: 5 }
    ];
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
            <div className="text-2xl font-bold text-white">{leaders[0]?.tea_tokens_earned || 1337}</div>
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
            {leaders.map((leader) => (
              <div 
                key={leader.anonymous_token}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    leader.rank === 1 ? 'bg-yellow-500 text-black' :
                    leader.rank === 2 ? 'bg-gray-400 text-black' :
                    leader.rank === 3 ? 'bg-orange-600 text-white' :
                    'bg-white/20 text-white'
                  }`}>
                    {leader.rank}
                  </div>
                  <div>
                    <div className="text-white font-bold">{leader.anonymous_token}</div>
                    <div className="text-gray-400 text-sm">{leader.total_submissions} spills</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {leader.tea_tokens_earned} TEA
                  </Badge>
                  <Badge className={`${
                    leader.credibility_score > 90 ? 'bg-green-500/20 text-green-400' :
                    leader.credibility_score > 85 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {leader.credibility_score}% credible
                  </Badge>
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
