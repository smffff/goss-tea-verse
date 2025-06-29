import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, MessageCircle, Share2, TrendingUp, Eye, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { secureLog } from '@/utils/secureLogging';

interface EnhancedTeaItem {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: Date;
  author: string;
  reactions: {
    hot: number;
    spicy: number;
    verified: number;
  };
  engagement: {
    views: number;
    comments: number;
    shares: number;
  };
  trending: boolean;
  verified: boolean;
  boost: boolean;
}

interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  reactions: {
    hot: number;
    cold: number;
    spicy: number;
  };
  created_at: string;
  anonymous_token: string;
}

const EnhancedTeaFeed: React.FC = () => {
  const [teaItems, setTeaItems] = useState<EnhancedTeaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'trending' | 'verified'>('all');

  useEffect(() => {
    const loadEnhancedTea = async () => {
      try {
        setLoading(true);
        
        // Enhanced mock data
        const mockData: EnhancedTeaItem[] = [
          {
            id: '1',
            title: 'BREAKING: Major Exchange Liquidity Crisis Leaked',
            content: 'Internal documents reveal a major exchange is struggling with liquidity issues, potentially affecting millions of users...',
            category: 'exchange',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            author: 'DeepThroat_Crypto',
            reactions: { hot: 156, spicy: 89, verified: 23 },
            engagement: { views: 2847, comments: 67, shares: 34 },
            trending: true,
            verified: true,
            boost: true
          },
          {
            id: '2',
            title: 'NFT Royalty Manipulation Scheme Exposed',
            content: 'A coordinated effort to manipulate NFT royalty distributions has been uncovered involving several high-profile collections...',
            category: 'nft',
            timestamp: new Date(Date.now() - 1000 * 60 * 45),
            author: 'NFT_Detective',
            reactions: { hot: 98, spicy: 67, verified: 12 },
            engagement: { views: 1523, comments: 43, shares: 21 },
            trending: false,
            verified: true,
            boost: false
          }
        ];

        setTeaItems(mockData);
      } catch (error) {
        secureLog.error('Failed to load enhanced tea:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEnhancedTea();
  }, [filter]);

  const filteredItems = teaItems.filter(item => {
    if (filter === 'trending') return item.trending;
    if (filter === 'verified') return item.verified;
    return true;
  });

  const handleReaction = (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    setTeaItems(prev => prev.map(item => {
      if (item.id === submissionId) {
        return {
          ...item,
          reactions: {
            ...item.reactions,
            [reactionType]: item.reactions[reactionType] + 1
          }
        };
      }
      return item;
    }));
  };

  const handleItemClick = (item: TeaSubmission) => {
    // Handle item click
    console.log('Clicked on tea item:', item);
    // Add any navigation or modal logic here
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/60 border-ctea-teal/20 animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-ctea-teal/20 rounded mb-3"></div>
              <div className="h-4 bg-ctea-teal/10 rounded mb-2"></div>
              <div className="h-4 bg-ctea-teal/10 rounded mb-4 w-3/4"></div>
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-ctea-teal/10 rounded"></div>
                <div className="h-8 w-20 bg-ctea-teal/10 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Filter Bar */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-ctea-dark/50 to-ctea-darker/30 rounded-lg border border-ctea-teal/20">
        <span className="text-white font-medium">Filter:</span>
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Tea', icon: '☕' },
            { key: 'trending', label: 'Trending', icon: '🔥' },
            { key: 'verified', label: 'Verified', icon: '✅' }
          ].map((filterOption) => (
            <Button
              key={filterOption.key}
              size="sm"
              variant={filter === filterOption.key ? 'default' : 'outline'}
              onClick={() => setFilter(filterOption.key as any)}
              className={
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-ctea-teal to-ctea-purple text-white'
                  : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
              }
            >
              <span className="mr-1">{filterOption.icon}</span>
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Tea Items */}
      <AnimatePresence>
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-ctea-dark/90 to-ctea-darker/70 border-ctea-teal/30 hover:border-ctea-teal/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30 font-semibold">
                        {item.category.toUpperCase()}
                      </Badge>
                      {item.trending && (
                        <Badge className="bg-gradient-to-r from-ctea-orange to-ctea-pink text-white border-0">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          HOT
                        </Badge>
                      )}
                      {item.verified && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                          ✅ Verified
                        </Badge>
                      )}
                      {item.boost && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 font-bold">
                          ⚡ BOOSTED
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white leading-tight hover:text-ctea-teal transition-colors cursor-pointer">
                    {item.title}
                  </h3>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-300 mb-4 leading-relaxed">{item.content}</p>
                  
                  {/* Author & Engagement Stats */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-ctea-darker/50 rounded-lg">
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">By:</span> {item.author}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.engagement.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {item.engagement.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {item.engagement.shares}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Reaction Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-ctea-orange to-red-500 hover:from-ctea-orange/80 hover:to-red-500/80 text-white border-0"
                      >
                        <Flame className="w-4 h-4 mr-1" />
                        {item.reactions.hot}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-ctea-pink to-purple-500 hover:from-ctea-pink/80 hover:to-purple-500/80 text-white border-0"
                      >
                        🌶️ {item.reactions.spicy}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500/80 hover:to-emerald-500/80 text-white border-0"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {item.reactions.verified}
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                    >
                      💬 Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default EnhancedTeaFeed;
