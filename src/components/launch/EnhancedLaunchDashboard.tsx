import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Rocket, Users, TrendingUp, Sparkles, MessageCircle, BarChart3, 
  Activity, CheckCircle, AlertCircle, Clock, Target, Zap,
  Globe, Shield, Database, Code, TestTube
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface LaunchMetrics {
  betaUsers: number;
  dailySpills: number;
  tokenVolume: number;
  viralScore: number;
  uptime: number;
  securityScore: number;
  performanceScore: number;
  testCoverage: number;
}

interface ChecklistItem {
  id: string;
  title: string;
  category: 'security' | 'features' | 'testing' | 'deployment' | 'community';
  status: 'completed' | 'pending' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

const EnhancedLaunchDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<LaunchMetrics>({
    betaUsers: 1247,
    dailySpills: 89,
    tokenVolume: 15420,
    viralScore: 8.7,
    uptime: 99.8,
    securityScore: 95,
    performanceScore: 88,
    testCoverage: 82
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', title: 'Security Hardening Complete', category: 'security', status: 'completed', priority: 'high', lastUpdated: '2024-06-26' },
    { id: '2', title: 'Discord Integration', category: 'community', status: 'completed', priority: 'medium', lastUpdated: '2024-06-26' },
    { id: '3', title: 'Automated Testing Suite', category: 'testing', status: 'completed', priority: 'high', lastUpdated: '2024-06-26' },
    { id: '4', title: 'Performance Monitoring', category: 'features', status: 'completed', priority: 'high', lastUpdated: '2024-06-25' },
    { id: '5', title: 'Token Integration Testing', category: 'features', status: 'in-progress', priority: 'high', lastUpdated: '2024-06-26' },
    { id: '6', title: 'CI/CD Pipeline Optimization', category: 'deployment', status: 'in-progress', priority: 'medium', lastUpdated: '2024-06-26' },
    { id: '7', title: 'AI Commentary System', category: 'features', status: 'completed', priority: 'medium', lastUpdated: '2024-06-24' },
    { id: '8', title: 'Mobile Responsiveness', category: 'features', status: 'completed', priority: 'high', lastUpdated: '2024-06-25' },
  ]);

  // Mock real-time data for charts
  const [userGrowthData, setUserGrowthData] = useState([
    { name: 'Week 1', users: 234, spills: 45 },
    { name: 'Week 2', users: 456, spills: 89 },
    { name: 'Week 3', users: 789, spills: 156 },
    { name: 'Week 4', users: 1247, spills: 234 },
  ]);

  const [performanceData, setPerformanceData] = useState([
    { name: '00:00', load: 0.3, memory: 45 },
    { name: '06:00', load: 0.4, memory: 52 },
    { name: '12:00', load: 0.8, memory: 68 },
    { name: '18:00', load: 0.6, memory: 61 },
    { name: '24:00', load: 0.4, memory: 48 },
  ]);

  const categoryColors = {
    security: '#ef4444',
    features: '#3b82f6',
    testing: '#22c55e',
    deployment: '#f59e0b',
    community: '#8b5cf6'
  };

  const completionData = [
    { name: 'Completed', value: checklist.filter(item => item.status === 'completed').length, color: '#22c55e' },
    { name: 'In Progress', value: checklist.filter(item => item.status === 'in-progress').length, color: '#f59e0b' },
    { name: 'Pending', value: checklist.filter(item => item.status === 'pending').length, color: '#ef4444' },
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        betaUsers: prev.betaUsers + Math.floor(Math.random() * 3),
        dailySpills: prev.dailySpills + Math.floor(Math.random() * 2),
        tokenVolume: prev.tokenVolume + Math.floor(Math.random() * 50),
        viralScore: Math.min(10, prev.viralScore + (Math.random() - 0.5) * 0.1),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'features': return <Sparkles className="w-4 h-4" />;
      case 'testing': return <TestTube className="w-4 h-4" />;
      case 'deployment': return <Rocket className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const overallProgress = Math.round((checklist.filter(item => item.status === 'completed').length / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Rocket className="w-8 h-8 text-ctea-teal" />
            CTea Launch Command Center
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-lg px-4 py-2">
              🚀 {overallProgress}% Launch Ready
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              v1.0.0-beta
            </Badge>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-500/20 to-ctea-teal/20 border-green-500/50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.betaUsers.toLocaleString()}</div>
              <div className="text-green-400 text-sm">Beta Users</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.dailySpills}</div>
              <div className="text-blue-400 text-sm">Daily Spills</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.tokenVolume.toLocaleString()}</div>
              <div className="text-yellow-400 text-sm">Token Volume</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-500/50">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{metrics.viralScore.toFixed(1)}/10</div>
              <div className="text-pink-400 text-sm">Viral Score</div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Uptime</span>
              <Globe className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-xl font-bold text-white">{metrics.uptime}%</div>
            <Progress value={metrics.uptime} className="mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Security</span>
              <Shield className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xl font-bold text-white">{metrics.securityScore}%</div>
            <Progress value={metrics.securityScore} className="mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Performance</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white">{metrics.performanceScore}%</div>
            <Progress value={metrics.performanceScore} className="mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Test Coverage</span>
              <TestTube className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-xl font-bold text-white">{metrics.testCoverage}%</div>
            <Progress value={metrics.testCoverage} className="mt-2" />
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-ctea-darker/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="checklist">Launch Checklist</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="monitoring">System Health</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="w-5 h-5" />
                    User Growth Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="spills" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="w-5 h-5" />
                    Launch Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={completionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {completionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {completionData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-400">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Launch Checklist Tab */}
          <TabsContent value="checklist" className="space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5" />
                  Launch Readiness Checklist
                </CardTitle>
                <div className="mt-4">
                  <Progress value={overallProgress} className="h-3" />
                  <p className="text-sm text-gray-400 mt-2">
                    {checklist.filter(item => item.status === 'completed').length} of {checklist.length} items completed
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklist.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 bg-ctea-darker/30 rounded-lg border border-ctea-border/50"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <span className="text-white font-medium">{item.title}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          style={{ 
                            backgroundColor: `${categoryColors[item.category]}20`,
                            color: categoryColors[item.category],
                            borderColor: `${categoryColors[item.category]}50`
                          }}
                          className="text-xs"
                        >
                          {item.category}
                        </Badge>
                        <Badge 
                          variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {item.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{item.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-5 h-5" />
                    User Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Page Views Today</span>
                      <span className="text-white font-bold">3,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Sessions</span>
                      <span className="text-white font-bold">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Bounce Rate</span>
                      <span className="text-white font-bold">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Avg. Session Duration</span>
                      <span className="text-white font-bold">4m 32s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MessageCircle className="w-5 h-5" />
                    Community Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Discord Members</span>
                      <span className="text-white font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Messages Today</span>
                      <span className="text-white font-bold">456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Channels</span>
                      <span className="text-white font-bold">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Online Now</span>
                      <span className="text-white font-bold">89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="load" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="memory" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Run Full Test Suite
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Rocket className="w-4 h-4 mr-2" />
                Deploy to Staging
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Shield className="w-4 h-4 mr-2" />
                Security Audit
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Database className="w-4 h-4 mr-2" />
                Backup Database
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedLaunchDashboard;