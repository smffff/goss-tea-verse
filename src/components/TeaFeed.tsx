
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, MessageCircle, Share2, Clock, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { secureLog } from '@/utils/secureLogging';

interface TeaItem {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: Date;
  author: string;
  isAnonymous: boolean;
  reactions: {
    hot: number;
    cold: number;
    spicy: number;
  };
  comments: number;
  trending: boolean;
}

interface TeaFeedProps {
  limit?: number;
  showCategories?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

const TeaFeed: React.FC<TeaFeedProps> = ({ 
  limit = 10, 
  showCategories = true,
  variant = 'default'
}) => {
  const [teaItems, setTeaItems] = useState<TeaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tea', icon: '☕' },
    { id: 'defi', label: 'DeFi Drama', icon: '🏦' },
    { id: 'nft', label: 'NFT Gossip', icon: '🖼️' },
    { id: 'celeb', label: 'Crypto Celebs', icon: '👑' },
    { id: 'exchange', label: 'Exchange News', icon: '📊' }
  ];

  useEffect(() => {
    const loadTea = async () => {
      try {
        setLoading(true);
        
        // Mock data for now
        const mockTea: TeaItem[] = [
          {
            id: '1',
            title: 'Major DeFi Protocol Drama Unfolds',
            content: 'Insider sources reveal shocking details about the recent governance vote manipulation...',
            category: 'defi',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            author: 'Anonymous Whale',
            isAnonymous: true,
            reactions: { hot: 42, cold: 3, spicy: 28 },
            comments: 15,
            trending: true
          },
          {
            id: '2',
            title: 'NFT Collection Floor Price Manipulation Exposed',
            content: 'Multiple wallets connected to the same entity have been artificially inflating prices...',
            category: 'nft',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            author: 'Detective Degen',
            isAnonymous: false,
            reactions: { hot: 38, cold: 7, spicy: 19 },
            comments: 23,
            trending: false
          }
        ];

        setTeaItems(mockTea.slice(0, limit));
      } catch (error) {
        secureLog.error('Failed to load tea items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTea();
  }, [limit, selectedCategory]);

  const handleReaction = (itemId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    secureLog.info('Reaction clicked:', { itemId, reactionType });
    // Handle reaction logic here
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-ctea-dark/50 border-ctea-teal/20 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-ctea-teal/20 rounded mb-2"></div>
              <div className="h-3 bg-ctea-teal/10 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-ctea-teal/10 rounded"></div>
                <div className="h-6 w-16 bg-ctea-teal/10 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      {showCategories && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? 'bg-ctea-teal text-black'
                  : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
              }
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      )}

      {/* Tea Items */}
      <div className="space-y-4">
        {teaItems.map((item) => (
          <Card key={item.id} className="bg-ctea-dark/80 border-ctea-teal/20 hover:border-ctea-teal/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
                    {categories.find(c => c.id === item.category)?.label || item.category}
                  </Badge>
                  {item.trending && (
                    <Badge className="bg-ctea-orange/20 text-ctea-orange border-ctea-orange/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                </div>
              </div>
              <CardTitle className="text-white text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4 line-clamp-3">{item.content}</p>
              
              {/* Author */}
              <div className="text-sm text-gray-400 mb-4">
                By: {item.isAnonymous ? '🥸 Anonymous' : item.author}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleReaction(item.id, 'hot')}
                    className="text-ctea-orange hover:bg-ctea-orange/10"
                  >
                    <Flame className="w-4 h-4 mr-1" />
                    {item.reactions.hot}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:bg-gray-800/50"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {item.comments}
                  </Button>
                </div>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:bg-gray-800/50">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeaFeed;
