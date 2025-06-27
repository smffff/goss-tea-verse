
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Activity,
  Target
} from 'lucide-react';
import { secureLog } from '@/utils/secureLogging';

interface LaunchMetrics {
  totalUsers: number;
  activeUsers: number;
  totalSubmissions: number;
  approvedSubmissions: number;
  pendingSubmissions: number;
  betaProgress: number;
  criticalIssues: number;
  uptime: string;
}

const LaunchDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<LaunchMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      secureLog.info('Loading launch metrics...');
      
      // Mock metrics data
      const mockMetrics: LaunchMetrics = {
        totalUsers: 1247,
        activeUsers: 89,
        totalSubmissions: 324,
        approvedSubmissions: 298,
        pendingSubmissions: 26,
        betaProgress: 78,
        criticalIssues: 2,
        uptime: '99.8%'
      };
      
      setMetrics(mockMetrics);
      setLastUpdated(new Date());
    } catch (error) {
      secureLog.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-ctea-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading launch dashboard...</p>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const getStatusColor = (value: number, threshold: number) => {
    return value >= threshold ? 'text-green-400' : 'text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Rocket className="w-8 h-8 text-ctea-teal" />
            Launch Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Real-time beta launch metrics and status
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Last updated</p>
          <p className="text-sm text-white">{lastUpdated.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-teal">
              {metrics.totalUsers.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {metrics.activeUsers} active now
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-ctea-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-purple">
              {metrics.totalSubmissions}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {metrics.pendingSubmissions} pending review
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-ctea-orange/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Beta Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-orange">
              {metrics.betaProgress}%
            </div>
            <Progress value={metrics.betaProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-ctea-pink/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ctea-pink">
              {metrics.uptime}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {metrics.criticalIssues === 0 ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              )}
              <span className="text-xs text-gray-400">
                {metrics.criticalIssues} critical issues
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-ctea-dark/80 border-ctea-teal/30">
          <CardHeader>
            <CardTitle className="text-white">Launch Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">User Onboarding</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Content Moderation</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Real-time Feed</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Monitoring
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Wallet Integration</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Operational
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ctea-dark/80 border-ctea-purple/30">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={loadMetrics}
              className="w-full bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold"
            >
              Refresh Metrics
            </Button>
            <Button
              variant="outline"
              className="w-full border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
            >
              View Detailed Logs
            </Button>
            <Button
              variant="outline"
              className="w-full border-ctea-orange/30 text-ctea-orange hover:bg-ctea-orange/10"
            >
              Emergency Actions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchDashboard;
