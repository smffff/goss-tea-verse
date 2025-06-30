import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Coffee, TrendingUp, Filter, Search, Heart, MessageCircle, Share2, Clock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface TeaSubmission {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  isAnonymous: boolean;
  timestamp: string;
  likes: number;
  comments: number;
  isHot: boolean;
  isVerified: boolean;
}

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample tea submissions
  const sampleTeas: TeaSubmission[] = [
    {
      id: '1',
      title: 'Major DeFi Protocol Planning Token Launch',
      content: 'Heard from reliable sources that a well-known DeFi protocol is planning a major token launch in Q1 2025. The team has been quietly building and the tokenomics look promising. Keep an eye on their social media for announcements.',
      category: 'DeFi Drama',
      author: '0x1234...5678',
      isAnonymous: true,
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12,
      isHot: true,
      isVerified: true
    },
    {
      id: '2',
      title: 'Celebrity NFT Collection Facing Backlash',
      content: 'A popular celebrity\'s NFT collection is getting major backlash from the community. The art quality is questionable and the mint price seems inflated. Community members are calling it a cash grab.',
      category: 'NFT Gossip',
      author: 'CryptoWhale',
      isAnonymous: false,
      timestamp: '4 hours ago',
      likes: 23,
      comments: 8,
      isHot: false,
      isVerified: false
    },
    {
      id: '3',
      title: 'Exchange Listing Rumors Heating Up',
      content: 'Multiple sources confirming that a certain altcoin is in talks with major exchanges for listing. The team has been very quiet lately, which usually means something big is coming.',
      category: 'Exchange News',
      author: '0xabcd...efgh',
      isAnonymous: true,
      timestamp: '6 hours ago',
      likes: 67,
      comments: 15,
      isHot: true,
      isVerified: true
    },
    {
      id: '4',
      title: 'VC Firm Making Big Moves in Layer 2',
      content: 'A prominent VC firm has been quietly accumulating positions in several Layer 2 projects. Their portfolio strategy suggests they\'re betting big on the scaling narrative.',
      category: 'VC Moves',
      author: 'InsiderInfo',
      isAnonymous: false,
      timestamp: '8 hours ago',
      likes: 34,
      comments: 6,
      isHot: false,
      isVerified: true
    }
  ];

  const categories = [
    'all',
    'DeFi Drama',
    'NFT Gossip',
    'Exchange News',
    'Protocol Updates',
    'Celebrity Crypto',
    'Regulatory Tea',
    'VC Moves',
    'Other'
  ];

  const filteredTeas = sampleTeas.filter(tea => {
    const matchesFilter = filter === 'all' || tea.category === filter;
    const matchesSearch = tea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tea.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleLike = (teaId: string) => {
    // TODO: Implement like functionality
    console.log('Liked tea:', teaId);
  };

  const handleComment = (teaId: string) => {
    // TODO: Implement comment functionality
    console.log('Comment on tea:', teaId);
  };

  const handleShare = (teaId: string) => {
    // TODO: Implement share functionality
    console.log('Share tea:', teaId);
  };

  return (
    <Layout 
      pageTitle="Tea Feed"
      pageDescription="Latest crypto gossip and tea from the community"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-anton text-brand-text mb-2 flex items-center gap-2">
                <Coffee className="w-8 h-8" />
                Tea Feed 🫖
              </h1>
              <p className="text-brand-text-secondary">
                Latest crypto gossip and community insights
              </p>
            </div>
            {user && (
              <Button 
                onClick={() => window.location.href = '/spill'}
                className="btn-brand-primary"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Spill Tea
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="bg-brand-neutral border border-brand-primary/20 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-text-secondary" />
                  <Input
                    placeholder="Search tea..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-brand-background border-brand-primary/30 text-brand-text"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40 bg-brand-background border-brand-primary/30 text-brand-text">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent className="bg-brand-background border-brand-primary/30">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tea Feed */}
          <div className="space-y-6">
            {filteredTeas.length === 0 ? (
              <Card className="bg-brand-neutral border-brand-primary/20">
                <CardContent className="p-8 text-center">
                  <Coffee className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-brand-text mb-2">No Tea Found</h3>
                  <p className="text-brand-text-secondary">
                    Try adjusting your search or filters to find more gossip.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredTeas.map((tea) => (
                <Card key={tea.id} className="bg-brand-neutral border-brand-primary/20 hover:border-brand-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg text-brand-text">
                            {tea.title}
                          </CardTitle>
                          {tea.isHot && (
                            <Badge className="bg-brand-primary text-white text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          {tea.isVerified && (
                            <Badge className="bg-brand-accent-yellow text-brand-background text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {tea.isAnonymous ? 'Anonymous' : tea.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tea.timestamp}
                          </span>
                          <Badge variant="outline" className="text-xs border-brand-primary/30">
                            {tea.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brand-text-secondary mb-4 leading-relaxed">
                      {tea.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(tea.id)}
                          className="text-brand-text-secondary hover:text-brand-primary"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {tea.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleComment(tea.id)}
                          className="text-brand-text-secondary hover:text-brand-primary"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {tea.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(tea.id)}
                          className="text-brand-text-secondary hover:text-brand-primary"
                        >
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Load More */}
          {filteredTeas.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background">
                Load More Tea
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
