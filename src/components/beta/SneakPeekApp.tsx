
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, TrendingUp, Users, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TeaSubmission } from '@/types/teaFeed';
import { transformSubmission } from '@/utils/submissionUtils';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';
import LiveTeaSubmissionCard from '@/components/LiveTeaSubmissionCard';

interface SneakPeekAppProps {
  onUpgrade: () => void;
}

const SneakPeekApp: React.FC<SneakPeekAppProps> = ({ onUpgrade }) => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSpills: 17,
    activeUsers: 282,
    dailyGrowth: 22
  });
  const { toast } = useToast();

  // Fetch limited submissions for preview
  const fetchPreviewSubmissions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(3); // Only show 3 submissions in preview

      if (error) throw error;
      
      const transformedData = (data || []).map(transformSubmission);
      setSubmissions(transformedData);
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error fetching preview submissions:', error);
      // Use mock data for preview
      setSubmissions([
        {
          id: 'preview-1',
          content: 'Test is this thing finally freaking on. Today is the day we find out if this actually works or if we\'re just spinning our wheels in the crypto mud. The community has been waiting...',
          category: 'general',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          reactions: { hot: 5, cold: 1, spicy: 3 },
          author: 'Anonymous',
          evidence_urls: [],
          average_rating: 4.2,
          rating_count: 12,
          status: 'approved',
          anonymous_token: 'preview',
          verification_score: 0,
          has_evidence: false,
          is_verified: false,
          evidence_credibility_score: 0,
          flag_count: 0,
          ai_rated: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPreviewSubmissions();
  }, []);

  const handleReaction = (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    // Show upgrade prompt for reactions in preview mode
    toast({
      title: "Upgrade Required! 🔒",
      description: "Unlock full access to react and interact with the community!",
      action: (
        <Button
          onClick={onUpgrade}
          size="sm"
          className="bg-gradient-to-r from-ctea-teal to-pink-400 text-white"
        >
          <Crown className="w-4 h-4 mr-1" />
          Upgrade
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Preview Header */}
      <div className="bg-gradient-to-r from-orange-500/80 to-red-500/80 backdrop-blur-sm border-b border-orange-500/30">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-white" />
              <span className="text-white font-bold">You're previewing CTea Newsroom!</span>
            </div>
            <p className="text-orange-100 text-sm mb-3">
              This is just a taste of the hottest crypto gossip. Upgrade for unlimited access to all features!
            </p>
            <Button
              onClick={onUpgrade}
              className="bg-white/20 hover:bg-white/30 text-white font-bold backdrop-blur-sm"
            >
              <Crown className="w-4 h-4 mr-2" />
              Unlock Full Access
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* App Header */}
          <div className="text-center space-y-4">
            <BrandedTeacupIcon size="lg" variant="glow" showText />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to CTea Newsroom
              </h1>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/50">
                  🚀 Beta 1.2 LIVE
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                  👀 Preview Mode
                </Badge>
              </div>
              <p className="text-gray-400">
                Where crypto Twitter comes to spill the hottest tea
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-ctea-dark/60 border-ctea-teal/30 text-center">
                <CardContent className="p-6">
                  <BrandedTeacupIcon size="md" variant="spilling" className="mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white">{stats.totalSpills}</div>
                  <div className="text-gray-400">Total Tea Spills</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-ctea-dark/60 border-pink-400/30 text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white">{stats.activeUsers}</div>
                  <div className="text-gray-400">Active Gossipers</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-ctea-dark/60 border-green-400/30 text-center">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white">+{stats.dailyGrowth}%</div>
                  <div className="text-gray-400">Daily Growth</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Live Tea Feed Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BrandedTeacupIcon size="sm" variant="steam" />
                Live Tea Feed
              </h2>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                Preview - Limited Access
              </Badge>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading the hottest tea...</p>
              </div>
            ) : submissions.length > 0 ? (
              <div className="space-y-6">
                {submissions.map((submission) => (
                  <LiveTeaSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onReaction={handleReaction}
                  />
                ))}
                
                {/* Show More Teaser */}
                <Card className="bg-gradient-to-r from-ctea-teal/10 to-pink-400/10 border-ctea-teal/30">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Want to see more tea?
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Unlock full access to see all submissions, react, comment, and spill your own tea!
                    </p>
                    <Button
                      onClick={onUpgrade}
                      className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardContent className="p-8 text-center">
                  <BrandedTeacupIcon size="lg" variant="bounce" className="mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No tea brewing yet!</h3>
                  <p className="text-gray-400 mb-4">
                    Be the first to spill some juicy crypto gossip
                  </p>
                  <Button
                    onClick={onUpgrade}
                    className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Get Full Access to Spill
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SneakPeekApp;
