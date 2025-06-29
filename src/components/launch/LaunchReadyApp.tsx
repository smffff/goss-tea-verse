
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
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-500 text-white">
              <Rocket className="w-4 h-4 mr-2" />
              Launch Ready
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              CTea is Live!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Welcome to the crypto gossip newsroom. Start sharing your tea and earning rewards today.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-ctea-dark/50 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/spill')}
                size="lg"
                className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
              >
                <Coffee className="w-5 h-5 mr-2" />
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
        </div>
      </div>
    </div>
  );
};

export default LaunchReadyApp;
