
import React from 'react';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

const EnhancedCommunityStats = () => {
  return (
    <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-ctea-pink" />
          Community Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Total Posts</span>
            <span className="text-white font-bold">15,742</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Verified Posts</span>
            <span className="text-green-400 font-bold">12,856</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Active Users</span>
            <span className="text-white font-bold">2,420</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">$TEA Distributed</span>
            <span className="text-ctea-yellow font-bold">420K</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">$SOAP Reputation</span>
            <span className="text-ctea-purple font-bold">850K</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedCommunityStats;
