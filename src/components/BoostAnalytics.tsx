
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, Users, Clock } from 'lucide-react';
import { secureLog } from '@/utils/secureLogging';

interface AnalyticsData {
  totalBoosts: number;
  activeUsers: number;
  trendingSubmissions: number;
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: Date;
    value: number;
  }>;
}

const BoostAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      secureLog.info('Loading boost analytics...');
      
      // Mock analytics data
      const mockData: AnalyticsData = {
        totalBoosts: 15420,
        activeUsers: 2847,
        trendingSubmissions: 42,
        recentActivity: [
          { id: '1', action: 'boost_given', timestamp: new Date(), value: 5 },
          { id: '2', action: 'submission_boosted', timestamp: new Date(), value: 10 },
        ]
      };
      
      setAnalytics(mockData);
    } catch (error) {
      secureLog.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-ctea-dark/50 border-ctea-teal/20 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-ctea-teal/20 rounded mb-2"></div>
              <div className="h-8 bg-ctea-teal/10 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Boost Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total Boosts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-teal">
              {analytics.totalBoosts.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-ctea-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-purple">
              {analytics.activeUsers.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-ctea-orange/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-orange">
              {analytics.trendingSubmissions}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-ctea-pink/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-pink">
              {analytics.recentActivity.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BoostAnalytics;
