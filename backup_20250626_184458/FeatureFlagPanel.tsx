
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, Zap, Bot, Share2, TrendingUp } from 'lucide-react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

const FeatureFlagPanel: React.FC = () => {
  const { flags, toggleFlag } = useFeatureFlags();

  const flagDetails = [
    {
      key: 'enableSOAPGating' as const,
      title: 'SOAP Gating System',
      description: 'Blur content behind SOAP token wall',
      icon: Zap,
      color: 'blue'
    },
    {
      key: 'enableCTeaBot' as const,
      title: 'CTeaBot AI Agent',
      description: 'AI assistant for onboarding and analysis',
      icon: Bot,
      color: 'green'
    },
    {
      key: 'enableArenaIntegration' as const,
      title: 'Arena Integration',
      description: 'Connect to Arena for SOAP rewards',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      key: 'enableMemeOps' as const,
      title: 'MemeOps Campaign',
      description: 'Weekly meme generation and scheduling',
      icon: Share2,
      color: 'pink'
    },
    {
      key: 'enableAdvancedAnalytics' as const,
      title: 'Advanced Analytics',
      description: 'Deep user behavior tracking',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      key: 'enableBetaFeedback' as const,
      title: 'Beta Feedback System',
      description: 'Collect user feedback and reports',
      icon: Settings,
      color: 'teal'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Settings className="w-8 h-8 text-ctea-teal" />
          Feature Flag Control Panel
        </h1>
        <p className="text-gray-400">
          Manage feature rollouts and A/B testing for CTea Newsroom development
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flagDetails.map((feature) => {
          const IconComponent = feature.icon;
          const isEnabled = flags[feature.key];
          
          return (
            <Card 
              key={feature.key}
              className={`bg-ctea-dark/80 border transition-all duration-300 ${
                isEnabled 
                  ? `border-${feature.color}-400/50 shadow-lg shadow-${feature.color}-400/20` 
                  : 'border-white/20'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-600 flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                      <Badge className={
                        isEnabled 
                          ? `bg-green-500/20 text-green-400 border-green-500/30` 
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }>
                        {isEnabled ? 'ENABLED' : 'DISABLED'}
                      </Badge>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => toggleFlag(feature.key)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Status: {isEnabled ? 'Active' : 'Inactive'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFlag(feature.key)}
                    className={`text-${feature.color}-400 hover:bg-${feature.color}-400/10`}
                  >
                    Toggle
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="mt-8 bg-ctea-dark/80 border-yellow-400/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={() => {
                Object.keys(flags).forEach(key => {
                  if (!flags[key as keyof typeof flags]) {
                    toggleFlag(key as keyof typeof flags);
                  }
                });
              }}
              className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
            >
              Enable All Features
            </Button>
            <Button
              onClick={() => {
                Object.keys(flags).forEach(key => {
                  if (flags[key as keyof typeof flags]) {
                    toggleFlag(key as keyof typeof flags);
                  }
                });
              }}
              className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
            >
              Disable All Features
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem('ctea-feature-flags');
                window.location.reload();
              }}
              className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30"
            >
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureFlagPanel;
