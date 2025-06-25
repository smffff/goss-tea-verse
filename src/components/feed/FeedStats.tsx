
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Zap } from 'lucide-react';

const FeedStats = () => {
  const stats = [
    { label: 'Hot Takes Today', value: '1,247', icon: TrendingUp, color: 'text-ctea-teal' },
    { label: 'Active Users', value: '2,420', icon: Users, color: 'text-ctea-purple' },
    { label: 'Viral Posts', value: '69', icon: Zap, color: 'text-ctea-yellow' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} className="bg-ctea-darker/50 border-ctea-teal/30 text-center p-4">
          <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
          <div className={`text-xl font-bold ${color}`}>{value}</div>
          <div className="text-sm text-gray-400">{label}</div>
        </Card>
      ))}
    </div>
  );
};

export default FeedStats;
