
import React from 'react';
import TeaFeed from '@/components/TeaFeed';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Users } from 'lucide-react';

const Feed = () => {
  const stats = [
    { label: 'Hot Takes Today', value: '1,247', icon: TrendingUp, color: 'text-ctea-teal' },
    { label: 'Active Users', value: '2,420', icon: Users, color: 'text-ctea-purple' },
    { label: 'Viral Posts', value: '69', icon: Zap, color: 'text-ctea-yellow' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 animate-glow">
          Hot Takes & Drama ☕
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          The freshest tea from the crypto world. Upvote the spiciest takes and join the conversation.
        </p>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="p-4 bg-ctea-darker/50 border-ctea-teal/30 text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
              <div className={`text-xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA for new users */}
      <Card className="p-6 bg-gradient-to-br from-ctea-pink/20 to-ctea-purple/20 border-ctea-pink/30 neon-border mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Got Some Tea to Spill? ☕</h3>
            <p className="text-gray-300">Share your hottest takes and earn $TEA points for viral content!</p>
          </div>
          <Button 
            className="bg-gradient-ctea text-white font-bold"
            onClick={() => window.location.href = '/submit'}
          >
            Spill Now
          </Button>
        </div>
      </Card>

      {/* Main Feed */}
      <TeaFeed />
    </div>
  );
};

export default Feed;
