
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, Lock, Eye, ArrowUp, MessageCircle, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission } from '@/utils/submissionUtils';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface SneakPeekAppProps {
  onUpgrade: () => void;
}

const SneakPeekApp: React.FC<SneakPeekAppProps> = ({ onUpgrade }) => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSpills: 0,
    activeUsers: 0,
    dailyGrowth: 0
  });

  useEffect(() => {
    fetchLimitedSubmissions();
    fetchStats();
  }, []);

  const fetchLimitedSubmissions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(5); // Limited to 5 posts for preview

      if (error) throw error;
      
      const transformedData = (data || []).map(transformSubmission);
      setSubmissions(transformedData);
    } catch (error) {
      console.error('Error fetching preview submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: spillCount } = await supabase
        .from('tea_submissions')
        .select('*', { count: 'exact', head: true });

      const { count: userCount } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalSpills: spillCount || 0,
        activeUsers: userCount || 0,
        dailyGrowth: Math.floor(Math.random() * 50) + 10
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleLockedAction = () => {
    onUpgrade();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Header with Preview Badge */}
      <div className="bg-ctea-dark/80 backdrop-blur-sm border-b border-ctea-teal/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  CTea Newsroom
                  <BrandedTeacupIcon size="sm" />
                </h1>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  Preview Mode
                </Badge>
              </div>
            </div>
            <Button
              onClick={onUpgrade}
              className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Upgrade Access
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Preview Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-orange-500/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <h3 className="text-orange-400 font-bold mb-2">🔥 You're previewing CTea Newsroom!</h3>
              <p className="text-orange-300 text-sm mb-3">
                This is just a taste of the hottest crypto gossip. Upgrade for unlimited access to all features!
              </p>
              <Button
                onClick={onUpgrade}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold"
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlock Full Access
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Limited Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-ctea-dark/60 border-ctea-teal/30">
            <CardContent className="p-4 text-center">
              <BrandedTeacupIcon size="lg" variant="spilling" className="mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalSpills}</div>
              <div className="text-sm text-gray-400">Total Tea Spills</div>
            </CardContent>
          </Card>
          <Card className="bg-ctea-dark/60 border-pink-400/30 relative overflow-hidden">
            <CardContent className="p-4 text-center">
              <Coffee className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
              <div className="text-sm text-gray-400">Active Gossipers</div>
            </CardContent>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Lock className="w-6 h-6 text-pink-400" />
            </div>
          </Card>
          <Card className="bg-ctea-dark/60 border-ctea-purple/30 relative overflow-hidden">
            <CardContent className="p-4 text-center">
              <ArrowUp className="w-8 h-8 text-ctea-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">+{stats.dailyGrowth}%</div>
              <div className="text-sm text-gray-400">Daily Growth</div>
            </CardContent>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Lock className="w-6 h-6 text-ctea-purple" />
            </div>
          </Card>
        </div>

        {/* Limited Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white mb-4">Preview Tea Feed ☕</h2>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              Limited to 5 posts
            </Badge>
          </div>
          
          {submissions.length === 0 ? (
            <Card className="bg-ctea-dark/60 border-ctea-teal/30">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">☕</div>
                <h3 className="text-xl font-bold text-white mb-2">No tea brewing yet!</h3>
                <p className="text-gray-400 mb-4">The gossip mill is warming up...</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-ctea-dark/60 border-ctea-teal/30 hover:border-ctea-teal/50 transition-all duration-300 relative overflow-hidden">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-ctea-teal border-ctea-teal/30">
                          {submission.category}
                        </Badge>
                        {submission.is_verified && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatTimeAgo(submission.created_at)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-white leading-relaxed">{submission.content}</p>
                    </div>

                    {/* Locked Interactions */}
                    <div className="flex items-center gap-4 mb-4 p-3 bg-ctea-darker/50 rounded-lg relative">
                      <div className="flex items-center gap-2 text-orange-400/70">
                        🔥 <span className="font-medium">{submission.reactions.hot}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-400/70">
                        🌶️ <span className="font-medium">{submission.reactions.spicy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400/70">
                        🧊 <span className="font-medium">{submission.reactions.cold}</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                        <Button
                          onClick={handleLockedAction}
                          size="sm"
                          className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white"
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          Unlock Reactions
                        </Button>
                      </div>
                    </div>

                    {/* Locked Actions */}
                    <div className="flex items-center gap-2 relative">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 opacity-50"
                        disabled
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Comment
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 opacity-50"
                        disabled
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 flex items-center justify-end pr-4">
                        <Button
                          onClick={handleLockedAction}
                          size="sm"
                          className="bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30"
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          Upgrade to Interact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
          
          {/* End of Preview Notice */}
          <Card className="bg-gradient-to-r from-ctea-teal/20 to-pink-400/20 border-ctea-teal/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-white font-bold mb-2">🔒 That's all for the preview!</h3>
              <p className="text-gray-300 mb-4">
                There's so much more tea waiting for you. Upgrade now for unlimited access to all the hottest crypto gossip!
              </p>
              <Button
                onClick={onUpgrade}
                className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Upgrade to Full Access
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SneakPeekApp;
