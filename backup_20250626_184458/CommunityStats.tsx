
import React from 'react';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface CommunityStatsProps {
  variant?: 'default' | 'enhanced';
  className?: string;
}

const CommunityStats = ({ variant = 'default', className = '' }: CommunityStatsProps) => {
  const stats = [
    { label: 'Total Posts', value: '15,742', color: 'text-white' },
    { label: 'Active Users', value: '2,420', color: 'text-white' },
    { label: '$TEA Distributed', value: '420K', color: 'text-yellow-400' },
    { label: 'Uptime', value: '99.2%', color: 'text-green-400' }
  ];

  return (
    <Card className={`bg-gray-800/30 border-gray-700 ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-pink-400" />
          Community Stats
        </h3>
        <div className="space-y-3">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">{label}</span>
              <span className={`font-bold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CommunityStats;
