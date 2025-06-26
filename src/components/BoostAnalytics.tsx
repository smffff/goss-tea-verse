import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Users, 
  BarChart3, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BoostStats {
  totalRevenue: number;
  totalBoosts: number;
  averageBoostAmount: number;
  topPerformingSubmissions: Array<{
    id: string;
    content: string;
    boost_score: number;
    revenue: number;
  }>;
  dailyRevenue: Array<{
    date: string;
    revenue: number;
    boosts: number;
  }>;
  boostTierBreakdown: Array<{
    tier: string;
    count: number;
    revenue: number;
  }>;
}

const BoostAnalytics: React.FC = () => {
  const [stats, setStats] = useState<BoostStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const { toast } = useToast();

  const fetchBoostStats = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock data since boost_transactions table doesn't exist
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: BoostStats = {
        totalRevenue: 2450.75,
        totalBoosts: 156,
        averageBoostAmount: 15.71,
        topPerformingSubmissions: [
          {
            id: '1',
            content: 'Major DeFi protocol vulnerability exposed',
            boost_score: 250,
            revenue: 89.50
          },
          {
            id: '2', 
            content: 'Whale movement detected in ETH',
            boost_score: 180,
            revenue: 67.25
          },
          {
            id: '3',
            content: 'New memecoin pump incoming',
            boost_score: 145,
            revenue: 45.80
          }
        ],
        dailyRevenue: [
          { date: '2024-01-20', revenue: 125.30, boosts: 8 },
          { date: '2024-01-21', revenue: 89.75, boosts: 6 },
          { date: '2024-01-22', revenue: 156.90, boosts: 12 },
          { date: '2024-01-23', revenue: 203.45, boosts: 15 },
          { date: '2024-01-24', revenue: 178.20, boosts: 11 }
        ],
        boostTierBreakdown: [
          { tier: 'Premium', count: 45, revenue: 1250.30 },
          { tier: 'Standard', count: 78, revenue: 890.45 },
          { tier: 'Basic', count: 33, revenue: 310.00 }
        ]
      };

      setStats(mockStats);

    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Error fetching boost stats:', error);
      toast({
        title: "Error",
        description: "Failed to load boost analytics.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBoostStats();
  }, [fetchBoostStats, timeRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
              <div className="animate-pulse">
                <div className="h-4 bg-ctea-teal/20 rounded mb-2"></div>
                <div className="h-8 bg-ctea-teal/10 rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-white mb-2">No Boost Data</h3>
        <p className="text-gray-400">Boost analytics will appear here once users start boosting submissions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Boost Analytics</h2>
          <p className="text-gray-400">Track boost performance and revenue</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7D
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30D
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90D
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Total Revenue</p>
              <p className="text-white text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ctea-yellow text-sm font-medium">Total Boosts</p>
              <p className="text-white text-2xl font-bold">{stats.totalBoosts}</p>
            </div>
            <Zap className="w-8 h-8 text-ctea-yellow" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ctea-purple text-sm font-medium">Avg. Boost Value</p>
              <p className="text-white text-2xl font-bold">{formatCurrency(stats.averageBoostAmount)}</p>
            </div>
            <Target className="w-8 h-8 text-ctea-purple" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 border-ctea-teal/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ctea-teal text-sm font-medium">Conversion Rate</p>
              <p className="text-white text-2xl font-bold">
                {stats.totalBoosts > 0 ? ((stats.totalBoosts / 100) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-ctea-teal" />
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-ctea-dark/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Top Performers</TabsTrigger>
          <TabsTrigger value="breakdown">Tier Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
            <h3 className="text-lg font-bold text-white mb-4">Revenue Trend</h3>
            <div className="space-y-3">
              {stats.dailyRevenue.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-ctea-darker/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-ctea-teal" />
                    <span className="text-white">{new Date(day.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 font-bold">{formatCurrency(day.revenue)}</span>
                    <Badge className="bg-ctea-yellow/20 text-ctea-yellow border-ctea-yellow/30">
                      {day.boosts} boosts
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
            <h3 className="text-lg font-bold text-white mb-4">Top Performing Submissions</h3>
            <div className="space-y-3">
              {stats.topPerformingSubmissions.map((submission, index) => (
                <div key={submission.id} className="flex items-center justify-between p-3 bg-ctea-darker/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-ctea-yellow/20 rounded-full flex items-center justify-center">
                      {index === 0 ? <Crown className="w-4 h-4 text-ctea-yellow" /> : 
                       index === 1 ? <span className="text-ctea-yellow font-bold">2</span> :
                       index === 2 ? <span className="text-ctea-yellow font-bold">3</span> :
                       <span className="text-gray-400 font-bold">{index + 1}</span>}
                    </div>
                    <div>
                      <p className="text-white font-medium">{submission.content}</p>
                      <p className="text-gray-400 text-sm">+{submission.boost_score} boost points</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{formatCurrency(submission.revenue)}</p>
                    <p className="text-gray-400 text-sm">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <Card className="p-6 bg-ctea-dark/50 border-ctea-teal/20">
            <h3 className="text-lg font-bold text-white mb-4">Boost Tier Breakdown</h3>
            <div className="space-y-3">
              {stats.boostTierBreakdown.map((tier) => (
                <div key={tier.tier} className="flex items-center justify-between p-3 bg-ctea-darker/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-ctea-purple/20 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-ctea-purple" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{tier.tier}</p>
                      <p className="text-gray-400 text-sm">{tier.count} purchases</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{formatCurrency(tier.revenue)}</p>
                    <p className="text-gray-400 text-sm">
                      {((tier.revenue / stats.totalRevenue) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BoostAnalytics;
