
import React from 'react';
import { Badge } from '@/components/ui/badge';

const LiveFeedNotice = () => {
  return (
    <div className="bg-gradient-to-r from-green-500/20 to-ctea-teal/20 border border-green-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 font-medium">Live Feed</span>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          Real-time updates
        </Badge>
      </div>
      <p className="text-gray-300 text-sm mt-2">
        New submissions appear instantly! Your tea will be visible to the community immediately after posting.
      </p>
    </div>
  );
};

export default LiveFeedNotice;
