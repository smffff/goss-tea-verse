
import React from 'react';

interface StatsDisplayProps {
  stats: {
    totalSpills: number;
    activeUsers: number;
    hotTopics: number;
    dailyGrowth: number;
  };
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-ctea-teal">{stats.totalSpills.toLocaleString()}</div>
        <div className="text-sm text-gray-400">Total Spills</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-pink-400">{stats.activeUsers}</div>
        <div className="text-sm text-gray-400">Active Users</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-400">{stats.hotTopics}</div>
        <div className="text-sm text-gray-400">Hot Topics</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">+{stats.dailyGrowth}%</div>
        <div className="text-sm text-gray-400">Daily Growth</div>
      </div>
    </div>
  );
};

export default StatsDisplay;
