import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Activity, Zap, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

interface TrendData {
  id: string;
  topic: string;
  platform: 'twitter' | 'discord' | 'telegram' | 'reddit';
  sentiment: 'positive' | 'negative' | 'neutral';
  volume: number;
  change: number;
  trending_score: number;
  first_seen: string;
  last_updated: string;
  related_keywords: string[];
  source_urls: string[];
}

interface SentimentBreakdown {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

const RealTimeTrendMonitor = () => {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentBreakdown>({
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'twitter' | 'discord' | 'telegram' | 'reddit'>('all');

  // Mock data for demonstration - in production this would come from real-time APIs
  const mockTrends: TrendData[] = [
    {
      id: '1',
      topic: '#SolanaSzn',
      platform: 'twitter',
      sentiment: 'positive',
      volume: 15420,
      change: 23.5,
      trending_score: 94,
      first_seen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      last_updated: new Date().toISOString(),
      related_keywords: ['SOL', 'Solana', 'DeFi', 'NFT'],
      source_urls: ['https://twitter.com/search?q=%23SolanaSzn']
    },
    {
      id: '2',
      topic: 'Ethereum ETF Approval',
      platform: 'twitter',
      sentiment: 'positive',
      volume: 8920,
      change: 15.2,
      trending_score: 87,
      first_seen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      last_updated: new Date().toISOString(),
      related_keywords: ['ETH', 'ETF', 'SEC', 'Regulation'],
      source_urls: ['https://twitter.com/search?q=Ethereum+ETF']
    },
    {
      id: '3',
      topic: 'New Meme Coin Launch',
      platform: 'telegram',
      sentiment: 'negative',
      volume: 5670,
      change: -8.3,
      trending_score: 72,
      first_seen: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      last_updated: new Date().toISOString(),
      related_keywords: ['meme', 'launch', 'rugpull', 'scam'],
      source_urls: ['https://t.me/crypto_signals']
    },
    {
      id: '4',
      topic: 'DeFi Protocol Hack',
      platform: 'discord',
      sentiment: 'negative',
      volume: 12340,
      change: 45.7,
      trending_score: 91,
      first_seen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      last_updated: new Date().toISOString(),
      related_keywords: ['hack', 'DeFi', 'security', 'exploit'],
      source_urls: ['https://discord.gg/cryptosecurity']
    }
  ];

  useEffect(() => {
    fetchTrendData();
    const interval = setInterval(fetchTrendData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [selectedPlatform]);

  const fetchTrendData = async () => {
    setIsLoading(true);
    try {
      // In production, this would be a real API call
      // const response = await fetch('/api/trends?platform=' + selectedPlatform);
      // const data = await response.json();
      
      // For now, use mock data
      const filteredTrends = selectedPlatform === 'all' 
        ? mockTrends 
        : mockTrends.filter(trend => trend.platform === selectedPlatform);
      
      setTrends(filteredTrends);
      
      // Calculate sentiment breakdown
      const sentiment = filteredTrends.reduce((acc, trend) => {
        acc[trend.sentiment]++;
        acc.total++;
        return acc;
      }, { positive: 0, negative: 0, neutral: 0, total: 0 });
      
      setSentimentData(sentiment);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching trend data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '📈';
      case 'negative': return '📉';
      case 'neutral': return '➡️';
      default: return '❓';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return '🐦';
      case 'discord': return '💬';
      case 'telegram': return '📱';
      case 'reddit': return '🤖';
      default: return '🌐';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const platforms = [
    { id: 'all', label: 'All Platforms', icon: '🌐' },
    { id: 'twitter', label: 'Twitter', icon: '🐦' },
    { id: 'discord', label: 'Discord', icon: '💬' },
    { id: 'telegram', label: 'Telegram', icon: '📱' },
    { id: 'reddit', label: 'Reddit', icon: '🤖' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-ctea-teal" />
            Real-Time Trend Monitor
          </h2>
          <p className="text-gray-400 text-sm">
            Live monitoring across Crypto Twitter, Discord, Telegram & Reddit
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            Last updated: {formatTimeAgo(lastUpdate.toISOString())}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchTrendData}
            disabled={isLoading}
            className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Platform Filters */}
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <Button
            key={platform.id}
            size="sm"
            variant={selectedPlatform === platform.id ? "default" : "outline"}
            onClick={() => setSelectedPlatform(platform.id as 'all' | 'twitter' | 'discord' | 'telegram' | 'reddit')}
            className={`flex items-center gap-2 ${
              selectedPlatform === platform.id
                ? 'bg-gradient-ctea text-white'
                : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
            }`}
          >
            <span>{platform.icon}</span>
            {platform.label}
          </Button>
        ))}
      </div>

      {/* Sentiment Overview */}
      <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-ctea-teal" />
            Sentiment Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{sentimentData.positive}</div>
              <div className="text-sm text-gray-400">Positive</div>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">{sentimentData.negative}</div>
              <div className="text-sm text-gray-400">Negative</div>
            </div>
            <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-2xl font-bold text-yellow-400">{sentimentData.neutral}</div>
              <div className="text-sm text-gray-400">Neutral</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Trending Topics */}
      <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-ctea-yellow" />
            Live Trending Topics
          </h3>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-ctea-teal/20 rounded mb-2"></div>
                  <div className="h-8 bg-ctea-teal/10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {trends.map((trend) => (
                <div key={trend.id} className="p-4 bg-ctea-darker/50 rounded-lg border border-ctea-teal/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getPlatformIcon(trend.platform)}</span>
                      <div>
                        <h4 className="text-white font-medium">{trend.topic}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`${getSentimentColor(trend.sentiment)}`}>
                            {getSentimentIcon(trend.sentiment)} {trend.sentiment}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{trend.volume.toLocaleString()} mentions</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-ctea-yellow">{trend.trending_score}</div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className={`${trend.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trend.change >= 0 ? '+' : ''}{trend.change.toFixed(1)}% change
                      </span>
                      <span className="text-gray-400">
                        First seen: {formatTimeAgo(trend.first_seen)}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-ctea-teal hover:text-ctea-teal/80"
                      onClick={() => window.open(trend.source_urls[0], '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {trend.related_keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {trend.related_keywords.map((keyword, index) => (
                        <Badge key={index} className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30 text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Alert System */}
      <Card className="bg-gradient-to-br from-ctea-orange/20 to-ctea-red/20 border-ctea-orange/30">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-ctea-orange" />
            Trend Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-ctea-dark/20 rounded-lg border border-ctea-orange/20">
              <div>
                <div className="text-white font-medium">High Volume Spike Detected</div>
                <div className="text-sm text-gray-400">#SolanaSzn mentions increased by 150% in last 10 minutes</div>
              </div>
              <Badge className="bg-ctea-orange text-white">ALERT</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-ctea-dark/20 rounded-lg border border-ctea-yellow/20">
              <div>
                <div className="text-white font-medium">Sentiment Shift</div>
                <div className="text-sm text-gray-400">Ethereum ETF sentiment turning negative</div>
              </div>
              <Badge className="bg-ctea-yellow text-ctea-dark">WATCH</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RealTimeTrendMonitor; 