import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rocket, Coffee, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LaunchReadyApp: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Coffee,
      title: 'Spill Tea',
      description: 'Share crypto gossip and insights anonymously',
      color: 'text-ctea-teal'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with crypto enthusiasts and insiders',
      color: 'text-ctea-purple'
    },
    {
      icon: Sparkles,
      title: 'Earn Rewards',
      description: 'Get $TEA tokens for quality contributions',
      color: 'text-ctea-pink'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ctea-darker via-ctea-dark to-black text-white">
      <Card className="w-full max-w-xl bg-ctea-dark/80 border-ctea-teal/30 mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Rocket className="w-6 h-6 text-ctea-teal" />
            Launch Ready
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold mb-2">CTea is Live!</h2>
          <p className="mb-6 text-lg text-gray-200">
            Welcome to the crypto gossip newsroom. Start sharing your tea and earning rewards today.
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-ctea-darker p-6 rounded-lg flex flex-col items-center">
              <Icon className={`w-8 h-8 mb-2 ${feature.color}`} />
              <h3 className="font-bold mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => navigate('/spill')}
          size="lg"
          className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
        >
          Start Spilling Tea
        </Button>
        <Button
          onClick={() => navigate('/feed')}
          variant="outline"
          size="lg"
          className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
        >
          Browse the Feed
        </Button>
      </div>
    </div>
  );
};

export default LaunchReadyApp;
