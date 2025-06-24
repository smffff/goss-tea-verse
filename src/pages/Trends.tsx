import React from 'react';
import Layout from '@/components/Layout';
import RealTimeTrendMonitor from '@/components/RealTimeTrendMonitor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity, Zap, Bell, Settings, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Trends = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Active Trends', value: '24', icon: TrendingUp, color: 'text-ctea-teal' },
    { label: 'Platforms Monitored', value: '4', icon: Activity, color: 'text-ctea-purple' },
    { label: 'Alerts Today', value: '7', icon: Bell, color: 'text-ctea-yellow' },
    { label: 'Sentiment Score', value: '78%', icon: BarChart3, color: 'text-ctea-pink' }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              Real-Time Trend Monitor 🔥
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Stay ahead of the crypto conversation with AI-powered trend detection across all platforms
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              {quickStats.map(({ label, value, icon: Icon, color }) => (
                <Card key={label} className="bg-ctea-darker/50 border-ctea-teal/30 text-center p-4">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                  <div className={`text-xl font-bold ${color}`}>{value}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Feature Overview */}
          <Card className="bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30 mb-8">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-ctea-yellow" />
                How It Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-ctea-teal/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-ctea-teal" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Real-Time Monitoring</h4>
                  <p className="text-gray-400 text-sm">
                    Continuously scans Twitter, Discord, Telegram & Reddit for emerging trends
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-ctea-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-ctea-purple" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Sentiment Analysis</h4>
                  <p className="text-gray-400 text-sm">
                    AI-powered sentiment detection to gauge community mood and reactions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-ctea-pink/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-ctea-pink" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Smart Alerts</h4>
                  <p className="text-gray-400 text-sm">
                    Get notified when trends spike or sentiment shifts dramatically
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button 
              className="bg-gradient-ctea text-white font-bold"
              onClick={() => navigate('/submit')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Submit Trend
            </Button>
            <Button 
              variant="outline"
              className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Alert Settings
            </Button>
            <Button 
              variant="outline"
              className="border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RealTimeTrendMonitor />
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Advanced Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Custom Alerts */}
            <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-ctea-teal/20 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-ctea-teal" />
                </div>
                <h3 className="text-lg font-bold text-white">Custom Alerts</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Set up personalized alerts for specific keywords, tokens, or personalities. Never miss important developments.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Keyword Mentions</span>
                  <Badge className="bg-ctea-teal/20 text-ctea-teal">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Sentiment Shifts</span>
                  <Badge className="bg-ctea-teal/20 text-ctea-teal">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Volume Spikes</span>
                  <Badge className="bg-ctea-teal/20 text-ctea-teal">Active</Badge>
                </div>
              </div>
            </Card>

            {/* Predictive Analytics */}
            <Card className="bg-ctea-dark/30 border border-ctea-purple/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-ctea-purple/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-ctea-purple" />
                </div>
                <h3 className="text-lg font-bold text-white">Predictive Analytics</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                AI algorithms predict which trends are likely to go viral based on historical patterns and current momentum.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Viral Probability</span>
                  <span className="text-ctea-purple font-bold">87%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Growth Rate</span>
                  <span className="text-green-400 font-bold">+23%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Peak Time</span>
                  <span className="text-ctea-yellow font-bold">2-4h</span>
                </div>
              </div>
            </Card>

            {/* Cross-Platform Analysis */}
            <Card className="bg-ctea-dark/30 border border-ctea-pink/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-ctea-pink/20 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-ctea-pink" />
                </div>
                <h3 className="text-lg font-bold text-white">Cross-Platform</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Monitor trends across multiple platforms simultaneously to get the complete picture of crypto sentiment.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Twitter</span>
                  <Badge className="bg-ctea-pink/20 text-ctea-pink">Live</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Discord</span>
                  <Badge className="bg-ctea-pink/20 text-ctea-pink">Live</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Telegram</span>
                  <Badge className="bg-ctea-pink/20 text-ctea-pink">Live</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Trends; 