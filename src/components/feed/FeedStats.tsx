
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Zap } from 'lucide-react';

interface FeedStatsProps {
  variant?: 'default' | 'enhanced';
  className?: string;
}

const FeedStats = ({ variant = 'default', className = '' }: FeedStatsProps) => {
  const stats = [
    { label: 'Hot Takes Today', value: '1,247', icon: TrendingUp, color: 'text-teal-400' },
    { label: 'Active Users', value: '2,420', icon: Users, color: 'text-purple-400' },
    { label: 'Viral Posts', value: '69', icon: Zap, color: 'text-yellow-400' }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8 ${className}`}>
      {stats.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} className="bg-gray-800/50 border-gray-700 text-center p-4">
          <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
          <div className={`text-xl font-bold ${color}`}>{value}</div>
          <div className="text-sm text-gray-400">{label}</div>
        </Card>
      ))}
    </div>
  );
};

export default FeedStats;
